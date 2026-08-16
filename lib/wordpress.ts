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

function shouldFetch(): boolean {
  if (!API_URL) return false;
  if (process.env.VERCEL && (API_URL.includes(".local") || API_URL.includes("localhost"))) {
    return false;
  }
  return true;
}

// Safe fetch wrapper that never throws unhandled errors
async function safeFetch(url: string, options: RequestInit = {}): Promise<Response | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 60, tags: ["posts"] },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return res;
  } catch {
    return null;
  }
}

export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 6
): Promise<PaginatedPostsResult> {
  if (!shouldFetch()) {
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }

  const res = await safeFetch(`${API_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
  if (!res) {
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }

  try {
    const totalPosts = parseInt(res.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "0", 10);
    const posts: Post[] = await res.json();

    return {
      posts: Array.isArray(posts) ? posts : [],
      totalPosts: totalPosts || (Array.isArray(posts) ? posts.length : 0),
      totalPages: totalPages || (Array.isArray(posts) && posts.length > 0 ? 1 : 0),
    };
  } catch {
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (!shouldFetch()) {
    return [];
  }

  const res = await safeFetch(`${API_URL}/posts?_embed&per_page=100`);
  if (!res) {
    return [];
  }

  try {
    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!shouldFetch()) {
    return null;
  }

  const res = await safeFetch(`${API_URL}/posts?slug=${slug}&_embed`);
  if (!res) {
    return null;
  }

  try {
    const posts: Post[] = await res.json();
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  if (!shouldFetch()) {
    return null;
  }

  const res = await safeFetch(`${API_URL}/pages?slug=${slug}&_embed`);
  if (!res) {
    return null;
  }

  try {
    const pages: Post[] = await res.json();
    return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
  } catch {
    return null;
  }
}

export async function getAllPages(): Promise<Post[]> {
  if (!shouldFetch()) {
    return [];
  }

  const res = await safeFetch(`${API_URL}/pages?_embed&per_page=50`);
  if (!res) {
    return [];
  }

  try {
    const pages = await res.json();
    return Array.isArray(pages) ? pages : [];
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