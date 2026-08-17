const fs = require('fs');
const path = require('path');

const allPosts = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_posts.json'), 'utf8'));

// Format posts array into clean TypeScript literal
const formattedPosts = allPosts.map(post => ({
  id: post.id,
  slug: post.slug,
  title: { rendered: post.title.rendered },
  excerpt: { rendered: post.excerpt.rendered },
  content: { rendered: post.content.rendered },
  date: { rendered: post.date },
  _embedded: post._embedded ? {
    "wp:featuredmedia": post._embedded["wp:featuredmedia"] ? post._embedded["wp:featuredmedia"].map(m => ({
      source_url: m.source_url,
      alt_text: m.alt_text || post.title.rendered
    })) : [],
    "author": post._embedded["author"] ? post._embedded["author"].map(a => ({ name: a.name })) : [{ name: "BlogItems Team" }]
  } : { author: [{ name: "BlogItems Team" }] }
}));

const fallbackPostsTs = JSON.stringify(formattedPosts, null, 2);

const fallbackPostsMap = {};
formattedPosts.forEach(post => {
  fallbackPostsMap[post.slug] = post;
});

const fallbackPostsMapTs = JSON.stringify(fallbackPostsMap, null, 2);

console.log(`Formatted ${formattedPosts.length} posts for fallbacks.`);

// 1. Update app/journal/page.tsx
const journalPath = path.join(__dirname, '../app/journal/page.tsx');
let journalContent = fs.readFileSync(journalPath, 'utf8');
const journalRegex = /const FALLBACK_POSTS: Post\[\] = \[[\s\S]*?\n\];/;
journalContent = journalContent.replace(journalRegex, `const FALLBACK_POSTS: Post[] = ${fallbackPostsTs};`);
fs.writeFileSync(journalPath, journalContent);
console.log('Updated app/journal/page.tsx');

// 2. Update app/page.tsx
const homePath = path.join(__dirname, '../app/page.tsx');
let homeContent = fs.readFileSync(homePath, 'utf8');
const homeRegex = /const FALLBACK_POSTS: Post\[\] = \[[\s\S]*?\n\];/;
homeContent = homeContent.replace(homeRegex, `const FALLBACK_POSTS: Post[] = ${fallbackPostsTs};`);
fs.writeFileSync(homePath, homeContent);
console.log('Updated app/page.tsx');

// 3. Update app/posts/[slug]/page.tsx
const postSlugPath = path.join(__dirname, '../app/posts/[slug]/page.tsx');
let postSlugContent = fs.readFileSync(postSlugPath, 'utf8');
const postSlugRegex = /const FALLBACK_POSTS_MAP: Record<string, Post> = \{[\s\S]*?\n\};/;
postSlugContent = postSlugContent.replace(postSlugRegex, `const FALLBACK_POSTS_MAP: Record<string, Post> = ${fallbackPostsMapTs};`);
fs.writeFileSync(postSlugPath, postSlugContent);
console.log('Updated app/posts/[slug]/page.tsx');
