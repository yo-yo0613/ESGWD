import SubPageLayout from '../components/SubPageLayout';

export default function PublicationsPage() {
  const books = [
    {
      title: '《AI for Good 落地力》',
      subtitle: '陳春山教授 著 ‧ 數位治理與 ESG 雙軸轉型指南',
      desc: '本書深入探討企業如何導入 AI 技術以落實數位轉型與 ESG 永續的「雙軸轉型」。結合多個產業標竿案例，為董監事及高階主管提供最具落實價值的治理指南。',
      fileSize: '5.2 MB',
      pdfUrl: '#',
    },
    {
      title: '《世界公民基本法的探索》',
      subtitle: '陳春山教授 著 ‧ 全球公民素養之基石',
      desc: '從國際法規、永續發展準則與環境倫理出發，梳理現代公民應具備之基本素養與道德責任，是推展綠色環境倫理教育的重要參考著作。',
      fileSize: '3.6 MB',
      pdfUrl: '#',
    }
  ];

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            出版品
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            研究出版與書籍發行
          </h1>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
          我們定期出版學術報告、白皮書與教育宣導手冊，旨在為公眾提供正確的環境保護、氣候變遷與治理誠信研究成果。所有書籍皆提供免費 PDF 下載供學術與公益傳閱。
        </p>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-orange/20 hover:shadow-md transition-all duration-300">
              <div className="space-y-4">
                <div className="w-12 h-16 rounded bg-gradient-to-tr from-brand-orange to-brand-amber shadow-md flex items-center justify-center text-white font-extrabold text-xs">
                  BOOK
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-800">{book.title}</h3>
                  <span className="text-xs text-slate-400 font-bold block">{book.subtitle}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {book.desc}
                </p>
              </div>
              
              <div className="border-t border-slate-100 pt-6 mt-8 flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-400 font-bold">PDF ({book.fileSize})</span>
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300">
                  ⬇️ 免費下載 PDF 簡介
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
