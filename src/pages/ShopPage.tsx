import SubPageLayout from '../components/SubPageLayout';

export default function ShopPage() {
  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in py-12 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-3xl">
          🛍️
        </div>
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-slate-800">周邊商品與文創義賣</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            此頁面目前正在進行商品上架與串接設定中。未來我們將推出包含環保餐具、精美帆布袋、典範小學聯名文具等公益義賣商品，敬請期待！
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
