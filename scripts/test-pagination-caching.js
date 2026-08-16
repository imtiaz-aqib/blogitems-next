async function verifyPaginationAndCaching() {
  console.log('🔍 EMPIRICAL VERIFICATION OF PAGINATION & ON-DEMAND CACHING...\n');

  // 1. Verify On-Demand Revalidation Webhook
  console.log('--- 1. TESTING REVALIDATION WEBHOOK ---');
  const revalRes = await fetch('https://www.blogitems.com/revalidate?secret=blogitems-secret-revalidate-token-2026', {
    method: 'POST'
  });
  console.log('Reval Webhook Status: ' + revalRes.status + ' ' + revalRes.statusText);
  const revalData = await revalRes.json();
  console.log('Purged Cache Output:', JSON.stringify(revalData, null, 2));

  // 2. Verify Pagination Pages 1, 2, and 3
  console.log('\n--- 2. TESTING PAGINATION PAGES ---');
  const pages = [
    'https://www.blogitems.com/journal',
    'https://www.blogitems.com/journal?page=2',
    'https://www.blogitems.com/journal?page=3'
  ];

  for (let i = 0; i < pages.length; i++) {
    const res = await fetch(pages[i], { cache: 'no-store' });
    console.log('Page ' + (i+1) + ' (' + pages[i] + ') -> Status: ' + res.status + ' ' + res.statusText);
  }
}

verifyPaginationAndCaching();
