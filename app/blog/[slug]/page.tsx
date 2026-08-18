import { getPostBySlug, getAllPosts, formatPostDate, calculateReadingTime, sanitizeHtml, Post } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

export const revalidate = 10;
export const dynamicParams = true;

const FALLBACK_POSTS_MAP: Record<string, Post> = {
  "office-hour": {
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
  "5-talks-at-kubecon-japan-im-looking-forward-to": {
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
  "enterprise-headless-wordpress-setup-completed": {
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
};

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    if (posts && posts.length > 0) {
      return posts.map((post) => ({ slug: post.slug }));
    }
  } catch {
    // fallback
  }

  return Object.keys(FALLBACK_POSTS_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // ignore
  }

  if (!post && FALLBACK_POSTS_MAP[slug]) {
    post = FALLBACK_POSTS_MAP[slug];
  }

  if (!post) {
    return {
      title: "Blog Article | BlogItems Journal",
    };
  }

  const cleanDescription = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]+>/g, "").trim()
    : "";
  const postTitle = post.title?.rendered || "Blog Article";
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: `${postTitle} | BlogItems Journal`,
    description: cleanDescription,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${postTitle} | BlogItems Journal`,
      description: cleanDescription,
      url: `https://www.blogitems.com/blog/${slug}`,
      type: "article",
      images: featuredImage ? [{ url: featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${postTitle} | BlogItems Journal`,
      description: cleanDescription,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // fallback if API is unreachable
  }

  if (!post && FALLBACK_POSTS_MAP[slug]) {
    post = FALLBACK_POSTS_MAP[slug];
  }

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.["author"]?.[0]?.name || "BlogItems Editorial";
  const dateFormatted = formatPostDate(post.date?.rendered || (post as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(post.content?.rendered);
  const postTitle = post.title?.rendered || "Blog Article";

  return (
    <article className="pt-[100px]">
      {/* Post Header Hero Banner */}
      <div className="ui-header-pattern py-12 md:py-16 px-6 border-b border-[#000000]">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffcb7d] hover:underline mb-6"
          >
            &larr; Back to all articles
          </Link>

          <span className="ui-badge-yellow block mb-4">BlogItems Article</span>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(postTitle) }}
          />

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/90 font-medium pt-4 border-t border-white/20">
            <span>Posted {dateFormatted}</span>
            <span>&middot;</span>
            <span>By <strong className="text-[#ffcb7d]">{authorName}</strong></span>
            <span>&middot;</span>
            <span className="bg-[#ffcb7d]/50 px-2 py-0.5 rounded text-[#232141] font-semibold">{readingTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[800px] mx-auto px-6 py-12">
        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-[320px] md:h-[450px] mb-10 rounded-2xl overflow-hidden border border-[#000000] ui-card-shadow">
            <Image
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || postTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rendered WordPress HTML Content */}
        <div
          className="prose prose-lg max-w-none text-[#333344] leading-relaxed font-sans"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content?.rendered || "") }}
        />
      </div>

      {/* CTA Section */}
      <CtaSection />
    </article>
  );
}
