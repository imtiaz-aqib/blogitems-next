const fs = require('fs');

async function publishArticle(title, content, categoryId = 1, featuredMediaId = null) {
  const credentials = Buffer.from('imtiaz:QChk 38p9 GKjR YVQk 7ck9 Yy58').toString('base64');
  const endpoint = 'https://aqib-xyz.stackstaging.com/wp-json/wp/v2/posts';

  const bodyData = {
    title,
    content,
    status: 'publish',
  };

  if (categoryId) {
    bodyData.categories = [categoryId];
  }

  if (featuredMediaId) {
    bodyData.featured_media = featuredMediaId;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + credentials,
      },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Publish Error:', errText);
      return null;
    }

    const post = await res.json();
    console.log('✅ Article Published Successfully!');
    console.log('Post ID:', post.id);
    console.log('Post Title:', post.title.rendered);
    console.log('Post Link:', `https://www.blogitems.com/posts/${post.slug}`);
    return post;
  } catch (e) {
    console.error('Network Error:', e.message);
    return null;
  }
}

module.exports = { publishArticle };
