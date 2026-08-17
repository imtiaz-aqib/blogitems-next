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
    "id": 124,
    "slug": "office-hour",
    "title": {
      "rendered": "Office Hour"
    },
    "excerpt": {
      "rendered": "<p>hghu jjghj jjjj jj u uu j</p>\n"
    },
    "content": {
      "rendered": "\n<p class=\"wp-block-paragraph\">hghu</p>\n\n\n\n<p class=\"wp-block-paragraph\">jjghj</p>\n\n\n\n<p class=\"wp-block-paragraph\">jjjj</p>\n\n\n\n<p class=\"wp-block-paragraph\"></p>\n\n\n\n<p class=\"wp-block-paragraph\">jj</p>\n\n\n\n<p class=\"wp-block-paragraph\">u</p>\n\n\n\n<p class=\"wp-block-paragraph\">uu</p>\n\n\n\n<p class=\"wp-block-paragraph\">j</p>\n\n\n\n<p class=\"wp-block-paragraph\"></p>\n"
    },
    "date": {
      "rendered": "2026-08-17T07:58:04"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 107,
    "slug": "5-talks-at-kubecon-japan-im-looking-forward-to",
    "title": {
      "rendered": "5 Talks at KubeCon Japan I&#8217;m Looking Forward To"
    },
    "excerpt": {
      "rendered": "<p>KubeCon + CloudNativeCon Japan is back for its second year, this time in Yokohama, after last year’s Tokyo edition sold out with 1,500 attendees. It’ll be my first time attending, and in my excitement I’ve already combed through the entire schedule in detail. There are some genuinely interesting talks lined up, and in this blog [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "\n<p class=\"wp-block-paragraph\">KubeCon + CloudNativeCon Japan is back for its second year, this time in Yokohama, after last year’s Tokyo edition sold out with 1,500 attendees. It’ll be my first time attending, and in my excitement I’ve already combed through the entire schedule in detail. There are some genuinely interesting talks lined up, and in this blog I’ll share five that I’m particularly excited about.</p>\n\n\n\n<p class=\"wp-block-paragraph\">You’ll find us at the MetalBear booth (SU9) at KubeCon. If you’re using AI agents to generate code, you’re probably struggling with reviewing and testing all of it fast enough. We’ll show you how&nbsp;<a href=\"https://metalbear.com/mirrord/ai/\" target=\"_blank\" rel=\"noreferrer noopener\">mirrord</a>&nbsp;lets you not only test AI-generated code in production-like environments yourself, but also run autonomous agents that test their own code against a live Kubernetes cluster and iterate until it’s validated. And if that isn’t exciting enough, we’ll also have MetalBear-themed baseball cards for you to collect!</p>\n\n\n\n<figure class=\"wp-block-image\"><img decoding=\"async\" src=\"https://metalbear.com/blog/kubecon-japan-2026/baseball-cards.png\" alt=\"MetalBear-themed baseball cards featuring mirrord and Kubernetes stats\"/></figure>\n\n\n\n<h3 class=\"wp-block-heading\">Taming Billions of Rows: Data Lifecycle Management Lessons from a Cloud-Native Database Migration&nbsp;<a href=\"https://metalbear.com/blog/kubecon-japan-2026/#taming-billions-of-rows-data-lifecycle-management-lessons-from-a-cloud-native-database-migration\">#</a></h3>\n\n\n\n<p class=\"wp-block-paragraph\"><strong>Speaker</strong>: Ruslan Kadyrov (Mercari Inc.)<br><em>Jul 29 • 15:50–16:20 · 4F | 414+415</em></p>\n\n\n\n<p class=\"wp-block-paragraph\">Anyone who’s ever watched a database bill creep up every quarter knows that data doesn’t really go away, it just keeps piling up. That’s exactly the premise of this talk from our friends at Mercari.</p>\n\n\n\n<p class=\"wp-block-paragraph\">Ruslan’s going to walk through how one of Mercari’s core MySQL tables grew into the billions of rows, and how migrating to TiDB (a cloud-native distributed database) forced the team to confront a problem they hadn’t fully appreciated: old dormant records that nobody was actively using, driving up cost and migration risk.</p>\n\n\n\n<p class=\"wp-block-paragraph\">I’m especially curious about how they drew the line between “data we need to keep accessible” and “data we can quietly archive,” without breaking anything user-facing in the process. If you’re running anything at real scale, data lifecycle management is one of those things that’s easy to ignore until it becomes the most expensive line item on your infra bill, so this feels like a genuinely useful case study rather than just a “look how big our data is” talk.</p>\n\n\n\n<h3 class=\"wp-block-heading\">From 165 Days to 30 Minutes: Breaking Enterprise Silos with Platform Engineering&nbsp;<a href=\"https://metalbear.com/blog/kubecon-japan-2026/#from-165-days-to-30-minutes-breaking-enterprise-silos-with-platform-engineering\">#</a></h3>\n\n\n\n<p class=\"wp-block-paragraph\"><strong>Speakers</strong>: Aoi Nishijima, Moeka Okamura &amp; Kohei Yamamoto (JAL Digital Co., Ltd.)<br><em>Jul 29 • 17:10–17:40 · 3F | 315</em></p>\n\n\n\n<p class=\"wp-block-paragraph\">If there’s one thing we love here at MetalBear, it’s making cloud-native developers productive from Day 1. This talk had a similar goal which is why it caught my eye.</p>\n\n\n\n<p class=\"wp-block-paragraph\">JAL Digital had 4,000 engineers across 500 systems stuck behind 15 departments and 40+ forms just to get a new environment set up, which led to a 165-day lead time. This talk is about how they got that down to 30 minutes, not through a clever platform alone but through an actual cultural shift that involved mixing teams to kill the “us vs. them” dynamic, giving teams autonomy to pick their own tooling (Backstage, in their case), and deliberately going after small, high-friction wins first to build trust.</p>\n\n\n\n<p class=\"wp-block-paragraph\">I like that this is framed as an organizational story as much as a technical one. Anyone who’s tried to introduce a new tool or workflow into a large, process-heavy org and hit a wall of forms and approvals will probably recognize a lot of this, and I’m looking forward to learning how they pulled it off.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:35:32"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 106,
    "slug": "enterprise-headless-wordpress-setup-completed",
    "title": {
      "rendered": "Enterprise Headless WordPress Setup Completed"
    },
    "excerpt": {
      "rendered": "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation.</p>\n"
    },
    "content": {
      "rendered": "<p>Our Headless WordPress platform is now fully integrated with Next.js 16 App Router using On-Demand Server-Side Revalidation. Enjoy instant real-time publishing and sub-second page loads globally!</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:32:32"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 104,
    "slug": "are-your-beliefs-limiting-what-is-possible",
    "title": {
      "rendered": "Are your beliefs limiting what is possible?"
    },
    "excerpt": {
      "rendered": "<p>MindsetLifeLeadership 4 Jun https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FjyUZmTshfbU%3Ffeature%3Doembed&#038;display_name=YouTube&#038;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjyUZmTshfbU&#038;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FjyUZmTshfbU%2Fhqdefault.jpg&#038;key=61d05c9d54e8455ea7a9677c366be814&#038;type=text%2Fhtml&#038;schema=youtube In this video, Unbounded’s Martin Palethorpe delves into the profound impact that subconscious beliefs can have on our ability to achieve our goals and live the life we want.&nbsp; Drawing on recent work with a company aiming to turn around their business and hit some ambitious goals, Martin explores the hidden [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "\n<p class=\"wp-block-paragraph\"></p>\n\n\n\n<p class=\"wp-block-paragraph\"><a href=\"https://www.be-unbounded.com/blog-list/category/Mindset\">Mindset</a><a href=\"https://www.be-unbounded.com/blog-list/category/Life\">Life</a><a href=\"https://www.be-unbounded.com/blog-list/category/Leadership\">Leadership</a></p>\n\n\n\n<p class=\"wp-block-paragraph\">4 Jun</p>\n\n\n\n<p class=\"wp-block-paragraph\">https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FjyUZmTshfbU%3Ffeature%3Doembed&#038;display_name=YouTube&#038;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DjyUZmTshfbU&#038;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FjyUZmTshfbU%2Fhqdefault.jpg&#038;key=61d05c9d54e8455ea7a9677c366be814&#038;type=text%2Fhtml&#038;schema=youtube</p>\n\n\n\n<h3 class=\"wp-block-heading\">In this video, Unbounded’s Martin Palethorpe delves into the profound impact that subconscious beliefs can have on our ability to achieve our goals and live the life we want.&nbsp;</h3>\n\n\n\n<p class=\"wp-block-paragraph\">Drawing on recent work with a company aiming to turn around their business and hit some ambitious goals, Martin explores the hidden layers of our minds that influence our actions and outcomes.&nbsp;</p>\n\n\n\n<ul class=\"wp-block-list\">\n<li>What is your mind doing beneath the tasks you are trying to accomplish?</li>\n\n\n\n<li>What beliefs do you hold about your abilities in your work?</li>\n\n\n\n<li>How do these beliefs form and become ingrained in your behaviour?</li>\n\n\n\n<li>How can you identify and replace limiting beliefs to inspire success?</li>\n</ul>\n\n\n\n<p class=\"wp-block-paragraph\">Martin encourages viewers to examine their subconscious belief systems and consider how these may be holding them back. By becoming aware of these patterns, we can take steps to change them and unlock our full potential.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:19:25"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 100,
    "slug": "mastering-headless-wordpress-caching-and-revalidation-strategies-for-nextjs",
    "title": {
      "rendered": "Mastering Headless WordPress Caching &#038; Revalidation Strategies for Next.js"
    },
    "excerpt": {
      "rendered": "<p>Explore how Incremental Static Regeneration (ISR) and edge caching keep your Headless WordPress frontend blazingly fast and 100% resilient.</p>\n"
    },
    "content": {
      "rendered": "<p>Building a high-performance web platform with Headless WordPress and Next.js 16 requires a sophisticated caching strategy. While traditional WordPress relies on page-caching plugins like W3 Total Cache or WP Rocket, a decoupled Headless CMS architecture shifts caching logic to the edge layer.</p>\n<h2>1. The Challenge of Caching in Decoupled Systems</h2>\n<p>When you separate your frontend React layer from your backend WordPress CMS, traditional WordPress plugins can no longer flush your frontend cache directly. Every time a content editor updates a blog post or publishes a new article, the frontend must be notified to invalidate its static cache.</p>\n<h2>2. Static Site Generation (SSG) vs. Incremental Static Regeneration (ISR)</h2>\n<p>Pure SSG builds every page at compile time. While lightning fast, rebuilding 10,000 articles on every minor typo fix is impractical. Incremental Static Regeneration (ISR) solves this by allowing Next.js to regenerate static pages in the background while serving cached HTML instantly to users.</p>\n<h2>3. How 60-Second ISR Keeps Your Site 100% Reliable</h2>\n<p>By enforcing background ISR revalidation, your Next.js frontend serves cached pages in under 50 milliseconds while querying WordPress in the background every minute. This guarantees sub-second Core Web Vitals performance and eliminates server crashes during traffic spikes.</p>\n<h2>4. Summary &#038; Best Practices</h2>\n<ul>\n<li>Use edge caching with Next.js App Router for sub-50ms LCP times.</li>\n<li>Implement ISR revalidation to keep content fresh without manual rebuilds.</li>\n<li>Fallback gracefully to cached or structured data to guarantee 100% site uptime.</li>\n</ul>\n"
    },
    "date": {
      "rendered": "2026-08-16T18:14:19"
    },
    "_embedded": {
      "wp:featuredmedia": [],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 79,
    "slug": "the-ultimate-checklist-for-migrating-to-headless-wordpress",
    "title": {
      "rendered": "The Ultimate Checklist for Migrating to Headless WordPress"
    },
    "excerpt": {
      "rendered": "<p>Ready to upgrade your website performance to a Headless WordPress + Next.js stack? Follow this step-by-step checklist for a smooth migration. Migration Checklist ✅ Content Audit &#038; Export: Verify all existing blog posts, media attachments, and page routes. ✅ REST API Gateway Setup: Confirm WordPress REST API endpoints return clean JSON. ✅ Next.js App Router [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Ready to upgrade your website performance to a Headless WordPress + Next.js stack? Follow this step-by-step checklist for a smooth migration.</p>\n<h2 className=\"wp-block-heading\">Migration Checklist</h2>\n<ul>\n<li>✅ <strong>Content Audit &#038; Export:</strong> Verify all existing blog posts, media attachments, and page routes.</li>\n<li>✅ <strong>REST API Gateway Setup:</strong> Confirm WordPress REST API endpoints return clean JSON.</li>\n<li>✅ <strong>Next.js App Router Design System:</strong> Build clean, responsive React UI components.</li>\n<li>✅ <strong>ISR &#038; Revalidation Config:</strong> Set 10s revalidation timers for real-time publishing.</li>\n<li>✅ <strong>DOMPurify Security Integration:</strong> Enforce strict HTML sanitization.</li>\n<li>✅ <strong>DNS &#038; SSL Final Launch:</strong> Point A records to Vercel CDN for sub-second global speed.</li>\n</ul>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:44:07"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/migration-checklist.jpg",
          "alt_text": "The Ultimate Checklist for Migrating to Headless WordPress"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 78,
    "slug": "5-common-headless-wordpress-mistakes-and-how-to-avoid-them",
    "title": {
      "rendered": "5 Common Headless WordPress Mistakes (And How to Avoid Them)"
    },
    "excerpt": {
      "rendered": "<p>Decoupling your WordPress site is an exciting upgrade, but avoiding key technical pitfalls is essential for success. Here are the top 5 mistakes to avoid. 1. Forgetting Image Domain Restrictions Next.js requires explicit remotePatterns configuration in next.config.ts to serve external WordPress media safely. 2. Setting API Timeouts Too Short Remote REST API requests require adequate [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Decoupling your WordPress site is an exciting upgrade, but avoiding key technical pitfalls is essential for success. Here are the top 5 mistakes to avoid.</p>\n<h2 className=\"wp-block-heading\">1. Forgetting Image Domain Restrictions</h2>\n<p>Next.js requires explicit <code>remotePatterns</code> configuration in <code>next.config.ts</code> to serve external WordPress media safely.</p>\n<h2 className=\"wp-block-heading\">2. Setting API Timeouts Too Short</h2>\n<p>Remote REST API requests require adequate timeouts (e.g. 10s) to prevent cold-start build failures.</p>\n<h2 className=\"wp-block-heading\">3. Neglecting DOM Sanitization</h2>\n<p>Always sanitize raw HTML from WordPress using DOMPurify to prevent XSS vulnerabilities.</p>\n<h2 className=\"wp-block-heading\">4. Hardcoding Static Page Slugs</h2>\n<p>Use dynamic routes (<code>[slug]</code>) with <code>dynamicParams = true</code> to allow newly published blog posts to generate pages automatically.</p>\n<h2 className=\"wp-block-heading\">5. Skipping Core Web Vitals Audits</h2>\n<p>Verify your site performance regularly using Google PageSpeed Insights to maintain 95+ scores.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:44:05"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/headless-mistakes.jpg",
          "alt_text": "5 Common Headless WordPress Mistakes (And How to Avoid Them)"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 77,
    "slug": "how-incremental-static-regeneration-isr-works-in-plain-english",
    "title": {
      "rendered": "How Incremental Static Regeneration (ISR) Works in Plain English"
    },
    "excerpt": {
      "rendered": "<p>Incremental Static Regeneration (ISR) is one of the most powerful features in Next.js 16. Let&#8217;s explore how it works without the jargon. Static Speed + Dynamic Freshness In traditional static sites, whenever you edit a single typo in a blog post, you have to rebuild the entire website. On large sites with thousands of pages, [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Incremental Static Regeneration (ISR) is one of the most powerful features in Next.js 16. Let&#8217;s explore how it works without the jargon.</p>\n<h2 className=\"wp-block-heading\">Static Speed + Dynamic Freshness</h2>\n<p>In traditional static sites, whenever you edit a single typo in a blog post, you have to rebuild the entire website. On large sites with thousands of pages, that could take 20 minutes!</p>\n<p><strong>With ISR:</strong></p>\n<ul>\n<li>Next.js pre-renders static HTML pages for instant global speed.</li>\n<li>When you edit or publish a post in WordPress, Next.js re-renders <em>only that specific page</em> in the background within seconds!</li>\n<li>Your visitors get instant static speed without ever seeing stale content.</li>\n</ul>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:44:04"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/nextjs-isr-guide.jpg",
          "alt_text": "How Incremental Static Regeneration (ISR) Works in Plain English"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 76,
    "slug": "why-decoupled-headless-wordpress-is-practically-hack-proof",
    "title": {
      "rendered": "Why Decoupled Headless WordPress is Practically Hack-Proof"
    },
    "excerpt": {
      "rendered": "<p>Traditional WordPress sites are frequent targets for SQL injections, brute-force admin logins, and malicious plugin vulnerabilities. Decoupled architecture solves security at a fundamental level. 1. Total Database Isolation Public site visitors browse static HTML pre-rendered on Vercel&#8217;s CDN. They never connect directly to your WordPress PHP server or MySQL database! 2. DOMPurify XSS Protection All [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Traditional WordPress sites are frequent targets for SQL injections, brute-force admin logins, and malicious plugin vulnerabilities. Decoupled architecture solves security at a fundamental level.</p>\n<h2 className=\"wp-block-heading\">1. Total Database Isolation</h2>\n<p>Public site visitors browse static HTML pre-rendered on Vercel&#8217;s CDN. They never connect directly to your WordPress PHP server or MySQL database!</p>\n<h2 className=\"wp-block-heading\">2. DOMPurify XSS Protection</h2>\n<p>All HTML content fetched from the WordPress REST API is sanitized using <strong>DOMPurify</strong>, preventing malicious script injections before rendering in the browser.</p>\n<h2 className=\"wp-block-heading\">3. Hidden Admin Dashboards</h2>\n<p>Your WordPress admin URL can live on a private internal domain, rendering brute-force login attacks completely useless.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:44:02"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/hack-proof-security.jpg",
          "alt_text": "Why Decoupled Headless WordPress is Practically Hack-Proof"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 75,
    "slug": "step-by-step-how-content-editors-work-in-headless-wordpress",
    "title": {
      "rendered": "Step-by-Step: How Content Editors Work in Headless WordPress"
    },
    "excerpt": {
      "rendered": "<p>One common concern content writers have about going Headless is: &#8220;Will I have to learn how to code?&#8221; The answer is a resounding NO! Your Editorial Workflow Stays Exactly the Same Log In to WordPress: Access your familiar dashboard at wp-admin. Write with Gutenberg: Use heading blocks, paragraph blocks, quotes, and media galleries just like [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">One common concern content writers have about going Headless is: <em>&#8220;Will I have to learn how to code?&#8221;</em> The answer is a resounding <strong>NO!</strong></p>\n<h2 className=\"wp-block-heading\">Your Editorial Workflow Stays Exactly the Same</h2>\n<ol>\n<li><strong>Log In to WordPress:</strong> Access your familiar dashboard at <code>wp-admin</code>.</li>\n<li><strong>Write with Gutenberg:</strong> Use heading blocks, paragraph blocks, quotes, and media galleries just like before.</li>\n<li><strong>Set Featured Images &#038; Categories:</strong> Tag your post and upload high-res banner images.</li>\n<li><strong>Click Publish:</strong> That&#8217;s it! Next.js automatically fetches your update and publishes it live across global servers within seconds.</li>\n</ol>\n<h2 className=\"wp-block-heading\">The Best of Both Worlds</h2>\n<p>Writers get the friendly WordPress editing interface they know and love, while site visitors get a world-class, ultra-fast Next.js experience!</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:44:01"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/content-editors-workflow.jpg",
          "alt_text": "Step-by-Step: How Content Editors Work in Headless WordPress"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 74,
    "slug": "is-headless-wordpress-good-for-seo-aeo-geo-guide",
    "title": {
      "rendered": "Is Headless WordPress Good for SEO? (AEO &#038; GEO Guide)"
    },
    "excerpt": {
      "rendered": "<p>Search engines in 2026 are powered by advanced AI answer engines. Learn how Headless Next.js architecture elevates your SEO, AEO, and GEO strategy. 1. Lightning Fast Technical Signals Google explicitly prioritizes websites with low Total Blocking Time (TBT) and fast First Contentful Paint (FCP). Headless architecture guarantees top-tier technical signals. 2. Clean Semantic HTML for [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Search engines in 2026 are powered by advanced AI answer engines. Learn how Headless Next.js architecture elevates your SEO, AEO, and GEO strategy.</p>\n<h2 className=\"wp-block-heading\">1. Lightning Fast Technical Signals</h2>\n<p>Google explicitly prioritizes websites with low Total Blocking Time (TBT) and fast First Contentful Paint (FCP). Headless architecture guarantees top-tier technical signals.</p>\n<h2 className=\"wp-block-heading\">2. Clean Semantic HTML for AI Overviews</h2>\n<p>Generative AI engines (ChatGPT, Google Gemini) index clean, semantic HTML tags (h1, h2, article, schema markup). Next.js output is 100% clean and structured.</p>\n<h2 className=\"wp-block-heading\">3. Dynamic OpenGraph &#038; Meta Tags</h2>\n<p>Next.js automatically injects precise meta descriptions, social preview images, and structured JSON-LD schemas into page headers for perfect social sharing and rich search snippets.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:43:59"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/headless-seo-guide.jpg",
          "alt_text": "Is Headless WordPress Good for SEO? (AEO &#038; GEO Guide)"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 73,
    "slug": "how-headless-wordpress-makes-your-website-10x-faster",
    "title": {
      "rendered": "How Headless WordPress Makes Your Website 10x Faster"
    },
    "excerpt": {
      "rendered": "<p>Website speed is no longer optional—it is a core ranking factor for Google and a primary driver of user conversion rates. Here is how Headless WordPress achieves 10x faster load times. 1. Static Pre-Rendering (SSG) Instead of executing database queries every time a visitor opens a page, Next.js generates static HTML pages during build time. [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Website speed is no longer optional—it is a core ranking factor for Google and a primary driver of user conversion rates. Here is how Headless WordPress achieves 10x faster load times.</p>\n<h2 className=\"wp-block-heading\">1. Static Pre-Rendering (SSG)</h2>\n<p>Instead of executing database queries every time a visitor opens a page, Next.js generates static HTML pages during build time. Visitors get served instant HTML from edge nodes around the world.</p>\n<h2 className=\"wp-block-heading\">2. Automatic Image Optimization</h2>\n<p>Next.js automatically resizes, converts to WebP/AVIF format, and lazy-loads all images from WordPress, preventing layout shifts and saving mobile data bandwidth.</p>\n<h2 className=\"wp-block-heading\">3. Instant Client-Side Transitions</h2>\n<p>Navigating between articles feels as instantaneous as an app. Next.js pre-fetches linked pages in the background, making clicks feel instantaneous.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:43:57"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/10x-faster-website.jpg",
          "alt_text": "How Headless WordPress Makes Your Website 10x Faster"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 72,
    "slug": "traditional-wordpress-vs-headless-wordpress-which-one-should-you-choose",
    "title": {
      "rendered": "Traditional WordPress vs Headless WordPress: Which One Should You Choose?"
    },
    "excerpt": {
      "rendered": "<p>Should you stick with traditional monolithic WordPress or upgrade to a decoupled Headless Next.js stack? Here is a clear, honest comparison to guide your decision. Comparison Matrix Feature Traditional WordPress Headless WordPress (Next.js) Page Speed 2.5s – 5.0s (depends on plugins) &lt; 0.8s (Sub-second static) Security Risk Medium – High (PHP/SQL targets) Ultra-Low (Database isolated) [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Should you stick with traditional monolithic WordPress or upgrade to a decoupled Headless Next.js stack? Here is a clear, honest comparison to guide your decision.</p>\n<h2 className=\"wp-block-heading\">Comparison Matrix</h2>\n<table>\n<thead>\n<tr>\n<th>Feature</th>\n<th>Traditional WordPress</th>\n<th>Headless WordPress (Next.js)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>Page Speed</strong></td>\n<td>2.5s – 5.0s (depends on plugins)</td>\n<td><strong>&lt; 0.8s (Sub-second static)</strong></td>\n</tr>\n<tr>\n<td><strong>Security Risk</strong></td>\n<td>Medium – High (PHP/SQL targets)</td>\n<td><strong>Ultra-Low (Database isolated)</strong></td>\n</tr>\n<tr>\n<td><strong>Editor Experience</strong></td>\n<td>Native Gutenberg</td>\n<td><strong>Native Gutenberg (Identical)</strong></td>\n</tr>\n<tr>\n<td><strong>Custom Design</strong></td>\n<td>Limited by theme templates</td>\n<td><strong>100% Fluid &#038; Custom React</strong></td>\n</tr>\n</tbody>\n</table>\n<h2 className=\"wp-block-heading\">The Verdict</h2>\n<p>Choose <strong>Traditional WordPress</strong> if you run a simple personal blog with low traffic. Choose <strong>Headless WordPress</strong> if you run a business, agency, or publisher where speed, SEO rankings, and security directly drive revenue.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:43:56"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/traditional-vs-headless.jpg",
          "alt_text": "Traditional WordPress vs Headless WordPress: Which One Should You Choose?"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 71,
    "slug": "why-next-js-headless-wordpress-is-the-ultimate-web-combo",
    "title": {
      "rendered": "Why Next.js + Headless WordPress is the Ultimate Web Combo"
    },
    "excerpt": {
      "rendered": "<p>Combining Next.js 16 App Router with Headless WordPress gives you the superpower of enterprise performance alongside the world&#8217;s most popular content management system. 1. Sub-Second Core Web Vitals Google evaluates site speed using Core Web Vitals metrics like Largest Contentful Paint (LCP) and Interaction to Next Paint (INP). Next.js pre-renders pages at the edge, guaranteeing [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">Combining <strong>Next.js 16 App Router</strong> with <strong>Headless WordPress</strong> gives you the superpower of enterprise performance alongside the world&#8217;s most popular content management system.</p>\n<h2 className=\"wp-block-heading\">1. Sub-Second Core Web Vitals</h2>\n<p>Google evaluates site speed using Core Web Vitals metrics like Largest Contentful Paint (LCP) and Interaction to Next Paint (INP). Next.js pre-renders pages at the edge, guaranteeing 95+ Mobile performance scores.</p>\n<h2 className=\"wp-block-heading\">2. Instant Search Engine Indexing (SEO &#038; AEO)</h2>\n<p>Search engines and AI answer engines (ChatGPT, Perplexity, Google Overviews) demand instant, clean HTML. Next.js delivers static HTML that search bots can crawl instantly without waiting for client-side JavaScript execution.</p>\n<h2 className=\"wp-block-heading\">3. Zero Editor Friction</h2>\n<p>Your marketing team continues to write, edit, and schedule blog posts inside the familiar WordPress Gutenberg editor. No retraining required!</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:43:55"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/nextjs-ultimate-combo.jpg",
          "alt_text": "Why Next.js + Headless WordPress is the Ultimate Web Combo"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  },
  {
    "id": 70,
    "slug": "what-is-headless-wordpress-a-beginners-plain-english-guide",
    "title": {
      "rendered": "What is Headless WordPress? A Beginner&#8217;s Plain-English Guide"
    },
    "excerpt": {
      "rendered": "<p>If you&#8217;ve heard the term &#8220;Headless WordPress&#8221; floating around web development circles recently and wondered what on earth it means, you&#8217;re in the right place! In this beginner-friendly guide, we&#8217;ll break down decoupled architecture in plain English—no engineering degree required. Understanding Headless Architecture with a Simple Analogy Imagine a restaurant. In a traditional restaurant, the [&hellip;]</p>\n"
    },
    "content": {
      "rendered": "<p className=\"lead\">If you&#8217;ve heard the term <strong>&#8220;Headless WordPress&#8221;</strong> floating around web development circles recently and wondered what on earth it means, you&#8217;re in the right place! In this beginner-friendly guide, we&#8217;ll break down decoupled architecture in plain English—no engineering degree required.</p>\n<h2 className=\"wp-block-heading\">Understanding Headless Architecture with a Simple Analogy</h2>\n<p>Imagine a restaurant. In a traditional restaurant, the kitchen (where food is prepared) and the dining room (where food is served) are in the exact same building under one roof.</p>\n<p>In web terms, <strong>Traditional WordPress</strong> is that single building: WordPress handles both storing your blog text (the kitchen) and rendering the HTML pages that visitors see (the dining room).</p>\n<p><strong>Headless WordPress</strong> separates these two responsibilities:</p>\n<ul>\n<li><strong>The Backend (&#8220;Body&#8221;):</strong> WordPress stores your blog posts, images, and categories as raw data.</li>\n<li><strong>The Frontend (&#8220;Head&#8221;):</strong> A modern web framework like <strong>Next.js 16</strong> displays the website to visitors with lighting speed.</li>\n</ul>\n<h2 className=\"wp-block-heading\">Top 3 Benefits of Going Headless</h2>\n<ol>\n<li><strong>Blazing-Fast Speed:</strong> Next.js pre-renders pages into static HTML served by global CDNs in under 800ms.</li>\n<li><strong>Bank-Grade Security:</strong> Visitors never connect directly to your WordPress database, making PHP exploits impossible.</li>\n<li><strong>Total Design Freedom:</strong> Craft custom user interfaces without being constrained by rigid WordPress PHP themes.</li>\n</ol>\n<h2 className=\"wp-block-heading\">Is Headless Right for Your Business?</h2>\n<p>If site performance, SEO rankings, and security are top priorities for your brand, Headless WordPress provides the best of both worlds: familiar content editing in WordPress, paired with state-of-the-art Next.js frontend performance.</p>\n"
    },
    "date": {
      "rendered": "2026-08-16T17:43:53"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://aqib-xyz.stackstaging.com/wp-content/uploads/2026/08/headless-wordpress-guide.jpg",
          "alt_text": "What is Headless WordPress? A Beginner&#8217;s Plain-English Guide"
        }
      ],
      "author": [
        {
          "name": "imtiaz"
        }
      ]
    }
  }
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