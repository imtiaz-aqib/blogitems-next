import type { Metadata } from "next";
import { Unbounded, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blogitems.com"),
  title: {
    default: "BlogItems Journal | Modern Web Engineering, Next.js & Headless CMS",
    template: "%s | BlogItems",
  },
  description:
    "Deep dives, field notes, and engineering guides on modern web development, Next.js 16, Headless WordPress, and cloud architecture from the BlogItems team.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BlogItems Journal | Modern Web Engineering",
    description:
      "Deep dives, field notes, and engineering guides on modern web development, Next.js 16, Headless WordPress, and cloud architecture.",
    url: "https://www.blogitems.com",
    siteName: "BlogItems",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlogItems Journal | Modern Web Engineering",
    description:
      "Deep dives, field notes, and engineering guides on modern web development, Next.js 16, Headless WordPress, and cloud architecture.",
    creator: "@blogitems",
    site: "@blogitems",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BlogItems",
    url: "https://www.blogitems.com",
    logo: "https://www.blogitems.com/favicon.ico",
    sameAs: [
      "https://x.com/blogitems",
      "https://www.linkedin.com/company/blogitems",
      "https://github.com/imtiaz-aqib/blogitems-next"
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
      className={`${unbounded.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#fafafd] text-[#000000]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
