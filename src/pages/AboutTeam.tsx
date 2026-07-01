import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { loadConfig } from '../utils/configLoader';

interface Member {
  name: string;
  role: string;
  desc: string;
  avatar: string;
}

export default function AboutTeam() {
  const [partners, setPartners] = useState<Member[]>([]);

  useEffect(() => {
    async function load() {
      const data = await loadConfig<{
        board: Member[];
        directors: Member[];
        honorary: Member[];
        team: Member[];
      }>('about_us_members');
      
      if (data && data.team) {
        setPartners(data.team);
      }
    }
    load();
  }, []);

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
          我們的團隊由一群熱愛環境教育、關注公民素養與科技治理雙軸轉型的專職夥伴組成，攜手各界共榮前進。
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow duration-300">
              {/* Photo Frame with Silhouette Icon / Image */}
              <div className="w-24 h-24 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden relative group">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-lg bg-orange-50 text-brand-orange text-[10px] font-bold tracking-wide">
                  {member.role}
                </span>
                <h3 className="text-base font-black text-slate-800 leading-none">{member.name}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed pt-2 px-2">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
