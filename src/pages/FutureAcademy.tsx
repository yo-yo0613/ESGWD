import SubPageLayout from '../components/SubPageLayout';
import { useLanguage } from '../context/LanguageContext';

export default function FutureAcademy() {
  const { language, t } = useLanguage();

  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;

  const galleryImages = [
    {
      url: '/images/forum_hero.jpg',
      title: bi('雙軸轉型領袖論壇', 'Twin-Axis Transformation Leadership Forum'),
      desc: bi('本會核心導師與企業高階主管齊聚一堂，探討 ESG 科技治理策略。', 'Core mentors and corporate executives gathering to discuss ESG tech governance.')
    },
    {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      title: bi('董監事公司治理實務研習', 'Corporate Governance Executive Seminar'),
      desc: bi('依證交所合規指引，進行企業永續發展策略與責任授權培訓。', 'Fulfilling regulatory guidelines, conducting sustainable strategy training for corporate boards.')
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      title: bi('青年永續變革者培訓營', 'Youth Sustainable Change-makers Workshop'),
      desc: bi('引導大專校院青年接軌國際碳排稅制，學習碳足跡實務規劃。', 'Empowering university students with international carbon taxation literacy and practical carbon accounting.')
    }
  ];

  return (
    <SubPageLayout>
      <div className="space-y-12 animate-fade-in pb-12">
        {/* Breadcrumb / Title */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">
            {t('nav.services')}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-wide">
            {bi('未來學院', 'Future Academy')}
          </h1>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-tr from-slate-100 to-slate-200/50 rounded-3xl p-8 border border-slate-200/80 shadow-inner flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-xl md:text-2xl font-black text-brand-navy leading-snug">
              {bi('培育面向 2030 永續世界的氣候行動與 ESG 領袖人才', 'Nurturing Climate Action & ESG Leadership Talents for a 2030 Sustainable World')}
            </h2>
            <p className="text-slate-650 text-xs leading-relaxed font-light">
              {bi(
                '「未來學院」是世界公民文化基金會旗下的核心人才培育基地。透過碳盤查、國際永續準則、環境永續設計思維等系列精修課程，協助青年學生、企業同仁快速接軌世界永續標準。',
                'Future Academy is the core leadership training hub under the World Citizen Foundation. Through curated courses in carbon footprint accounting, international sustainability criteria, and design thinking, we assist students and executives to align with global standards.'
              )}
            </p>
          </div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center shrink-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
              {bi('目前累計培訓', 'TOTAL TRAINED')}
            </span>
            <span className="text-3xl font-black text-brand-orange block my-1">1,200+</span>
            <span className="text-[10px] text-slate-600 font-bold block">
              {bi('位永續領袖', 'Sustainability Leaders')}
            </span>
          </div>
        </div>

        {/* Content Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">⚖️</span>
            <h3 className="text-sm font-bold text-slate-800">
              {bi('董監事及公司治理主管認證課程', 'Directors & Governance Officers Accreditation')}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-light">
              {bi(
                '提供符合證交所認可之董監事及公司治理主管進修學分課程。內容涵蓋 ESG 永續治理策略、雙軸轉型（數位與永續）、AI 倫理治理、法遵管理及營業秘密保護。',
                'Providing accredited training courses approved by the Stock Exchange for corporate directors. Curriculum covers ESG governance strategy, twin transition, AI ethics, legal compliance, and trade secret protection.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🏢</span>
            <h3 className="text-sm font-bold text-slate-800">
              {bi('企業客製化到府授課', 'Customized Corporate In-house Training')}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-light">
              {bi(
                '針對企業特定治理痛點或發展策略，由基金會專家學者到府客製化授課，協助公司高階團隊建立一致的永續與數位雙軸思維。',
                'Tailored to corporate pain points, our foundation experts deliver customized training on-site to align senior executive teams with cohesive digital-ESG dual mindsets.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🌱</span>
            <h3 className="text-sm font-bold text-slate-800">
              {bi('氣候變遷與減碳工作坊', 'Climate Change & Decarbonization Workshop')}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-light">
              {bi(
                '規劃碳足跡盤查與減碳路徑規劃實戰課程，以實際案例出發，協助企業中階幹部與第一線執行人員對接國際碳稅與永續供應鏈標準。',
                'Offering carbon accounting and emission reduction pathway planning workshops, empowering middle managers to adapt to international supply chain requirements.'
              )}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <span className="text-2xl">🌍</span>
            <h3 className="text-sm font-bold text-slate-800">
              {bi('世界公民永續論壇', 'Global Citizen Sustainability Forum')}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-light">
              {bi(
                '每年定期舉辦國際青年與企業領袖永續論壇，邀請產官學專家共同探討 ESG 實踐挑戰，提供青年與領袖面對面交流及建構國際網絡的平台。',
                'Organizing annual forums for international youth and corporate leaders, inviting scholars and practitioners to discuss ESG challenges and build global networks.'
              )}
            </p>
          </div>
        </div>

        {/* Gallery / Highlights presentation section */}
        <div className="space-y-6 pt-6 border-t border-slate-100">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-brand-navy">
              {bi('學院剪影與活動亮點', 'Academy Highlights & Event Gallery')}
            </h2>
            <p className="text-xs text-slate-400">
              {bi('探索我們歷年舉辦的論壇與學術講座現場剪影', 'Explore moments from our forums and governance seminars over the years')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-xs font-extrabold text-slate-800 group-hover:text-brand-orange transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}
