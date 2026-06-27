import SubPageLayout from '../components/SubPageLayout';

export default function AboutBoard() {
  const members = [
    { name: '施振榮', role: '榮譽理事長', desc: '宏碁集團創辦人，長期推動台灣科技創新與企業永續發展。' },
    { name: '呂學海', role: '董事長 / 理事長', desc: '世界公民基金會創辦人，資深文化與社會永續倡議家。' },
    { name: '陳東升', role: '常務董事', desc: '台灣大學社會學系教授，致力於社會設計與公民教育。' },
    { name: '李應元', role: '常務監事', desc: '前環保署長，深耕環境治理與綠色外交政策領域。' },
    { name: '林懷民', role: '董事', desc: '雲門舞集創辦人，以藝術深耕鄉土，推動社會文化平權。' },
    { name: '曾志朗', role: '董事', desc: '中央研究院院士，前教育部部長，深耕科學教育與公民素養。' },
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
            董事會介紹
          </h1>
        </div>

        {/* Introduction */}
        <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
          世界公民基金會由各界具備深厚學養與高度社會聲譽之領袖人物組成。董事會負責監督會務運作，確保各項 ESG 公益活動透明度與社會影響力最大化。
        </p>

        {/* Board grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wide">
                  {member.role}
                </span>
                <h3 className="text-lg font-black text-slate-800">{member.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] text-brand-orange font-bold uppercase tracking-wider">
                <span>世界公民基金會 ‧ 董事會</span>
                <span>WCF</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
