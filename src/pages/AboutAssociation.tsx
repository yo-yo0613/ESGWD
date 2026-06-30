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
              致力於推廣環境、社會與治理 (ESG) 的全球發展與數位治理教育，建立永續發展與誠信治理的共榮未來。
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              ESG世界公民數位治理基金會（ESG World Citizens & Digital Governance Foundation，簡稱 ESGWD）成立於 2021 年，由董事長陳春山教授領導。我們以「推動企業雙軸轉型（數位轉型與 ESG）、全球公民意識以及數位治理」為宗旨。
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              我們深信，在全球化與科技高度演進的挑戰下，企業與個人均應擁抱世界公民價值觀。我們積極透過培育大專與中小學之世界公民素養教育、開設董事會與公司治理進修課程、以及主辦雙軸轉型金恆獎，為社會發揮正向影響力。
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
