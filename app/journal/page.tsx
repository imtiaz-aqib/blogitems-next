import { Suspense } from "react";
import { getAllPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import JournalContent from "@/components/JournalContent";
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

export default async function JournalPage() {
  let posts: Post[] = [];

  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
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
