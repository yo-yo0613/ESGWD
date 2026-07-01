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
  about_us_members: {
    board: [
      { name: '陳春山', role: '董事長', desc: '國立臺北科技大學智慧財產權研究所專任教授，長期深耕公司治理、數位轉型及 ESG 永續倡議。', avatar: '/images/avatars/陳春山.jpg' },
      { name: '陳政興', role: '副董事長', desc: '均豪精密工業股份有限公司董事長暨總經理，致力於推動半導體與高階製程設備之永續智慧製造。', avatar: '/images/avatars/陳政興.jpg' }
    ],
    directors: [
      { name: '王文山', role: '董事', desc: '產業界與科技創新專家。', avatar: '/images/avatars/王文山.jpg' },
      { name: '何子明', role: '董事', desc: '產業界與公司治理專家。', avatar: '/images/avatars/何子明.jpg' },
      { name: '佘日新', role: '董事', desc: '逢甲大學講座教授，專長於跨領域科技管理與永續發展策略。', avatar: '/images/avatars/佘日新.jpg' },
      { name: '吳明賢', role: '董事', desc: '國立臺灣大學醫學院附設醫院院長，推動醫療體系之綠色醫院與 ESG 實踐。', avatar: '/images/avatars/吳明賢.jpg' },
      { name: '周行一', role: '董事', desc: '國立政治大學財務管理學系教授、前政治大學校長，資深財務與金融專家。', avatar: '/images/avatars/周行一.jpg' },
      { name: '周桂田', role: '董事', desc: '國立臺灣大學國家發展研究所教授、風險社會與政策研究中心主任。', avatar: '/images/avatars/周桂田.jpg' },
      { name: '胡元輝', role: '董事', desc: '國立中正大學傳播學系教授、公共電視董事長，深耕公共傳播與社會治理。', avatar: '/images/avatars/胡元輝.jpg' },
      { name: '梁又文', role: '董事', desc: '產業界與企業營運專家。', avatar: '/images/avatars/梁又文.jpg' },
      { name: '楊岳虎', role: '董事', desc: '產業界與永續發展專家。', avatar: '/images/avatars/楊岳虎.jpg' },
      { name: '陳孝昌', role: '董事', desc: '永續轉型顧問專家，協助企業導入 ESG 策略架構。', avatar: '/images/avatars/陳孝昌.jpg' },
      { name: '陳美伶', role: '董事', desc: '台灣地方創生基金會董事長、前國發會主委，深耕地方永續與數位共融。', avatar: '/images/avatars/陳美伶.jpg' },
      { name: '陳雅婕', role: '董事', desc: '法律與公司治理實務專家。', avatar: '/images/avatars/陳雅婕.jpg' },
      { name: '潘維大', role: '董事', desc: '東吳大學校長，法律與高教治理專家，致力於公民教育推廣。', avatar: '/images/avatars/潘維大.jpg' },
      { name: '盧秋玲', role: '董事', desc: '國立臺灣大學財務金融學系教授，專長於資產管理與企業永續投資。', avatar: '/images/avatars/盧秋玲.jpg' }
    ],
    honorary: [
      { name: '陳進財', role: '榮譽董事', desc: '穩懋半導體股份有限公司董事長，推動高科技產業綠色製造之標竿人物。', avatar: '/images/avatars/陳進財.jpg' },
      { name: '黃士軍', role: '榮譽董事', desc: '產業界與永續發展代表。', avatar: '/images/avatars/黃士軍.jpg' },
      { name: '彭裕民', role: '榮譽董事', desc: '工業技術研究院副院長，專長於綠色化學與循環經濟技術研發。', avatar: '/images/avatars/彭裕民.jpg' },
      { name: '王國雄', role: '榮譽董事', desc: '成真咖啡創辦人、前王品集團總經理，落實 B 型企業與社會企業共好精神。', avatar: '/images/avatars/王國雄.jpg' }
    ],
    team: [
      { name: '林筠騏', role: '秘書長', desc: '負責基金會整體策略與日常營運，擁有豐富的媒體公關與永續轉型推廣經驗。', avatar: '/images/avatars/林筠騏.png' },
      { name: '許玉青', role: '副秘書長', desc: '協助秘書長推動基金會各項重大專案與跨界合作。', avatar: '/images/avatars/許玉青.jpg' },
      { name: '駱怡雯', role: '專案經理', desc: '主責良善世界公民素養教育計畫及相關公益倡議活動之執行與管理。', avatar: '/images/avatars/駱怡雯.jpg' },
      { name: '黃慧欣', role: '專案專員', desc: '協助各項專案執行、社群媒體經營與日常行政事務。', avatar: '/images/avatars/黃慧欣.png' }
    ]
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
