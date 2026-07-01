import { supabase } from './supabaseClient';
import { 
  initialHeroSlides, 
  initialProjects, 
  initialNewsArticles, 
  initialSponsors, 
  initialAwardWinners, 
  initialBookCta, 
  initialDonationPlans 
} from '../data/siteInitialData';

export const DEFAULT_CONFIGS: Record<string, any> = {
  hero_slides: initialHeroSlides,
  projects: initialProjects,
  news_articles: initialNewsArticles,
  sponsors: initialSponsors,
  award_winners: initialAwardWinners,
  book_cta: initialBookCta,
  donation_plans: initialDonationPlans,
  looker_studio_url: 'https://lookerstudio.google.com/embed/reporting/c14b43c6-31a4-4f81-9b16-43ad3750058b/page/1M',
  about_us_avatars: {
    board: {
      '陳春山': '/images/avatars/陳春山.jpg',
      '陳政興': '/images/avatars/陳政興.jpg',
      '王文山': '/images/avatars/王文山.jpg',
      '何子明': '/images/avatars/何子明.jpg',
      '佘日新': '/images/avatars/佘日新.jpg',
      '吳明賢': '/images/avatars/吳明賢.jpg',
      '周行一': '/images/avatars/周行一.jpg',
      '周桂田': '/images/avatars/周桂田.jpg',
      '胡元輝': '/images/avatars/胡元輝.jpg',
      '梁又文': '/images/avatars/梁又文.jpg',
      '楊岳虎': '/images/avatars/楊岳虎.jpg',
      '陳孝昌': '/images/avatars/陳孝昌.jpg',
      '陳美伶': '/images/avatars/陳美伶.jpg',
      '陳雅婕': '/images/avatars/陳雅婕.jpg',
      '潘維大': '/images/avatars/潘維大.jpg',
      '盧秋玲': '/images/avatars/盧秋玲.jpg',
      '陳進財': '/images/avatars/陳進財.jpg',
      '黃士軍': '/images/avatars/黃士軍.jpg',
      '彭裕民': '/images/avatars/彭裕民.jpg',
      '王國雄': '/images/avatars/王國雄.jpg'
    },
    team: {
      '林筠騏': '/images/avatars/林筠騏.png',
      '許玉青': '/images/avatars/許玉青.jpg',
      '駱怡雯': '/images/avatars/駱怡雯.jpg',
      '黃慧欣': '/images/avatars/黃慧欣.png'
    }
  }
};

/**
 * Loads a configuration from Supabase 'site_configs'.
 * Fallbacks to localStorage if offline/error.
 * Fallbacks to default values from siteInitialData.ts if not found.
 */
export async function loadConfig<T>(key: string): Promise<T> {
  try {
    const { data, error } = await supabase
      .from('site_configs')
      .select('content')
      .eq('key', key)
      .maybeSingle(); // Use maybeSingle to prevent PGRST116 (0 rows returned) error

    if (error) throw error;
    if (data && data.content) {
      // Sync to localStorage
      localStorage.setItem(`esg_config_${key}`, JSON.stringify(data.content));
      return data.content as T;
    }
  } catch (err) {
    console.warn(`[ConfigLoader] Failed to fetch config for "${key}" from Supabase, falling back to localStorage:`, err);
  }

  // LocalStorage fallback
  const localData = localStorage.getItem(`esg_config_${key}`);
  if (localData) {
    try {
      return JSON.parse(localData) as T;
    } catch (e) {
      console.error(`[ConfigLoader] Parse error for local config "${key}":`, e);
    }
  }

  // Code-level default fallback
  const fallback = DEFAULT_CONFIGS[key];
  if (fallback) {
    // Write defaults to localStorage to ensure offline works on next load
    localStorage.setItem(`esg_config_${key}`, JSON.stringify(fallback));
  }
  return fallback as T;
}

/**
 * Saves a configuration to Supabase 'site_configs' and syncs to localStorage.
 */
export async function saveConfig<T>(key: string, content: T): Promise<void> {
  // Sync to local storage immediately
  localStorage.setItem(`esg_config_${key}`, JSON.stringify(content));
  // Notify other windows/components
  window.dispatchEvent(new Event('storage'));

  try {
    const { error } = await supabase
      .from('site_configs')
      .upsert({ 
        key, 
        content, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (error) throw error;
  } catch (err) {
    console.error(`[ConfigLoader] Failed to save config for "${key}" to Supabase:`, err);
    throw err; // bubble up for UI alert
  }
}

/**
 * Checks if configurations exist in Supabase and initializes them with default data if missing.
 */
export async function initializeConfigsIfNeeded(): Promise<void> {
  for (const key of Object.keys(DEFAULT_CONFIGS)) {
    try {
      const { data, error } = await supabase
        .from('site_configs')
        .select('key')
        .eq('key', key)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        console.log(`[ConfigLoader] Key "${key}" not found in Supabase. Initializing default data...`);
        const { error: insertError } = await supabase
          .from('site_configs')
          .insert({
            key,
            content: DEFAULT_CONFIGS[key]
          });
        if (insertError) throw insertError;
      }
    } catch (err) {
      console.warn(`[ConfigLoader] Could not check or initialize key "${key}" in Supabase:`, err);
    }
  }
}
