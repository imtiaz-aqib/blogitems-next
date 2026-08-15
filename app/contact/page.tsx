import { getPageBySlug, sanitizeHtml, Post } from "@/lib/wordpress";
import ContactFormSection from "@/components/ContactFormSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  let wpPage: Post | null = null;
  try {
    wpPage = await getPageBySlug("contact");
  } catch {
    // fallback
  }

  const title = wpPage?.title?.rendered || "Contact Us";
  const cleanDescription = wpPage?.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ||
    "Get in touch with BlogItems for Headless WordPress, Next.js 16 App Router engineering, and web performance audits.";

  return {
    title: `${title} | BlogItems`,
    description: cleanDescription,
  };
}

export default async function ContactPage() {
  let wpPage: Post | null = null;
  try {
    wpPage = await getPageBySlug("contact");
  } catch {
    // offline fallback
  }

  const pageTitle = wpPage?.title?.rendered || "Let's Build Something Fast Together";
  const wpContentHtml = wpPage?.content?.rendered ? sanitizeHtml(wpPage.content.rendered) : "";

  return (
    <div className="pt-[100px]">
      {/* Hero Header Synced with WP Admin Page */}
      <section className="relative ui-header-pattern py-12 md:py-16 text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center max-w-[760px]">
          <span className="ui-badge-yellow mb-4">Contact BlogItems</span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageTitle) }}
          />
          
          {wpContentHtml ? (
            <div
              className="prose prose-lg max-w-none text-white/90 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: wpContentHtml }}
            />
          ) : (
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Have a project in mind, need a Headless CMS consultation, or want to audit your Next.js application speed? Reach out to our engineering team.
            </p>
          )}
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactFormSection />

      {/* Frequently Asked Questions Section */}
      <FaqSection />

      {/* Bottom CTA Banner */}
      <CtaSection />
    </div>
  );
}
