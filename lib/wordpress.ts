import DOMPurify from "isomorphic-dompurify";

const API_URL = process.env.WORDPRESS_API_URL;

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

export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts?_embed&per_page=12`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts: Post[] = await res.json();

  return posts[0] ?? null;
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/pages?slug=${slug}&_embed`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    return null;
  }

  const pages: Post[] = await res.json();
  return pages[0] ?? null;
}

export async function getAllPages(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/pages?_embed&per_page=50`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
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