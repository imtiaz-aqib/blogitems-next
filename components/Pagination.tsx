"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage?: number;
  totalPosts?: number;
  pageSize?: number;
  baseUrl?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPosts = 0,
  pageSize = 6,
  baseUrl = "/blog",
}: PaginationProps) {
  const safePageSize = Math.max(1, pageSize || 6);
  const safeTotalPosts = Math.max(0, totalPosts || 0);
  const totalPages = Math.min(50, Math.ceil(safeTotalPosts / safePageSize));

  // If 1 or fewer pages, hide pagination cleanly
  if (!isFinite(totalPages) || totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 my-12" aria-label="Blog pagination">
      {/* Previous Button */}
      {safeCurrentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${safeCurrentPage - 1}`}
          className="px-3.5 h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold bg-white text-[#232141] border border-[#000000] shadow-[2px_2px_#000000] hover:bg-[#ffcb7d] transition"
        >
          &larr; Prev
        </Link>
      )}

      {/* Page Number Buttons */}
      {pages.map((page) => {
        const isActive = page === safeCurrentPage;
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
      {safeCurrentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${safeCurrentPage + 1}`}
          className="px-3.5 h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold bg-white text-[#232141] border border-[#000000] shadow-[2px_2px_#000000] hover:bg-[#ffcb7d] transition"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}
