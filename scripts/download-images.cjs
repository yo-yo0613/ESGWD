const fs = require('fs');
const path = require('path');
const https = require('https');

const outputImagesDir = path.join(__dirname, '../public/images/news');
if (!fs.existsSync(outputImagesDir)) {
  fs.mkdirSync(outputImagesDir, { recursive: true });
}

const jsonPath = path.join(__dirname, '../public/data/scraped_news.json');
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ Json file not found at: ${jsonPath}`);
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    let fullUrl = url;
    if (url.startsWith('//')) {
      fullUrl = 'https:' + url;
    }
    
    // Resolve clean single URL encoding
    try {
      const decodedUrl = decodeURI(fullUrl);
      const parsedUrl = new URL(decodedUrl);
      fullUrl = parsedUrl.toString();
    } catch(e) {
      try {
        fullUrl = new URL(fullUrl).toString();
      } catch(err) {}
    }

    const file = fs.createWriteStream(destPath);
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (response) => {
      // Handle redirects (Common in WP URLs redirection)
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(destPath, () => {});
        downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`Status Code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

function getExtension(url) {
  try {
    const filename = url.split('/').pop().split('?')[0];
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return ext;
    }
  } catch (e) {}
  return 'jpg'; // fallback
}

async function runImagesDownload() {
  console.log(`🚀 Loading ${posts.length} posts from scraped_news.json for image downloading...`);
  
  let downloadCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`📦 Processing post ${i + 1}/${posts.length} (ID: ${post.id})...`);
    
    if (Array.isArray(post.images) && post.images.length > 0) {
      const localImagesList = [];
      
      for (let j = 0; j < post.images.length; j++) {
        const imageUrl = post.images[j];
        
        // If already downloaded/local, keep it
        if (imageUrl.startsWith('/images/news/')) {
          localImagesList.push(imageUrl);
          continue;
        }
        
        const ext = getExtension(imageUrl);
        const fileName = `news_${post.id}_${j}.${ext}`;
        const destPath = path.join(outputImagesDir, fileName);
        const localPath = `/images/news/${fileName}`;
        
        console.log(`   └─ 📥 Downloading image ${j + 1}/${post.images.length}: ${imageUrl}`);
        try {
          await downloadFile(imageUrl, destPath);
          localImagesList.push(localPath);
          downloadCount++;
          // Be gentle on the server
          await new Promise(r => setTimeout(r, 150));
        } catch (e) {
          console.warn(`   └─ ⚠️ Failed to download image (URL: ${imageUrl}). Error: ${e.message}`);
          // Fallback to keeping the old remote URL
          localImagesList.push(imageUrl);
          failCount++;
        }
      }
      
      // Update arrays
      post.images = localImagesList;
      post.image = localImagesList[0] || post.image;
    }
  }
  
  // Write the localized paths back to the JSON file
  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`\n🎉 Image downloading finished!`);
  console.log(`✨ Successfully localized: ${downloadCount} images.`);
  console.log(`⚠️ Failed downloads: ${failCount} images.`);
  console.log(`💾 Saved updated JSON to: ${jsonPath}`);
}

runImagesDownload();
