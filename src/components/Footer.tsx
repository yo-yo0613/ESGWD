import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language, t } = useLanguage();

  const quickLinks = [
    { id: 'hero', name: t('footer.link.home') },
    { id: 'projects', name: t('footer.link.projects') },
    { id: 'news', name: t('footer.link.news') },
    { id: 'sponsors', name: t('footer.link.sponsors') },
    { id: 'publications', name: t('footer.link.publications') },
    { id: 'donate', name: t('footer.link.donate') },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center cursor-pointer group py-1" onClick={() => onNavigate('hero')}>
            <img 
              src="/logo-footer.png" 
              alt="ESG世界公民數位治理基金會 Logo" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          <p className="text-sm text-slate-450 leading-relaxed pt-2 font-light">
            {t('footer.desc')}
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
            {t('footer.links.title')}
          </h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onNavigate(link.id)}
                  className="hover:text-brand-amber hover:translate-x-1 transition-all duration-300 text-left font-light"
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
            {t('footer.contact.title')}
          </h4>
          <ul className="space-y-3 text-sm font-light">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-brand-amber shrink-0 mt-1" />
              <span>{t('footer.contact.address')}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-brand-amber shrink-0" />
              <span>{t('footer.contact.phone')}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-brand-amber shrink-0" />
              <span>{t('footer.email')}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter / Certification */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-amber">
            {t('footer.cert.title')}
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            {t('footer.cert.desc')}
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-semibold text-brand-amber tracking-wider">
              {t('footer.cert.code')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
        <div>
          {t('footer.rights')}
        </div>
        <div className="flex items-center space-x-1 font-light">
          <span>{language === 'en' ? 'Protecting Earth with Love & Wisdom' : '用愛與智慧'}</span>
          <Heart className="w-3.5 h-3.5 text-brand-orange fill-brand-orange animate-pulse" />
          <span>{language === 'en' ? 'Leading Twin Transition' : '守護地球，引領雙軸轉型'}</span>
        </div>
      </div>
    </footer>
  );
}
