import { useState, useEffect } from 'react';
import { initialBentoData } from '../data/bentoInitialData';
import type { BentoBlock } from '../data/bentoInitialData';
import { supabase } from '../utils/supabaseClient';
import { Calendar, Tag, ArrowUpRight } from 'lucide-react';

export default function BentoGridSection() {
  const [blocks, setBlocks] = useState<BentoBlock[]>([]);

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const { data, error } = await supabase
          .from('bento_blocks')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        if (data) {
          const camelCaseData: BentoBlock[] = data.map((item: any) => ({
            id: item.id,
            cardType: item.card_type,
            bentoSize: item.bento_size,
            title: item.title,
            subtitle: item.subtitle || undefined,
            imageUrl: item.image_url || undefined,
            tag: item.tag || undefined,
            buttonText: item.button_text || undefined,
            date: item.date
          }));
          setBlocks(camelCaseData);
          localStorage.setItem('esg_bento_blocks', JSON.stringify(camelCaseData));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to localStorage:', err);
        const stored = localStorage.getItem('esg_bento_blocks');
        if (stored) {
          try {
            setBlocks(JSON.parse(stored));
          } catch (e) {
            setBlocks(initialBentoData);
          }
        } else {
          setBlocks(initialBentoData);
          localStorage.setItem('esg_bento_blocks', JSON.stringify(initialBentoData));
        }
      }
    };

    loadBlocks();
    // Listen for storage changes in case the admin panel updates it locally
    window.addEventListener('storage', loadBlocks);
    return () => window.removeEventListener('storage', loadBlocks);
  }, []);

  const sizeClassMap = (size: 'large' | 'wide' | 'small') => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[500px]';
      case 'wide':
        return 'md:col-span-2 md:row-span-1 min-h-[240px]';
      case 'small':
        return 'md:col-span-1 md:row-span-1 min-h-[240px]';
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[240px]';
    }
  };

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Light */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
              Bento Grid Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900">
              便當盒動態網格看板
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              結合視覺張力與資訊密度的模組化排版，動態呈現基金會最核心的活動、最新消息與企業會員權益。
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <a 
              href="/admin" 
              className="inline-flex items-center space-x-2 text-xs font-bold text-brand-amber border border-brand-amber/20 hover:border-brand-amber bg-brand-amber/5 px-4 py-2.5 rounded-xl hover:bg-brand-amber hover:text-brand-navy transition-all duration-300"
            >
              <span>進入後台 (CMS) 管理佈局</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 auto-rows-max">
          {blocks.map((block) => {
            const isHero = block.cardType === 'hero';
            const isCta = block.cardType === 'cta';
            const sizeClass = sizeClassMap(block.bentoSize);

            // 1. Hero Card Layout (image background + overlay + bottom text)
            if (isHero) {
              return (
                <div
                  key={block.id}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-brand-amber hover:-translate-y-1 transition-all duration-300 cursor-pointer ${sizeClass}`}
                >
                  {/* Background Image */}
                  {block.imageUrl ? (
                    <img
                      src={block.imageUrl}
                      alt={block.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100" />
                  )}

                  {/* Gradient Black Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-10" />

                  {/* Content */}
                  <div className="relative z-20 p-6 md:p-8 space-y-3">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-orange border border-brand-orange/30 bg-brand-orange/10 px-2.5 py-1 rounded">
                      音樂會焦點
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white leading-snug drop-shadow">
                      {block.title}
                    </h3>
                    {block.subtitle && (
                      <p className="text-sm text-white/70 font-light leading-relaxed max-w-md">
                        {block.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            }

            // 2. CTA Card Layout (bright orange background, text white)
            if (isCta) {
              return (
                <div
                  key={block.id}
                  className={`group flex flex-col justify-between p-6 md:p-8 overflow-hidden rounded-3xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white shadow-lg hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${sizeClass}`}
                >
                  <div className="space-y-3">
                    <span className="inline-block text-[9px] font-bold tracking-widest uppercase text-brand-navy bg-white/95 px-2.5 py-1 rounded-full">
                      Membership
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-brand-navy-dark leading-snug">
                      {block.title}
                    </h3>
                    {block.subtitle && (
                      <p className="text-xs text-white/90 leading-relaxed font-light">
                        {block.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-6">
                    <button className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold tracking-wider uppercase shadow-md transition-colors duration-300">
                      {block.            // 3. Event & News Card Layout (split design or background picture card)
            return (
              <div
                key={block.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-slate-350 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${sizeClass}`}
              >
                {/* Background image cover with light overlay */}
                {block.imageUrl && (
                  <>
                    <img
                      src={block.imageUrl}
                      alt={block.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-0" />
                  </>
                )}

                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    {block.tag && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-brand-amber border border-brand-amber/20 bg-brand-amber/5 px-2.5 py-0.5 rounded">
                        <Tag className="w-3 h-3" />
                        <span>{block.tag}</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{block.date}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-slate-800 group-hover:text-brand-orange transition-colors duration-300 leading-snug">
                    {block.title}
                  </h3>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 text-right">
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-brand-orange group-hover:text-brand-orange/80 transition-colors">
                    <span>了解詳情</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
