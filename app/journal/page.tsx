import { Suspense } from "react";
import { getAllPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import JournalContent from "@/components/JournalContent";
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

export default async function JournalPage() {
  let posts: Post[] = [];

  try {
    posts = await getAllPosts();
  } catch {
    posts = FALLBACK_POSTS;
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  return (
    <div>
      {/* Blog Journal Hero Header */}
      <BlogHeader />

      {/* Main Blog Content Feed with Suspense-wrapped real-time JournalContent */}
      <Suspense fallback={<div className="max-w-[1200px] mx-auto px-6 py-20 text-center text-[#888899]">Loading journal posts...</div>}>
        <JournalContent initialPosts={posts} />
      </Suspense>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
