export interface HeroSlideData {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  themeColor: string;
  bgGradient: string;
  bgImage: string;
}

export interface ProjectData {
  id: number;
  title: string;
  title_en?: string;
  subtitle: string;
  subtitle_en?: string;
  stats: { label: string; label_en?: string; value: string; value_en?: string }[];
  ctaText: string;
  ctaText_en?: string;
  iconName: string;
  color: string;
  bgGradient: string;
}

export interface NewsArticleData {
  id: number;
  title: string;
  category: 'enterprise' | 'education' | 'concert';
  categoryLabel: string;
  date: string;
  summary: string;
  image: string;
  images?: string[];
}

export interface SponsorData {
  id: number;
  name: string;
  englishName: string;
  color: string;
}

export interface AwardWinnerData {
  id: number;
  company: string;
  award: string;
  description: string;
  iconName: string;
}

export interface BookCtaData {
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  highlights: { title: string; title_en?: string; desc: string; desc_en?: string; iconName: string }[];
  buttonText: string;
  buttonText_en?: string;
}

export interface DonationPlanData {
  id: number;
  name: string;
  price: string;
  pricePeriod: string;
  giftTitle: string;
  giftDesc: string;
  benefits: string[];
  iconName: string;
  featured: boolean;
  color: string;
}

export const initialHeroSlides: HeroSlideData[] = [
  {
    id: 1,
    title: '2024百萬學童：愛向永續世界公民親子音樂會',
    subtitle: '傳達每位世界公民應具備的美德 : 良善',
    buttonText: '了解活動詳情',
    themeColor: '#FF6B00',
    bgGradient: 'from-orange-600/30 via-slate-900/90 to-brand-navy-dark/95',
    bgImage: '/images/concert_hero.jpg'
  },
  {
    id: 2,
    title: 'AI 音樂跨界創作競賽',
    subtitle: '激發學童與青年的科技創新，用 AI 譜寫關於生命與生態的永續樂章',
    buttonText: '立即報名參賽',
    themeColor: '#8B5CF6',
    bgGradient: 'from-violet-600/30 via-slate-900/90 to-brand-navy-dark/95',
    bgImage: '/images/ai_music_hero.jpg'
  },
  {
    id: 3,
    title: '未來學院：雙軸轉型領袖論壇',
    subtitle: '引領企業掌握綠色永續與數位雙軸轉型，榮獲金恆獎至高榮譽',
    buttonText: '探索論壇精采內容',
    themeColor: '#10B981',
    bgGradient: 'from-emerald-600/30 via-slate-900/90 to-brand-navy-dark/95',
    bgImage: '/images/forum_hero.jpg'
  }
];

export const initialProjects: ProjectData[] = [
  {
    id: 1,
    title: '未來學院（金恆獎與論壇）',
    subtitle: '專注企業綠色永續與數位雙軸轉型，培訓董監事治理素養，並舉辦金恆獎表揚卓越貢獻者。',
    stats: [
      { label: '參與企業', value: '50+ 家' },
      { label: '得獎單位', value: '20+ 組' }
    ],
    ctaText: '探索論壇亮點',
    iconName: 'Award',
    color: 'from-brand-amber to-amber-500',
    bgGradient: 'from-brand-navy-light/90 via-slate-900/95 to-brand-navy-dark/100'
  },
  {
    id: 2,
    title: '良善素養教育',
    subtitle: '將「良善」核心價值融入學校教材，培育學生成為具備全球視野與道德信念的世界公民。',
    stats: [
      { label: '合作學校', value: '100+ 所' },
      { label: '受益學子', value: '10,000+ 人' }
    ],
    ctaText: '瀏覽教材內容',
    iconName: 'BookOpen',
    color: 'from-purple-500 to-indigo-500',
    bgGradient: 'from-brand-navy-light/90 via-slate-900/95 to-brand-navy-dark/100'
  },
  {
    id: 3,
    title: '世界公民親子音樂會',
    subtitle: '結合綠色永續概念，為百萬學童與家庭舉辦公益音樂會，傳遞愛與關懷的力量。',
    stats: [
      { label: '親子共鳴', value: '1,000,000+ 人' },
      { label: '演出團隊', value: '20+ 團' }
    ],
    ctaText: '回顧精彩盛況',
    iconName: 'Music',
    color: 'from-brand-orange to-red-500',
    bgGradient: 'from-brand-navy-light/90 via-slate-900/95 to-brand-navy-dark/100'
  }
];

export const initialNewsArticles: NewsArticleData[] = [
  {
    id: 1,
    title: 'AI 音樂創作競賽開跑！引領學童探索音樂科技的無限可能',
    category: 'education',
    categoryLabel: '學童教育',
    date: '2026-06-01',
    summary: '為推動音樂科技在學界之普及，基金會攜手數家主流科技大廠舉辦 AI 跨界創作競賽，激發學生的永續創意。',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: '董監事與公司治理主管認證課程：最新 ESG 永續法規與實務指引',
    category: 'enterprise',
    categoryLabel: '企業論壇',
    date: '2026-05-28',
    summary: '配合最新證券交易法規，未來學院將於七月開辦公司治理卓越學分班，深度剖析雙軸轉型戰略。',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: '「世界公民親子音樂會」巡迴落幕，感動百萬親子共鳴良善教育',
    category: 'concert',
    categoryLabel: '音樂會',
    date: '2026-05-20',
    summary: '年度壓軸「百萬學童：愛向永續親子音樂會」在台北國家音樂廳完美畫下句點，透過良善主題樂曲震撼人心。',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: '2026雙軸轉型金恆獎：旭榮集團與遠傳電信等得獎名單正式揭曉',
    category: 'enterprise',
    categoryLabel: '企業論壇',
    date: '2026-05-15',
    summary: '表揚在綠色與數位雙軸轉型中表現卓越的典範企業，激勵產業界互相觀摩，開創企業永續競爭力。',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: '地球日綠色生活教育活動，讓良善素養在校園生根發芽',
    category: 'education',
    categoryLabel: '學童教育',
    date: '2026-04-22',
    summary: '深入全台百所國中小學，透過互動教材與實踐桌遊，引導學童從小建立永續低碳的生活意識。',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: '世界公民基本法論壇成功舉辦，邀集多國學者擘劃永續憲章',
    category: 'enterprise',
    categoryLabel: '企業論壇',
    date: '2026-04-10',
    summary: '圍繞永續與基本人權發展，基金會於本月召開國際論壇，發表最新的世界公民法規倡導成果。',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80'
  }
];

export const initialSponsors: SponsorData[] = [
  { id: 1, name: '台灣中油', englishName: 'CPC TAIWAN', color: '#0097A7' },
  { id: 2, name: '合作金庫', englishName: 'TCB BANK', color: '#1B5E20' },
  { id: 3, name: '國泰金控', englishName: 'CATHAY HOLDINGS', color: '#2E7D32' },
  { id: 4, name: '富邦金控', englishName: 'FUBON FINANCIAL', color: '#0288D1' },
  { id: 5, name: '兆豐金控', englishName: 'MEGA HOLDINGS', color: '#B71C1C' },
  { id: 6, name: '台積電', englishName: 'TSMC', color: '#E65100' },
  { id: 7, name: '遠傳電信', englishName: 'FAREASTONE', color: '#D32F2F' },
  { id: 8, name: '旭榮集團', englishName: 'NEW WIDE GROUP', color: '#311B92' },
  { id: 9, name: '台灣水泥', englishName: 'TCC GROUP', color: '#37474F' },
  { id: 10, name: '中華電信', englishName: 'CHT', color: '#00838F' },
  { id: 11, name: '新光金控', englishName: 'SHIN KONG', color: '#C2185B' },
  { id: 12, name: '第一金控', englishName: 'FIRST FINANCIAL', color: '#1565C0' }
];

export const initialAwardWinners: AwardWinnerData[] = [
  {
    id: 1,
    company: '旭榮集團',
    award: '永續供應鏈雙軸轉型特別獎',
    description: '成功建構綠色紡織生態系，導入AI製程優化減碳，建立跨國低碳供應鏈。',
    iconName: 'Leaf'
  },
  {
    id: 2,
    company: '遠傳電信',
    award: '數位韌性與智慧淨零傑出獎',
    description: '以5G智慧路燈與綠能數據中心，協助全台智慧城市布建與高成效節能減碳。',
    iconName: 'Zap'
  },
  {
    id: 3,
    company: '國泰金控',
    award: '綠色金融與氣候治理創新獎',
    description: '推動零碳金融服務，領先布局再生能源投融資，引領法人客戶低碳轉型。',
    iconName: 'Shield'
  },
  {
    id: 4,
    company: '台灣水泥',
    award: '循環經濟卓越典範獎',
    description: '積極推廣超低碳水泥，投資綠能與儲能系統，邁向二〇五〇水泥淨零碳排。',
    iconName: 'Award'
  }
];

export const initialBookCta: BookCtaData = {
  title: '學術專著：世界公民基本法的探索',
  description: '本書由基金會召集多位國際公法專家、法律學者與ESG永續領袖，歷時三年撰寫而成。深入淺出地探討在多極化世界與雙軸轉型浪潮中，每位地球居民應遵循的世界公民基本法架構，為人類永續共生提供法律學術指引。',
  highlights: [
    { title: '永續人權憲章', desc: '從法律視角定位地球住民對生態守護的義務與基本生存人權。', iconName: 'ShieldCheck' },
    { title: '跨國法律與 ESG 實務', desc: '詳析跨國企業如何在符合世界公民基本法精神下，落實公司治理。', iconName: 'FileText' }
  ],
  buttonText: '點此免費下載《世界公民基本法的探索》電子書'
};

export const initialDonationPlans: DonationPlanData[] = [
  {
    id: 1,
    name: '守護者會員',
    price: 'NT$ 1,000',
    pricePeriod: '每月',
    giftTitle: '專屬文青帆布袋',
    giftDesc: '採用有機再生棉布料手工縫製，雙軸環保印花，隨身攜帶展現綠色生活態度。',
    benefits: ['享電子報與論壇精華', '贈有機棉帆布袋乙個', '登錄基金會年度感謝名單'],
    iconName: 'ShoppingBag',
    featured: false,
    color: 'from-slate-700 to-slate-800'
  },
  {
    id: 2,
    name: '推動者會員',
    price: 'NT$ 1,500',
    pricePeriod: '每月',
    giftTitle: '頂級濾掛咖啡與原木杯墊組',
    giftDesc: '嚴選永續雨林認證咖啡豆，搭配台灣在地手工雕琢的回收原木杯墊，享受午后低碳香醇。',
    benefits: ['優先取得未來學院論壇保留席', '贈濾掛咖啡與原木杯墊組乙份', '享購書與認證課程 9 折優惠', '登錄基金會年度感謝名單'],
    iconName: 'Coffee',
    featured: true,
    color: 'from-brand-amber to-amber-600'
  },
  {
    id: 3,
    name: '領航者會員',
    price: 'NT$ 3,000',
    pricePeriod: '每月',
    giftTitle: '真空保溫杯 & 榮譽證書 & 晚宴邀請',
    giftDesc: '限量磨砂真空保溫杯，附實體榮譽理事證書，並獲邀出席年度雙軸轉型慈善交流晚宴。',
    benefits: ['受邀年度慈善交流晚宴 (含一席)', '贈限量經典真空保溫杯乙個', '頒發世界公民榮譽會員證書', '公司治理認證課程免費旁聽一堂'],
    iconName: 'Star',
    featured: false,
    color: 'from-brand-orange to-red-600'
  }
];
