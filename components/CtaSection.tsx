import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative">
      {/* Top Wave SVG Divider */}
      <div className="w-full overflow-hidden leading-none -mb-1" aria-hidden="true">
        <svg viewBox="0 0 1464 25" preserveAspectRatio="none" className="w-full h-[25px]">
          <path d="M0 12.5Q45.75 0 91.5 12.5T183 12.5T274.5 12.5T366 12.5T457.5 12.5T549 12.5T640.5 12.5T732 12.5T823.5 12.5T915 12.5T1006.5 12.5T1098 12.5T1189.5 12.5T1281 12.5T1372.5 12.5T1464 12.5V25H0Z" fill="#756df3" />
        </svg>
      </div>

      {/* Purple Call-to-action Section */}
      <div className="bg-[#756df3] text-white py-16 md:py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-[720px] mx-auto relative z-10">
          <span className="ui-badge-yellow mb-6">BlogItems Platform</span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Build Faster, Scale Smarter
          </h2>

          <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8">
            Empowering modern engineering teams with Headless CMS solutions, Next.js App Router, and high-performance cloud web architecture.
          </p>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-[#fafafd] text-[#000000] border-1.5 border-[#232141] font-bold text-base px-7 py-3.5 rounded-xl shadow-[4px_5px_#232141] hover:bg-[#ffcb7d] hover:-translate-y-0.5 hover:shadow-[6px_7px_#232141] transition-all"
            >
              Explore BlogItems Solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
