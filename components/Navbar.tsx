"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[min(960px,calc(100vw-32px))] z-50 transition-all">
      <nav
        aria-label="Main navigation"
        className={`bg-[#fafafd]/95 backdrop-blur-md border border-[#e4e3fd]/80 shadow-[0_4px_24px_rgba(35,33,65,0.08)] px-5 h-[60px] flex items-center justify-between ${
          mobileOpen ? "rounded-t-2xl border-b-transparent" : "rounded-2xl"
        }`}
      >
        {/* Brand Logo - BlogItems */}
        <Link href="/" className="flex items-center gap-2 font-[var(--font-display)] font-bold text-lg text-[#232141] hover:opacity-90">
          <div className="w-8 h-8 rounded-lg bg-[#756df3] flex items-center justify-center text-white border border-[#232141]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h10" />
              <circle cx="18" cy="18" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="tracking-tight text-xl">BlogItems</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-[#333344]">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-[#756df3] hover:bg-[#e4e3fd] transition">
              Services
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-56 z-50">
                <div className="bg-white border border-[#e4e3fd] rounded-xl p-2 shadow-xl flex flex-col gap-1">
                  <Link href="/services/headless-cms" className="px-3 py-2 rounded-lg text-xs font-semibold text-[#232141] hover:bg-[#e4e3fd] hover:text-[#756df3]">
                    Headless CMS Architecture
                  </Link>
                  <Link href="/services/web-engineering" className="px-3 py-2 rounded-lg text-xs font-semibold text-[#232141] hover:bg-[#e4e3fd] hover:text-[#756df3]">
                    Next.js Web Engineering
                  </Link>
                  <Link href="/services/cloud-infrastructure" className="px-3 py-2 rounded-lg text-xs font-semibold text-[#232141] hover:bg-[#e4e3fd] hover:text-[#756df3]">
                    Cloud Infrastructure
                  </Link>
                  <Link href="/services/performance-audit" className="px-3 py-2 rounded-lg text-xs font-semibold text-[#232141] hover:bg-[#e4e3fd] hover:text-[#756df3]">
                    Core Web Vitals Audit
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/solutions" className={`px-3 py-1.5 rounded-lg transition ${pathname === "/solutions" ? "text-[#756df3] font-semibold bg-[#e4e3fd]/60" : "hover:text-[#756df3] hover:bg-[#e4e3fd]"}`}>
            Solutions
          </Link>
          <Link href="/showcase" className={`px-3 py-1.5 rounded-lg transition ${pathname === "/showcase" ? "text-[#756df3] font-semibold bg-[#e4e3fd]/60" : "hover:text-[#756df3] hover:bg-[#e4e3fd]"}`}>
            Showcase
          </Link>
          <Link href="/journal" className={`px-3 py-1.5 rounded-lg transition ${pathname === "/journal" ? "text-[#756df3] font-semibold bg-[#e4e3fd]/60" : "hover:text-[#756df3] hover:bg-[#e4e3fd]"}`}>
            Journal
          </Link>
          <Link href="/contact" className={`px-3 py-1.5 rounded-lg transition ${pathname === "/contact" ? "text-[#756df3] font-semibold bg-[#e4e3fd]/60" : "hover:text-[#756df3] hover:bg-[#e4e3fd]"}`}>
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/signin" className="text-xs font-semibold px-3 py-2 rounded-lg border border-[#e4e3fd] text-[#232141] hover:border-[#756df3] hover:text-[#756df3]">
            Sign in
          </Link>

          <Link href="/contact" className="ui-btn-primary text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1">
            Get Started &rarr;
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[#e4e3fd]"
        >
          <span className={`w-5 h-0.5 bg-[#232141] transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-[#232141] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-[#232141] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fafafd] border border-[#e4e3fd] border-t-0 rounded-b-2xl p-5 shadow-2xl flex flex-col gap-3">
          <Link href="/journal" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-[#756df3] py-2 border-b border-[#e4e3fd]">
            Journal (Blog)
          </Link>
          <Link href="/solutions" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-[#232141] py-2 border-b border-[#e4e3fd]">
            Solutions
          </Link>
          <Link href="/showcase" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-[#232141] py-2 border-b border-[#e4e3fd]">
            Showcase
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-[#232141] py-2 border-b border-[#e4e3fd]">
            Contact
          </Link>

          <div className="flex gap-2 mt-2">
            <Link href="/signin" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-xs font-semibold py-2.5 rounded-lg border border-[#232141] bg-white">
              Sign in
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex-1 text-center text-xs font-semibold py-2.5 rounded-lg ui-btn-primary">
              Get Started &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
