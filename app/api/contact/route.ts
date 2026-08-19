import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import crypto from "crypto";

// =============================================================================
// 1. RATE LIMITING INITIALIZATION (Outside Route Handler for Serverless Reuse)
// =============================================================================
const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

const isRedisConfigured = Boolean(redisUrl && redisToken);

const redis = isRedisConfigured
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

// Layered Upstash limiters
const ipLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "ratelimit:contact:ip",
    })
  : null;

const emailLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "24 h"),
      analytics: true,
      prefix: "ratelimit:contact:email",
    })
  : null;

const globalLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 h"),
      analytics: true,
      prefix: "ratelimit:contact:global",
    })
  : null;

// Bounded in-memory fallback limiters & deduplication store
const MAX_LOCAL_ENTRIES = 1000;
const localRateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const localDeduplicationMap = new Map<string, number>();

function purgeExpiredLocalEntries(now: number) {
  for (const [key, record] of localRateLimitMap.entries()) {
    if (record.expiresAt < now) localRateLimitMap.delete(key);
  }
  for (const [key, expiresAt] of localDeduplicationMap.entries()) {
    if (expiresAt < now) localDeduplicationMap.delete(key);
  }
}

function checkLocalRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (localRateLimitMap.size > MAX_LOCAL_ENTRIES) {
    purgeExpiredLocalEntries(now);
    if (localRateLimitMap.size > MAX_LOCAL_ENTRIES) {
      const keysToDelete = Array.from(localRateLimitMap.keys()).slice(0, 200);
      keysToDelete.forEach((k) => localRateLimitMap.delete(k));
    }
  }

  const record = localRateLimitMap.get(key);
  if (!record || record.expiresAt < now) {
    localRateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// =============================================================================
// 2. STRICT ZOD SCHEMA VALIDATION
// =============================================================================
const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must not exceed 100 characters"),
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .max(120, "Email must not exceed 120 characters"),
    phone: z.string().trim().max(50).optional().default(""),
    company: z.string().trim().max(120).optional().default(""),
    role: z.string().trim().max(100).optional().default(""),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(3000, "Message must not exceed 3000 characters"),
    website: z.string().optional().default(""),
    turnstileToken: z.string().optional().default(""),
  })
  .strict();

// =============================================================================
// 3. SECURITY HELPERS & BOT VERIFICATION
// =============================================================================
function getClientIp(request: Request): string {
  // On Vercel deployments, x-forwarded-for is reliably overwritten by Vercel edge.
  const vercelForwardedFor = request.headers.get("x-vercel-proxied-for") || request.headers.get("x-vercel-ip");
  if (vercelForwardedFor) {
    return sanitizeIp(vercelForwardedFor);
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor.split(",").map((s) => s.trim()).filter(Boolean);
    const client = parts[0] || "unknown";
    return sanitizeIp(client);
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return sanitizeIp(realIp);
  }

  return "127.0.0.1";
}

function sanitizeIp(rawIp: string): string {
  return rawIp.replace(/[^a-fA-F0-9.:]/g, "").slice(0, 45) || "unknown";
}

function hashHmac(input: string): string {
  const secret =
    process.env.CONTACT_HMAC_SECRET?.trim() ||
    process.env.REVALIDATE_SECRET?.trim() ||
    "contact-hmac-salt-2026";
  return crypto.createHmac("sha256", secret).update(input.toLowerCase().trim()).digest("hex");
}

async function verifyTurnstileToken(token: string, clientIp: string): Promise<boolean> {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!turnstileSecret) {
    // Pass through if Turnstile is not enabled in environment
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", turnstileSecret);
    formData.append("response", token);
    formData.append("remoteip", clientIp);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!res.ok) return false;
    const outcome = await res.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("[TURNSTILE_VERIFY_ERROR]", err);
    return false;
  }
}

async function reserveDeduplication(fingerprint: string): Promise<boolean> {
  const windowSeconds = 10 * 60; // 10 minutes

  if (redis) {
    try {
      const key = `dedup:contact:${fingerprint}`;
      const res = await redis.set(key, "1", { nx: true, ex: windowSeconds });
      return res === "OK";
    } catch (e) {
      console.warn("Redis deduplication check failed, falling back to local:", e);
    }
  }

  const now = Date.now();
  const existing = localDeduplicationMap.get(fingerprint);
  if (existing && existing > now) {
    return false;
  }

  localDeduplicationMap.set(fingerprint, now + windowSeconds * 1000);
  return true;
}

async function releaseDeduplication(fingerprint: string) {
  if (redis) {
    try {
      await redis.del(`dedup:contact:${fingerprint}`);
    } catch {
      // ignore
    }
  }
  localDeduplicationMap.delete(fingerprint);
}

// =============================================================================
// 4. MAIN POST HANDLER (Optimized Verification Pipeline)
// =============================================================================
export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();
  const clientIp = getClientIp(request);
  let submissionFingerprint = "";

  try {
    // 1. Fast Header & Payload Size Check (Don't consume rate limiters for invalid payloads)
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > 15 * 1024) {
      console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_PAYLOAD_TOO_LARGE", clientIp }));
      return NextResponse.json({ error: "Please check the highlighted fields.", requestId }, { status: 400 });
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Please check the highlighted fields.", requestId }, { status: 400 });
    }

    // 2. Parse & Strict Zod Schema Validation
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Please check the highlighted fields.", requestId }, { status: 400 });
    }

    const parseResult = contactSchema.safeParse(rawBody);
    if (!parseResult.success) {
      console.warn(JSON.stringify({
        tag: "CONTACT_AUDIT",
        requestId,
        event: "VALIDATION_FAILED",
        errors: parseResult.error.format(),
        clientIp,
      }));
      return NextResponse.json({ error: "Please check the highlighted fields.", requestId }, { status: 400 });
    }

    const { name, email, phone, company, role, message, website, turnstileToken } = parseResult.data;

    // 3. Honeypot Bot Trap Check
    if (website && website.trim() !== "") {
      console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_HONEYPOT", clientIp }));
      return NextResponse.json({ error: "Please check the highlighted fields.", requestId }, { status: 400 });
    }

    // 4. Cloudflare Turnstile Bot Verification (if configured)
    const isBotVerified = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!isBotVerified) {
      console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_TURNSTILE", clientIp }));
      return NextResponse.json({ error: "Submission could not be verified.", requestId }, { status: 403 });
    }

    // 5. Duplicate Submission Fingerprint (Anti-Double-Click / Fast Replay)
    submissionFingerprint = hashHmac(`${email}:${message}`);
    const isUnique = await reserveDeduplication(submissionFingerprint);
    if (!isUnique) {
      console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_DUPLICATE", clientIp }));
      return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
    }

    // 6. Layered Rate Limiting: Email-Hash Layer (2 per 24h)
    const emailHash = hashHmac(email);
    if (emailLimiter) {
      const emailCheck = await emailLimiter.limit(emailHash);
      if (!emailCheck.success) {
        await releaseDeduplication(submissionFingerprint);
        console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_EMAIL_RATELIMIT", emailHash, clientIp }));
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    } else {
      const isEmailAllowed = checkLocalRateLimit(`email:${emailHash}`, 2, 24 * 60 * 60 * 1000);
      if (!isEmailAllowed) {
        await releaseDeduplication(submissionFingerprint);
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    }

    // 7. Layered Rate Limiting: IP Layer (5 per 10m)
    if (ipLimiter) {
      const ipCheck = await ipLimiter.limit(clientIp);
      if (!ipCheck.success) {
        await releaseDeduplication(submissionFingerprint);
        console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_IP_RATELIMIT", clientIp }));
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    } else {
      const isIpAllowed = checkLocalRateLimit(`ip:${clientIp}`, 5, 10 * 60 * 1000);
      if (!isIpAllowed) {
        await releaseDeduplication(submissionFingerprint);
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    }

    // 8. Layered Rate Limiting: Global Circuit Breaker (100 per 1h)
    if (globalLimiter) {
      const globalCheck = await globalLimiter.limit("global");
      if (!globalCheck.success) {
        await releaseDeduplication(submissionFingerprint);
        console.warn(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "BLOCKED_GLOBAL_CIRCUIT_BREAKER", clientIp }));
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    } else {
      const isGlobalAllowed = checkLocalRateLimit("global", 100, 60 * 60 * 1000);
      if (!isGlobalAllowed) {
        await releaseDeduplication(submissionFingerprint);
        return NextResponse.json({ error: "Please wait before trying again.", requestId }, { status: 429 });
      }
    }

    // 9. Required Environment Variables (No Hardcoded Fallback Recipients)
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL?.trim();

    if (!apiKey || !apiKey.startsWith("re_")) {
      await releaseDeduplication(submissionFingerprint);
      console.error(JSON.stringify({
        tag: "CONTACT_AUDIT",
        requestId,
        event: "CONFIG_ERROR",
        error: "Missing or invalid RESEND_API_KEY.",
      }));
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again later.", requestId },
        { status: 500 }
      );
    }

    if (!recipientEmail) {
      await releaseDeduplication(submissionFingerprint);
      console.error(JSON.stringify({
        tag: "CONTACT_AUDIT",
        requestId,
        event: "CONFIG_ERROR",
        error: "Missing CONTACT_NOTIFICATION_EMAIL environment variable.",
      }));
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again later.", requestId },
        { status: 500 }
      );
    }

    // 10. Send Email via Resend
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Support | BlogItems <hi@blogitems.com>",
      to: [recipientEmail],
      replyTo: email,
      subject: `New Inquiry from ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #232141; border-bottom: 2px solid #5f58d6; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
          ${role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #5f58d6; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eeeeee;" />
          <p style="font-size: 11px; color: #888888;">Request ID: ${requestId} &bull; Received: ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      // Release deduplication on provider failure so the visitor can retry immediately
      await releaseDeduplication(submissionFingerprint);
      console.error(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "RESEND_DELIVERY_FAILED", error }));
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again later.", requestId },
        { status: 500 }
      );
    }

    console.log(JSON.stringify({
      tag: "CONTACT_AUDIT",
      requestId,
      event: "ACCEPTED_AND_DELIVERED",
      clientIp,
      emailHash,
      latencyMs: Date.now() - startTime,
    }));

    return NextResponse.json({ success: true, requestId, data }, { status: 200 });
  } catch (err: unknown) {
    if (submissionFingerprint) {
      await releaseDeduplication(submissionFingerprint);
    }
    console.error(JSON.stringify({ tag: "CONTACT_AUDIT", requestId, event: "UNHANDLED_EXCEPTION", err }));
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again later.", requestId },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
