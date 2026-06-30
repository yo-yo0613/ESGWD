import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';

interface SubPageLayoutProps {
  children: React.ReactNode;
}

export default function SubPageLayout({ children }: SubPageLayoutProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleNavigate = (path: string) => {
    if (['hero', 'projects', 'news', 'sponsors', 'publications', 'donate'].includes(path)) {
      window.location.href = `/#${path}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-brand-amber selection:text-brand-navy">
      <Navbar activeSection="" />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {children}
        </div>
      </main>
      <Footer onNavigate={handleNavigate} />
      <FloatingContact />
    </div>
  );
}
