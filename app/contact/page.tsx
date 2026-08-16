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
  return (
    <main className="pt-[100px] min-h-screen bg-[#fafafd]">
      <ContactFormSection />
    </main>
  );
}
