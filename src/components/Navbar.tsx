import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

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


  const logoTitleClass = showSolidNav 
    ? 'text-slate-800' 
    : 'text-white';
  const logoSubClass = showSolidNav 
    ? 'text-slate-400' 
    : 'text-white/50';

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
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-bold text-white shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              ESG
            </div>
            <div className="min-w-0">
              <span className={`font-heading font-bold text-base sm:text-lg tracking-wider block leading-none transition-colors duration-300 whitespace-nowrap ${logoTitleClass}`}>
                世界公民基金會
              </span>
              <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase mt-1 block transition-colors duration-300 whitespace-nowrap ${logoSubClass}`}>
                World Citizen Foundation
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {/* 關於我們 Dropdown */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}>
                  <span>關於我們</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2">
                    <a href="/about/association" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">本會介紹</a>
                    <a href="/about/board" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">董事會介紹</a>
                    <a href="/about/team" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">團隊夥伴</a>
                    <a href="/about/disclosures" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">公開資訊</a>
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
                最新消息
              </a>

              {/* 服務專案 Dropdown */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}>
                  <span>服務專案</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block z-50">
                  <div className="w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2">
                    <a href="/projects/future-academy" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">未來學院</a>
                    <a href="/projects/golden-constant" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">金恆獎</a>
                    <a href="/projects/goodness-literacy" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">良善素養教育</a>
                    <a href="/projects/concert" className="block px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-brand-orange hover:bg-slate-50 transition-colors">世界公民年度音樂會</a>
                  </div>
                </div>
              </div>

              {/* 出版品 Link */}
              <a
                href="/publications"
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}
              >
                出版品
              </a>

              {/* 社群分享 Link */}
              <a
                href="/social"
                className={`py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${linkColorClass}`}
              >
                社群分享
              </a>
            </div>

            <div className={`flex items-center space-x-4 border-l pl-6 transition-colors duration-300 ${
              showSolidNav ? 'border-slate-200' : 'border-slate-200 lg:border-white/10'
            }`}>
              <button className={`transition-colors duration-300 flex items-center space-x-1 text-sm font-medium ${
                showSolidNav
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-300 lg:text-white/70 lg:hover:text-white hover:text-slate-900'
              }`}>
                <Globe className="w-4 h-4" />
                <span>繁中</span>
              </button>
              <a 
                href="/donate"
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-navy bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                支持我們
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
                <span>關於我們</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${aboutOpen ? 'rotate-180 text-brand-orange' : ''}`} />
              </button>
              {aboutOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50/50 rounded-xl">
                  <a href="/about/association" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">本會介紹</a>
                  <a href="/about/board" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">董事會介紹</a>
                  <a href="/about/team" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">團隊夥伴</a>
                  <a href="/about/disclosures" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">公開資訊</a>
                </div>
              )}
            </div>

            {/* 最新消息 Link */}
            <a
              href="/#news"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              最新消息
            </a>

            {/* 服務專案 Accordion */}
            <div className="space-y-1">
              <button 
                onClick={() => setProjectsOpen(!projectsOpen)}
                className="w-full flex items-center justify-between py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
              >
                <span>服務專案</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${projectsOpen ? 'rotate-180 text-brand-orange' : ''}`} />
              </button>
              {projectsOpen && (
                <div className="pl-4 py-1 space-y-1 bg-slate-50/50 rounded-xl">
                  <a href="/projects/future-academy" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">未來學院</a>
                  <a href="/projects/golden-constant" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">金恆獎</a>
                  <a href="/projects/goodness-literacy" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">良善素養教育</a>
                  <a href="/projects/concert" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-slate-500 hover:text-brand-orange">世界公民年度音樂會</a>
                </div>
              )}
            </div>

            {/* 出版品 Link */}
            <a
              href="/publications"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              出版品
            </a>

            {/* 社群分享 Link */}
            <a
              href="/social"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-semibold text-slate-700 border-b border-slate-100"
            >
              社群分享
            </a>
          </div>

          <div className="space-y-4 pt-12">
            <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm font-semibold">
              <Globe className="w-4 h-4" />
              <span>切換語言 (繁中)</span>
            </button>
            <a 
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 rounded-xl text-brand-navy font-bold bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg transition-all duration-300 block text-center text-sm"
            >
              支持我們
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
