export interface BentoBlock {
  id: string;
  cardType: 'hero' | 'event' | 'news' | 'cta';
  bentoSize: 'large' | 'wide' | 'small';
  title: string;
  subtitle?: string;
  imageUrl?: string;
  tag?: string;
  buttonText?: string;
  date: string;
}

export const initialBentoData: BentoBlock[] = [
  {
    id: 'bento-1',
    cardType: 'hero',
    bentoSize: 'large',
    title: '2024百萬學童：愛向永續世界公民親子音樂會',
    subtitle: '傳達每位世界公民應具備的美德：良善',
    imageUrl: '/images/concert_hero.jpg',
    date: '2026-06-05'
  },
  {
    id: 'bento-2',
    cardType: 'event',
    bentoSize: 'wide',
    title: '2024年度論壇暨雙軸轉型金恆獎',
    tag: 'ESG企業治理',
    imageUrl: '/images/forum_hero.jpg',
    date: '2026-06-05'
  },
  {
    id: 'bento-3',
    cardType: 'news',
    bentoSize: 'wide',
    title: '基金會會歌 AI 音樂創作競賽正式開跑',
    tag: '青年與學童活動',
    imageUrl: '/images/ai_music_hero.jpg',
    date: '2026-06-05'
  },
  {
    id: 'bento-4',
    cardType: 'cta',
    bentoSize: 'small',
    title: '加入桂冠會員',
    subtitle: '每月 1,500 元送濾掛咖啡與帆布袋',
    buttonText: '立即線上支持',
    date: '2026-06-08'
  }
];
