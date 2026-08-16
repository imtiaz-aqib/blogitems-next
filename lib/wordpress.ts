import DOMPurify from "isomorphic-dompurify";

const API_URL = process.env.WORDPRESS_API_URL || "https://aqib-xyz.stackstaging.com/wp-json/wp/v2";

export interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    author?: { name: string }[];
  };
}

export interface PaginatedPostsResult {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
}

// Helper to determine if we should attempt fetch or fail fast
function shouldFetch(): boolean {
  if (!API_URL) return false;
  // If running in Vercel cloud build and API URL points to local domain (.local or localhost), fail fast
  if (process.env.VERCEL && (API_URL.includes(".local") || API_URL.includes("localhost"))) {
    return false;
  }
  return true;
}

export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 6
): Promise<PaginatedPostsResult> {
  if (!shouldFetch()) {
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }

  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`,
      {
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { posts: [], totalPosts: 0, totalPages: 0 };
    }

    const totalPosts = parseInt(res.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "0", 10);
    const posts: Post[] = await res.json();

    return {
      posts,
      totalPosts: totalPosts || posts.length,
      totalPages: totalPages || (posts.length > 0 ? 1 : 0),
    };
  } catch (e) {
    console.error("getPaginatedPosts error:", e);
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (!shouldFetch()) {
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/posts?_embed&per_page=100`, {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!shouldFetch()) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const posts: Post[] = await res.json();
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  if (!shouldFetch()) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`, {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const pages: Post[] = await res.json();
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllPages(): Promise<Post[]> {
  if (!shouldFetch()) {
    return [];
  }

  try {
    const res = await fetch(`${API_URL}/pages?_embed&per_page=50`, {
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
}

export function formatPostDate(dateString?: string): string {
  if (!dateString) return "Recent";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function calculateReadingTime(htmlContent?: string): string {
  if (!htmlContent) return "3 min read";
  const plainText = htmlContent.replace(/<[^>]+>/g, "");
  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function sanitizeHtml(rawHtml?: string): string {
  if (!rawHtml) return "";
  return DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ["target", "rel"],
  });
}