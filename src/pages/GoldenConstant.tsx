import { useState } from 'react';
import SubPageLayout from '../components/SubPageLayout';

interface AwardEvent {
  year: number;
  title: string;
  category: string;
  summary: string;
  img: string;
}

export default function GoldenConstant() {
  const years = [2026, 2025, 2024];
  const [selectedYear, setSelectedYear] = useState(2026);

  const awardEvents: AwardEvent[] = [
    {
      year: 2026,
      title: '2026 雙軸轉型金恆獎：表彰在綠色數位轉型取得卓越成就之永續典範企業',
      category: '年度盛事',
      summary: '今年金恆獎以「雙軸轉型」為核心，聚焦在企業如何同時落實「綠色永續」與「數位創新」，共有數十家卓越企業角逐各項桂冠。',
      img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2026,
      title: '2026 金恆獎得獎名單與評審觀點發布',
      category: '評審報告',
      summary: '本屆評審委員會由國內外永續專家組成，從碳盤查健全度、員工福祉、公司誠信治理三大維度，嚴謹篩選出各產業典範代表。',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2025,
      title: '2025 綠色影響力金恆獎頒獎典禮：推動產業鏈淨零碳排跨界合作',
      category: '頒獎典禮',
      summary: '2025 年金恆獎焦點在於「產業供應鏈」共榮，獎勵大型龍頭企業攜手中小企業夥伴，共同實施減碳減廢排程。',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop'
    },
    {
      year: 2024,
      title: '2024 首屆金恆獎啟動論壇：企業永續競爭力的新標準',
      category: '啟動論壇',
      summary: '首屆金恆獎正式拉開序幕，以誠信透明與公眾價值為核心，號召台灣各界企業共同響應世界公民責任。',
      img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredEvents = awardEvents.filter(event => event.year === selectedYear);

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            服務專案
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            金恆獎 (Golden Constant Award)
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              表彰誠信治理與永續共榮典範，樹立產業標竿。
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              「金恆獎」由世界公民文化基金會設立，旨在評選並表揚在商業治理誠信、氣候減碳行動、以及社會共融發展等維度取得傑出成效的企業。獎項名稱意指「永續追求、價值恆久」，是推動台灣企業接軌 ESG 國際賽道的重要倡議。
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">金恆獎宗旨</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              以嚴謹的專家評選制度與公開數據指標，表彰不只追求財務報表，更積極承擔地球永續責任的模範企業。
            </p>
          </div>
        </div>

        {/* Years Filter Tab Bar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">
              各年份得獎資訊與活動紀錄
            </h3>
            <div className="flex space-x-2">
              {years.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    selectedYear === yr
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {yr} 年
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid */}
          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-slate-400 text-xs">
              暫無該年份的紀錄檔案。
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative">
                    <img src={event.img} alt={event.title} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-brand-navy text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold block">{event.year} 年度特輯</span>
                      <h4 className="text-sm font-extrabold text-slate-800 leading-snug hover:text-brand-orange transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {event.summary}
                      </p>
                    </div>
                    <button className="mt-4 w-full py-2 border border-slate-100 hover:border-slate-800 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all duration-300">
                      閱讀詳情 &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
