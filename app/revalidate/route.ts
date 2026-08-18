import { NextRequest, NextResponse } from "next/server";
import { POST as apiRevalidatePost } from "../api/revalidate/route";

// Forward POST requests directly to the centralized /api/revalidate handler
export async function POST(request: NextRequest) {
  return apiRevalidatePost(request);
}

// Disallow GET method
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
