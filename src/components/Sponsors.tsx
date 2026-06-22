import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialSponsors, initialAwardWinners } from '../data/siteInitialData';
import type { SponsorData, AwardWinnerData } from '../data/siteInitialData';

export default function Sponsors() {
  const [sponsorsList, setSponsorsList] = useState<SponsorData[]>(initialSponsors);
  const [winnersList, setWinnersList] = useState<AwardWinnerData[]>(initialAwardWinners);

  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const spData = await loadConfig<SponsorData[]>('sponsors');
      if (spData && spData.length > 0) {
        setSponsorsList(spData);
      }
      const winData = await loadConfig<AwardWinnerData[]>('award_winners');
      if (winData && winData.length > 0) {
        setWinnersList(winData);
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);

  // Duplicate the list to make the marquee loop seamless
  const marqueeList = [...sponsorsList, ...sponsorsList];

  return (
    <section className="py-24 bg-brand-navy-dark border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-amber/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
            HONORS & PARTNERS
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
            企業贊助與榮譽榜
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            感謝國內領導級企業在世界公民親子音樂會及未來論壇的鼎力贊助，共同為台灣的ESG實踐奠定基石。
          </p>
        </div>

        {/* Infinite Logo Carousel Wrapper */}
        <div className="relative w-full overflow-hidden py-10 bg-brand-navy/30 border border-white/5 rounded-2xl">
          {/* Edge overlays to fade out the logos on the sides */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-navy-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-navy-dark to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Track */}
          <div className="flex w-max animate-infinite-scroll space-x-12 hover:[animation-play-state:paused]">
            {marqueeList.map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className="flex flex-col items-center justify-center w-48 h-24 bg-brand-navy border border-white/5 rounded-xl hover:border-brand-amber/40 hover:shadow-lg hover:shadow-brand-amber/5 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer select-none group"
              >
                {/* Simulated Logo emblem */}
                <div 
                  className="w-2.5 h-8 rounded-full mb-1 bg-gradient-to-b group-hover:scale-y-125 transition-transform duration-300"
                  style={{ backgroundColor: sponsor.color }}
                />
                <span className="text-sm font-heading font-bold text-white tracking-wide">
                  {sponsor.name}
                </span>
                <span className="text-[9px] text-white/40 tracking-wider">
                  {sponsor.englishName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold Constant Award Winners Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-wide flex items-center justify-center space-x-2">
            <Lucide.Award className="w-6 h-6 text-brand-amber animate-pulse" />
            <span>雙軸轉型金恆獎：得獎企業榮譽</span>
          </h3>
          <p className="text-white/40 text-sm mt-2">
            表揚在綠色淨零與數位韌性取得雙軸重大進展的典範代表
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {winnersList.map((winner) => {
            const IconComp = (Lucide as any)[winner.iconName] || Lucide.HelpCircle;
            return (
              <div 
                key={winner.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-brand-navy border border-white/10 hover:border-brand-amber/50 hover:shadow-2xl hover:shadow-brand-amber/5 transition-all duration-300"
              >
                {/* Glowing backdrop border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-amber/0 via-brand-amber/0 to-brand-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="space-y-6 relative z-10">
                  {/* Icon Badge */}
                  <div className="w-10 h-10 rounded-lg bg-brand-amber/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber group-hover:scale-110 transition-transform duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-heading font-bold text-white group-hover:text-brand-amber transition-colors duration-300">
                      {winner.company}
                    </h4>
                    <span className="inline-block text-[11px] font-semibold text-brand-amber border border-brand-amber/20 bg-brand-amber/5 px-2.5 py-0.5 rounded">
                      {winner.award}
                    </span>
                    <p className="text-xs text-white/50 leading-relaxed font-light pt-2">
                      {winner.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 text-right">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Golden Constant Award
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
