import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSubpage = window.location.pathname !== '/';
  const showSolidNav = scrolled || isSubpage;

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const linkColorClass = showSolidNav
    ? 'text-slate-600 hover:text-slate-900'
    : 'text-slate-300 lg:text-white/80 lg:hover:text-white hover:text-slate-900';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${
        showSolidNav 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-4' 
          : 'bg-transparent border-b border-transparent lg:shadow-none lg:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
          {/* Logo */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center cursor-pointer group shrink-0 py-1"
          >
            <img 
              src={showSolidNav ? "/logo-color.png" : "/logo-footer.png"} 
              alt="ESG世界公民數位治理基金會 Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {/* 關於我們 Dropdown */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}>
                  <span>{t('nav.about')}</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2">
                    <a href="/about/association" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.about.intro')}</a>
                    <a href="/about/board" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.about.board')}</a>
                    <a href="/about/team" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.about.team')}</a>
                    <a href="/about/disclosures" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.about.disclosure')}</a>
                  </div>
                </div>
              </div>

              {/* 最新消息 Link */}
              <a
                href="/#news"
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass} ${
                  activeSection === 'news' ? 'text-brand-orange font-bold' : ''
                }`}
              >
                {t('nav.news')}
              </a>

              {/* 服務專案 Dropdown */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}>
                  <span>{t('nav.services')}</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2">
                    <a href="/projects/future-academy" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.services.academy')}</a>
                    <a href="/projects/golden-constant" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.services.award')}</a>
                    <a href="/projects/goodness-literacy" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.services.goodness')}</a>
                    <a href="/projects/concert" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">{t('nav.services.concert')}</a>
                  </div>
                </div>
              </div>

              {/* 出版品 Link */}
              <a
                href="/publications"
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}
              >
                {t('nav.publications')}
              </a>

              {/* 社群分享 Link */}
              <a
                href="/social"
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}
              >
                {t('nav.social')}
              </a>
            </div>

            <div className={`flex items-center space-x-4 border-l pl-6 transition-colors duration-300 ${
              showSolidNav ? 'border-slate-200' : 'border-slate-200 lg:border-white/10'
            }`}>
              {/* Language Toggle Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                  className={`transition-colors duration-300 flex items-center space-x-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all ${
                    showSolidNav
                      ? 'text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-400'
                      : 'text-white/80 hover:text-white border-white/20 hover:border-white/50'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'zh' ? '繁中' : 'EN'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50">
                    <button
                      onClick={() => { setLanguage('zh'); setLangOpen(false); }}
                      className={`w-full text-left px-5 py-2 text-xs font-semibold hover:text-brand-orange hover:bg-slate-50 transition-colors ${language === 'zh' ? 'text-brand-orange' : 'text-slate-600'}`}
                    >
                      繁中
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangOpen(false); }}
                      className={`w-full text-left px-5 py-2 text-xs font-semibold hover:text-brand-orange hover:bg-slate-50 transition-colors ${language === 'en' ? 'text-brand-orange' : 'text-slate-600'}`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>
              <a 
                href="/donate"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-navy bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {t('nav.support')}
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4 shrink-0">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 ${
                showSolidNav ? 'text-slate-700 hover:text-brand-orange' : 'text-white hover:text-brand-orange'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-sm border-l border-slate-200 shadow-2xl z-40 transition-transform duration-500 transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="h-full flex flex-col justify-between p-8 pt-24 overflow-y-auto">
          <div className="space-y-4">
            {/* 關於我們 Accordion */}
            <div className="space-y-1">
              <button 
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
              >
                <span>{t('nav.about')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aboutOpen ? 'rotate-180 text-brand-orange' : ''}`} />
              </button>
              {aboutOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50/50 rounded-xl">
                  <a href="/about/association" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.about.intro')}</a>
                  <a href="/about/board" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.about.board')}</a>
                  <a href="/about/team" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.about.team')}</a>
                  <a href="/about/disclosures" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.about.disclosure')}</a>
                </div>
              )}
            </div>

            {/* 最新消息 Link */}
            <a
              href="/#news"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              {t('nav.news')}
            </a>

            {/* 服務專案 Accordion */}
            <div className="space-y-1">
              <button 
                onClick={() => setProjectsOpen(!projectsOpen)}
                className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${projectsOpen ? 'rotate-180 text-brand-orange' : ''}`} />
              </button>
              {projectsOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50/50 rounded-xl">
                  <a href="/projects/future-academy" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.services.academy')}</a>
                  <a href="/projects/golden-constant" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.services.award')}</a>
                  <a href="/projects/goodness-literacy" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.services.goodness')}</a>
                  <a href="/projects/concert" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">{t('nav.services.concert')}</a>
                </div>
              )}
            </div>

            {/* 出版品 Link */}
            <a
              href="/publications"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              {t('nav.publications')}
            </a>

            {/* 社群分享 Link */}
            <a
              href="/social"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              {t('nav.social')}
            </a>
          </div>

          <div className="space-y-4 pt-12">
            {/* Mobile Language Toggle */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setLanguage('zh')}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${language === 'zh' ? 'bg-brand-orange text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                繁中
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${language === 'en' ? 'bg-brand-orange text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                English
              </button>
            </div>
            <a 
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 rounded-xl text-brand-navy font-bold bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg transition-all duration-300 block text-center text-sm"
            >
              {t('nav.support')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
