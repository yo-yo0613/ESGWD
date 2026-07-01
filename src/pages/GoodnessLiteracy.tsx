import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { useLanguage } from '../context/LanguageContext';
import { loadConfig } from '../utils/configLoader';
import { initialGoodnessLiteracyPage } from '../data/siteProjectsInitialData';
import type { GoodnessLiteracyPageData } from '../data/siteProjectsInitialData';

export default function GoodnessLiteracy() {
  const { language, t } = useLanguage();
  const [pageData, setPageData] = useState<GoodnessLiteracyPageData>(initialGoodnessLiteracyPage);
  const [activeTab, setActiveTab] = useState<'plan' | 'citizen' | 'tools'>('plan');

  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<GoodnessLiteracyPageData>('page_goodness_literacy');
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
            {bi('良善素養教育', 'Goodness Literacy')}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-8">
          <button
            onClick={() => setActiveTab('plan')}
            className={`pb-4 text-xs font-bold tracking-wide border-b-2 transition-all duration-300 ${
              activeTab === 'plan'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {bi('良善素養教育計畫', 'Goodness Literacy Plan')}
          </button>
          <button
            onClick={() => setActiveTab('citizen')}
            className={`pb-4 text-xs font-bold tracking-wide border-b-2 transition-all duration-300 ${
              activeTab === 'citizen'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {bi('良善世界公民專案', 'Goodness World Citizen Program')}
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`pb-4 text-xs font-bold tracking-wide border-b-2 transition-all duration-300 ${
              activeTab === 'tools'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            {bi('善行工具與典範小學', 'Tools & Model Schools')}
          </button>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {activeTab === 'plan' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">
                {bi(pageData.planTitle, pageData.planTitle_en)}
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed font-light">
                {bi(pageData.planDesc, pageData.planDesc_en)}
              </p>
              <p className="text-slate-600 text-xs leading-relaxed font-light">
                {bi(pageData.planDescExtra, pageData.planDescExtra_en)}
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold">
                <span>{bi(pageData.planTarget, pageData.planTarget_en)}</span>
                <span>‧</span>
                <span>{bi(pageData.planSchoolCount, pageData.planSchoolCount_en)}</span>
              </div>
            </div>
          )}

          {activeTab === 'citizen' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">
                {bi(pageData.citizenTitle, pageData.citizenTitle_en)}
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed font-light">
                {bi(pageData.citizenDesc, pageData.citizenDesc_en)}
              </p>
              <p className="text-slate-600 text-xs leading-relaxed font-light">
                {bi(pageData.citizenDescExtra, pageData.citizenDescExtra_en)}
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold">
                <span>{bi(pageData.citizenTarget, pageData.citizenTarget_en)}</span>
                <span>‧</span>
                <span>{bi(pageData.citizenCount, pageData.citizenCount_en)}</span>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">
                {bi('善行卡、善行手冊與典範小學 介紹', 'Goodness Cards, Handbooks & Role-Model Schools')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pageData.tools && pageData.tools.map((tool, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                    <div className="space-y-2">
                      <span className="text-xl block">{tool.emoji || '🎒'}</span>
                      <h3 className="text-xs font-bold text-slate-800">
                        {bi(tool.title, tool.title_en)}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed font-light">
                        {bi(tool.desc, tool.desc_en)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
