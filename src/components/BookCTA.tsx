import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialBookCta } from '../data/siteInitialData';
import type { BookCtaData } from '../data/siteInitialData';

export default function BookCTA() {
  const [bookData, setBookData] = useState<BookCtaData>(initialBookCta);

  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<BookCtaData>('book_cta');
      if (data) {
        setBookData(data);
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);

  return (
    <section className="py-24 bg-brand-navy-dark text-white relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text Content - Columns 1 to 7 */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
              PUBLICATIONS & KNOWLEDGE
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              {bookData.title}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
              {bookData.description}
            </p>
          </div>

          {/* Book chapters / Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {bookData.highlights.map((highlight, index) => {
              const IconComponent = (Lucide as any)[highlight.iconName] || Lucide.HelpCircle;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-amber shrink-0">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{highlight.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed mt-1">{highlight.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Action */}
          <div className="pt-6">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('電子書下載中... (模擬下載)'); }}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-heading font-semibold text-brand-navy bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Lucide.Download className="w-5 h-5" />
              <span>{bookData.buttonText}</span>
            </a>
            <span className="block text-[11px] text-white/35 mt-3 tracking-wide pl-2">
              PDF 格式 · 繁體中文版 · 完整收錄 12 個核心章節
            </span>
          </div>
        </div>

        {/* 3D Book Mockup Display - Columns 8 to 12 */}
        <div className="lg:col-span-5 flex justify-center py-8">
          {/* 3D Book Container */}
          <div className="relative perspective-[1200px] w-64 h-96 group">
            {/* The Book */}
            <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700 ease-out rotate-y-[-12deg] rotate-x-[5deg] group-hover:rotate-y-[-24deg] group-hover:rotate-x-[8deg]">
              
              {/* Cover Face */}
              <div className="absolute inset-0 bg-brand-navy border-2 border-brand-amber/80 rounded-r-lg shadow-2xl z-20 flex flex-col justify-between p-6 overflow-hidden backface-hidden transform-translate-z-[12px]">
                {/* Gold Foil decorative borders */}
                <div className="absolute inset-2 border border-brand-amber/30 rounded" />
                
                {/* Cover Header */}
                <div className="text-center mt-6 z-10">
                  <span className="text-[10px] text-brand-amber font-heading font-semibold tracking-widest uppercase block mb-1">
                    Academic Publication
                  </span>
                  <div className="w-8 h-px bg-brand-amber/50 mx-auto" />
                </div>

                {/* Cover Title */}
                <div className="text-center z-10 px-2">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest leading-relaxed">
                    世界公民
                  </h3>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-widest leading-relaxed">
                    基本法的探索
                  </h3>
                  <span className="text-[10px] text-white/50 tracking-wide block mt-3 font-light italic">
                    The Exploration of World Citizen Basic Law
                  </span>
                </div>

                {/* Cover Footer */}
                <div className="text-center mb-6 z-10">
                  <p className="text-[10px] text-brand-amber tracking-wide">
                    世界公民基金會 著
                  </p>
                  <span className="text-[8px] text-white/30 tracking-widest block uppercase mt-1">
                    World Citizen Foundation
                  </span>
                </div>

                {/* Cover Subtle Book Texture */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Spine Face */}
              <div className="absolute top-0 bottom-0 left-0 w-6 bg-brand-navy-dark border-y-2 border-l-2 border-brand-amber/80 shadow-2xl origin-left rotate-y-[-90deg] translate-x-0 z-30 flex flex-col justify-between items-center py-6">
                <span className="text-[8px] text-brand-amber font-heading tracking-widest uppercase rotate-90 my-2 block">
                  WCF
                </span>
                <span className="text-[10px] text-white font-serif tracking-widest rotate-90 my-auto block whitespace-nowrap">
                  世界公民基本法的探索
                </span>
                <span className="text-[8px] text-brand-amber/50 rotate-90 my-2 block">
                  LAW
                </span>
              </div>

              {/* Back Cover */}
              <div className="absolute inset-0 bg-brand-navy border-2 border-brand-amber/50 rounded-l-lg shadow-2xl z-10 transform-translate-z-[-12px] rotate-y-180 flex items-center justify-center p-8 text-center">
                <div className="text-[10px] text-white/30 leading-relaxed">
                  本書探尋二十一世紀地球公民應具備之法律素養與全球責任。
                </div>
              </div>

              {/* Stacked Pages Edges Effect */}
              <div className="absolute top-1.5 bottom-1.5 right-[-14px] w-4 bg-slate-100 rounded-r shadow-md z-15 origin-left rotate-y-[-90deg] translate-z-[12px] skew-y-[10deg] flex flex-col justify-between overflow-hidden">
                {/* Faked lines for page edges */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-px w-full bg-slate-200 border-b border-slate-300" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
