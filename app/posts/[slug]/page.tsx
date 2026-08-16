import { getPostBySlug, getAllPosts, formatPostDate, calculateReadingTime, sanitizeHtml, Post } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

export const revalidate = 10;
export const dynamicParams = true;

const FALLBACK_POSTS_MAP: Record<string, Post> = {
  "optimize-nextjs-headless-wordpress": {
    id: 201,
    slug: "optimize-nextjs-headless-wordpress",
    title: { rendered: "How To Optimize Next.js 16 App Router for Headless WordPress" },
    excerpt: {
      rendered:
        "Five distinct architectural strategies to achieve sub-second page loads, instant ISR revalidation, and zero layout shift.",
    },
    content: {
      rendered:
        "<p>Decoupling WordPress with Next.js 16 App Router allows developers to build blazing-fast web applications while preserving WordPress content management workflows...</p>",
    },
    date: { rendered: "2026-08-12T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
          alt_text: "Next.js & WordPress Architecture",
        },
      ],
      author: [{ name: "BlogItems Editorial" }],
    },
  },
  "build-vs-buy-headless-cms-infrastructure": {
    id: 202,
    slug: "build-vs-buy-headless-cms-infrastructure",
    title: {
      rendered: "Build vs Buy Your Headless CMS Content Infrastructure",
    },
    excerpt: {
      rendered:
        "Evaluating custom API gateways versus native WordPress REST API integration for enterprise web platforms.",
    },
    content: {
      rendered:
        "<p>Choosing between building a custom CMS from scratch versus pairing WordPress REST API with Next.js frontend...</p>",
    },
    date: { rendered: "2026-08-04T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
          alt_text: "Headless Infrastructure",
        },
      ],
      author: [{ name: "BlogItems Team" }],
    },
  },
  "web-vitals-performance-guide": {
    id: 203,
    slug: "web-vitals-performance-guide",
    title: {
      rendered: "5 Web Performance Best Practices to Maximize Core Web Vitals",
    },
    excerpt: {
      rendered:
        "How to minimize LCP, eliminate CLS layout shifts, and reduce Total Blocking Time in modern React applications.",
    },
    content: {
      rendered:
        "<p>Core Web Vitals directly impact search rankings and user conversion rates. Here is a technical breakdown of performance optimization...</p>",
    },
    date: { rendered: "2026-07-23T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
          alt_text: "Core Web Vitals",
        },
      ],
      author: [{ name: "BlogItems Team" }],
    },
  },
  "calculating-roi-decoupling-wordpress": {
    id: 204,
    slug: "calculating-roi-decoupling-wordpress",
    title: {
      rendered: "Calculating the ROI of Decoupling Your WordPress Frontend",
    },
    excerpt: {
      rendered:
        "Quantifying the performance gains, security improvements, and conversion increases of a Headless Next.js stack.",
    },
    content: {
      rendered:
        "<p>Decoupled web architecture delivers tangible financial returns through faster page speed and enhanced security...</p>",
    },
    date: { rendered: "2026-07-10T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          alt_text: "ROI Analysis",
        },
      ],
      author: [{ name: "BlogItems Editorial" }],
    },
  },
  "introducing-blogitems-web-starter-kit": {
    id: 205,
    slug: "introducing-blogitems-web-starter-kit",
    title: {
      rendered: "Introducing BlogItems Web Starter Kit: High-Speed Web Infrastructure",
    },
    excerpt: {
      rendered:
        "A modular, pre-configured Next.js 16 starter template for Headless WordPress with Tailwind CSS v4 and DOMPurify security.",
    },
    content: {
      rendered:
        "<p>Announcing the BlogItems Web Starter Kit, built for engineering teams who demand top-tier speed and security...</p>",
    },
    date: { rendered: "2026-07-09T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
          alt_text: "Starter Kit",
        },
      ],
      author: [{ name: "Engineering Team" }],
    },
  },
  "sub-second-page-load-case-study": {
    id: 206,
    slug: "sub-second-page-load-case-study",
    title: {
      rendered: "How We Achieved Sub-Second Page Load Speeds for Enterprise Clients",
    },
    excerpt: {
      rendered:
        "Inside the caching, image optimization, and static generation pipeline behind high-converting web applications.",
    },
    content: {
      rendered:
        "<p>Case study detailing page load optimization techniques for enterprise web applications...</p>",
    },
    date: { rendered: "2026-07-07T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          alt_text: "Performance Case Study",
        },
      ],
      author: [{ name: "BlogItems Team" }],
    },
  },
};

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    if (posts && posts.length > 0) {
      return posts.map((post) => ({ slug: post.slug }));
    }
  } catch {
    // fallback
  }

  return Object.keys(FALLBACK_POSTS_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // ignore
  }

  if (!post && FALLBACK_POSTS_MAP[slug]) {
    post = FALLBACK_POSTS_MAP[slug];
  }

  if (!post) {
    return {
      title: "Blog Article | BlogItems Journal",
    };
  }

  const cleanDescription = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim();

  return {
    title: `${post.title.rendered} | BlogItems Journal`,
    description: cleanDescription,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // fallback if API is unreachable
  }

  if (!post && FALLBACK_POSTS_MAP[slug]) {
    post = FALLBACK_POSTS_MAP[slug];
  }

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.["author"]?.[0]?.name || "BlogItems Editorial";
  const dateFormatted = formatPostDate(post.date?.rendered || (post as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(post.content?.rendered);

  return (
    <article className="pt-[100px]">
      {/* Post Header Hero Banner */}
      <div className="ui-header-pattern py-12 md:py-16 px-6 border-b border-[#000000]">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffcb7d] hover:underline mb-6"
          >
            &larr; Back to all articles
          </Link>

          <span className="ui-badge-yellow block mb-4">BlogItems Article</span>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }}
          />

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/90 font-medium pt-4 border-t border-white/20">
            <span>Posted {dateFormatted}</span>
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
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rendered WordPress HTML Article */}
        <div
          className="prose prose-lg max-w-none text-[#333344] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
        />
      </div>

      {/* CTA Section */}
      <CtaSection />
    </article>
  );
}
