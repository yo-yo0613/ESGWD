import SubPageLayout from '../components/SubPageLayout';

export default function FutureAcademy() {
  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            服務專案
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            未來學院 (Future Academy)
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-tr from-slate-100 to-slate-200/50 rounded-3xl p-8 border border-slate-200/80 shadow-inner flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-xl md:text-2xl font-black text-brand-navy leading-snug">
              培育面向 2030 永續世界的氣候行動與 ESG 領袖人才
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">
              「未來學院」是世界公民文化基金會旗下的核心人才培育基地。透過碳盤查、國際永續準則、環境永續設計思維等系列精修課程，協助青年學生、企業同仁快速接軌世界永續標準。
            </p>
          </div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center shrink-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">目前累計培訓</span>
            <span className="text-3xl font-black text-brand-orange block my-1">1,200+</span>
            <span className="text-[10px] text-slate-600 font-bold block">位永續領袖</span>
          </div>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🌱</span>
            <h3 className="text-sm font-bold text-slate-800">氣候變遷與減碳工作坊</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              專為企業與大專院校量身規劃的碳足跡盤查與減碳路徑規劃實戰課程，以實際案例出發，培育第一線低碳永續專案執行人才。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🌍</span>
            <h3 className="text-sm font-bold text-slate-800">世界公民永續論壇</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              每年定期舉辦國際青年論壇，邀請產官學專家探討 ESG 實踐挑戰，提供青年與領袖面對面對話、建構國際永續網絡的平台。
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🎨</span>
            <h3 className="text-sm font-bold text-slate-800">永續綠色設計思考</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              融入設計思考（Design Thinking），輔導學員探索校園與社區的永續痛點，從循環經濟、低碳科技出發提出實體解決方案。
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
