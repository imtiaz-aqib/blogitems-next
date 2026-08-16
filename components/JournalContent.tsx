"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@/lib/wordpress";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface JournalContentProps {
  initialPosts: Post[];
}

export default function JournalContent({ initialPosts }: JournalContentProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const pageSize = 6;

  // Real-time client-side sync: Fetch fresh posts directly from WordPress on mount
  useEffect(() => {
    let isMounted = true;
    async function syncPosts() {
      try {
        setLoading(true);
        const res = await fetch("https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts?_embed&per_page=100", {
          cache: "no-store",
          headers: {
            "Accept": "application/json"
          }
        });
        if (res.ok) {
          const freshPosts = await res.json();
          if (isMounted && Array.isArray(freshPosts) && freshPosts.length > 0) {
            setPosts(freshPosts);
          }
        }
      } catch (e) {
        console.error("Client post sync error:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    syncPosts();
    return () => {
      isMounted = false;
    };
  }, []);

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
        baseUrl="/journal"
      />
    </div>
  );
}
