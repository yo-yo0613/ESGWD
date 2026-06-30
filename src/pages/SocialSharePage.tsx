import SubPageLayout from '../components/SubPageLayout';

interface SocialPost {
  platform: 'facebook' | 'instagram';
  date: string;
  author: string;
  content: string;
  img?: string;
  likes: number;
}

export default function SocialSharePage() {
  const posts: SocialPost[] = [
    {
      platform: 'facebook',
      date: '2026-06-25',
      author: '世界公民數位治理基金會 World Citizens & Digital Governance',
      content: '【2026 金恆獎得獎企業名單揭曉】恭喜所有在誠信治理、環境永續取得卓越成就的典範企業！評審報告與頒獎典禮精采剪影已發布於官方網站，讓我們攜手並進，邁向淨零未來！🌱💪',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
      likes: 148
    },
    {
      platform: 'instagram',
      date: '2026-06-22',
      author: 'worldcitizen_tw',
      content: '感謝全台超過50所國民小學共同響應「良善素養教育計畫」！善行手冊與善行挑战小卡在課堂上引起了極大迴響，看到孩子們開心地主動關懷身邊的人，就是我們持續前進的最大動力！❤️🏫🎒',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
      likes: 215
    }
  ];

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            社群分享
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            社群最新動態 (Social Feed)
          </h1>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
          歡迎關注我們的官方社群專頁。此處會同步更新我們在 Facebook 及 Instagram 發布的最新公益成果與倡議消息。
        </p>

        {/* Feed layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-brand-orange">
                    {post.platform === 'facebook' ? 'f' : 'ig'}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{post.author}</h3>
                    <span className="text-[10px] text-slate-400 font-semibold block">{post.date}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  post.platform === 'facebook' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                  {post.platform}
                </span>
              </div>
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-slate-600 text-xs leading-relaxed white-space-pre-line">
                  {post.content}
                </p>
                {post.img && (
                  <div className="aspect-[16/9] w-full rounded-2xl bg-slate-50 overflow-hidden mt-4">
                    <img src={post.img} alt="post media" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                <span>❤️ {post.likes} 個讚</span>
                <a 
                  href={post.platform === 'facebook' ? 'https://facebook.com' : 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-orange hover:underline"
                >
                  前往原文 &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
