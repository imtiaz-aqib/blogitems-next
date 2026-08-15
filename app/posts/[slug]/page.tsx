import { getPostBySlug, getAllPosts, formatPostDate, calculateReadingTime, sanitizeHtml } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaSection from "@/components/CtaSection";

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [
      { slug: "optimize-nextjs-headless-wordpress" },
      { slug: "build-vs-buy-headless-cms-infrastructure" },
      { slug: "web-vitals-performance-guide" },
      { slug: "calculating-roi-decoupling-wordpress" },
      { slug: "introducing-blogitems-web-starter-kit" },
      { slug: "sub-second-page-load-case-study" },
    ];
  }
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
    // ignore fetch error
  }

  if (!post) {
    return {
      title: "Blog Article | BlogItems Journal",
    };
  }

  const cleanDescription = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim();

  return {
    title: `${post.title.rendered} | BlogItems Journal`,
    description: cleanDescription,
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

  if (!post) {
    notFound();
  }

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
  const authorName = post._embedded?.["author"]?.[0]?.name || "BlogItems Editorial";
  const dateFormatted = formatPostDate(post.date?.rendered || (post as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(post.content?.rendered);

  return (
    <article className="pt-[100px]">
      {/* Post Header Hero Banner */}
      <div className="ui-header-pattern py-12 md:py-16 px-6 border-b border-[#000000]">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#756df3] hover:underline mb-6"
          >
            &larr; Back to all articles
          </Link>

          <span className="ui-badge-yellow block mb-4">BlogItems Article</span>

          <h1
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000] mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }}
          />

          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#333344] font-medium pt-4 border-t border-[#000000]/15">
            <span>Posted {dateFormatted}</span>
            <span>&middot;</span>
            <span>By <strong className="text-[#756df3]">{authorName}</strong></span>
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
              alt={featuredImage.alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Rendered WordPress HTML Article */}
        <div
          className="prose prose-lg max-w-none text-[#333344] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
        />
      </div>

      {/* CTA Section */}
      <CtaSection />
    </article>
  );
}
