const fs = require('fs');
const path = require('path');
const https = require('https');

// Create public/data if not exists
const outputDir = path.join(__dirname, '../public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to load: Status code ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', err => reject(err));
  });
}

function stripHtml(html) {
  if (!html) return '';
  let text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove CSS blocks
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove JS blocks
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&#[0-9]+;/g, ' ') // Replace numerical entities
    .replace(/\[&hellip;\]/g, ' ') // Clean WP excerpt ellipses
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();

  // Clean up gallery navigation prefix and related news suffixes
  text = text
    .replace(/^(?:\s*|上一頁|下一頁|[0-9\s]+)+/g, '') // Remove leading "上一頁下一頁12345..."
    .replace(/\s*相關新聞\s*$/g, '') // Remove trailing "相關新聞"
    .trim();

  return text;
}

function extractAllImages(html) {
  if (!html) return [];
  const matches = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

// Category Mapping logic
function mapCategory(wpCategories) {
  if (!wpCategories || wpCategories.length === 0) {
    return { category: 'enterprise', categoryLabel: '企業論壇' };
  }
  
  // Category IDs mapping
  // 24, 54 -> enterprise ("企業論壇")
  // 20 -> education ("學童教育")
  // 22 -> concert ("音樂會")
  if (wpCategories.includes(20)) {
    return { category: 'education', categoryLabel: '學童教育' };
  }
  if (wpCategories.includes(22)) {
    return { category: 'concert', categoryLabel: '音樂會' };
  }
  if (wpCategories.includes(24) || wpCategories.includes(54)) {
    return { category: 'enterprise', categoryLabel: '企業論壇' };
  }
  
  // Fallback default
  return { category: 'enterprise', categoryLabel: '企業論壇' };
}

async function startMigration() {
  console.log('🚀 Starting extraction from old esgwd.org WordPress REST API...');
  
  let page = 1;
  let allProcessedPosts = [];
  const defaultPlaceholder = 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80';
  
  while (true) {
    const url = `https://esgwd.org/wp-json/wp/v2/posts?_embed&per_page=50&page=${page}`;
    console.log(`📡 Fetching page ${page}...`);
    try {
      const posts = await fetchJson(url);
      if (!Array.isArray(posts) || posts.length === 0) {
        console.log(`✅ Finished. Reached the end of posts list.`);
        break;
      }
      
      console.log(`✨ Page ${page} returned ${posts.length} posts. Processing...`);
      
      for (const post of posts) {
        const title = stripHtml(post.title?.rendered || '無標題');
        const date = post.date ? post.date.split('T')[0] : '2026-01-01';
        
        // Extract full post body text for summary
        const summary = stripHtml(post.content?.rendered || post.excerpt?.rendered || '無內文');
        
        // Resolve featured image and inline images
        let featuredImage = null;
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
          featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
        }
        
        const inlineImages = extractAllImages(post.content?.rendered);
        let allImages = [];
        if (featuredImage) {
          allImages.push(featuredImage);
        }
        allImages = allImages.concat(inlineImages);
        
        // Remove duplicates and filter empty/null
        allImages = [...new Set(allImages)].filter(Boolean);
        
        // Primary image
        const image = allImages[0] || defaultPlaceholder;
        
        // If empty images list, push default placeholder
        if (allImages.length === 0) {
          allImages.push(defaultPlaceholder);
        }
        
        // Resolve category
        const { category, categoryLabel } = mapCategory(post.categories || []);
        
        allProcessedPosts.push({
          id: post.id,
          title,
          category,
          categoryLabel,
          date,
          summary,
          image,
          images: allImages
        });
      }
      
      page++;
      // Be gentle to the WordPress server
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`❌ Error fetching/processing page ${page}:`, e.message);
      break;
    }
  }
  
  // Sort posts by date descending
  allProcessedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Write to json file
  const outputPath = path.join(outputDir, 'scraped_news.json');
  fs.writeFileSync(outputPath, JSON.stringify(allProcessedPosts, null, 2), 'utf8');
  console.log(`\n🎉 Successfully scraped and processed ${allProcessedPosts.length} posts!`);
  console.log(`💾 Saved to: ${outputPath}`);
}

startMigration();
