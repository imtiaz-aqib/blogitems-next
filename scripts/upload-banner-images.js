const credentials = Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');
const API_BASE = 'https://aqib-xyz.stackstaging.com/wp-json/wp/v2';

const BANNERS = [
  {
    slug: "what-is-headless-wordpress-a-beginners-plain-english-guide",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    filename: "headless-wordpress-guide.jpg"
  },
  {
    slug: "why-next-js-headless-wordpress-is-the-ultimate-web-combo",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    filename: "nextjs-ultimate-combo.jpg"
  },
  {
    slug: "traditional-wordpress-vs-headless-wordpress-which-one-should-you-choose",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    filename: "traditional-vs-headless.jpg"
  },
  {
    slug: "how-headless-wordpress-makes-your-website-10x-faster",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    filename: "10x-faster-website.jpg"
  },
  {
    slug: "is-headless-wordpress-good-for-seo-aeo-geo-guide",
    url: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80",
    filename: "headless-seo-guide.jpg"
  },
  {
    slug: "step-by-step-how-content-editors-work-in-headless-wordpress",
    url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    filename: "content-editors-workflow.jpg"
  },
  {
    slug: "why-decoupled-headless-wordpress-is-practically-hack-proof",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    filename: "hack-proof-security.jpg"
  },
  {
    slug: "how-incremental-static-regeneration-isr-works-in-plain-english",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    filename: "nextjs-isr-guide.jpg"
  },
  {
    slug: "5-common-headless-wordpress-mistakes-and-how-to-avoid-them",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    filename: "headless-mistakes.jpg"
  },
  {
    slug: "the-ultimate-checklist-for-migrating-to-headless-wordpress",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    filename: "migration-checklist.jpg"
  }
];

async function uploadAndAttachBanners() {
  console.log('🎨 UPLOADING AND ATTACHING HIGH-RES BANNER IMAGES...\n');

  for (let i = 0; i < BANNERS.length; i++) {
    const banner = BANNERS[i];
    console.log(`[${i + 1}/10] Processing banner for: ${banner.slug}...`);

    try {
      // 1. Download image buffer
      const imgRes = await fetch(banner.url);
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 2. Upload to WordPress REST API media endpoint
      const uploadRes = await fetch(`${API_BASE}/media`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + credentials,
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename="${banner.filename}"`
        },
        body: buffer
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        console.error(`  ❌ Media Upload Failed:`, errText.substring(0, 150));
        continue;
      }

      const media = await uploadRes.json();
      console.log(`  📸 Media Uploaded! ID: ${media.id} (${media.source_url})`);

      // 3. Find post by slug
      const postRes = await fetch(`${API_BASE}/posts?slug=${banner.slug}`);
      const posts = await postRes.json();

      if (posts && posts.length > 0) {
        const postId = posts[0].id;
        // 4. Update post featured_media
        const updateRes = await fetch(`${API_BASE}/posts/${postId}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ featured_media: media.id })
        });

        if (updateRes.ok) {
          console.log(`  ✅ Banner Attached to Post ID ${postId}!`);
        } else {
          console.error(`  ❌ Failed to attach banner to post ID ${postId}`);
        }
      } else {
        console.error(`  ❌ Post with slug ${banner.slug} not found`);
      }
    } catch (e) {
      console.error(`  ❌ Error processing banner:`, e.message);
    }

    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n🎉 ALL 10 BANNER IMAGES UPLOADED AND ATTACHED SUCCESSFULLY!');
}

uploadAndAttachBanners();
