const authHeader = 'Basic ' + Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');

async function cleanupWpDashboard() {
  console.log('🧹 EXECUTING COMPREHENSIVE WORDPRESS DASHBOARD CLEANUP...\n');

  // 1. DELETE JUNK / TEST POSTS
  const postIdsToDelete = [102, 68, 65]; // Drasd asd asd asd, Best Post, Welcome to BlogItems
  console.log('--- 1. DELETING TEST/JUNK POSTS ---');
  for (const id of postIdsToDelete) {
    try {
      const res = await fetch(`https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts/${id}?force=true`, {
        method: 'DELETE',
        headers: { 'Authorization': authHeader }
      });
      console.log(`Delete Post ID ${id} -> Status: ${res.status} ${res.statusText}`);
    } catch (e) {
      console.log(`Error deleting post ${id}:`, e.message);
    }
  }

  // 2. DELETE LEGACY UNUSED PAGES
  const pageIdsToDelete = [26, 9, 3]; // Style, Home, Privacy Policy
  console.log('\n--- 2. DELETING LEGACY/UNUSED PAGES ---');
  for (const id of pageIdsToDelete) {
    try {
      const res = await fetch(`https://aqib-xyz.stackstaging.com/wp-json/wp/v2/pages/${id}?force=true`, {
        method: 'DELETE',
        headers: { 'Authorization': authHeader }
      });
      console.log(`Delete Page ID ${id} -> Status: ${res.status} ${res.statusText}`);
    } catch (e) {
      console.log(`Error deleting page ${id}:`, e.message);
    }
  }

  // 3. UNINSTALL INACTIVE PLUGINS
  const pluginsToUninstall = [
    'woocommerce/woocommerce',
    'temporary-login-without-password/temporary-login-without-password'
  ];
  console.log('\n--- 3. UNINSTALLING INACTIVE PLUGINS ---');
  for (const pluginFile of pluginsToUninstall) {
    try {
      const res = await fetch(`https://aqib-xyz.stackstaging.com/wp-json/wp/v2/plugins/${encodeURIComponent(pluginFile)}?force=true`, {
        method: 'DELETE',
        headers: { 'Authorization': authHeader }
      });
      console.log(`Uninstall Plugin ${pluginFile} -> Status: ${res.status} ${res.statusText}`);
    } catch (e) {
      console.log(`Error uninstalling plugin ${pluginFile}:`, e.message);
    }
  }

  console.log('\n✅ WORDPRESS DASHBOARD CLEANUP COMPLETED!');
}

cleanupWpDashboard();
