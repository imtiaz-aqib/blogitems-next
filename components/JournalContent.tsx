"use client";

import { useSearchParams } from "next/navigation";
import { Post } from "@/lib/wordpress";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface JournalContentProps {
  posts: Post[];
}

export default function JournalContent({ posts }: JournalContentProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const pageSize = 6;

  const totalPosts = posts.length;
  let featuredPost: Post | null = null;
  let gridPosts: Post[] = [];

  if (currentPage === 1 && posts.length > 0) {
    featuredPost = posts[0] || null;
    gridPosts = posts.slice(1, 1 + pageSize);
  } else {
    featuredPost = null;
    const startIndex = (currentPage - 1) * pageSize;
    gridPosts = posts.slice(startIndex, startIndex + pageSize);
    if (gridPosts.length === 0 && posts.length > 0) {
      gridPosts = posts.slice(0, pageSize);
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-16">
      {/* Featured Article Card (Page 1 Only) */}
      {featuredPost && <FeaturedPostCard post={featuredPost} />}

      {/* 3-Column Blog Grid */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post, idx) => (
            <PostCard key={post?.id || post?.slug || idx} post={post} />
          ))}
        </div>
      )}

      {/* Dynamic Link-Based Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        pageSize={pageSize}
        baseUrl="/blog"
      />
    </div>
  );
}
