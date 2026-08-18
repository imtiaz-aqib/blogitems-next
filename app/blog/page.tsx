import { Suspense } from "react";
import { getAllPosts, Post } from "@/lib/wordpress";
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
    "id": 124,
    "slug": "office-hour",
    "title": {
      "rendered": "Office Hour"
    },
    "excerpt": {
      "rendered": "<p>hghu jjghj jjjj jj u uu j</p>\n"
    },
    "content": {
      "rendered": "\n<p class=\"wp-block-paragraph\">hghu</p>\n\n\n\n<p class=\"wp-block-paragraph\">jjghj</p>\n\n\n\n<p class=\"wp-block-paragraph\">jjjj</p>\n\n\n\n<p class=\"wp-block-paragraph\"></p>\n\n\n\n<p class=\"wp-block-paragraph\">jj</p>\n\n\n\n<p class=\"wp-block-paragraph\">u</p>\n\n\n\n<p class=\"wp-block-paragraph\">uu</p>\n\n\n\n<p class=\"wp-block-paragraph\">j</p>\n\n\n\n<p class=\"wp-block-paragraph\"></p>\n"
    },
    "date": {
      "rendered": "2026-08-17T07:58:04"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 107,
    "slug": "5-talks-at-kubecon-japan-im-looking-forward-to",
    "title": {
      "rendered": "5 Talks at KubeCon Japan I&#8217;m Looking Forward To"
    },
    "excerpt": {
      "rendered": "<p>KubeCon + CloudNativeCon Japan is back for its second year, this time in Yokohama, after last year’s Tokyo edition sold out with 1,500 attendees. It’ll be my first time attending, and in my excitement I’ve already combed through the entire schedule in detail. There are some genuinely interesting talks lined up, and in this blog [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "\n<p class=\"wp-block-paragraph\">KubeCon + CloudNativeCon Japan is back for its second year, this time in Yokohama, after last year’s Tokyo edition sold out with 1,500 attendees. It’ll be my first time attending, and in my excitement I’ve already combed through the entire schedule in detail. There are some genuinely interesting talks lined up, and in this blog I’ll share five that I’m particularly excited about.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:35:32"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 106,
    "slug": "enterprise-headless-wordpress-setup-completed",
    "title": {
      "rendered": "Enterprise Headless WordPress Setup Completed"
    },
    "excerpt": {
      "rendered": "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation.</p>\n"
    },
    "content": {
      "rendered": "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation. Enjoy instant real-time publishing and sub-second page loads globally!</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:32:32"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  }
];

export default async function BlogPage() {
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
      <Suspense fallback={<div className="max-w-[1200px] mx-auto px-6 py-20 text-center text-[#888899]">Loading blog posts...</div>}>
        <JournalContent posts={posts} />
      </Suspense>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Bottom Call To Action Banner */}
      <CtaSection />
    </div>
  );
}
