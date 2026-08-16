import { getPaginatedPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 5;

export const metadata: Metadata = {
  title: "The BlogItems Journal | Modern Web Engineering & Headless CMS Insights",
  description:
    "Explore in-depth technical guides, Headless WordPress architecture tutorials, Core Web Vitals optimization techniques, and Next.js 16 best practices.",
};

const FALLBACK_POSTS: Post[] = [
  {
    id: 201,
    slug: "what-is-headless-wordpress-a-beginners-plain-english-guide",
    title: { rendered: "What is Headless WordPress? A Beginner's Plain-English Guide" },
    excerpt: {
      rendered: "Discover what Headless WordPress is, how decoupling your content management from the frontend works, and why top engineering teams choose it for speed and security.",
    },
    content: {
      rendered: "<p>If you've heard the term Headless WordPress floating around...</p>",
    },
    date: { rendered: "2026-08-16T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
          alt_text: "Headless WordPress Guide",
        },
      ],
      author: [{ name: "BlogItems Editorial" }],
    },
  },
  {
    id: 202,
    slug: "why-next-js-headless-wordpress-is-the-ultimate-web-combo",
    title: { rendered: "Why Next.js + Headless WordPress is the Ultimate Web Combo" },
    excerpt: {
      rendered: "Learn why combining Next.js 16 App Router with Headless WordPress creates the ultimate high-speed web application platform.",
    },
    content: {
      rendered: "<p>Combining Next.js 16 App Router with Headless WordPress gives you...</p>",
    },
    date: { rendered: "2026-08-16T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          alt_text: "Next.js Ultimate Combo",
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
  let totalPosts = 0;

  try {
    const result = await getPaginatedPosts(currentPage, pageSize);
    posts = result.posts || [];
    totalPosts = result.totalPosts || posts.length;
  } catch {
    posts = FALLBACK_POSTS;
    totalPosts = FALLBACK_POSTS.length;
  }

  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS;
    totalPosts = FALLBACK_POSTS.length;
  }

  let featuredPost: Post | null = null;
  let gridPosts: Post[] = [];

  if (currentPage === 1 && posts.length > 0) {
    featuredPost = posts[0];
    gridPosts = posts.slice(1);
  } else {
    featuredPost = null;
    gridPosts = posts;
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
        <Pagination
          currentPage={currentPage}
          totalPosts={totalPosts}
          pageSize={pageSize}
          baseUrl="/journal"
        />
      </div>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
