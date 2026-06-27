import SubPageLayout from '../components/SubPageLayout';

export default function AboutTeam() {
  const teams = [
    { department: '會務行政與財務部', members: ['王麗君 (總幹事)', '張美華 (出納)', '林佳蓉 (行政助理)'] },
    { department: 'ESG 專案推廣組', members: ['李國平 (組長)', '陳冠宇 (資深企劃專員)', '黃晴雅 (環境教育專員)'] },
    { department: '良善素養教育推動組', members: ['廖芳儀 (組長)', '徐佩吟 (課程規劃師)', '許家豪 (校園專案助理)'] },
    { department: '影音與社群推廣組', members: ['郭紹威 (創意總監)', '蔡羽婕 (社群行銷專員)', '簡佑廷 (影音剪輯專員)'] },
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
            團隊夥伴
          </h1>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed text-sm max-w-3xl">
          我們的團隊由一群熱愛環境教育、關注社會公平與組織永續治理的專職夥伴與顧問所組成。大家發揮各自的專業，共同推動公民素養與可持續發展變革。
        </p>

        {/* Team Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-brand-navy tracking-wide border-b border-slate-100 pb-3 flex items-center space-x-2">
                <span className="w-1.5 h-3 bg-brand-orange rounded-full" />
                <span>{t.department}</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {t.members.map((name, memberIdx) => (
                  <span key={memberIdx} className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
