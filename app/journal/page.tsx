import { getAllPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "The BlogItems Journal | Modern Web Engineering & Headless CMS Insights",
  description:
    "Explore in-depth technical guides, Headless WordPress architecture tutorials, Core Web Vitals optimization techniques, and Next.js 16 best practices.",
};

const FALLBACK_POSTS: Post[] = [
  {
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
  {
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
  {
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
];

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const pageSize = 6;

  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = FALLBACK_POSTS;
  }

  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  const totalPosts = posts.length;

  // Pagination slicing
  let featuredPost: Post | null = null;
  let gridPosts: Post[] = [];

  if (currentPage === 1) {
    featuredPost = posts[0] || null;
    gridPosts = posts.slice(1, 1 + pageSize);
  } else {
    featuredPost = null;
    const startIndex = (currentPage - 1) * pageSize;
    gridPosts = posts.slice(startIndex, startIndex + pageSize);
  }

  return (
    <div>
      {/* Blog Journal Hero Header */}
      <BlogHeader />

      {/* Main Blog Content Feed */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16">
        {/* Featured Article Card (Page 1 Only) */}
        {featuredPost && <FeaturedPostCard post={featuredPost} />}

        {/* 3-Column Blog Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Dynamic Link-Based Pagination Bar */}
        <Pagination currentPage={currentPage} totalPosts={totalPosts} pageSize={pageSize} baseUrl="/journal" />
      </div>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
