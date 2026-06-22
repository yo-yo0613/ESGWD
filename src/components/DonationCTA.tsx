import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialDonationPlans } from '../data/siteInitialData';
import type { DonationPlanData } from '../data/siteInitialData';

export default function DonationCTA() {
  const [plans, setPlans] = useState<DonationPlanData[]>(initialDonationPlans);
  const [selectedPlan, setSelectedPlan] = useState<number>(2); // Default to featured plan id 2

  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<DonationPlanData[]>('donation_plans');
      if (data && data.length > 0) {
        setPlans(data);
        
        // Ensure selected plan matches an existing plan ID
        const featuredPlan = data.find(p => p.featured);
        if (featuredPlan) {
          setSelectedPlan(featuredPlan.id);
        } else if (data[0]) {
          setSelectedPlan(data[0].id);
        }
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);

  const handleDonateSubmit = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    alert(`感謝您的善心！您已選擇「${plan?.name}」方案 (${plan?.price}/${plan?.pricePeriod})。即將導入安全金流刷卡頁面... (模擬結帳)`);
  };

  return (
    <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-brand-navy-dark to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
            MEMBERSHIP & SUPPORT
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white">
            桂冠會員認捐計畫
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            您的每一筆支持，都將投入世界公民教材研發、偏鄉學童音樂會，以及企業綠色轉型論壇的深耕與推廣。
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {plans.map((plan) => {
            const IconComp = (Lucide as any)[plan.iconName] || Lucide.HelpCircle;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex flex-col justify-between p-8 md:p-10 rounded-2xl border transition-all duration-500 cursor-pointer relative ${
                  isSelected 
                    ? 'border-brand-amber bg-brand-navy-dark/90 shadow-2xl scale-[1.03] ring-1 ring-brand-amber/35' 
                    : 'border-white/10 bg-brand-navy-light/40 hover:border-white/20 hover:bg-brand-navy-light/60'
                }`}
              >
                {/* Featured banner */}
                {plan.featured && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-brand-navy bg-gradient-to-r from-brand-amber to-brand-orange shadow-md uppercase">
                    熱門推薦
                  </span>
                )}

                <div className="space-y-6">
                  {/* Plan Name & Pricing */}
                  <div className="space-y-2">
                    <h3 className={`text-xl font-heading font-bold ${isSelected ? 'text-brand-amber' : 'text-white/90'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-xs text-white/40">/ {plan.pricePeriod}</span>
                    </div>
                  </div>

                  {/* Gift display block */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${plan.color} flex items-center justify-center text-white shrink-0`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-brand-amber tracking-wide flex items-center space-x-1">
                        <Lucide.Gift className="w-3.5 h-3.5 shrink-0" />
                        <span>認捐滿額禮：{plan.giftTitle}</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed font-light">
                      {plan.giftDesc}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] text-white/30 tracking-wider uppercase block">方案權益</span>
                    <ul className="space-y-2 text-xs">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-2 text-white/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-amber shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Select Radio display */}
                <div className="pt-8 flex items-center justify-between">
                  <span className="text-xs text-white/45">
                    {isSelected ? '已選取此認捐方案' : '點擊選取此方案'}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-brand-amber bg-brand-amber' : 'border-white/30'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-navy" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Action Button */}
        <div className="text-center space-y-4">
          <button
            onClick={handleDonateSubmit}
            className="px-12 py-5 rounded-xl font-heading font-bold text-base text-brand-navy bg-gradient-to-r from-brand-amber via-brand-orange to-brand-amber bg-[size:200%_auto] hover:bg-right hover:shadow-2xl hover:shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-500 flex items-center justify-center space-x-2 mx-auto"
          >
            <Lucide.Heart className="w-5 h-5 fill-brand-navy shrink-0" />
            <span>立即捐款支持我們</span>
            <Lucide.ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-white/40 max-w-md mx-auto leading-relaxed">
            依法捐款可開立節稅收據。本基金會採用經國家認證之 SSL 交易加密系統，保障您的付款隱私與交易安全。
          </p>
        </div>
      </div>
    </section>
  );
}
