const fs = require('fs');

let content = fs.readFileSync('public/hero-lottie.json', 'utf8').trim();

// The user's JSON was missing the closing array bracket for layers array before markers
// Let's find where layers array ends
const lastBrace = content.lastIndexOf('}');
const candidate = content.slice(0, lastBrace + 1) + '],"markers":[]}';

try {
  const data = JSON.parse(candidate);
  console.log('✅ VALID LOTTIE ANIMATION JSON!');
  console.log('Version:', data.v);
  console.log('Canvas:', data.w, 'x', data.h);
  console.log('Layers:', data.layers.length);
  fs.writeFileSync('public/hero-lottie.json', JSON.stringify(data));
} catch (e) {
  console.log('JSON error:', e.message);
}
