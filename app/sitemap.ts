import type { MetadataRoute } from "next";
import { fetchAllSitemapPostEntries, fetchAllSitemapPageEntries } from "@/lib/wordpress";

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

  const FALLBACK_POST_SLUGS = [
    "office-hour",
    "5-talks-at-kubecon-japan-im-looking-forward-to",
    "enterprise-headless-wordpress-setup-completed",
    "are-your-beliefs-limiting-what-is-possible",
    "mastering-headless-wordpress-caching-and-revalidation-strategies-for-nextjs",
    "the-ultimate-checklist-for-migrating-to-headless-wordpress",
    "5-common-headless-wordpress-mistakes-and-how-to-avoid-them",
    "how-incremental-static-regeneration-isr-works-in-plain-english",
    "why-decoupled-headless-wordpress-is-practically-hack-proof",
    "step-by-step-how-content-editors-work-in-headless-wordpress",
    "is-headless-wordpress-good-for-seo-aeo-geo-guide",
    "how-headless-wordpress-makes-your-website-10x-faster",
    "traditional-vs-headless-wordpress-which-one-should-you-choose",
    "why-next-js-headless-wordpress-is-the-ultimate-web-combo",
    "what-is-headless-wordpress-a-beginners-plain-english-guide",
  ];

  const FALLBACK_PAGE_SLUGS = ["about", "privacy", "careers", "docs", "case-studies", "showcase"];

  try {
    let postEntries = await fetchAllSitemapPostEntries();
    if (!postEntries || postEntries.length === 0) {
      postEntries = FALLBACK_POST_SLUGS.map((slug) => ({ slug, date: new Date().toISOString() }));
    }

    const postUrls: MetadataRoute.Sitemap = postEntries.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    let pageEntries = await fetchAllSitemapPageEntries();
    if (!pageEntries || pageEntries.length === 0) {
      pageEntries = FALLBACK_PAGE_SLUGS.map((slug) => ({ slug, date: new Date().toISOString() }));
    }

    const pageUrls: MetadataRoute.Sitemap = pageEntries.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.date
        ? new Date(page.date).toISOString()
        : new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...postUrls, ...pageUrls];
  } catch {
    const postUrls: MetadataRoute.Sitemap = FALLBACK_POST_SLUGS.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    const pageUrls: MetadataRoute.Sitemap = FALLBACK_PAGE_SLUGS.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
    return [...staticRoutes, ...postUrls, ...pageUrls];
  }
}
