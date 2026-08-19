import { getPageBySlug, getPostBySlug, getAllPages, formatPostDate, calculateReadingTime, sanitizeHtml, Post } from "@/lib/wordpress";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

// Fallback pages if WordPress API is offline or page is not yet published in WP
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
  privacy: {
    id: 1726,
    slug: "privacy",
    title: { rendered: "Privacy Policy" },
    excerpt: { rendered: "Our privacy policy explains how BlogItems protects and handles your personal information." },
    content: {
      rendered: `
        <p>At BlogItems, we prioritize the protection and confidentiality of your personal data. This Privacy Policy details the types of information we collect, how it is utilized, and your rights regarding your personal data.</p>
        <h2>Information We Collect</h2>
        <p>We only collect information directly provided by you through our contact and inquiry forms (such as name, email address, phone number, and message content).</p>
        <h2>Data Security</h2>
        <p>We implement enterprise-grade encryption and security headers to protect against unauthorized access, alteration, or disclosure of your personal data.</p>
      `,
    },
    date: { rendered: "2026-08-01T10:00:00" },
    _embedded: {
      author: [{ name: "BlogItems Legal Team" }],
    },
  },
  careers: {
    id: 1727,
    slug: "careers",
    title: { rendered: "Join the BlogItems Engineering Team" },
    excerpt: { rendered: "Explore career opportunities at BlogItems and build cutting-edge web infrastructure with us." },
    content: {
      rendered: `
        <p>We are always on the lookout for passionate full-stack engineers, Next.js specialists, and cloud architects who love crafting blazing-fast web experiences.</p>
        <h2>Why Join Us?</h2>
        <ul>
          <li>100% Remote-First Culture</li>
          <li>Competitive Salary & Equity Packages</li>
          <li>Continuous Learning & Conference Allowances</li>
        </ul>
        <p>Send your portfolio or GitHub profile to <a href="mailto:careers@blogitems.com">careers@blogitems.com</a>.</p>
      `,
    },
    date: { rendered: "2026-08-01T10:00:00" },
    _embedded: {
      author: [{ name: "BlogItems Talent Team" }],
    },
  },
  docs: {
    id: 1728,
    slug: "docs",
    title: { rendered: "Documentation & Technical Guides" },
    excerpt: { rendered: "Architecture reference and integration guides for BlogItems Headless WordPress platform." },
    content: {
      rendered: `
        <p>Welcome to the BlogItems developer documentation. Learn how our headless architecture connects WordPress REST APIs with Next.js 16 App Router.</p>
        <h2>Quick Start</h2>
        <p>Explore our open-source tools, API webhooks, and On-Demand Revalidation endpoints.</p>
      `,
    },
    date: { rendered: "2026-08-01T10:00:00" },
    _embedded: {
      author: [{ name: "BlogItems Engineering" }],
    },
  },
  "case-studies": {
    id: 1729,
    slug: "case-studies",
    title: { rendered: "Client Case Studies" },
    excerpt: { rendered: "Read how leading enterprises accelerated their page speed by 300% with BlogItems." },
    content: {
      rendered: `
        <p>Discover real-world results from organizations that migrated their legacy monolith websites to our decoupled Next.js 16 stack.</p>
        <h2>Key Metrics Achieved</h2>
        <ul>
          <li>LCP reduced from 4.2s to 650ms</li>
          <li>Zero server downtime during traffic spikes</li>
          <li>100% SEO indexing and organic traffic growth</li>
        </ul>
      `,
    },
    date: { rendered: "2026-08-01T10:00:00" },
    _embedded: {
      author: [{ name: "BlogItems Team" }],
    },
  },
  showcase: {
    id: 1730,
    slug: "showcase",
    title: { rendered: "Project Showcase" },
    excerpt: { rendered: "Featured web platforms and enterprise web applications engineered by BlogItems." },
    content: {
      rendered: `
        <p>A curated showcase of high-performance websites powered by Next.js, Tailwind CSS, and headless content infrastructure.</p>
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

  const cleanDescription = page.excerpt?.rendered
    ? page.excerpt.rendered.replace(/<[^>]+>/g, "").trim()
    : "";
  const pageTitle = page.title?.rendered || "Page";

  return {
    title: `${pageTitle} | BlogItems`,
    description: cleanDescription,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: `${pageTitle} | BlogItems`,
      description: cleanDescription,
      url: `https://www.blogitems.com/${slug}`,
    },
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

  // If not a WP Page or static fallback, check if it's a Blog Post
  // and permanently redirect to /blog/[slug] to eliminate duplicate SEO routes!
  if (!page) {
    try {
      const post = await getPostBySlug(slug);
      if (post) {
        redirect(`/blog/${slug}`);
      }
    } catch {
      // ignore
    }
  }

  if (!page) {
    notFound();
  }

  const featuredImage = page._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = page._embedded?.["author"]?.[0]?.name || "BlogItems Team";
  const dateFormatted = formatPostDate(page.date?.rendered || (page as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(page.content?.rendered);
  const pageTitle = page.title?.rendered || "Page";

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
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageTitle) }}
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
