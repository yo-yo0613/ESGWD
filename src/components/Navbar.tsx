import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', name: '首頁' },
    { id: 'projects', name: '核心專案' },
    { id: 'news', name: '最新消息' },
    { id: 'sponsors', name: '榮譽與贊助' },
    { id: 'publications', name: '出版品' },
    { id: 'donate', name: '支持我們' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-brand-navy border-b border-white/10 shadow-lg py-4 ${
        scrolled 
          ? 'lg:bg-brand-navy/90 lg:backdrop-blur-md lg:border-b lg:border-white/10 lg:shadow-lg lg:py-4' 
          : 'lg:bg-transparent lg:border-transparent lg:shadow-none lg:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-50">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-bold text-white shadow-md shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300">
              ESG
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-white tracking-wider block leading-none">
                世界公民基金會
              </span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase mt-1 block">
                World Citizen Foundation
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    activeSection === item.id 
                      ? 'text-brand-amber font-semibold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-amber to-brand-orange rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <button className="text-white/70 hover:text-white transition-colors duration-300 flex items-center space-x-1 text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span>繁中</span>
              </button>
              <button 
                onClick={() => handleNavClick('donate')}
                className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-navy bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                立即捐款
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-amber transition-colors duration-300"
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
        className={`fixed inset-y-0 right-0 w-full max-w-sm border-l border-white/10 shadow-2xl z-40 transition-transform duration-500 transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#0B192C' }}
      >
        <div className="h-full flex flex-col justify-between p-8 pt-24">
          <div className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-3 text-lg font-medium transition-colors duration-300 border-b border-white/5 ${
                  activeSection === item.id 
                    ? 'text-brand-amber font-semibold' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 border border-white/10 rounded-xl text-white hover:bg-white/5 transition-colors duration-300 flex items-center justify-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>切換語言 (繁中)</span>
            </button>
            <button 
              onClick={() => handleNavClick('donate')}
              className="w-full py-4 rounded-xl text-brand-navy font-bold bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg transition-all duration-300"
            >
              立即捐款支持
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
