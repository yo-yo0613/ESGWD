import SubPageLayout from '../components/SubPageLayout';

export default function DonatePage() {
  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in py-12 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-3xl">
          ❤️
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-800">支持我們 ‧ 捐款計畫</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            此頁面正在進行金流安全認證串接中。未來您將能在此安全地進行單筆或定期定額捐款，支持世界公民與 ESG 教育倡議。
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
        >
          返回基金會首頁
        </button>
      </div>
    </SubPageLayout>
  );
}
