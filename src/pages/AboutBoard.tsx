import { useState, useEffect } from 'react';
import SubPageLayout from '../components/SubPageLayout';
import { loadConfig } from '../utils/configLoader';

interface Member {
  name: string;
  role: string;
  desc: string;
  avatar: string;
}

export default function AboutBoard() {
  const [boardMembers, setBoardMembers] = useState<Member[]>([]);
  const [directors, setDirectors] = useState<Member[]>([]);
  const [honoraryDirectors, setHonoraryDirectors] = useState<Member[]>([]);

  useEffect(() => {
    async function load() {
      const data = await loadConfig<{
        board: Member[];
        directors: Member[];
        honorary: Member[];
        team: Member[];
      }>('about_us_members');
      
      if (data) {
        if (data.board) setBoardMembers(data.board);
        if (data.directors) setDirectors(data.directors);
        if (data.honorary) setHonoraryDirectors(data.honorary);
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
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start space-x-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-orange-100 text-brand-orange text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-base font-black text-slate-800 leading-none">{member.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed pt-1">{member.desc}</p>
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
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start space-x-4 hover:shadow-md transition-shadow duration-300">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-7 h-7 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-base font-black text-slate-800 leading-none">{member.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed pt-1">{member.desc}</p>
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
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start space-x-3 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="space-y-2 min-w-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wide">
                    {member.role}
                  </span>
                  <h3 className="text-sm font-black text-slate-800 leading-none">{member.name}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed pt-1">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
