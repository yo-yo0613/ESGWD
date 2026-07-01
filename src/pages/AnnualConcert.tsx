import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { useLanguage } from '../context/LanguageContext';
import { loadConfig } from '../utils/configLoader';
import { initialAnnualConcertPage } from '../data/siteProjectsInitialData';
import type { AnnualConcertPageData } from '../data/siteProjectsInitialData';

export default function AnnualConcert() {
  const { language, t } = useLanguage();
  const [pageData, setPageData] = useState<AnnualConcertPageData>(initialAnnualConcertPage);
  const [selectedYear, setSelectedYear] = useState(2026);

  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<AnnualConcertPageData>('page_annual_concert');
      if (data) {
        setPageData(data);
        if (data.concerts && data.concerts.length > 0) {
          const yearsList = Array.from(new Set(data.concerts.map(c => c.year))).sort((a, b) => b - a);
          setSelectedYear(yearsList[0]);
        }
      }
    };
    fetchConfig();
  }, []);

  const years = pageData.concerts
    ? Array.from(new Set(pageData.concerts.map(c => c.year))).sort((a, b) => b - a)
    : [2026, 2025, 2024];

  const filteredConcert = pageData.concerts
    ? pageData.concerts.find(c => c.year === selectedYear)
    : null;

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in pb-12">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            {t('nav.services')}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            {bi('世界公民年度音樂會', 'Annual Charity Concert')}
          </h1>
        </div>

        {/* Intro */}
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
              {bi('慈善盈餘投向', 'PROCEEDS DESTINATION')}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {bi(pageData.surplusDesc, pageData.surplusDesc_en)}
            </p>
          </div>
        </div>

        {/* Year filter and content */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3 gap-4">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">
              {bi('各年度音樂會精選回顧', 'Annual Concert Highlights & Review')}
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

          {/* Featured concert item */}
          {filteredConcert ? (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center hover:shadow-md transition-shadow duration-300">
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative lg:rounded-l-3xl">
                <img src={filteredConcert.img} alt={bi(filteredConcert.title, filteredConcert.title_en)} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {filteredConcert.year} {bi('慈善義演', 'Charity Recital')}
                </span>
                <h4 className="text-xl font-black text-slate-800 leading-tight">
                  {bi(filteredConcert.title, filteredConcert.title_en)}
                </h4>
                <div className="space-y-1.5 text-xs text-slate-500 font-semibold">
                  <p>🎵 {bi('主題：', 'Theme: ')}{bi(filteredConcert.theme, filteredConcert.theme_en)}</p>
                  <p>📍 {bi('地點：', 'Venue: ')}{bi(filteredConcert.location, filteredConcert.location_en)}</p>
                </div>
                <p className="text-slate-655 text-xs leading-relaxed font-light">
                  {bi(filteredConcert.desc, filteredConcert.desc_en)}
                </p>
                <button 
                  onClick={() => alert(language === 'en' ? 'Showing concert photo album... (Simulation)' : '顯示音樂會相簿中... (模擬)')}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300"
                >
                  {bi('回顧音樂會精彩剪影', 'View Concert Gallery')}
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center text-slate-400 text-xs">
              {bi('此年度暫無音樂會紀錄。', 'No concert record for this year.')}
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
