import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET?.trim();

    if (!REVALIDATE_SECRET) {
      console.error("REVALIDATE_SECRET is not configured in server environment.");
      return NextResponse.json(
        { message: "Revalidation service is not configured on the server." },
        { status: 500 }
      );
    }

    // Extract secret strictly from protected headers (avoids logging secrets in URL query strings)
    const headerSecret = request.headers.get("x-revalidate-secret");
    const authHeader = request.headers.get("authorization");
    let bearerToken = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      bearerToken = authHeader.substring(7).trim();
    }

    const providedSecret = headerSecret || bearerToken;

    if (!providedSecret || providedSecret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing revalidation secret header." },
        { status: 401 }
      );
    }

    let slug = "";
    try {
      const body = await request.json();
      slug = body?.post?.post_name || body?.slug || body?.post_name || "";
    } catch {
      // Body is empty or not JSON
    }

    // Purge cached paths
    revalidatePath("/blog");
    revalidatePath("/");
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/${slug}`);
    }

    return NextResponse.json({
      revalidated: true,
      purgedPaths: [
        "/blog",
        "/",
        slug ? `/blog/${slug}` : null,
        slug ? `/${slug}` : null,
      ].filter(Boolean),
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error during revalidation";
    return NextResponse.json({ message }, { status: 500 });
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
