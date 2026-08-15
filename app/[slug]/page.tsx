import { getPageBySlug, getAllPages, formatPostDate, calculateReadingTime, sanitizeHtml, Post } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

// Fallback pages if WordPress API is offline during initial build
const FALLBACK_PAGES: Record<string, Post> = {
  about: {
    id: 1725,
    slug: "about",
    title: { rendered: "About BlogItems" },
    excerpt: { rendered: "Learn about the mission, engineering team, and technology architecture behind BlogItems." },
    content: {
      rendered: `
        <p>BlogItems is a modern software engineering and Headless CMS agency specializing in high-speed web infrastructure, Next.js 16 App Router implementations, and cloud-native architecture.</p>
        <h2>Our Engineering Philosophy</h2>
        <p>We believe that website performance and developer experience should never be compromised. By decoupling WordPress backend content management from Next.js React frontend rendering, we deliver sub-second page loads, maximum SEO performance, and ironclad security.</p>
        <h2>What We Do</h2>
        <ul>
          <li><strong>Headless CMS Migrations:</strong> Transforming legacy WordPress sites into decoupled Next.js web applications.</li>
          <li><strong>Core Web Vitals Optimization:</strong> Eliminating layout shifts (CLS), reducing blocking time (TBT), and boosting LCP speed.</li>
          <li><strong>Full-Stack Cloud Solutions:</strong> Scalable serverless API gateways, edge caching, and automated deployment pipelines.</li>
        </ul>
      `,
    },
    date: { rendered: "2026-08-01T10:00:00" },
    _embedded: {
      author: [{ name: "BlogItems Team" }],
    },
  },
};

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    if (pages && pages.length > 0) {
      return pages.map((page) => ({ slug: page.slug }));
    }
  } catch {
    // fallback
  }

  return Object.keys(FALLBACK_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let page = null;

  try {
    page = await getPageBySlug(slug);
  } catch {
    // ignore
  }

  if (!page && FALLBACK_PAGES[slug]) {
    page = FALLBACK_PAGES[slug];
  }

  if (!page) {
    return {
      title: "Page | BlogItems",
    };
  }

  const cleanDescription = page.excerpt.rendered.replace(/<[^>]+>/g, "").trim();

  return {
    title: `${page.title.rendered} | BlogItems`,
    description: cleanDescription,
  };
}

export default async function DynamicWordPressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let page = null;

  try {
    page = await getPageBySlug(slug);
  } catch {
    // fallback if API is unreachable
  }

  if (!page && FALLBACK_PAGES[slug]) {
    page = FALLBACK_PAGES[slug];
  }

  if (!page) {
    notFound();
  }

  const featuredImage = page._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = page._embedded?.["author"]?.[0]?.name || "BlogItems Team";
  const dateFormatted = formatPostDate(page.date?.rendered || (page as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(page.content?.rendered);

  return (
    <article className="pt-[100px]">
      {/* Page Hero Header */}
      <div className="ui-header-pattern py-12 md:py-16 px-6 border-b border-[#000000]">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffcb7d] hover:underline mb-6"
          >
            &larr; Back to Home
          </Link>

          <span className="ui-badge-yellow block mb-4">BlogItems Page</span>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.title.rendered) }}
          />

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/90 font-medium pt-4 border-t border-white/20">
            <span>Last Updated {dateFormatted}</span>
            <span>&middot;</span>
            <span>By <strong className="text-[#ffcb7d]">{authorName}</strong></span>
            <span>&middot;</span>
            <span className="bg-[#ffcb7d]/50 px-2 py-0.5 rounded text-[#232141] font-semibold">{readingTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[800px] mx-auto px-6 py-12">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-[320px] md:h-[450px] mb-10 rounded-2xl overflow-hidden border border-[#000000] ui-card-shadow">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || page.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rendered WordPress HTML Content */}
        <div
          className="prose prose-lg max-w-none text-[#333344] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content.rendered) }}
        />
      </div>

      {/* CTA Section */}
      <CtaSection />
    </article>
  );
}
