import Link from "next/link";
import Image from "next/image";
import { Post, formatPostDate, calculateReadingTime, sanitizeHtml } from "@/lib/wordpress";

export default function PostCard({ post }: { post: Post }) {
  if (!post) return null;

  const featuredImg = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const altText = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const dateFormatted = formatPostDate(post.date?.rendered || (post as unknown as Record<string, string>).date);
  const readingTime = calculateReadingTime(post.content?.rendered);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="bg-white border border-[#000000] rounded-2xl overflow-hidden ui-card-shadow flex flex-col h-full">
        {/* Card Thumbnail */}
        <div className="relative h-48 sm:h-52 w-full bg-[#e4e3fd] border-b border-[#000000] overflow-hidden flex-shrink-0">
          {featuredImg ? (
            <Image
              src={featuredImg}
              alt={altText}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#756df3]/15 to-[#e4e3fd]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-[#756df3]/50">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
              </svg>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3
              className="text-lg font-bold text-[#000000] group-hover:text-[#756df3] transition-colors leading-snug mb-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.title?.rendered || "Article Title") }}
            />

            <div
              className="text-xs sm:text-sm text-[#333344] line-clamp-3 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.excerpt?.rendered || "") }}
            />
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-[#e4e3fd] flex items-center justify-between text-xs text-[#888899] mt-auto">
            <span>
              {dateFormatted} &middot; {readingTime}
            </span>

            <span className="font-semibold text-xs text-[#000000] group-hover:text-[#756df3] transition-colors">
              Read article &rarr;
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
