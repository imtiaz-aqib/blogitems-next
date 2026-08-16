const authHeader = 'Basic ' + Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');

async function auditWpDashboard() {
  console.log('🔍 WORDPRESS DASHBOARD COMPREHENSIVE AUDIT...\n');

  // 1. AUDIT PAGES
  console.log('--- 1. PAGES AUDIT ---');
  const pagesRes = await fetch('https://aqib-xyz.stackstaging.com/wp-json/wp/v2/pages?status=any&per_page=100', {
    headers: { 'Authorization': authHeader }
  });
  const pages = await pagesRes.json();
  console.log('Total Pages count:', pages.length);
  for (let i = 0; i < pages.length; i++) {
    console.log((i+1) + '. Page ID ' + pages[i].id + ' [' + pages[i].status + ']: ' + pages[i].title.rendered + ' (slug: ' + pages[i].slug + ')');
  }

  // 2. AUDIT POSTS
  console.log('\n--- 2. POSTS AUDIT ---');
  const postsRes = await fetch('https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts?status=any&per_page=100', {
    headers: { 'Authorization': authHeader }
  });
  const posts = await postsRes.json();
  console.log('Total Posts count:', posts.length);
  for (let i = 0; i < posts.length; i++) {
    console.log((i+1) + '. Post ID ' + posts[i].id + ' [' + posts[i].status + ']: ' + posts[i].title.rendered + ' (slug: ' + posts[i].slug + ')');
  }

  // 3. AUDIT PLUGINS
  console.log('\n--- 3. PLUGINS AUDIT ---');
  const pluginsRes = await fetch('https://aqib-xyz.stackstaging.com/wp-json/wp/v2/plugins', {
    headers: { 'Authorization': authHeader }
  });
  const plugins = await pluginsRes.json();
  console.log('Total Plugins count:', plugins.length);
  for (let i = 0; i < plugins.length; i++) {
    console.log((i+1) + '. Plugin: ' + plugins[i].name + ' (' + plugins[i].plugin + ') -> Status: ' + plugins[i].status);
  }
}

auditWpDashboard();
