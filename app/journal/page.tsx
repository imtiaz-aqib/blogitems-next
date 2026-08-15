import { getAllPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

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
  {
    id: 204,
    slug: "calculating-roi-decoupling-wordpress",
    title: {
      rendered:
        "Calculating the ROI of Decoupling Your WordPress Frontend",
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
  {
    id: 205,
    slug: "introducing-blogitems-web-starter-kit",
    title: {
      rendered:
        "Introducing BlogItems Web Starter Kit: High-Speed Web Infrastructure",
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
  {
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
];

export default async function JournalPage() {
  let posts: Post[] = [];

  try {
    posts = await getAllPosts();
  } catch {
    posts = FALLBACK_POSTS;
  }

  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div>
      {/* Blog Journal Hero Header */}
      <BlogHeader />

      {/* Main Blog Content Feed */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16">
        {/* Featured Article Card */}
        {featuredPost && <FeaturedPostCard post={featuredPost} />}

        {/* 3-Column Blog Grid */}
        {gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        <Pagination />
      </div>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
