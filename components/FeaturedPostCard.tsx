import Link from "next/link";
import Image from "next/image";
import { Post, formatPostDate, calculateReadingTime, sanitizeHtml } from "@/lib/wordpress";

export default function FeaturedPostCard({ post }: { post: Post }) {
  if (!post) return null;

  const featuredImg = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const altText = post?._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post?.title?.rendered || "Article Image";
  const authorName = post?._embedded?.["author"]?.[0]?.name || "BlogItems Editorial";
  const dateFormatted = formatPostDate(post?.date?.rendered || (post as unknown as Record<string, string>)?.date);
  const readingTime = calculateReadingTime(post?.content?.rendered);

  return (
    <div className="mb-12">
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#000000] rounded-2xl overflow-hidden ui-card-shadow">
          {/* Featured Image */}
          <div className="relative min-h-[260px] md:min-h-[340px] bg-[#e4e3fd] border-b md:border-b-0 md:border-r border-[#000000] overflow-hidden">
            {featuredImg ? (
              <Image
                src={featuredImg}
                alt={altText}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#756df3]/20 to-[#ffcb7d]/40">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-[#756df3]/60">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                </svg>
              </div>
            )}
          </div>

          {/* Featured Content */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <div>
              <span className="ui-badge-yellow mb-4">Featured Article</span>

              <h2
                className="text-2xl md:text-3xl font-bold text-[#000000] group-hover:text-[#756df3] transition-colors leading-tight mb-4"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.title?.rendered || "Article Title") }}
              />

              <div
                className="text-[#333344] text-sm md:text-base line-clamp-3 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.excerpt?.rendered || "") }}
              />
            </div>

            <div className="mt-auto pt-4 border-t border-[#e4e3fd] flex flex-wrap items-center justify-between text-xs text-[#888899]">
              <div>
                Posted <span className="font-semibold text-[#232141]">{dateFormatted}</span> by{" "}
                <span className="font-semibold text-[#756df3]">{authorName}</span> &middot; {readingTime}
              </div>

              <span className="font-semibold text-sm text-[#000000] group-hover:text-[#756df3] flex items-center gap-1 transition-colors mt-2 sm:mt-0">
                Read article &rarr;
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
