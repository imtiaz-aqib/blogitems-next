import { Suspense } from "react";
import { getAllPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import JournalContent from "@/components/JournalContent";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The BlogItems Journal | Modern Web Engineering & Headless CMS Insights",
  description:
    "Explore in-depth technical guides, Headless WordPress architecture tutorials, Core Web Vitals optimization techniques, and Next.js 16 best practices.",
};

const FALLBACK_POSTS: Post[] = [
  {
    id: 107,
    slug: "5-talks-at-kubecon-japan-im-looking-forward-to",
    title: { rendered: "5 Talks at KubeCon Japan I'm Looking Forward To" },
    excerpt: {
      rendered: "Key Kubernetes and cloud native insights from KubeCon Japan including serverless edge architectures.",
    },
    content: {
      rendered: "<p>KubeCon Japan is around the corner...</p>",
    },
    date: { rendered: "2026-08-16T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
          alt_text: "KubeCon Japan Guide",
        },
      ],
      author: [{ name: "BlogItems Editorial" }],
    },
  },
  {
    id: 106,
    slug: "enterprise-headless-wordpress-setup-completed",
    title: { rendered: "Enterprise Headless WordPress Setup Completed" },
    excerpt: {
      rendered: "Complete enterprise headless setup guide featuring Vercel Edge caching and Next.js App Router.",
    },
    content: {
      rendered: "<p>Deploying enterprise headless setups requires careful planning...</p>",
    },
    date: { rendered: "2026-08-16T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          alt_text: "Enterprise Headless Setup",
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
        <JournalContent posts={posts} />
      </Suspense>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
