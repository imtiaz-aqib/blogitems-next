import { getPaginatedPosts, Post } from "@/lib/wordpress";
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

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const pageSize = 6;

  // Fetch paginated posts directly from WordPress REST API
  const { posts, totalPosts } = await getPaginatedPosts(currentPage, pageSize);

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
