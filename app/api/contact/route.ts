import { NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting map (Best-effort fallback for single-instance / local environments)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

async function checkRateLimit(ip: string): Promise<boolean> {
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  // 1. If Upstash Redis is configured, use distributed rate limiting
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const key = `ratelimit:contact:${ip}`;
      const res = await fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, 600],
        ]),
      });
      if (res.ok) {
        const results = await res.json();
        const count = results[0]?.result || 1;
        return count <= maxRequests;
      }
    } catch (e) {
      console.warn("Upstash rate limit check failed, falling back to local limiter:", e);
    }
  }

  // 2. Local in-memory sliding window rate limiter (best effort)
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip);

  if (!userRecord || userRecord.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (userRecord.count >= maxRequests) {
    return false;
  }

  userRecord.count += 1;
  return true;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export async function POST(request: Request) {
  try {
    // 1. Identify Client IP for Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "unknown";

    const isAllowed = await checkRateLimit(clientIp);
    if (!isAllowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before submitting again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, role, message, website } = body;

    // 2. Honeypot Bot Trap: if hidden 'website' field is populated, reject submission
    if (website && typeof website === "string" && website.trim() !== "") {
      return NextResponse.json(
        { error: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // 3. Strict Input & Length Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }
    if (email.trim().length > 120) {
      return NextResponse.json(
        { error: "Email must not exceed 120 characters." },
        { status: 400 }
      );
    }

    if (phone && (typeof phone !== "string" || phone.length > 50)) {
      return NextResponse.json(
        { error: "Phone number is too long." },
        { status: 400 }
      );
    }

    if (company && (typeof company !== "string" || company.length > 120)) {
      return NextResponse.json(
        { error: "Company name must not exceed 120 characters." },
        { status: 400 }
      );
    }

    if (role && (typeof role !== "string" || role.length > 100)) {
      return NextResponse.json(
        { error: "Role must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "Please provide a message." },
        { status: 400 }
      );
    }
    if (message.trim().length > 3000) {
      return NextResponse.json(
        { error: "Message must not exceed 3000 characters." },
        { status: 400 }
      );
    }

    // 4. Strict Environment Variable Resolution (No Hardcoded Fallback Keys)
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey || !apiKey.startsWith("re_")) {
      console.error("Missing or invalid RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "imz.aqib@gmail.com";

    // 5. Initialize Resend & Send Email
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Support | BlogItems <hi@blogitems.com>",
      to: [recipientEmail],
      replyTo: email.trim(),
      subject: `New BlogItems Contact Form Submission from ${escapeHtml(name.trim())}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #232141; border-bottom: 2px solid #5f58d6; padding-bottom: 10px;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>` : ""}
          ${company ? `<p><strong>Company:</strong> ${escapeHtml(company.trim())}</p>` : ""}
          ${role ? `<p><strong>Role:</strong> ${escapeHtml(role.trim())}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #5f58d6; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message.trim())}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eeeeee;" />
          <p style="font-size: 12px; color: #888888;">This email was automatically generated from your BlogItems Next.js contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Email Delivery Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    console.error("Contact API Exception:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
