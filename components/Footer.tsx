import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#232141] text-white pt-16 pb-8 px-6 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {/* Brand Info */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2 font-[var(--font-display)] font-bold text-lg text-white mb-3">
                <div className="w-7 h-7 rounded-lg bg-[#756df3] flex items-center justify-center text-white border border-white/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                    <circle cx="18" cy="18" r="2" fill="currentColor" />
                  </svg>
                </div>
                <span className="tracking-tight">BlogItems</span>
              </Link>
              <p className="text-xs text-white/70 leading-relaxed mb-5 max-w-[240px]">
                Modern web engineering &amp; Headless CMS solutions.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2 mb-6">
                <a
                  href="https://github.com/shovoalways/wordpress-next"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/25 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.091.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/25 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/25 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433A2.062 2.062 0 013.274 5.368a2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex gap-2">
              <span className="text-[10px] font-semibold text-white/70 border border-white/25 px-2.5 py-1 rounded">
                SOC 2
              </span>
              <span className="text-[10px] font-semibold text-white/70 border border-white/25 px-2.5 py-1 rounded">
                ISO 27001
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <div className="font-[var(--font-display)] text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              SERVICES
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/services/headless-cms" className="hover:text-white transition">
                  Headless CMS Setup
                </Link>
              </li>
              <li>
                <Link href="/services/web-engineering" className="hover:text-white transition">
                  Next.js App Router
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-infrastructure" className="hover:text-white transition">
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/services/performance-audit" className="hover:text-white transition">
                  Core Web Vitals Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <div className="font-[var(--font-display)] text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              COMPANY
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <div className="font-[var(--font-display)] text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              RESOURCES
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/" className="text-white font-medium hover:underline">
                  Journal &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-white transition">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Guides */}
          <div>
            <div className="font-[var(--font-display)] text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              GUIDES
            </div>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link href="/blog/enterprise-headless-wordpress-setup-completed" className="hover:text-white transition">
                  Headless WordPress Setup
                </Link>
              </li>
              <li>
                <Link href="/blog/5-talks-at-kubecon-japan-im-looking-forward-to" className="hover:text-white transition">
                  KubeCon Japan Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/office-hour" className="hover:text-white transition">
                  Latest Field Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex items-center justify-between text-xs text-white/50">
          <span>&copy; 2026 BlogItems Inc. All rights reserved.</span>
          <span>Powered by Next.js 16 &amp; Headless WordPress</span>
        </div>
      </div>
    </footer>
  );
}
