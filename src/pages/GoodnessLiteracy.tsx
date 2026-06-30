import { useState } from 'react';
import SubPageLayout from '../components/SubPageLayout';

export default function GoodnessLiteracy() {
  const [activeTab, setActiveTab] = useState<'plan' | 'citizen' | 'tools'>('plan');

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            服務專案
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            良善素養教育 (Goodness Literacy)
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
            良善素養教育計畫
          </button>
          <button
            onClick={() => setActiveTab('citizen')}
            className={`pb-4 text-xs font-bold tracking-wide border-b-2 transition-all duration-300 ${
              activeTab === 'citizen'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            良善世界公民專案
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`pb-4 text-xs font-bold tracking-wide border-b-2 transition-all duration-300 ${
              activeTab === 'tools'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            善行工具與典範小學
          </button>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {activeTab === 'plan' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">良善素養教育計畫 介紹</h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                良善素養教育的核心在於啟發學童與青少年的同理心、正向信念與社會責任感。本基金會積極推動「百萬學童：世界公民素養教育計畫」，舉辦「心良善・新校園講座」，融入社會情緒學習（SEL），引導學子在日常生活中養成主動關懷他人的習慣。
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                本計畫目前已與全台數十所小學建立緊密合作，推動融入式教學，提供師資培訓與教材研發支持，為孩子的品格成長與公民素養打下堅實基礎。
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold">
                <span>🎯 計畫指標：推廣優質教育 (SDG 4)</span>
                <span>‧</span>
                <span>🏫 已合作校園：50+ 所小學</span>
              </div>
            </div>
          )}

          {activeTab === 'citizen' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">良善世界公民專案計畫 介紹</h2>
              <p className="text-slate-600 text-xs leading-relaxed">
                「良善世界公民專案」是一個讓孩子動手實踐社會責任的平台。我們在校園推動「良善卡活動」，結合社會情緒學習（SEL）課程，鼓勵學童組成小團隊，發掘身邊或社區中需要被改善的社會與環境痛點（例如：關懷長者、垃圾減量、社區綠化等），並自主策劃行動方案。
              </p>
              <p className="text-slate-600 text-xs leading-relaxed">
                透過「做中學」與實地實踐的過程，讓孩子們體驗自己也有改變世界的力量，將同理心與良善理念真正落實為解決實際問題的公民行動。
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold">
                <span>🌍 專案指標：社會責任感與品格實踐</span>
                <span>‧</span>
                <span>💡 累積行動方案：120+ 件</span>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-lg font-black text-slate-800">善行卡、善行手冊與典範小學 介紹</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xl">🃏</span>
                  <h3 className="text-xs font-bold text-slate-800">善行卡</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    精美設計的每日挑戰小卡，例如「向打掃阿姨道謝」、「隨手撿起走廊垃圾」，以遊戲化方式引導孩子做出良善舉動。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xl">📒</span>
                  <h3 className="text-xs font-bold text-slate-800">善行手冊</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    供學童記錄每日善行與反思的心得日記，輔以趣味漫畫引導與品格故事，讓良善成為孩子一生的生活核心習慣。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xl">🏫</span>
                  <h3 className="text-xs font-bold text-slate-800">典範小學</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    全面落實良善教育、營造溫暖共融校園風氣的示範學校。我們定期評選出典範校區，推廣其校本課程經驗。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
