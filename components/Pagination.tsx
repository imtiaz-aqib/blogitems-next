export default function Pagination() {
  return (
    <nav className="flex items-center justify-center gap-2 my-12" aria-label="Blog pagination">
      <span className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold bg-[#756df3] text-white border border-[#756df3] shadow-sm">
        1
      </span>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold bg-white text-[#232141] border border-[#e4e3fd] hover:border-[#756df3] hover:text-[#756df3] hover:bg-[#756df3]/10 transition">
        2
      </button>
      <span className="px-1 text-sm font-semibold text-[#888899]">
        &hellip;
      </span>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold bg-white text-[#232141] border border-[#e4e3fd] hover:border-[#756df3] hover:text-[#756df3] hover:bg-[#756df3]/10 transition">
        5
      </button>
      <button className="px-4 h-10 rounded-lg flex items-center justify-center text-sm font-semibold bg-white text-[#232141] border border-[#e4e3fd] hover:border-[#756df3] hover:text-[#756df3] hover:bg-[#756df3]/10 transition">
        Next &rarr;
      </button>
    </nav>
  );
}
