"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does Headless WordPress compare to traditional WordPress?",
    answer:
      "In a traditional setup, WordPress handles both content management and rendering PHP templates, which can slow down page speeds and expose database vulnerabilities. In a Headless architecture, WordPress is strictly used for content editing, while Next.js handles global rendering via statically pre-rendered React components. This yields 10x faster load times, sub-second navigation, and maximum security.",
  },
  {
    question: "How fast will my website load with Next.js 16 App Router?",
    answer:
      "With Next.js 16 Server Components and Vercel CDN edge distribution, pages typically achieve Largest Contentful Paint (LCP) under 800ms and 95+ Core Web Vitals performance scores across mobile and desktop devices.",
  },
  {
    question: "Can I still manage all blog posts, images, and categories in WordPress?",
    answer:
      "Yes! Your non-technical editors and marketing teams can continue using the familiar WordPress block editor, draft previews, media library, and categories. When a post is published, Next.js instantly fetches the updated data via the REST API.",
  },
  {
    question: "What security measures protect our website against malware and XSS?",
    answer:
      "Public visitors never connect directly to your WordPress PHP server or database. All rendered HTML content is sanitized using DOMPurify before mounting in the DOM, preventing XSS script injection, while image domains are locked down via Next.js remotePatterns.",
  },
  {
    question: "How does Incremental Static Regeneration (ISR) work?",
    answer:
      "ISR allows Next.js to pre-render static HTML pages in the background. When content changes in WordPress, Next.js automatically revalidates and refreshes the cached page (e.g. revalidate: 60s) without requiring a full site rebuild.",
  },
  {
    question: "What is the typical timeline for a BlogItems web platform build?",
    answer:
      "Standard Headless WordPress migrations and custom Next.js frontend builds typically take between 2 to 4 weeks depending on custom feature requirements, data migration volume, and custom design systems.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[#fffcf0] border-t border-[#f2edd9]">
      <div className="max-w-[960px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="ui-badge-yellow mb-4">Got Questions?</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-[#333344] max-w-[620px] mx-auto leading-relaxed">
            Everything you need to know about our Headless WordPress architecture, performance guarantees, and Next.js engineering workflow.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border border-[#000000] rounded-2xl overflow-hidden ui-card-shadow transition-all ${
                  isOpen ? "ring-2 ring-[#756df3]" : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-[#000000] hover:text-[#756df3] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{item.question}</span>

                  {/* Toggle Indicator Button */}
                  <div
                    className={`w-8 h-8 rounded-lg border border-[#000000] flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform ${
                      isOpen ? "bg-[#756df3] text-white rotate-180" : "bg-[#e4e3fd] text-[#232141]"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                {/* Collapsible Answer Drawer */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#e4e3fd] text-sm md:text-base text-[#333344] leading-relaxed bg-[#fafafd]/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom help card */}
        <div className="mt-12 text-center p-6 bg-[#e4e3fd] border border-[#232141] rounded-2xl ui-card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-base text-[#232141]">Have a custom question not answered here?</h4>
            <p className="text-xs text-[#333344]">Our engineering team is ready to review your project requirements.</p>
          </div>
          <a
            href="/contact"
            className="ui-btn-primary text-xs font-bold px-5 py-2.5 rounded-xl whitespace-nowrap"
          >
            Ask a Question &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
