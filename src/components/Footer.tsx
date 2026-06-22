import { Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { id: 'hero', name: '首頁開場' },
    { id: 'projects', name: '核心專案' },
    { id: 'news', name: '最新消息' },
    { id: 'sponsors', name: '企業贊助' },
    { id: 'publications', name: '出版品' },
    { id: 'donate', name: '桂冠會員' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('hero')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-bold text-white shadow-md">
              ESG
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-white tracking-wider block leading-none">
                世界公民基金會
              </span>
              <span className="text-[9px] text-slate-400 tracking-widest uppercase mt-1 block">
                World Citizen Foundation
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed pt-2">
            致力於推動世界公民素養教育、永續發展與科技雙軸轉型。深耕社會公益、良善品格與跨界藝術的完美融合，攜手企業與大眾共創綠色未來。
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-amber hover:text-brand-navy transition-all duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-amber hover:text-brand-navy transition-all duration-300" aria-label="Youtube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.021 0 12 0 12s0 3.979.502 5.837a3.002 3.002 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.979 24 12 24 12s0-3.979-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-amber">
            快速導覽
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onNavigate(link.id)}
                  className="hover:text-brand-amber hover:translate-x-1 transition-all duration-300 text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-amber">
            聯絡資訊
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
              <span>台北市中正區重慶南路一段 100 號 8 樓</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-brand-amber shrink-0" />
              <span>+886-2-2345-6789</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-brand-amber shrink-0" />
              <span>contact@worldcitizen.org.tw</span>
            </li>
          </ul>
        </div>

        {/* Newsletter / Certification */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-amber">
            認證與主管主管課程
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            本會榮獲內政部公益社團認證，並提供「董監事與公司治理主管認證課程」，具備法律效力之學分證明。
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-semibold text-brand-amber tracking-wider">
              政府立案字號：台內社字第 1120005678 號
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
        <div>
          © {new Date().getFullYear()} 世界公民基金會 World Citizen Foundation. All Rights Reserved.
        </div>
        <div className="flex items-center space-x-1">
          <span>用愛與智慧</span>
          <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange animate-pulse" />
          <span>守護地球，引領雙軸轉型</span>
        </div>
      </div>
    </footer>
  );
}
