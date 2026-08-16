const authHeader = 'Basic ' + Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');

async function deleteSampleStorePosts() {
  console.log('🧹 REMOVING 3 SAMPLE STORE POSTS (110, 111, 112) FROM WORDPRESS...\n');

  const ids = [110, 111, 112];
  for (const id of ids) {
    try {
      const res = await fetch('https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts/' + id + '?force=true', {
        method: 'DELETE',
        headers: { 'Authorization': authHeader }
      });
      console.log('Delete Post ID ' + id + ' -> Status: ' + res.status + ' ' + res.statusText);
    } catch (e) {
      console.log('Error deleting post ' + id + ':', e.message);
    }
  }

  // Purge Vercel CDN Cache
  console.log('\n⚡ PURGING NEXT.JS CDN CACHE VIA REVALIDATION WEBHOOK...');
  const revalRes = await fetch('https://www.blogitems.com/revalidate?secret=blogitems-secret-revalidate-token-2026', {
    method: 'POST'
  });
  console.log('Revalidation Status:', revalRes.status, revalRes.statusText);
}

deleteSampleStorePosts();
