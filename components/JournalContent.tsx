import { Post } from "@/lib/wordpress";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";

interface JournalContentProps {
  posts: Post[];
  currentPage: number;
  totalPosts: number;
  pageSize: number;
}

export default function JournalContent({
  posts,
  currentPage,
  totalPosts,
  pageSize,
}: JournalContentProps) {
  let featuredPost: Post | null = null;
  let gridPosts: Post[] = [];

  if (currentPage === 1 && posts.length > 0) {
    featuredPost = posts[0] || null;
    gridPosts = posts.slice(1);
  } else {
    featuredPost = null;
    gridPosts = posts;
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
