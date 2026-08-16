const authHeader = 'Basic ' + Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');

async function auditAndFixArticles() {
  console.log('🔍 DEEP AUDITING WORDPRESS POSTS AND FRONTEND SYNC...\n');

  // 1. Fetch WordPress Posts
  const wpRes = await fetch('https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts?status=any&per_page=100', {
    headers: { 'Authorization': authHeader }
  });
  const posts = await wpRes.json();
  console.log('Total WordPress Posts (All Statuses):', posts.length);
  
  const published = posts.filter(p => p.status === 'publish');
  console.log('Published Posts Count:', published.length);
  for (let i = 0; i < published.length; i++) {
    console.log((i+1) + '. ID ' + published[i].id + ': ' + published[i].title.rendered + ' (slug: ' + published[i].slug + ')');
  }

  // 2. Trigger Revalidation Webhook to Flush Vercel CDN
  console.log('\n⚡ CALLING REVALIDATION WEBHOOK...');
  const revalRes = await fetch('https://www.blogitems.com/revalidate?secret=blogitems-secret-revalidate-token-2026', {
    method: 'POST'
  });
  console.log('Revalidation Status:', revalRes.status, revalRes.statusText);
  const revalData = await revalRes.json();
  console.log('Revalidation Result:', JSON.stringify(revalData, null, 2));

  // 3. Test Live Journal Page HTML
  console.log('\n🔍 FETCHING LIVE /journal PAGE HTML...');
  const journalRes = await fetch('https://www.blogitems.com/journal', { cache: 'no-store' });
  console.log('Live Journal Status:', journalRes.status, journalRes.statusText);
  const html = await journalRes.text();
  console.log('Journal HTML Length:', html.length);
  console.log('Contains Published Post Titles:');
  for (const p of published.slice(0, 5)) {
    const titleSnippet = p.title.rendered.substring(0, 15);
    console.log(`- "${titleSnippet}..." -> Found: ${html.includes(titleSnippet)}`);
  }
}

auditAndFixArticles();
