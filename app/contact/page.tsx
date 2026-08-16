import ContactFormSection from "@/components/ContactFormSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact Us | BlogItems",
    description:
      "Get in touch with BlogItems for Headless WordPress, Next.js 16 App Router engineering, and web performance audits.",
  };
}

export default async function ContactPage() {
  return (
    <main className="pt-[100px] min-h-screen bg-[#fafafd]">
      {/* 1. Main MetalBear Contact Chat & Form + Info Cards Grid */}
      <ContactFormSection />

      {/* 2. Frequently Asked Questions Section */}
      <FaqSection />

      {/* 3. Bottom CTA Banner ("Build Faster, Scale Smarter") */}
      <CtaSection />
    </main>
  );
}
