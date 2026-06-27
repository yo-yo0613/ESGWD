import SubPageLayout from '../components/SubPageLayout';

export default function AboutAssociation() {
  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            關於我們
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            本會介紹
          </h1>
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              致力於推廣環境、社會與治理 (ESG) 的全球發展與教育，建立永續共存的綠色未來。
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              世界公民文化基金會成立於 2005 年，以「培養具備全球視野與社會責任感的世界公民」為宗旨。我們深信，面對全球氣候變遷與資源耗竭的挑戰，每一個人都應具備守護地球、關懷社會的素養。
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              近年來，我們全力投入於環境保護、社會責任及組織治理（ESG）的教育與實踐。透過倡議、大型論壇、跨界專案以及公益活動，將永續發展理念深植於企業、校園與社區中。
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-brand-amber/10 to-brand-orange/20 border border-slate-200 flex items-center justify-center p-8 relative overflow-hidden shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-black text-white text-xl shadow-lg shadow-brand-orange/20 z-10">
              ESG
            </div>
            <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[1px] flex flex-col justify-end p-6">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">World Citizen Foundation</span>
              <span className="text-xs font-bold text-slate-600 mt-1">推動地球永續的核心推手</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-orange font-bold text-lg">
              🎯
            </div>
            <h3 className="text-lg font-bold text-slate-800">我們的使命 (Mission)</h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              透過倡導教育、支持創新專案與舉辦跨界合作，促進綠色公民素養。攜手企業與大眾，推動可持續的日常行為變革，以實現人與大自然的和諧共存。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-brand-amber font-bold text-lg">
              ✨
            </div>
            <h3 className="text-lg font-bold text-slate-800">我們的願景 (Vision)</h3>
            <p className="text-slate-600 leading-relaxed text-xs">
              成為推動全球公民 ESG 素養的先驅組織，打造一個所有人皆能自主推行綠色行動、企業皆落實社會關懷、組織皆實踐透明治理的健康生態體系。
            </p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
