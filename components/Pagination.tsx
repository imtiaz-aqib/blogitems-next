import Link from "next/link";

interface PaginationProps {
  currentPage?: number;
  totalPosts?: number;
  pageSize?: number;
  baseUrl?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPosts = 10,
  pageSize = 6,
  baseUrl = "/journal",
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / pageSize);

  // If 1 or fewer pages, hide pagination cleanly
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 my-12" aria-label="Blog pagination">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-3.5 h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold bg-white text-[#232141] border border-[#000000] shadow-[2px_2px_#000000] hover:bg-[#ffcb7d] transition"
        >
          &larr; Prev
        </Link>
      )}

      {/* Page Number Buttons */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border border-[#000000] transition ${
              isActive
                ? "bg-[#756df3] text-white shadow-[2px_2px_#000000]"
                : "bg-white text-[#232141] hover:bg-[#ffcb7d] shadow-[2px_2px_#000000]"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-3.5 h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold bg-white text-[#232141] border border-[#000000] shadow-[2px_2px_#000000] hover:bg-[#ffcb7d] transition"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}
