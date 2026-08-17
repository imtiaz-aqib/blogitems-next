import Link from "next/link";
import NotFoundLottie from "@/components/NotFoundLottie";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found | BlogItems",
  description: "The page you are looking for does not exist on BlogItems.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafafd] text-[#000000] flex flex-col justify-between font-[var(--font-sans)]">
      {/* Header Navigation */}
      <header className="w-full bg-[#756df3] border-b border-white/20 py-4 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <span className="bg-white text-[#756df3] px-2 py-0.5 rounded-lg text-sm font-black">
              B
            </span>
            BlogItems
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/journal"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="bg-white text-[#756df3] font-bold px-4 py-2 rounded-xl text-xs hover:bg-[#ffcb7d] hover:text-[#232141] transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </header>

      {/* 404 Hero Section */}
      <section className="relative flex-1 bg-[#756df3] ui-header-pattern text-white flex items-center py-16 px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 404 Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ffcb7d] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                404 PAGE NOT FOUND
              </span>
            </div>

            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Lost in space? <br />
              <span className="text-[#ffcb7d]">This route doesn&apos;t exist.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-[560px]">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let&apos;s get you back on track!
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="bg-[#fafafd] text-[#000000] border border-[#232141] font-bold px-7 py-3.5 rounded-xl ui-card-shadow hover:bg-[#ffcb7d] hover:text-[#232141] transition-all text-sm"
              >
                Return to Homepage &rarr;
              </Link>
              <Link
                href="/journal"
                className="bg-[#5f58d6] text-white border border-white/30 font-semibold px-7 py-3.5 rounded-xl hover:bg-[#4a44b8] transition-all text-sm shadow-[4px_5px_#232141]"
              >
                Browse Journal Articles
              </Link>
            </div>
          </div>

          {/* Right Column: Lottie 404 Animation */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <NotFoundLottie />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#1b1933] text-white/70 py-6 px-6 text-xs text-center border-t border-white/10">
        <p>&copy; {new Date().getFullYear()} BlogItems. All rights reserved.</p>
      </footer>
    </main>
  );
}
