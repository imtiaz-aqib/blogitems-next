# BlogItems System Architecture & Deployment Memory

## 🌐 Live Infrastructure Configuration
- **Primary Live Domain:** `https://www.blogitems.com` (Redirects apex `blogitems.com` -> `www.blogitems.com`)
- **Vercel Project:** `blogitems-next` / `nextprocoder`
- **GitHub Repository:** `https://github.com/imtiaz-aqib/blogitems-next` (Branch: `main`)
- **Local WordPress CMS:** `http://blogitems.local/wp-json/wp/v2`

## ⚙️ ExonHost DNS Configuration
- **NameServer Type:** `ExonHost Free DNS` (`earth.exonhost.com`, `mars.exonhost.com`, `neptune.exonhost.com`, `uranus.exonhost.com`)
- **A Record (`@`):** `216.198.79.1` (TTL 14400)
- **CNAME Record (`www`):** `aad85ade9bc6d482.vercel-dns-017.com` (TTL 14400)

## 🛡️ Security Policies & Rules
1. **HTML Sanitization:** All raw HTML content fetched from WordPress REST API MUST be sanitized using `DOMPurify.sanitize(rawHtml)` via `lib/wordpress.ts` before being rendered with `dangerouslySetInnerHTML`.
2. **Cloud Build Resilience:** All `fetch()` calls to WordPress API must use `AbortSignal.timeout(3000)` and fail-fast cloud checks to prevent Vercel build hangs.
3. **Environment Security:** Sensitive credentials and `.env*` files MUST remain in `.gitignore` and never committed to GitHub.
4. **Automated Live Deployment:** Updates are deployed to live production by running `npm run deploy:live` (Git commit + GitHub push -> Vercel auto-trigger).
