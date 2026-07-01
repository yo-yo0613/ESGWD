export interface CourseItem {
  icon: string;
  title: string;
  title_en: string;
  desc: string;
  desc_en: string;
}

export interface GalleryItem {
  url: string;
  title: string;
  title_en: string;
  desc: string;
  desc_en: string;
}

export interface FutureAcademyPageData {
  heroTitle: string;
  heroTitle_en: string;
  heroDesc: string;
  heroDesc_en: string;
  trainedCount: string;
  trainedLabel: string;
  trainedLabel_en: string;
  courses: CourseItem[];
  gallery: GalleryItem[];
}

export interface AwardEventItem {
  year: number;
  title: string;
  title_en: string;
  category: string;
  category_en: string;
  summary: string;
  summary_en: string;
  img: string;
}

export interface GoldenConstantPageData {
  introTitle: string;
  introTitle_en: string;
  introDesc: string;
  introDesc_en: string;
  purposeDesc: string;
  purposeDesc_en: string;
  events: AwardEventItem[];
}

export interface LiteracyToolItem {
  emoji: string;
  title: string;
  title_en: string;
  desc: string;
  desc_en: string;
}

export interface GoodnessLiteracyPageData {
  planTitle: string;
  planTitle_en: string;
  planDesc: string;
  planDesc_en: string;
  planDescExtra: string;
  planDescExtra_en: string;
  planTarget: string;
  planTarget_en: string;
  planSchoolCount: string;
  planSchoolCount_en: string;
  citizenTitle: string;
  citizenTitle_en: string;
  citizenDesc: string;
  citizenDesc_en: string;
  citizenDescExtra: string;
  citizenDescExtra_en: string;
  citizenTarget: string;
  citizenTarget_en: string;
  citizenCount: string;
  citizenCount_en: string;
  tools: LiteracyToolItem[];
}

export interface ConcertEventItem {
  year: number;
  title: string;
  title_en: string;
  theme: string;
  theme_en: string;
  location: string;
  location_en: string;
  img: string;
  desc: string;
  desc_en: string;
}

export interface AnnualConcertPageData {
  introTitle: string;
  introTitle_en: string;
  introDesc: string;
  introDesc_en: string;
  surplusDesc: string;
  surplusDesc_en: string;
  concerts: ConcertEventItem[];
}

// Initial Data Instances
export const initialFutureAcademyPage: FutureAcademyPageData = {
  heroTitle: '培育面向 2030 永續世界的氣候行動與 ESG 領袖人才',
  heroTitle_en: 'Nurturing Climate Action & ESG Leadership Talents for a 2030 Sustainable World',
  heroDesc: '「未來學院」是世界公民文化基金會旗下的核心人才培育基地。透過碳盤查、國際永續準則、環境永續設計思維等系列精修課程，協助青年學生、企業同仁快速接軌世界永續標準。',
  heroDesc_en: 'Future Academy is the core leadership training hub under the World Citizen Foundation. Through curated courses in carbon footprint accounting, international sustainability criteria, and design thinking, we assist students and executives to align with global standards.',
  trainedCount: '1,200+',
  trainedLabel: '位永續領袖',
  trainedLabel_en: 'Sustainability Leaders',
  courses: [
    {
      icon: '⚖️',
      title: '董監事及公司治理主管認證課程',
      title_en: 'Directors & Governance Officers Accreditation',
      desc: '提供符合證交所認可之董監事及公司治理主管進修學分課程。內容涵蓋 ESG 永續治理策略、雙軸轉型（數位與永續）、AI 倫理治理、法遵管理及營業秘密保護。',
      desc_en: 'Providing accredited training courses approved by the Stock Exchange for corporate directors. Curriculum covers ESG governance strategy, twin transition, AI ethics, legal compliance, and trade secret protection.'
    },
    {
      icon: '🏢',
      title: '企業客製化到府授課',
      title_en: 'Customized Corporate In-house Training',
      desc: '針對企業特定治理痛點或發展策略，由基金會專家學者到府客製化授課，協助公司高階團隊建立一致的永續與數位雙軸思維。',
      desc_en: 'Tailored to corporate pain points, our foundation experts deliver customized training on-site to align senior executive teams with cohesive digital-ESG dual mindsets.'
    },
    {
      icon: '🌱',
      title: '氣候變遷與減碳工作坊',
      title_en: 'Climate Change & Decarbonization Workshop',
      desc: '規劃碳足跡盤查與減碳路徑規劃實戰課程，以實際案例出發，協助企業中階幹部與第一線執行人員對接國際碳稅與永續供應鏈標準。',
      desc_en: 'Offering carbon accounting and emission reduction pathway planning workshops, empowering middle managers to adapt to international supply chain requirements.'
    },
    {
      icon: '🌍',
      title: '世界公民永續論壇',
      title_en: 'Global Citizen Sustainability Forum',
      desc: '每年定期舉辦國際青年與企業領袖永續論壇，邀請產官學專家共同探討 ESG 實踐挑戰，提供青年與領袖面對面交流及建構國際網絡的平台。',
      desc_en: 'Organizing annual forums for international youth and corporate leaders, inviting scholars and practitioners to discuss ESG challenges and build global networks.'
    }
  ],
  gallery: [
    {
      url: '/images/forum_hero.jpg',
      title: '雙軸轉型領袖論壇',
      title_en: 'Twin-Axis Transformation Leadership Forum',
      desc: '本會核心導師與企業高階主管齊聚一堂，探討 ESG 科技治理策略。',
      desc_en: 'Core mentors and corporate executives gathering to discuss ESG tech governance.'
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      title: '董監事公司治理實務研習',
      title_en: 'Corporate Governance Executive Seminar',
      desc: '依證交所合規指引，進行企業永續發展策略與責任授權培訓。',
      desc_en: 'Fulfilling regulatory guidelines, conducting sustainable strategy training for corporate boards.'
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      title: '青年永續變革者培訓營',
      title_en: 'Youth Sustainable Change-makers Workshop',
      desc: '引導大專校院青年接軌國際碳排稅制，學習碳足跡實務規劃。',
      desc_en: 'Empowering university students with international carbon taxation literacy and practical carbon accounting.'
    }
  ]
};

export const initialGoldenConstantPage: GoldenConstantPageData = {
  introTitle: '表彰誠信治理與永續共榮典範，樹立產業標竿。',
  introTitle_en: 'Honoring integrity governance and sustainable co-prosperity paradigms, setting industry benchmarks.',
  introDesc: '「金恆獎」由世界公民文化基金會設立，旨在評選並表揚在商業治理誠信、氣候減碳行動、以及社會共融發展等維度取得傑出成效的企業。獎項名稱意指「永續追求、價值恆久」，是推動台灣企業接軌 ESG 國際賽道的重要倡議。',
  introDesc_en: 'The Golden Constant Award, established by the World Citizen Foundation, aims to evaluate and praise enterprises with outstanding achievements in business integrity, carbon reduction, and social inclusion.',
  purposeDesc: '以嚴謹的專家評選制度與公開數據指標，表彰不只追求財務報表，更積極承擔地球永續責任的模範企業。',
  purposeDesc_en: 'Using rigorous expert review and public data indicators, honoring role-model corporations that look beyond financial sheets to proactively bear environmental duties.',
  events: [
    {
      year: 2026,
      title: '2026 雙軸轉型金恆獎：表彰在綠色數位轉型取得卓越成就之永續典範企業',
      title_en: '2026 Twin-Axis Transformation Golden Constant Award: Celebrating Sustainable Role Models',
      category: '年度盛事',
      category_en: 'Annual Event',
      summary: '今年金恆獎以「雙軸轉型」為核心，聚焦在企業如何同時落實「綠色永續」與「數位創新」，共有數十家卓越企業角逐各項桂冠。',
      summary_en: 'Focusing on "Twin Transition" this year, highlighting how enterprises integrate green sustainability and digital innovation.',
      img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2026,
      title: '2026 金恆獎得獎名單與評審觀點發布',
      title_en: 'Release of 2026 Golden Constant Winner List & Judges Perspectives',
      category: '評審報告',
      category_en: 'Judges Report',
      summary: '本屆評審委員會由國內外永續專家組成，從碳盤查健全度、員工福祉、公司誠信治理三大維度，嚴謹篩選出各產業典範代表。',
      summary_en: 'Formed by local and international ESG experts, the committee selected industry role models across integrity governance, carbon tracking, and wellbeing.',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2025,
      title: '2025 綠色影響力金恆獎頒獎典禮：推動產業鏈淨零碳排跨界合作',
      title_en: '2025 Green Impact Golden Constant Award: Supplier Net-zero Collaboration',
      category: '頒獎典禮',
      category_en: 'Award Ceremony',
      summary: '2025 年金恆獎焦點在於「產業供應鏈」共榮，獎勵大型龍頭企業攜手中小企業夥伴，共同實施減碳減廢排程。',
      summary_en: 'The highlight of 2025 lies in green supply chain coexistence, encouraging giants to lead small-medium suppliers to perform carbon cuts.',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2024,
      title: '2024 首屆金恆獎啟動論壇：企業永續競爭力的新標準',
      title_en: '2024 Inaugural Golden Constant Forum: New Benchmark for Sustainable Competitiveness',
      category: '啟動論壇',
      category_en: 'Launch Forum',
      summary: '首屆金恆獎正式拉開序幕，以誠信透明與公眾價值為核心，號召台灣各界企業共同響應世界公民責任。',
      summary_en: 'Launching the very first award to highlight corporate transparency and public value, calling for alignment with global citizenship.',
      img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop'
    }
  ]
};

export const initialGoodnessLiteracyPage: GoodnessLiteracyPageData = {
  planTitle: '良善素養教育計畫 介紹',
  planTitle_en: 'Goodness Literacy Plan Introduction',
  planDesc: '良善素養教育的核心在於啟發學童與青少年的同理心、正向信念與社會責任感。本基金會積極推動「百萬學童：世界公民素養教育計畫」，舉辦「心良善・新校園講座」，融入社會情緒學習（SEL），引導學子在日常生活中養成主動關懷他人的習慣。',
  planDesc_en: 'The core of Goodness Literacy lies in inspiring empathy, positive beliefs, and social responsibility in children. We drive the "Million Children: World Citizen Literacy Education" project to guide moral growth.',
  planDescExtra: '本計畫目前已與全台數十所小學建立緊密合作，推動融入式教學，提供師資培訓與教材研發支持，為孩子的品格成長與公民素養打下堅實基礎。',
  planDescExtra_en: 'Working with dozens of elementary schools across Taiwan, we supply teacher training and curriculum design to establish strong foundations for character growth.',
  planTarget: '🎯 計畫指標：推廣優質教育 (SDG 4)',
  planTarget_en: '🎯 Target: Promote Quality Education (SDG 4)',
  planSchoolCount: '🏫 已合作校園：50+ 所小學',
  planSchoolCount_en: '🏫 Partner Campuses: 50+ Elementary Schools',
  citizenTitle: '良善世界公民專案計畫 介紹',
  citizenTitle_en: 'Goodness World Citizen Program Introduction',
  citizenDesc: '「良善世界公民專案」是一個讓孩子動手實踐社會責任的平台。我們在校園推動「良善卡活動」，結合社會情緒學習（SEL）課程，鼓勵學童組成小團隊，發掘身邊或社區中需要被改善的社會與環境痛點（例如：關懷長者、垃圾減量、社區綠化等），並自主策劃行動方案。',
  citizenDesc_en: 'The "Goodness World Citizen Program" is a platform for kids to practice social responsibility. Combining SEL curriculums, we encourage kids to discover environmental and community issues and take action.',
  citizenDescExtra: '透過「做中學」與實地實踐的過程，讓孩子們體驗自己也有改變世界的力量，將同理心與良善理念真正落實為解決實際問題的公民行動。',
  citizenDescExtra_en: 'Through learning-by-doing, kids experience their power to improve society, translating empathy into actual civic solutions.',
  citizenTarget: '🌍 專案指標：社會責任感與品格實踐',
  citizenTarget_en: '🌍 Target: Social Responsibility & Character Building',
  citizenCount: '💡 累積行動方案：120+ 件',
  citizenCount_en: '💡 Total Projects: 120+ cases',
  tools: [
    {
      emoji: '🃏',
      title: '善行卡',
      title_en: 'Goodness Card',
      desc: '精美設計的每日挑戰小卡，例如「向打掃阿姨道謝」、「隨手撿起走廊垃圾」，以遊戲化方式引導孩子做出良善舉動。',
      desc_en: 'Game-like challenge cards like "Say thanks to the janitor" or "Pick up trash on the hallway" to cultivate goodwill.'
    },
    {
      emoji: '📒',
      title: '善行手冊',
      title_en: 'Goodness Handbook',
      desc: '供學童記錄每日善行與反思的心得日記，輔以趣味漫畫引導與品格故事，讓良善成為孩子一生的生活核心習慣。',
      desc_en: 'A diary booklet to track daily good deeds, assisted by comics and moral stories to shape lifelong habits.'
    },
    {
      emoji: '🏫',
      title: '典範小學',
      title_en: 'Role-Model School',
      desc: '全面落實良善教育、營造溫暖共融校園風氣的示範學校。我們定期評選出典範校區，推廣其校本課程經驗。',
      desc_en: 'Demonstration schools that implement Goodness Education and promote warm, inclusive campus atmospheres.'
    }
  ]
};

export const initialAnnualConcertPage: AnnualConcertPageData = {
  introTitle: '用音樂傳遞愛與永續的能量，融化人心，串聯希望。',
  introTitle_en: 'Using music to transmit love and sustainable energy, melting hearts and connecting hope.',
  introDesc: '世界公民數位治理基金會每年定期舉辦年度慈善音樂會，邀請國內外頂尖樂團與藝術家共襄盛舉。音樂會扣除製作成本後的所得，皆投入良善教育、環境永續等公益專案，以音樂化作實質的社會變革行動。',
  introDesc_en: 'WCF hosts an annual charity concert inviting top orchestras and artists. Proceeds go to education and environmental projects.',
  surplusDesc: '用於良善素養教育推廣、善行手冊教材研發印製、偏鄉校園關懷與綠色公民獎學金。',
  surplusDesc_en: 'Used for promoting Goodness Literacy, developing Goodness Handbooks, caring for rural schools, and Green Citizen Scholarships.',
  concerts: [
    {
      year: 2026,
      title: '2026 世界公民年度慈善音樂會：《綠之迴響》',
      title_en: '2026 World Citizen Annual Charity Concert: Echo of Green',
      theme: '環境共生與大地樂章',
      theme_en: 'Environmental Coexistence & Earth Movement',
      location: '台北國家音樂廳',
      location_en: 'National Concert Hall, Taipei',
      img: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=600&auto=format&fit=crop',
      desc: '本屆音樂會以綠色大地為創作靈感，邀請國家交響樂團與知名環保歌手跨界合演，門票盈餘全數投入良善偏鄉教育基金。',
      desc_en: 'Inspired by the green earth, featuring National Symphony Orchestra and eco-singers. Proceeds go to rural education.'
    },
    {
      year: 2025,
      title: '2025 世界公民年度慈善音樂會：《藍色星球》',
      title_en: '2025 World Citizen Annual Charity Concert: Blue Planet',
      theme: '守護海洋與永續水資源',
      theme_en: 'Protecting Oceans & Water Resources',
      location: '衛武營國家藝術文化中心',
      location_en: 'Weiwuying National Arts Center',
      img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
      desc: '2025 年以水資源與海洋保育為核心主題，藉由管弦樂演奏模擬潮汐與海洋呼吸，喚醒大眾對於水生態系統保護之重視。',
      desc_en: 'Highlighting ocean conservation and marine habitats. The orchestra mimics tides and oceanic rhythms to spark environmental concern.'
    },
    {
      year: 2024,
      title: '2024 世界公民首屆慈善音樂會：《和諧共存》',
      title_en: '2024 Inaugural Charity Concert: Harmony & Coexistence',
      theme: '人與自然的和諧對話',
      theme_en: 'Dialogue Between Humans & Nature',
      location: '台中國家歌劇院',
      location_en: 'National Taichung Theater',
      img: 'https://images.unsplash.com/photo-1469228238522-7a89551ee2fc?q=80&w=600&auto=format&fit=crop',
      desc: '首屆慈善音樂會正式啟動，集結海內外優秀青年鋼琴家與大提琴家，用音符串起跨世代的地球守護約定。',
      desc_en: 'The very first charity concert to raise funds, bringing together local and overseas pianists and cellists to compose vows.'
    }
  ]
};
