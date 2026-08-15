# 🚀 Complete Blueprint: Building Modern Headless WordPress + Next.js Websites

> **A Step-by-Step Production Guide for AI-Assisted Pair Programming & Full-Stack Web Development**

---

## 📌 Executive Overview

This playbook documents the exact methodology, architecture, design system engineering, and implementation workflow used to build the **Headless WordPress + Next.js 16** web platform for **BlogItems** ([blogitems.com](https://blogitems.com)).

By following this step-by-step framework, you can build, scale, and replicate fast, SEO-friendly, and visual-heavy web applications for any client or project.

---

## ⚙️ Architectural Model

```text
┌──────────────────────────────────────┐
│        WordPress CMS (Backend)       │
│  - Posts, Pages, Media, Authors      │
│  - Admin Dashboard Management        │
│  - REST API: /wp-json/wp/v2/posts    │
└──────────────────┬───────────────────┘
                   │
                   │ JSON Data (REST API + _embed)
                   ▼
┌──────────────────────────────────────┐
│        Next.js 16 (Frontend UI)      │
│  - App Router & Server Components    │
│  - TypeScript Data Fetching (ISR)    │
│  - Tailwind CSS v4 & Custom Tokens   │
│  - Neo-Brutalist Card Shadows        │
│  - Dynamic SSG & SEO Metadata        │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│       Production Deployment          │
│  - Vercel / Netlify Hosting          │
│  - Instant Global CDN Distribution   │
└──────────────────────────────────────┘
```

---

## 📑 Phase-by-Phase Workflow

### Phase 1: Reference Extraction & Design Analysis
Before writing any code, analyze the target brand aesthetic or reference website:
1. **Typography:** Identify display/heading fonts (e.g. `Unbounded`) and body fonts (e.g. `Poppins`).
2. **Color Palette:**
   - Primary Accent: `#756DF3` (Purple)
   - Badge Accent: `#FFCB7D` (Yellow)
   - Hero Background: `#E4E3FD` (Soft Purple)
   - Dark Contrast: `#232141` (Navy)
   - Body Background: `#FAFAFD` (Off-white)
3. **Card Aesthetic:** Neo-brutalist 1px black border with offset solid drop shadows (`box-shadow: 4px 5px #232141`) and hover elevation (`translateY(-4px)`).
4. **Dividers & Waves:** Smooth SVG wave transitions between contrasting color sections.

---

### Phase 2: Environment Initialization & Configuration

1. **Initialize Project:**
   ```bash
   npx create-next-app@latest my-project --typescript --tailwind --eslint --app
   ```

2. **Configure Environment Variables (`.env.local`):**
   ```env
   WORDPRESS_API_URL=http://blogitems.local/wp-json/wp/v2
   ```

3. **Configure Image Security Patterns (`next.config.ts`):**
   Allows Next `<Image>` to render images from WordPress uploads and external CDN domains:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     images: {
       remotePatterns: [
         { protocol: "http", hostname: "blogitems.local" },
         { protocol: "http", hostname: "localhost" },
         { protocol: "https", hostname: "blogitems.com" },
         { protocol: "https", hostname: "images.unsplash.com" },
       ],
     },
   };

   export default nextConfig;
   ```

---

### Phase 3: Backend API Integration (`lib/wordpress.ts`)

Create a dedicated data fetching layer that interfaces with the WordPress REST API:

1. **TypeScript Interface:**
   ```typescript
   export interface Post {
     id: number;
     slug: string;
     title: { rendered: string };
     excerpt: { rendered: string };
     content: { rendered: string };
     date: { rendered: string };
     _embedded?: {
       'wp:featuredmedia'?: { source_url: string; alt_text: string }[];
       'author'?: { name: string }[];
     };
   }
   ```

2. **Fetching All Posts (with ISR revalidation):**
   ```typescript
   export async function getAllPosts(): Promise<Post[]> {
     const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts?_embed&per_page=12`, {
       next: { revalidate: 60 },
     });
     if (!res.ok) throw new Error("Failed to fetch posts");
     return res.json();
   }
   ```

3. **Fetching Single Post by Slug:**
   ```typescript
   export async function getPostBySlug(slug: string): Promise<Post | null> {
     const res = await fetch(`${process.env.WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
       next: { revalidate: 60 },
     });
     if (!res.ok) throw new Error("Failed to fetch post");
     const posts: Post[] = await res.json();
     return posts[0] ?? null;
   }
   ```

4. **Helper Utilities (Date Formatting & Reading Time & Sanitization):**
   ```typescript
   import DOMPurify from "isomorphic-dompurify";

   export function formatPostDate(dateString?: string): string {
     if (!dateString) return "Recent";
     const date = new Date(dateString);
     return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
   }

   export function calculateReadingTime(htmlContent?: string): string {
     if (!htmlContent) return "3 min read";
     const words = htmlContent.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
     return `${Math.ceil(words / 200)} min read`;
   }

   export function sanitizeHtml(rawHtml?: string): string {
     if (!rawHtml) return "";
     return DOMPurify.sanitize(rawHtml, { ADD_ATTR: ["target", "rel"] });
   }
   ```

---

### Phase 4: Design System & Styling Setup

1. **Google Fonts in `app/layout.tsx`:**
   ```typescript
   import { Unbounded, Poppins } from "next/font/google";

   const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"], weight: ["400", "700"] });
   const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600"] });

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" className={`${unbounded.variable} ${poppins.variable}`}>
         <body className="font-[var(--font-poppins)] bg-[#fafafd] text-black">
           <Navbar />
           <main>{children}</main>
           <Footer />
         </body>
       </html>
     );
   }
   ```

2. **Custom Utilities in `app/globals.css`:**
   ```css
   @import "tailwindcss";

   :root {
     --purple: #756df3;
     --yellow: #ffcb7d;
     --dark-navy: #232141;
   }

   .ui-card-shadow {
     box-shadow: 4px 5px #232141;
     transition: transform 0.15s ease, box-shadow 0.15s ease;
   }

   .ui-card-shadow:hover {
     transform: translateY(-4px);
     box-shadow: 6px 7px #232141;
   }

   .ui-badge-yellow {
     font-family: var(--font-unbounded), sans-serif;
     font-size: 11px;
     font-weight: 700;
     text-transform: uppercase;
     background-color: var(--yellow);
     border: 2px solid #232141;
     padding: 4px 13px;
     border-radius: 100px;
   }
   ```

---

### Phase 5: Reusable Modular Components

Break down the interface into focused components:

1. **`Navbar.tsx`:** Fixed header (`fixed top-4 left-1/2 -translate-x-1/2`), backdrop blur, BlogItems brand logo, dropdowns, actions, and mobile drawer toggle.
2. **`BlogHeader.tsx`:** Hero banner with diagonal stripes background, display title, clean vector SVG graphic, and SVG wave divider.
3. **`FeaturedPostCard.tsx`:** 2-column featured article card layout.
4. **`PostCard.tsx`:** 3-column grid card displaying image thumbnail, title, excerpt, date, and reading time.
5. **`Pagination.tsx`:** Page navigation bar with active page pills.
6. **`CtaSection.tsx`:** Bottom wave divider into a deep purple `#756DF3` call-to-action banner.
7. **`Footer.tsx`:** 5-column navy footer with brand tagline, social links, compliance badges (`SOC 2`, `ISO 27001`), resource directory, and copyright.

---

### Phase 6: Page Assembly & Dynamic SEO

1. **Homepage (`app/page.tsx`):**
   ```tsx
   export default async function HomePage() {
     const posts = await getAllPosts();
     const featuredPost = posts[0];
     const gridPosts = posts.slice(1);

     return (
       <div>
         <BlogHeader />
         <div className="max-w-[1200px] mx-auto px-6 py-12">
           <FeaturedPostCard post={featuredPost} />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {gridPosts.map((post) => (
               <PostCard key={post.id} post={post} />
             ))}
           </div>
           <Pagination />
         </div>
         <CtaSection />
       </div>
     );
   }
   ```

2. **Dynamic Single Post Page (`app/posts/[slug]/page.tsx`):**
   - Use `generateStaticParams()` to pre-render static HTML paths.
   - Use `generateMetadata()` for dynamic OpenGraph metadata and page titles.
   - Use `dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}` to render WordPress content safely with `.prose` typography styling.

---

### Phase 7: Verification & Build Check

Always run production build validation before completing:
```bash
cmd /c "npm run build"
```
Ensure:
- `✓ Compiled successfully`
- `✓ Running TypeScript ... Finished in X seconds`
- `✓ Generating static pages (16/16)`
- `0 errors, 0 lint warnings`

---

## 🛠️ Quick Reference Checklist for Future Projects

- [ ] Extract reference typography, color palette, and card shadow styles.
- [ ] Set up Next.js App Router with TypeScript & Tailwind CSS v4.
- [ ] Configure `.env.local` for backend REST API.
- [ ] Create `lib/wordpress.ts` with strong TypeScript interfaces and DOMPurify sanitization.
- [ ] Load Google Fonts in `layout.tsx` and define custom CSS utility classes.
- [ ] Build floating `Navbar` with mobile drawer and `Footer` with multi-column links.
- [ ] Build `BlogHeader` hero banner with wave SVG divider.
- [ ] Build 2-column `FeaturedPostCard` and 3-column `PostCard` grid.
- [ ] Connect `generateStaticParams()` and `generateMetadata()` on dynamic routes.
- [ ] Run `npm run build` to verify clean compilation with 0 errors.

---

*Created for BlogItems Web Architecture.*
