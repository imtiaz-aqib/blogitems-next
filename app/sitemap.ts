import type { MetadataRoute } from "next";
import { getAllPosts, getAllPages } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.blogitems.com").replace(/\/$/, "");

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const posts = await getAllPosts();
    const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date?.rendered
        ? new Date(post.date.rendered).toISOString()
        : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const pages = await getAllPages();
    const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.date?.rendered
        ? new Date(page.date.rendered).toISOString()
        : new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...postUrls, ...pageUrls];
  } catch {
    return staticRoutes;
  }
}
