import Link from "next/link";
import Image from "next/image";
import HeroLottie from "@/components/HeroLottie";
import { getAllPosts, Post, formatPostDate, calculateReadingTime } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlogItems | High-Speed Developer Infrastructure for Web Platforms",
  description:
    "Build cloud-native web applications better and faster with BlogItems. Run Headless Next.js App Router against WordPress REST APIs with sub-second performance.",
};

const FALLBACK_POSTS: Post[] = [
  {
    id: 201,
    slug: "optimize-nextjs-headless-wordpress",
    title: { rendered: "How To Optimize Next.js 16 App Router for Headless WordPress" },
    excerpt: {
      rendered:
        "Five distinct architectural strategies to achieve sub-second page loads, instant ISR revalidation, and zero layout shift.",
    },
    content: {
      rendered: "<p>Decoupling WordPress with Next.js 16 App Router allows developers...</p>",
    },
    date: { rendered: "2026-08-12T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          alt_text: "Next.js & WordPress Architecture",
        },
      ],
      author: [{ name: "BlogItems Editorial" }],
    },
  },
  {
    id: 202,
    slug: "build-vs-buy-headless-cms-infrastructure",
    title: {
      rendered: "Build vs Buy Your Headless CMS Content Infrastructure",
    },
    excerpt: {
      rendered:
        "Evaluating custom API gateways versus native WordPress REST API integration for enterprise web platforms.",
    },
    content: {
      rendered: "<p>Choosing between building a custom CMS from scratch...</p>",
    },
    date: { rendered: "2026-08-04T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
          alt_text: "Headless Infrastructure",
        },
      ],
      author: [{ name: "BlogItems Team" }],
    },
  },
  {
    id: 203,
    slug: "web-vitals-performance-guide",
    title: {
      rendered: "5 Web Performance Best Practices to Maximize Core Web Vitals",
    },
    excerpt: {
      rendered:
        "How to minimize LCP, eliminate CLS layout shifts, and reduce Total Blocking Time in modern React applications.",
    },
    content: {
      rendered: "<p>Core Web Vitals directly impact search rankings...</p>",
    },
    date: { rendered: "2026-07-23T10:00:00" },
    _embedded: {
      "wp:featuredmedia": [
        {
          source_url:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
          alt_text: "Core Web Vitals",
        },
      ],
      author: [{ name: "BlogItems Team" }],
    },
  },
];

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    posts = await getAllPosts();
  } catch {
    posts = FALLBACK_POSTS;
  }

  if (!posts || posts.length === 0) {
    posts = FALLBACK_POSTS;
  }

  return (
    <div className="overflow-x-hidden bg-[#fafafd]">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative bg-[#756df3] ui-header-pattern text-white pt-28 md:pt-36 pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              The fastest path from <em className="not-italic text-[#ffcb7d]">WordPress</em> to production.
            </h1>

            <p className="text-base md:text-lg text-white/95 leading-relaxed mb-8 max-w-[600px]">
              <strong>BlogItems</strong> lets every engineering team and content creator test, build, and ship sub-second web applications powered by Headless WordPress REST APIs and Next.js 16 App Router.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/journal"
                className="bg-[#fafafd] text-[#000000] border border-[#232141] font-bold px-7 py-3.5 rounded-xl ui-card-shadow hover:bg-[#ffcb7d] hover:text-[#232141] transition-all text-sm"
              >
                Learn more about BlogItems
              </Link>
              <Link
                href="/contact"
                className="bg-[#5f58d6] text-white border border-white/30 font-semibold px-7 py-3.5 rounded-xl hover:bg-[#4a44b8] transition-all text-sm shadow-[4px_5px_#232141]"
              >
                Try it for free &rarr;
              </Link>
            </div>

            {/* Trusted By Customer Logos Bar */}
            <div className="w-full pt-6 border-t border-white/20">
              <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-white/60 mb-4">
                TRUSTED BY ENGINEERING TEAMS AT
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-90 text-xs font-bold text-white/90">
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Monday.com</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">SurveyMonkey</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Cadence</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Mercari</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Daylight Security</span>
              </div>
            </div>
          </div>

          {/* Right Hero Lottie Animation Banner */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroLottie />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: OUR PRODUCT ("WHAT IS BLOGITEMS")                               */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#fafafd] border-b border-[#d7d7d7]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="ui-badge-yellow mb-5">OUR PRODUCT</span>

            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] leading-[1.15] mb-6">
              Run local React code against live WordPress APIs.
            </h2>

            <p className="text-base text-[#000000] leading-relaxed mb-4 font-medium">
              BlogItems connects your local Next.js 16 development environment directly to your live WordPress REST API endpoints.
            </p>

            <p className="text-base text-[#333344] leading-relaxed mb-6">
              Test code changes, preview new blog themes, and validate Core Web Vitals performance instantly without deploying to staging or managing complex local databases.
            </p>

            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-bold text-[#888899] uppercase tracking-wider">Integrates with:</span>
              <span className="text-xs font-semibold bg-[#e4e3fd] text-[#232141] px-2.5 py-1 rounded-md border border-[#232141]">Next.js</span>
              <span className="text-xs font-semibold bg-[#ffcb7d] text-[#232141] px-2.5 py-1 rounded-md border border-[#232141]">WordPress API</span>
              <span className="text-xs font-semibold bg-[#e4e3fd] text-[#232141] px-2.5 py-1 rounded-md border border-[#232141]">Tailwind v4</span>
            </div>
          </div>

          {/* Product Diagram SVG Banner */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[500px] bg-white border-2 border-[#000000] rounded-2xl p-6 ui-card-shadow">
              <object
                data="/meet-mirrord-diagram-v10.svg"
                type="image/svg+xml"
                className="w-full h-auto"
                aria-label="BlogItems Product Diagram"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: QUOTATION & TESTIMONIAL BANNER                                 */}
      {/* ========================================================================= */}
      <section className="relative bg-[#ffe09b] border-b border-[#000000] py-16 md:py-24 text-[#000000]">
        {/* Top Wave Divider */}
        <div className="absolute top-[-19px] left-0 right-0 leading-none overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 1440 20" preserveAspectRatio="none" className="w-full h-[20px]">
            <path d="M0,10 Q360,0 720,10 T1440,10 L1440,20 L0,20 Z" fill="#ffe09b" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Cloud & Mascot Illustration */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative w-[220px] h-[220px]">
              <Image
                src="/cadence-mirrord.svg"
                alt="Cadence Mascot Illustration"
                fill
                className="object-contain z-10"
              />
              <div className="absolute -bottom-4 -left-6 w-24 h-16 z-20">
                <Image src="/cadence-cloud.svg" alt="Cloud" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Quote Content */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <blockquote className="font-[var(--font-display)] text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.35] tracking-tight mb-6">
              &ldquo;BlogItems has had as big of an <strong>impact on development productivity</strong> at Cadence as AI coding agents have.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#000000] bg-[#756df3] text-white flex items-center justify-center font-bold text-base">
                EH
              </div>
              <div>
                <div className="font-[var(--font-display)] font-bold text-base">Eric Hauser</div>
                <div className="text-xs text-[#333344] font-medium">Senior Platform &amp; Infrastructure Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHO IS IT FOR (PERSONAS GRID)                                 */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#f0f0fe] border-b border-[#d7d7d7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="ui-badge-yellow mb-4">WHO IT&apos;S FOR</span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] tracking-tight">
              Why teams choose BlogItems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Persona Card 1: Developers */}
            <div className="bg-white border-3 border-[#000000] rounded-[30px] p-8 md:p-10 shadow-[6px_7px_#232141] flex flex-col gap-6">
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[#000000]">Developers</h3>
              <p className="text-sm text-[#333344] leading-relaxed">
                Write code and know it works instantly. Run local React components against real WordPress REST API endpoints from your IDE or terminal. No deploys, no broken mocks. <strong>Real feedback in seconds.</strong>
              </p>

              {/* Nested Quote Pill */}
              <div className="bg-[#756df3] text-white border-2 border-[#000000] rounded-[24px] p-6 mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-white text-[#232141] font-bold flex items-center justify-center text-xs border border-[#000]">
                    GG
                  </div>
                  <div>
                    <div className="font-[var(--font-display)] font-bold text-sm">Giora Guttsait</div>
                    <div className="text-xs text-white/80">Software Engineer, Monday.com</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed">
                  &ldquo;When I am working with BlogItems, I don&apos;t have to compromise between speed and confidence. <strong>I get both.</strong>&rdquo;
                </p>
              </div>
            </div>

            {/* Persona Card 2: Platform Teams */}
            <div className="bg-white border-3 border-[#000000] rounded-[30px] p-8 md:p-10 shadow-[6px_7px_#232141] flex flex-col gap-6">
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[#000000]">Platform Teams</h3>
              <p className="text-sm text-[#333344] leading-relaxed">
                Stop managing per-developer staging environments. BlogItems lets your entire organization <strong>share one Headless CMS cluster</strong> with built-in sanitization and cache revalidation. <strong>Less infrastructure, less ops.</strong>
              </p>

              {/* Nested Quote Pill */}
              <div className="bg-[#ccc4ef] text-[#000000] border-2 border-[#000000] rounded-[24px] p-6 mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#232141] text-white font-bold flex items-center justify-center text-xs">
                    AG
                  </div>
                  <div>
                    <div className="font-[var(--font-display)] font-bold text-sm text-[#000]">Alon Gluzman</div>
                    <div className="text-xs text-[#333344]">Senior Platform Engineer, Daylight Security</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#000000]">
                  &ldquo;We&apos;re testing against the real environment before merging. That level of fidelity gives us <strong>high confidence in every release.</strong>&rdquo;
                </p>
              </div>
            </div>

            {/* Persona Card 3: Engineering Leaders */}
            <div className="bg-white border-3 border-[#000000] rounded-[30px] p-8 md:p-10 shadow-[6px_7px_#232141] flex flex-col gap-6">
              <h3 className="font-[var(--font-display)] text-2xl font-bold text-[#000000]">Engineering Leaders</h3>
              <p className="text-sm text-[#333344] leading-relaxed">
                Your team ships faster when every change is validated against real infrastructure before it merges. BlogItems <strong>cuts the feedback loop from hours to seconds</strong>, so AI-generated code works the first time.
              </p>

              {/* Nested Quote Pill */}
              <div className="bg-[#ffe09b] text-[#000000] border-2 border-[#000000] rounded-[24px] p-6 mt-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#232141] text-white font-bold flex items-center justify-center text-xs">
                    CP
                  </div>
                  <div>
                    <div className="font-[var(--font-display)] font-bold text-sm text-[#000]">Craik Pyke</div>
                    <div className="text-xs text-[#333344]">VP Infrastructure, SurveyMonkey</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-[#000000]">
                  &ldquo;We are producing better code faster right now. Having BlogItems Headless Next.js architecture has facilitated it.&rdquo;
                </p>
              </div>
            </div>

            {/* Persona Card 4: Video Testimonial Card */}
            <div className="bg-[#2b2757] text-white border-3 border-[#000000] rounded-[30px] p-8 md:p-10 shadow-[6px_7px_#232141] flex flex-col justify-between">
              <div>
                <div className="font-[var(--font-display)] font-bold text-xl text-white mb-4">Monday.com Case Study</div>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 mb-4 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#fafafd] text-[#756df3] flex items-center justify-center shadow-lg border border-[#000] cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/90 leading-relaxed">
                From hundreds of complex dev environments to one unified Headless CMS platform with <strong>BlogItems</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: STAY UPDATED (FEATURED BLOG & DOCS BENTO GRID)                 */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#fafafd]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="ui-badge-yellow mb-4">STAY UPDATED</span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] tracking-tight">
              Guides and resources for building on Headless Next.js
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            {/* Bento Card 1: Featured Post from Journal */}
            {posts[0] && (
              <Link
                href={`/posts/${posts[0].slug}`}
                className="md:col-span-7 bg-[#2e2a5e] text-white rounded-2xl p-8 border-2 border-[#000000] ui-card-shadow flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full inline-block mb-4">
                    Journal Feature
                  </span>
                  <h3 className="font-[var(--font-display)] text-2xl font-bold text-white mb-3 group-hover:text-[#ffcb7d] transition-colors">
                    {posts[0]?.title?.rendered || "Featured Post"}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-6">
                    {(posts[0]?.excerpt?.rendered || "").replace(/<[^>]+>/g, "").slice(0, 140)}...
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60 pt-4 border-t border-white/10">
                  <span>{formatPostDate(posts[0]?.date?.rendered)} &middot; {calculateReadingTime(posts[0]?.content?.rendered)}</span>
                  <span className="font-bold text-[#ffcb7d] group-hover:translate-x-1 transition-transform">Read article &rarr;</span>
                </div>
              </Link>
            )}

            {/* Bento Card 2: Guide */}
            <Link
              href={`/posts/${posts[1]?.slug || "build-vs-buy-headless-cms-infrastructure"}`}
              className="md:col-span-5 bg-[#fff9e9] text-[#232141] rounded-2xl p-8 border-2 border-[#232141] ui-card-shadow flex flex-col justify-between group"
            >
              <div>
                <div className="text-3xl mb-3">🛠️</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ffcb7d] text-[#232141] px-3 py-1 rounded-full inline-block mb-4 border border-[#232141]">
                  Guide
                </span>
                <h3 className="font-[var(--font-display)] text-xl font-bold text-[#232141] mb-2 group-hover:text-[#756df3] transition-colors">
                  {posts[1]?.title?.rendered || "Build vs Buy Your Headless CMS Infrastructure"}
                </h3>
                <p className="text-xs text-[#333344] leading-relaxed mb-4">
                  Evaluating custom API gateways versus native WordPress REST API integration.
                </p>
              </div>
              <span className="text-xs font-bold text-[#756df3] group-hover:translate-x-1 transition-transform">Read guide &rarr;</span>
            </Link>

            {/* Bento Card 3: Performance */}
            {posts[2] && (
              <Link
                href={`/posts/${posts[2].slug}`}
                className="md:col-span-6 bg-[#ffe09b] text-[#232141] rounded-2xl p-8 border-2 border-[#232141] ui-card-shadow flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#232141] text-white px-3 py-1 rounded-full inline-block mb-4">
                    Performance
                  </span>
                  <h3 className="font-[var(--font-display)] text-xl font-bold text-[#232141] mb-3 group-hover:underline">
                    {posts[2]?.title?.rendered || "Performance Guide"}
                  </h3>
                  <p className="text-xs text-[#232141]/80 leading-relaxed mb-4">
                    {(posts[2]?.excerpt?.rendered || "").replace(/<[^>]+>/g, "").slice(0, 120)}...
                  </p>
                </div>
                <span className="text-xs font-bold text-[#232141]">Read article &rarr;</span>
              </Link>
            )}

            {/* Bento Card 4: Technical Docs */}
            <div className="md:col-span-6 bg-[#dedcff] text-[#232141] rounded-2xl p-8 border-2 border-[#756df3] ui-card-shadow flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">📚</div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#756df3] text-white px-3 py-1 rounded-full inline-block mb-4">
                  Docs
                </span>
                <h3 className="font-[var(--font-display)] text-xl font-bold text-[#232141] mb-2">
                  Headless Next.js 16 Starter Kit Documentation
                </h3>
                <p className="text-xs text-[#333344] leading-relaxed mb-4">
                  Hands-on walkthrough: connect your Next.js App Router project to WordPress REST API in minutes.
                </p>
              </div>
              <Link href="/journal" className="text-xs font-bold text-[#756df3] hover:underline">
                Read docs &rarr;
              </Link>
            </div>
          </div>

          {/* Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/journal"
              className="text-xs font-semibold text-[#756df3] border border-[#756df3]/30 px-5 py-2.5 rounded-full hover:bg-[#756df3] hover:text-white transition-colors"
            >
              All blog posts &rarr;
            </Link>
            <Link
              href="/journal"
              className="text-xs font-semibold text-[#232141] border border-[#232141]/30 px-5 py-2.5 rounded-full hover:bg-[#232141] hover:text-white transition-colors"
            >
              All guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: GET STARTED (FINAL CTA BANNER - NO FAQ SECTION!)              */}
      {/* ========================================================================= */}
      <section className="relative bg-[#756df3] text-white py-20 md:py-32 overflow-hidden mx-auto w-[calc(100%-32px)] max-w-[1372px] rounded-t-3xl border-2 border-b-0 border-[#232141]">
        {/* Peek Character Illustrations */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-28 md:w-44 pointer-events-none hidden md:block">
          <Image src="/cta-peek-left.svg" alt="Peek Mascot" width={180} height={180} />
        </div>
        <div className="absolute right-0 top-8 w-24 md:w-36 pointer-events-none hidden md:block">
          <Image src="/cta-peek-right.svg" alt="Peek Mascot" width={140} height={140} />
        </div>

        <div className="max-w-[860px] mx-auto px-6 text-center relative z-10">
          <span className="ui-badge-yellow text-[#232141] mb-6">GET STARTED</span>

          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Give your team the fastest dev loop in the cloud.
          </h2>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-[600px] mx-auto">
            Join thousands of developers building on Headless Next.js &amp; WordPress. Free to start. No credit card required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              href="/contact"
              className="bg-white text-[#000000] border-2 border-[#232141] font-bold px-8 py-4 rounded-xl shadow-[4px_5px_#232141] hover:bg-[#ffcb7d] hover:text-[#232141] transition-all text-base"
            >
              Try Free! No Card Required
            </Link>
            <Link
              href="/contact"
              className="bg-[#5f58d6] text-white border border-white/40 font-semibold px-8 py-4 rounded-xl shadow-[4px_5px_#9e99f7] hover:bg-[#4a44b8] transition-all text-base"
            >
              Book a Demo
            </Link>
          </div>

          <Link href="/journal" className="text-xs text-white/70 hover:text-white transition-colors underline">
            Read the docs &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}