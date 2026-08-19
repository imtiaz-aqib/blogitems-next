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

export interface SitemapEntry {
  slug: string;
  date: string;
}

function shouldFetch(): boolean {
  if (!API_URL) return false;
  if (process.env.VERCEL && (API_URL.includes(".local") || API_URL.includes("localhost"))) {
    return false;
  }
  return true;
}

// Clean, resilient fetch wrapper with automatic retries for Next.js 16
async function safeFetch(url: string, options: RequestInit = {}): Promise<Response | null> {
  const maxRetries = 2;
  const timeoutMs = 4000; // 4s timeout per attempt to guarantee response within Vercel's serverless budget

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const res = await fetch(url, {
        next: { revalidate: 60, tags: ["posts"] },
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json",
          ...(options.headers || {}),
        },
      });
      clearTimeout(timeoutId);
      if (res.ok) return res;
    } catch {
      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  }
  return null;
}

export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 6
): Promise<PaginatedPostsResult> {
  if (!shouldFetch()) {
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }

  const safePage = Math.max(1, Math.floor(page));
  const safePerPage = Math.max(1, Math.min(100, Math.floor(perPage)));

  const res = await safeFetch(`${API_URL}/posts?_embed&page=${safePage}&per_page=${safePerPage}`);
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
  if (!shouldFetch() || !slug) {
    return null;
  }

  const safeSlug = encodeURIComponent(slug.trim());
  const res = await safeFetch(`${API_URL}/posts?slug=${safeSlug}&_embed`);
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
  if (!shouldFetch() || !slug) {
    return null;
  }

  const safeSlug = encodeURIComponent(slug.trim());
  const res = await safeFetch(`${API_URL}/pages?slug=${safeSlug}&_embed`);
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

// Complete pagination traversal for generating 100% comprehensive XML sitemaps
export async function fetchAllSitemapPostEntries(): Promise<SitemapEntry[]> {
  if (!shouldFetch()) return [];
  const entries: SitemapEntry[] = [];
  let page = 1;
  const perPage = 100;
  const maxSafeCeiling = 100; // Up to 10,000 posts supported

  while (page <= maxSafeCeiling) {
    const res = await safeFetch(`${API_URL}/posts?_fields=slug,date&page=${page}&per_page=${perPage}`);
    if (!res) break;

    try {
      const items: Array<{ slug: string; date: string }> = await res.json();
      if (!Array.isArray(items) || items.length === 0) break;

      for (const item of items) {
        if (item.slug) {
          entries.push({ slug: item.slug, date: item.date });
        }
      }

      const totalPagesHeader = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
      if (page >= totalPagesHeader) break;
      page++;
    } catch {
      break;
    }
  }

  return entries;
}

export async function fetchAllSitemapPageEntries(): Promise<SitemapEntry[]> {
  if (!shouldFetch()) return [];
  const entries: SitemapEntry[] = [];
  let page = 1;
  const perPage = 100;
  const maxSafeCeiling = 50; // Up to 5,000 pages supported

  while (page <= maxSafeCeiling) {
    const res = await safeFetch(`${API_URL}/pages?_fields=slug,date&page=${page}&per_page=${perPage}`);
    if (!res) break;

    try {
      const items: Array<{ slug: string; date: string }> = await res.json();
      if (!Array.isArray(items) || items.length === 0) break;

      for (const item of items) {
        if (item.slug) {
          entries.push({ slug: item.slug, date: item.date });
        }
      }

      const totalPagesHeader = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
      if (page >= totalPagesHeader) break;
      page++;
    } catch {
      break;
    }
  }

  return entries;
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
  const cleaned = DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ["target", "rel"],
  });

  // Strict enforcement: Ensure all target="_blank" links have rel="noopener noreferrer"
  return cleaned
    .replace(
      /<a\s+(?:[^>]*?\s+)?target="_blank"(?![^>]*\brel=)[^>]*>/gi,
      (match) => match.replace("<a ", '<a rel="noopener noreferrer" ')
    )
    .replace(
      /<a\s+([^>]*?)rel="([^"]*)"([^>]*)target="_blank"([^>]*)>/gi,
      (_match, p1, rel, p3, p4) => {
        const parts = new Set(rel.split(/\s+/).filter(Boolean));
        parts.add("noopener");
        parts.add("noreferrer");
        return `<a ${p1}rel="${Array.from(parts).join(" ")}"${p3}target="_blank"${p4}>`;
      }
    );
}