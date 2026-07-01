import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://uwblrxiainfkvftzwcvg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YmxyeGlhaW5ma3ZmdHp3Y3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Nzk3MTQsImV4cCI6MjA5NTQ1NTcxNH0._v1yKCprS-Gd7Pr3SFJPoIul7rEuhLVcO_VIyhZ-I60';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const jsonPath = path.join(__dirname, '../public/data/scraped_news.json');
const posts = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

/**
 * Translates text using the unofficial Google Translate web API.
 * This is the same endpoint browsers use when visiting translate.google.com.
 */
function translateText(text, targetLang = 'en', sourceLang = 'zh-TW') {
  return new Promise((resolve, reject) => {
    if (!text || text.trim() === '') {
      resolve('');
      return;
    }

    // Truncate very long texts (Google API has limits)
    const maxLength = 4800;
    const truncated = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    
    const encodedText = encodeURIComponent(truncated);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodedText}`;

    https.get(url, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*'
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Google translate response: [[["translated", "original", ...], ...], ...]
          const translated = parsed[0]
            .filter(part => part[0])
            .map(part => part[0])
            .join('');
          resolve(translated);
        } catch (e) {
          console.warn(`⚠️ Failed to parse translation response: ${e.message}`);
          resolve(text); // Fallback to original
        }
      });
    }).on('error', (err) => {
      console.warn(`⚠️ Translation request error: ${err.message}`);
      resolve(text); // Fallback to original
    }).on('timeout', () => {
      console.warn(`⚠️ Translation request timeout`);
      resolve(text);
    });
  });
}

async function translateAllPosts() {
  console.log(`🌏 Starting translation of ${posts.length} articles from zh-TW → English...`);
  
  let translatedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    // Skip if already translated
    if (post.title_en && post.summary_en) {
      console.log(`⏭️  [${i + 1}/${posts.length}] ID ${post.id} already translated, skipping.`);
      skippedCount++;
      continue;
    }

    console.log(`🔄 [${i + 1}/${posts.length}] Translating: "${post.title.substring(0, 40)}..."`);

    try {
      // Translate title
      const titleEn = await translateText(post.title);
      await new Promise(r => setTimeout(r, 300));

      // Translate summary (full body text)
      const summaryEn = await translateText(post.summary);
      await new Promise(r => setTimeout(r, 500));

      post.title_en = titleEn;
      post.summary_en = summaryEn;

      translatedCount++;
      console.log(`   ✅ Title EN: "${titleEn.substring(0, 60)}..."`);

      // Save checkpoint every 10 posts in case the script is interrupted
      if (translatedCount % 10 === 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
        console.log(`   💾 Checkpoint saved at post ${i + 1}/${posts.length}`);
      }
    } catch (err) {
      console.warn(`⚠️ Translation failed for post ${post.id}: ${err.message}`);
      post.title_en = '';
      post.summary_en = '';
    }
  }

  // Final save of JSON
  fs.writeFileSync(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`\n💾 Saved updated scraped_news.json with translations.`);
  console.log(`✨ Translated: ${translatedCount} posts. Skipped: ${skippedCount} posts.`);

  // Upload updated posts to Supabase
  console.log(`\n📡 Uploading bilingual news_articles to Supabase...`);
  try {
    const { error } = await supabase
      .from('site_configs')
      .upsert({
        key: 'news_articles',
        content: posts,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) throw error;
    console.log('🎉 Successfully uploaded bilingual news articles to Supabase!');
  } catch (err) {
    console.error('❌ Failed to upload to Supabase:', err.message);
  }
}

translateAllPosts();
