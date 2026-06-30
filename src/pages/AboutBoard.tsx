import SubPageLayout from '../components/SubPageLayout';

export default function AboutBoard() {
  const boardMembers = [
    { name: '陳春山', role: '董事長', desc: '國立臺北科技大學智慧財產權研究所專任教授，長期深耕公司治理、數位轉型及 ESG 永續倡議。' },
    { name: '陳政興', role: '副董事長', desc: '均豪精密工業股份有限公司董事長暨總經理，致力於推動半導體與高階製程設備之永續智慧製造。' },
  ];

  const directors = [
    { name: '王文山', role: '董事', desc: '產業界與科技創新專家。' },
    { name: '何子明', role: '董事', desc: '產業界與公司治理專家。' },
    { name: '佘日新', role: '董事', desc: '逢甲大學講座教授，專長於跨領域科技管理與永續發展策略。' },
    { name: '吳明賢', role: '董事', desc: '國立臺灣大學醫學院附設醫院院長，推動醫療體系之綠色醫院與 ESG 實踐。' },
    { name: '周行一', role: '董事', desc: '國立政治大學財務管理學系教授、前政治大學校長，資深財務與金融專家。' },
    { name: '周桂田', role: '董事', desc: '國立臺灣大學國家發展研究所教授、風險社會與政策研究中心主任。' },
    { name: '胡元輝', role: '董事', desc: '國立中正大學傳播學系教授、公共電視董事長，深耕公共傳播與社會治理。' },
    { name: '梁又文', role: '董事', desc: '產業界與企業營運專家。' },
    { name: '楊岳虎', role: '董事', desc: '產業界與永續發展專家。' },
    { name: '陳孝昌', role: '董事', desc: '永續轉型顧問專家，協助企業導入 ESG 策略架構。' },
    { name: '陳美伶', role: '董事', desc: '台灣地方創生基金會董事長、前國發會主委，深耕地方永續與數位共融。' },
    { name: '陳雅婕', role: '董事', desc: '法律與公司治理實務專家。' },
    { name: '潘維大', role: '董事', desc: '東吳大學校長，法律與高教治理專家，致力於公民教育推廣。' },
    { name: '盧秋玲', role: '董事', desc: '國立臺灣大學財務金融學系教授，專長於資產管理與企業永續投資。' },
  ];

  const honoraryDirectors = [
    { name: '陳進財', role: '榮譽董事', desc: '穩懋半導體股份有限公司董事長，推動高科技產業綠色製造之標竿人物。' },
    { name: '黃士軍', role: '榮譽董事', desc: '產業界與永續發展代表。' },
    { name: '彭裕民', role: '榮譽董事', desc: '工業技術研究院副院長，專長於綠色化學與循環經濟技術研發。' },
    { name: '王國雄', role: '榮譽董事', desc: '成真咖啡創辦人、前王品集團總經理，落實 B 型企業與社會企業共好精神。' },
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
          世界公民數位治理基金會由各界具備深厚學養與高度社會聲譽之領袖人物組成。董事會負責監督會務運作，確保各項 ESG 公益活動透明度與社會影響力最大化。
        </p>

        {/* Core Board */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-brand-navy border-b border-slate-100 pb-2">常務董事會</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-100 text-brand-orange text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-black text-slate-800">{member.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directors */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-brand-navy border-b border-slate-100 pb-2">董事會成員</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directors.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-black text-slate-800">{member.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honorary Directors */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-brand-navy border-b border-slate-100 pb-2">榮譽董事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {honoraryDirectors.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-black text-slate-800">{member.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
