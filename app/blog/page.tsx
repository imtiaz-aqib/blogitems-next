import { Suspense } from "react";
import { getPaginatedPosts, Post } from "@/lib/wordpress";
import BlogHeader from "@/components/BlogHeader";
import JournalContent from "@/components/JournalContent";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The BlogItems Blog | Modern Web Engineering & Headless CMS Insights",
  description:
    "Explore in-depth technical guides, Headless WordPress architecture tutorials, Core Web Vitals optimization techniques, and Next.js 16 best practices.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "The BlogItems Blog | Modern Web Engineering",
    description:
      "Explore in-depth technical guides, Headless WordPress architecture tutorials, Core Web Vitals optimization techniques, and Next.js 16 best practices.",
    url: "https://www.blogitems.com/blog",
  },
};

const FALLBACK_POSTS: Post[] = [
  {
    id: 124,
    slug: "office-hour",
    title: {
      rendered: "Office Hour",
    },
    excerpt: {
      rendered: "<p>Engineering notes and discussions on headless WordPress architecture and Next.js 16 performance.</p>",
    },
    content: {
      rendered: "<p>Engineering notes and discussions on headless WordPress architecture and Next.js 16 performance.</p>",
    },
    date: {
      rendered: "2026-08-17T07:58:04",
    },
    _embedded: {
      "wp:featuredmedia": [],
      author: [
        {
          name: "imtiaz",
        },
      ],
    },
  },
  {
    id: 107,
    slug: "5-talks-at-kubecon-japan-im-looking-forward-to",
    title: {
      rendered: "5 Talks at KubeCon Japan I&#8217;m Looking Forward To",
    },
    excerpt: {
      rendered: "<p>KubeCon + CloudNativeCon Japan insights and architectural highlights.</p>",
    },
    content: {
      rendered: "<p>KubeCon + CloudNativeCon Japan insights and architectural highlights.</p>",
    },
    date: {
      rendered: "2026-08-16T18:35:32",
    },
    _embedded: {
      "wp:featuredmedia": [],
      author: [
        {
          name: "imtiaz",
        },
      ],
    },
  },
  {
    id: 106,
    slug: "enterprise-headless-wordpress-setup-completed",
    title: {
      rendered: "Enterprise Headless WordPress Setup Completed",
    },
    excerpt: {
      rendered: "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation.</p>",
    },
    content: {
      rendered: "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation. Enjoy instant real-time publishing and sub-second page loads globally!</p>",
    },
    date: {
      rendered: "2026-08-16T18:32:32",
    },
    _embedded: {
      "wp:featuredmedia": [],
      author: [
        {
          name: "imtiaz",
        },
      ],
    },
  },
];

export default async function BlogPage(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const rawPage = parseInt(searchParams.page || "1", 10);
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const pageSize = 6;

  let posts: Post[] = [];
  let totalPosts = 0;

  try {
    const paginated = await getPaginatedPosts(currentPage, pageSize);
    posts = paginated.posts;
    totalPosts = paginated.totalPosts;
  } catch {
    // fallback
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    posts = FALLBACK_POSTS;
    totalPosts = FALLBACK_POSTS.length;
  }

  return (
    <div>
      {/* Blog Journal Hero Header */}
      <BlogHeader />

      {/* Main Blog Content Feed with Server-Side Pagination */}
      <Suspense
        fallback={
          <div className="max-w-[1200px] mx-auto px-6 py-20 text-center text-[#888899]">
            Loading blog posts...
          </div>
        }
      >
        <JournalContent
          posts={posts}
          currentPage={currentPage}
          totalPosts={totalPosts}
          pageSize={pageSize}
        />
      </Suspense>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
