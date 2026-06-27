import SubPageLayout from '../components/SubPageLayout';

export default function AboutDisclosures() {
  const documents = [
    { title: '2025年度 財務收支決算報告與會計師簽證', size: '2.4 MB', date: '2026-03-15' },
    { title: '2025年度 社會影響力與永續行動工作成果年報', size: '4.8 MB', date: '2026-03-01' },
    { title: '2024年度 財務收支決算報告書', size: '1.8 MB', date: '2025-03-18' },
    { title: '2024年度 工作計畫與活動成果報告表', size: '3.2 MB', date: '2025-03-10' },
  ];

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            關於我們
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            公開資訊
          </h1>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
          誠信治理是本會的核心價值。我們每年定期主動公開經合格會計師查核簽證之財務報表，以及年度工作執行成果，供社會大眾及捐款人共同監督。
        </p>

        {/* Documents list */}
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-brand-orange/20 hover:shadow-md transition-all duration-300">
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-800 hover:text-brand-orange transition-colors">
                  {doc.title}
                </h3>
                <div className="flex space-x-3 text-[10px] text-slate-400 font-bold">
                  <span>發布日期：{doc.date}</span>
                  <span>‧</span>
                  <span>檔案大小：{doc.size}</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-200 hover:border-slate-800 bg-transparent text-slate-700 hover:bg-slate-900 hover:text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-300 flex items-center space-x-1.5 shrink-0">
                <span>⬇️ 下載 PDF 報表</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
