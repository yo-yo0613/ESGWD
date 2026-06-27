import { useState } from 'react';
import SubPageLayout from '../components/SubPageLayout';

interface ConcertEvent {
  year: number;
  title: string;
  theme: string;
  location: string;
  img: string;
  desc: string;
}

export default function AnnualConcert() {
  const years = [2026, 2025, 2024];
  const [selectedYear, setSelectedYear] = useState(2026);

  const concerts: ConcertEvent[] = [
    {
      year: 2026,
      title: '2026 世界公民年度慈善音樂會：《綠之迴響》',
      theme: '環境共生與大地樂章',
      location: '台北國家音樂廳',
      img: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=600&auto=format&fit=crop',
      desc: '本屆音樂會以綠色大地為創作靈感，邀請國家交響樂團與知名環保歌手跨界合演，門票盈餘全數投入良善偏鄉教育基金。'
    },
    {
      year: 2025,
      title: '2025 世界公民年度慈善音樂會：《藍色星球》',
      theme: '守護海洋與永續水資源',
      location: '衛武營國家藝術文化中心',
      img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
      desc: '2025 年以水資源與海洋保育為核心主題，藉由管弦樂演奏模擬潮汐與海洋呼吸，喚醒大眾對於水生態系統保護之重視。'
    },
    {
      year: 2024,
      title: '2024 世界公民首屆慈善音樂會：《和諧共存》',
      theme: '人與自然的和諧對話',
      location: '台中國家歌劇院',
      img: 'https://images.unsplash.com/photo-1469228238522-7a89551ee2fc?q=80&w=600&auto=format&fit=crop',
      desc: '首屆慈善音樂會正式啟動，集結海內外優秀青年鋼琴家與大提琴家，用音符串起跨世代的地球守護約定。'
    }
  ];

  const filteredConcert = concerts.find(c => c.year === selectedYear);

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            服務專案
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            世界公民年度音樂會 (Annual Concert)
          </h1>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              用音樂傳遞愛與永續的能量，融化人心，串聯希望。
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              世界公民基金會每年定期舉辦年度慈善音樂會，邀請國內外頂尖樂團與藝術家共襄盛舉。音樂會扣除製作成本後的所得，皆投入良善教育、環境永續等公益專案，以音樂化作實質的社會變革行動。
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">慈善盈餘投向</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              用於良善素養教育推廣、善行手冊教材研發印製、偏鄉校園關懷與綠色公民獎學金。
            </p>
          </div>
        </div>

        {/* Year filter and content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">
              各年度音樂會精選回顧
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

          {/* Featured concert item */}
          {filteredConcert && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative lg:rounded-l-3xl">
                <img src={filteredConcert.img} alt={filteredConcert.title} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {filteredConcert.year} 慈善義演
                </span>
                <h4 className="text-xl font-black text-slate-800 leading-tight">
                  {filteredConcert.title}
                </h4>
                <div className="space-y-1 text-xs text-slate-500 font-semibold">
                  <p>🎵 主題：{filteredConcert.theme}</p>
                  <p>📍 地點：{filteredConcert.location}</p>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {filteredConcert.desc}
                </p>
                <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300">
                  回顧音樂會精彩剪影
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
