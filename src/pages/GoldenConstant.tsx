import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { useLanguage } from '../context/LanguageContext';
import { loadConfig } from '../utils/configLoader';
import { initialGoldenConstantPage } from '../data/siteProjectsInitialData';
import type { GoldenConstantPageData } from '../data/siteProjectsInitialData';

export default function GoldenConstant() {
  const { language, t } = useLanguage();
  const [pageData, setPageData] = useState<GoldenConstantPageData>(initialGoldenConstantPage);
  const [selectedYear, setSelectedYear] = useState(2026);

  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<GoldenConstantPageData>('page_golden_constant');
      if (data) {
        setPageData(data);
        // Find highest year available
        if (data.events && data.events.length > 0) {
          const yearsList = Array.from(new Set(data.events.map(e => e.year))).sort((a, b) => b - a);
          setSelectedYear(yearsList[0]);
        }
      }
    };
    fetchConfig();
  }, []);

  const years = pageData.events 
    ? Array.from(new Set(pageData.events.map(event => event.year))).sort((a, b) => b - a)
    : [2026, 2025, 2024];

  const filteredEvents = pageData.events
    ? pageData.events.filter(event => event.year === selectedYear)
    : [];

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            {t('nav.services')}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            {bi('金恆獎', 'Golden Constant Award')}
          </h1>
        </div>

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              {bi(pageData.introTitle, pageData.introTitle_en)}
            </h2>
            <p className="text-slate-655 leading-relaxed text-sm font-light">
              {bi(pageData.introDesc, pageData.introDesc_en)}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
              {bi('金恆獎宗旨', 'AWARD MISSION')}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {bi(pageData.purposeDesc, pageData.purposeDesc_en)}
            </p>
          </div>
        </div>

        {/* Years Filter Tab Bar */}
        <div className="space-y-6 pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3 gap-4">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">
              {bi('各年份得獎資訊與活動紀錄', 'Winners & Events Archive')}
            </h3>
            <div className="flex flex-wrap gap-2">
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
                  {yr} {bi('年', 'Year')}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid */}
          {filteredEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-slate-400 text-xs">
              {bi('暫無該年份的紀錄檔案。', 'No archives found for this year.')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                  <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative">
                    <img src={event.img} alt={bi(event.title, event.title_en)} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-brand-navy text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {bi(event.category, event.category_en)}
                    </span>
                  </div>
                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold block">
                        {event.year} {bi('年度特輯', 'Special Feature')}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-800 leading-snug hover:text-brand-orange transition-colors">
                        {bi(event.title, event.title_en)}
                      </h4>
                      <p className="text-slate-505 text-xs leading-relaxed line-clamp-3 font-light">
                        {bi(event.summary, event.summary_en)}
                      </p>
                    </div>
                    <button 
                      onClick={() => alert(language === 'en' ? 'Opening detailed report... (Simulation)' : '打開詳細報告中... (模擬)')}
                      className="mt-4 w-full py-2 border border-slate-100 hover:border-slate-800 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all duration-300"
                    >
                      {bi('閱讀詳情 →', 'Read More →')}
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
