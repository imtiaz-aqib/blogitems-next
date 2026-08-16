import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    const REVALIDATE_SECRET =
      process.env.REVALIDATE_SECRET || "blogitems-secret-revalidate-token-2026";

    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid revalidation secret token" },
        { status: 401 }
      );
    }

    let slug = "";
    try {
      const body = await request.json();
      slug = body?.post?.post_name || body?.slug || "";
    } catch {
      // Body empty or non-JSON
    }

    try {
      revalidatePath("/journal", "page");
      revalidatePath("/", "page");
      if (slug) {
        revalidatePath(`/posts/${slug}`, "page");
      }
    } catch (e) {
      console.error("revalidatePath error:", e);
    }

    return NextResponse.json({
      revalidated: true,
      purgedPaths: ["/journal", "/", slug ? `/posts/${slug}` : null].filter(Boolean),
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error revalidating";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
