const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function runComprehensiveAudit() {
  console.log('=====================================================');
  console.log('🚀 BLOGITEMS: ALL-IN-ONE SYSTEM AUDIT INITIALIZED');
  console.log('=====================================================\n');

  const report = {
    systemHealth: {},
    security: {},
    contentSync: {},
    endpoints: {},
    timestamp: new Date().toISOString(),
  };

  const wpApiUrl = 'https://aqib-xyz.stackstaging.com/wp-json/wp/v2';
  const liveFrontendUrl = 'https://www.blogitems.com';
  const authHeader = 'Basic ' + Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');

  // ----------------------------------------------------
  // SECTION 1: BACKEND WORDPRESS HEALTH & API SYNC AUDIT
  // ----------------------------------------------------
  console.log('📡 [1/5] AUDITING WORDPRESS BACKEND & REST API HEALTH...');
  try {
    const t0 = Date.now();
    const wpRootRes = await fetch('https://aqib-xyz.stackstaging.com/wp-json/', {
      headers: { 'Authorization': authHeader }
    });
    const wpLatency = Date.now() - t0;
    const wpRoot = await wpRootRes.json();
    
    report.systemHealth.wpEndpointStatus = wpRootRes.status;
    report.systemHealth.wpLatencyMs = wpLatency;
    report.systemHealth.wpSiteName = wpRoot.name;
    report.systemHealth.wpUrl = wpRoot.url;
    report.systemHealth.wpNamespaces = wpRoot.namespaces;

    console.log(`  ✓ WordPress Endpoint: ${wpRootRes.status} OK (${wpLatency}ms)`);
    console.log(`  ✓ Site Name: "${wpRoot.name}" | Description: "${wpRoot.description}"`);
  } catch (err) {
    console.error('  ❌ WordPress Root Check Failed:', err.message);
    report.systemHealth.wpError = err.message;
  }

  // ----------------------------------------------------
  // SECTION 2: CONTENT SYNCHRONIZATION AUDIT (POSTS, PAGES, MEDIA)
  // ----------------------------------------------------
  console.log('\n📚 [2/5] AUDITING CONTENT SYNCHRONIZATION (WP <-> NEXT.JS)...');
  try {
    // Audit Published Posts
    const postsRes = await fetch(`${wpApiUrl}/posts?_embed&per_page=100&status=publish`, {
      headers: { 'Authorization': authHeader }
    });
    const posts = await postsRes.json();
    const totalPostsHeader = postsRes.headers.get('x-wp-total');
    const totalPagesHeader = postsRes.headers.get('x-wp-totalpages');

    report.contentSync.totalPublishedPosts = posts.length;
    report.contentSync.headerTotal = totalPostsHeader;
    report.contentSync.headerPages = totalPagesHeader;
    report.contentSync.postsList = posts.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title.rendered,
      hasFeaturedMedia: !!(p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]?.source_url),
      mediaUrl: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      author: p._embedded?.author?.[0]?.name || 'Unknown',
      date: p.date,
    }));

    console.log(`  ✓ Total Published Posts Found: ${posts.length} (WP Header Total: ${totalPostsHeader})`);
    
    // Check Pages
    const pagesRes = await fetch(`${wpApiUrl}/pages?per_page=50&status=publish`, {
      headers: { 'Authorization': authHeader }
    });
    const pages = await pagesRes.json();
    report.contentSync.totalPages = pages.length;
    report.contentSync.pagesList = pages.map(pg => ({
      id: pg.id,
      slug: pg.slug,
      title: pg.title.rendered,
    }));
    console.log(`  ✓ Total Published Pages Found: ${pages.length}`);

    // Audit Media Library
    const mediaRes = await fetch(`${wpApiUrl}/media?per_page=100`, {
      headers: { 'Authorization': authHeader }
    });
    const media = await mediaRes.json();
    report.contentSync.totalMediaItems = Array.isArray(media) ? media.length : 0;
    console.log(`  ✓ Total Media Assets in Library: ${report.contentSync.totalMediaItems}`);

  } catch (err) {
    console.error('  ❌ Content Sync Audit Failed:', err.message);
    report.contentSync.error = err.message;
  }

  // ----------------------------------------------------
  // SECTION 3: LIVE FRONTEND AVAILABILITY & PAGES AUDIT
  // ----------------------------------------------------
  console.log('\n🌐 [3/5] AUDITING LIVE FRONTEND ENDPOINTS & CACHING...');
  const frontendEndpoints = [
    { name: 'Home Page', url: `${liveFrontendUrl}/` },
    { name: 'Journal Page', url: `${liveFrontendUrl}/journal` },
    { name: 'Contact Page', url: `${liveFrontendUrl}/contact` },
    { name: 'Journal Page 2', url: `${liveFrontendUrl}/journal?page=2` },
    { name: 'Revalidate Route (GET/POST)', url: `${liveFrontendUrl}/api/revalidate?secret=blogitems-secret-revalidate-token-2026` },
    { name: 'Revalidate Legacy Route', url: `${liveFrontendUrl}/revalidate?secret=blogitems-secret-revalidate-token-2026` },
  ];

  for (const ep of frontendEndpoints) {
    try {
      const t0 = Date.now();
      const res = await fetch(ep.url, { cache: 'no-store' });
      const lat = Date.now() - t0;
      report.endpoints[ep.name] = {
        url: ep.url,
        status: res.status,
        statusText: res.statusText,
        latencyMs: lat,
        headers: Object.fromEntries(res.headers.entries())
      };
      console.log(`  ✓ ${ep.name} [${res.status} ${res.statusText}] - ${lat}ms`);
    } catch (err) {
      console.log(`  ❌ ${ep.name} Failed: ${err.message}`);
      report.endpoints[ep.name] = { url: ep.url, error: err.message };
    }
  }

  // Check specific post route on live frontend
  if (report.contentSync.postsList && report.contentSync.postsList.length > 0) {
    const firstPostSlug = report.contentSync.postsList[0].slug;
    const singlePostUrl = `${liveFrontendUrl}/posts/${firstPostSlug}`;
    try {
      const t0 = Date.now();
      const res = await fetch(singlePostUrl, { cache: 'no-store' });
      const lat = Date.now() - t0;
      const html = await res.text();
      const containsTitle = html.includes(report.contentSync.postsList[0].title.substring(0, 15));
      report.endpoints['Single Post Route'] = {
        url: singlePostUrl,
        status: res.status,
        latencyMs: lat,
        renderedPostTitle: containsTitle,
      };
      console.log(`  ✓ Single Post (/posts/${firstPostSlug}) [${res.status}] - ${lat}ms | Content Verified: ${containsTitle}`);
    } catch (err) {
      console.log(`  ❌ Single Post Route Failed: ${err.message}`);
    }
  }

  // ----------------------------------------------------
  // SECTION 4: SECURITY AUDIT
  // ----------------------------------------------------
  console.log('\n🔒 [4/5] AUDITING SECURITY POSTURE & CONFIGURATIONS...');
  
  // A. Check Security Headers on Live Site
  try {
    const homeRes = await fetch(liveFrontendUrl, { method: 'HEAD' });
    const secHeaders = {
      'x-frame-options': homeRes.headers.get('x-frame-options'),
      'x-content-type-options': homeRes.headers.get('x-content-type-options'),
      'referrer-policy': homeRes.headers.get('referrer-policy'),
      'strict-transport-security': homeRes.headers.get('strict-transport-security'),
      'content-security-policy': homeRes.headers.get('content-security-policy'),
      'permissions-policy': homeRes.headers.get('permissions-policy'),
    };
    report.security.liveHeaders = secHeaders;
    console.log('  ✓ Live HTTP Security Headers:');
    for (const [k, v] of Object.entries(secHeaders)) {
      console.log(`    - ${k}: ${v || '⚠️ NOT DETECTED'}`);
    }
  } catch (err) {
    console.log('  ⚠️ Failed to read live security headers:', err.message);
  }

  // B. Codebase Security Checks (DOMPurify, Secrets, Sanitization)
  console.log('  ✓ Checking Codebase Sanitization & XSS Defenses:');
  const filesToCheck = [
    'lib/wordpress.ts',
    'app/posts/[slug]/page.tsx',
    'app/[slug]/page.tsx',
    'app/api/contact/route.ts',
    'app/api/revalidate/route.ts',
    'app/revalidate/route.ts',
    'next.config.ts'
  ];

  report.security.codeAudit = {};
  for (const file of filesToCheck) {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasDOMPurify = content.includes('DOMPurify') || content.includes('sanitizeHtml');
      const hasEscapeHtml = content.includes('escapeHtml');
      const hasSecretValidation = content.includes('REVALIDATE_SECRET') || content.includes('secret');
      report.security.codeAudit[file] = {
        exists: true,
        hasDOMPurify,
        hasEscapeHtml,
        hasSecretValidation,
      };
      console.log(`    - ${file}: Checked [DOMPurify: ${hasDOMPurify}, Escaped: ${hasEscapeHtml}, SecretVal: ${hasSecretValidation}]`);
    } else {
      report.security.codeAudit[file] = { exists: false };
    }
  }

  // ----------------------------------------------------
  // SECTION 5: CONTACT FORM & EMAIL INTEGRATION AUDIT
  // ----------------------------------------------------
  console.log('\n✉️ [5/5] AUDITING CONTACT & EMAIL NOTIFICATION WORKFLOW...');
  try {
    const contactApiUrl = `${liveFrontendUrl}/api/contact`;
    // Perform simulated contact submission check
    const contactRes = await fetch(contactApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'System Audit Bot',
        email: 'audit@blogitems.com',
        phone: '+1 555-0199',
        company: 'BlogItems Security',
        role: 'Automated Inspector',
        message: 'This is an automated system health check performed during the all-in-one audit.',
      })
    });
    const contactData = await contactRes.json();
    report.systemHealth.contactFormStatus = contactRes.status;
    report.systemHealth.contactFormResponse = contactData;
    console.log(`  ✓ Contact API Status: ${contactRes.status} ${contactRes.statusText}`);
    console.log(`  ✓ Contact API Response:`, JSON.stringify(contactData));
  } catch (err) {
    console.log(`  ⚠️ Contact API Audit Warning: ${err.message}`);
    report.systemHealth.contactFormError = err.message;
  }

  // Save audit report to JSON artifact for inspection
  const reportPath = path.join(__dirname, '..', 'scratch', 'audit-report-output.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ AUDIT COMPLETE. Full detailed results written to: scratch/audit-report-output.json\n`);
}

runComprehensiveAudit().catch(console.error);
