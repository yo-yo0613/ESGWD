import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://uwblrxiainfkvftzwcvg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YmxyeGlhaW5ma3ZmdHp3Y3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4Nzk3MTQsImV4cCI6MjA5NTQ1NTcxNH0._v1yKCprS-Gd7Pr3SFJPoIul7rEuhLVcO_VIyhZ-I60';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const jsonPath = path.join(__dirname, '../public/data/scraped_news.json');
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ JSON file not found at: ${jsonPath}`);
  process.exit(1);
}

const newsArticles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

async function importNews() {
  console.log(`📡 Uploading ${newsArticles.length} news articles to Supabase config key 'news_articles'...`);
  try {
    const { error } = await supabase
      .from('site_configs')
      .upsert({
        key: 'news_articles',
        content: newsArticles,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) throw error;
    console.log('🎉 Successfully uploaded and synchronized news articles in Supabase database!');
  } catch (err) {
    console.error('❌ Failed to upload to Supabase:', err.message);
    process.exit(1);
  }
}

importNews();
