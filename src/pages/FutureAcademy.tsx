import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { useLanguage } from '../context/LanguageContext';
import { loadConfig } from '../utils/configLoader';
import { initialFutureAcademyPage } from '../data/siteProjectsInitialData';
import type { FutureAcademyPageData } from '../data/siteProjectsInitialData';

export default function FutureAcademy() {
  const { language, t } = useLanguage();
  const [pageData, setPageData] = useState<FutureAcademyPageData>(initialFutureAcademyPage);

  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<FutureAcademyPageData>('page_future_academy');
      if (data) {
        setPageData(data);
      }
    };
    fetchConfig();
  }, []);

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in pb-12">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            {t('nav.services')}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            {bi('未來學院', 'Future Academy')}
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-tr from-slate-100 to-slate-200/50 rounded-3xl p-8 border border-slate-200/80 shadow-inner flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-xl md:text-2xl font-black text-brand-navy leading-snug">
              {bi(pageData.heroTitle, pageData.heroTitle_en)}
            </h2>
            <p className="text-slate-655 text-xs leading-relaxed font-light">
              {bi(pageData.heroDesc, pageData.heroDesc_en)}
            </p>
          </div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center shrink-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
              {bi('目前累計培訓', 'TOTAL TRAINED')}
            </span>
            <span className="text-3xl font-black text-brand-orange block my-1">{pageData.trainedCount}</span>
            <span className="text-[10px] text-slate-600 font-bold block">
              {bi(pageData.trainedLabel, pageData.trainedLabel_en)}
            </span>
          </div>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pageData.courses && pageData.courses.map((course, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <span className="text-2xl">{course.icon || '📚'}</span>
              <h3 className="text-sm font-bold text-slate-800">
                {bi(course.title, course.title_en)}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed font-light">
                {bi(course.desc, course.desc_en)}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery / Highlights presentation section */}
        {pageData.gallery && pageData.gallery.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-brand-navy">
                {bi('學院剪影與活動亮點', 'Academy Highlights & Event Gallery')}
              </h2>
              <p className="text-xs text-slate-400">
                {bi('探索我們歷年舉辦的論壇與學術講座現場剪影', 'Explore moments from our forums and governance seminars over the years')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pageData.gallery.map((img, idx) => (
                <div key={idx} className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-slate-900 relative">
                    <img 
                      src={img.url} 
                      alt={bi(img.title, img.title_en)} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-xs font-extrabold text-slate-800 group-hover:text-brand-orange transition-colors">
                      {bi(img.title, img.title_en)}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                      {bi(img.desc, img.desc_en)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
