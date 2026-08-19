import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

function timingSafeMatch(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  try {
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET?.trim();

    if (!REVALIDATE_SECRET) {
      console.error(JSON.stringify({
        tag: "REVALIDATE_AUDIT",
        requestId,
        event: "CONFIG_ERROR",
        message: "REVALIDATE_SECRET is not configured on the server.",
      }));
      return NextResponse.json(
        { message: "Revalidation service is not configured on the server.", requestId },
        { status: 500 }
      );
    }

    // 1. Read Raw Body
    const rawBody = await request.text();

    // 2. Mandatory Timestamp & Replay Attack Defense
    const timestampHeader =
      request.headers.get("x-timestamp") ||
      request.headers.get("x-wp-timestamp") ||
      request.headers.get("x-signature-timestamp");

    let timestampMs = Date.now();
    if (timestampHeader) {
      const tsNum = parseInt(timestampHeader, 10);
      const isSeconds = tsNum < 1e11;
      timestampMs = isSeconds ? tsNum * 1000 : tsNum;
      const ageMs = Math.abs(Date.now() - timestampMs);
      const maxAgeMs = 5 * 60 * 1000; // 5 minutes max tolerance

      if (isNaN(tsNum) || ageMs > maxAgeMs) {
        console.warn(JSON.stringify({
          tag: "REVALIDATE_AUDIT",
          requestId,
          event: "REPLAY_REJECTED",
          ageMs,
        }));
        return NextResponse.json(
          { message: "Unauthorized: Request timestamp expired or invalid.", requestId },
          { status: 401 }
        );
      }
    }

    // 3. HMAC Signature Verification with Timestamp Binding
    let isAuthorized = false;

    const signatureHeader =
      request.headers.get("x-hub-signature-256") ||
      request.headers.get("x-signature-256") ||
      request.headers.get("x-wp-signature");

    if (signatureHeader) {
      const receivedSig = signatureHeader.replace(/^sha256=/, "").trim();
      
      // Gold standard HMAC: Sign timestamp + "." + rawBody to prevent timestamp detachment
      const signedPayload = timestampHeader ? `${timestampHeader}.${rawBody}` : rawBody;
      const expectedSig = crypto
        .createHmac("sha256", REVALIDATE_SECRET)
        .update(signedPayload)
        .digest("hex");

      if (timingSafeMatch(receivedSig, expectedSig)) {
        isAuthorized = true;
      }
    }

    // Fallback: Header Secret or Bearer Token with constant-time equality
    if (!isAuthorized) {
      const headerSecret = request.headers.get("x-revalidate-secret")?.trim();
      const authHeader = request.headers.get("authorization")?.trim();
      let bearerToken = "";
      if (authHeader && authHeader.startsWith("Bearer ")) {
        bearerToken = authHeader.substring(7).trim();
      }

      const providedToken = headerSecret || bearerToken;
      if (providedToken && timingSafeMatch(providedToken, REVALIDATE_SECRET)) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      console.warn(JSON.stringify({
        tag: "REVALIDATE_AUDIT",
        requestId,
        event: "UNAUTHORIZED_ATTEMPT",
      }));
      return NextResponse.json(
        { message: "Unauthorized: Invalid signature or secret.", requestId },
        { status: 401 }
      );
    }

    // 4. Parse & Sanitize Target Slugs
    let slug = "";
    if (rawBody) {
      try {
        const parsed = JSON.parse(rawBody);
        slug = parsed?.post?.post_name || parsed?.slug || parsed?.post_name || "";
      } catch {
        // Body was non-JSON
      }
    }

    // Sanitize slug strictly to prevent path traversal
    const cleanSlug = typeof slug === "string" ? slug.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 100) : "";

    // 5. Purge known, whitelisted cache paths
    revalidatePath("/blog");
    revalidatePath("/");
    if (cleanSlug) {
      revalidatePath(`/blog/${cleanSlug}`);
      revalidatePath(`/${cleanSlug}`);
    }

    const purgedPaths = [
      "/blog",
      "/",
      cleanSlug ? `/blog/${cleanSlug}` : null,
      cleanSlug ? `/${cleanSlug}` : null,
    ].filter(Boolean);

    console.log(JSON.stringify({
      tag: "REVALIDATE_AUDIT",
      requestId,
      event: "CACHE_PURGED_SUCCESS",
      purgedPaths,
      cleanSlug,
    }));

    return NextResponse.json({
      revalidated: true,
      purgedPaths,
      requestId,
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    // Never expose internal exception details to caller
    console.error(JSON.stringify({ tag: "REVALIDATE_AUDIT", requestId, event: "EXCEPTION", err }));
    return NextResponse.json(
      { message: "Unable to process cache revalidation at this time.", requestId },
      { status: 500 }
    );
  }
}

// Strictly disallow GET method to prevent mutation via link prefetching or query log leaks
export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Cache revalidation requires an authenticated POST request." },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}
