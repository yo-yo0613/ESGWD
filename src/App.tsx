import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CoreProjects from './components/CoreProjects';
import LatestNews from './components/LatestNews';
import Sponsors from './components/Sponsors';
import BookCTA from './components/BookCTA';
import DonationCTA from './components/DonationCTA';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { supabase } from './utils/supabaseClient';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
      sessionStorage.setItem('visitor_session_id', sessionId);
    }

    const logPageVisit = async () => {
      try {
        const path = location.pathname + (window.location.hash || '');
        const referrer = document.referrer || null;
        const userAgent = navigator.userAgent;

        await supabase.from('visitor_logs').insert({
          session_id: sessionId,
          path: path,
          referrer: referrer,
          user_agent: userAgent
        });
      } catch (error) {
        console.error('Visitor logging failed:', error);
      }
    };

    logPageVisit();
  }, [location.pathname]);

  useEffect(() => {
    const handleHashChange = async () => {
      const sessionId = sessionStorage.getItem('visitor_session_id');
      if (!sessionId) return;
      try {
        const path = location.pathname + (window.location.hash || '');
        await supabase.from('visitor_logs').insert({
          session_id: sessionId,
          path: path,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent
        });
      } catch (error) {
        console.error('Hash logging failed:', error);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.pathname]);

  return null;
}

function MainPortal() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to the target section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll Spy to update active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for nav height
      const sections = ['hero', 'projects', 'news', 'sponsors', 'publications', 'donate'];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle initial hash scrolling on mount (e.g. #news, #publications, #donate)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-navy-dark text-slate-100 flex flex-col justify-between selection:bg-brand-amber selection:text-brand-navy">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {/* Hero Slider Section */}
        <section id="hero" className="w-full">
          <HeroSlider onCtaClick={handleNavigate} />
        </section>

        {/* Storytelling & Core Projects Section */}
        <section id="projects" className="w-full">
          <CoreProjects onCtaClick={handleNavigate} />
        </section>

        {/* Latest News & Tabs Filter Section */}
        <section id="news" className="w-full">
          <LatestNews />
        </section>

        {/* Sponsors Infinite Scroll Marquee & Winners Grid */}
        <section id="sponsors" className="w-full">
          <Sponsors />
        </section>

        {/* Ebook Publication 3D Mockup CTA Section */}
        <section id="publications" className="w-full">
          <BookCTA />
        </section>

        {/* Laurel Membership Donation Section */}
        <section id="donate" className="w-full">
          <DonationCTA />
        </section>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        {/* Main Portal Landing Page */}
        <Route path="/" element={<MainPortal />} />
        
        {/* Admin Panel CMS Page */}
        <Route path="/admin" element={<AdminPanel />} />
        
        {/* Fallback redirect */}
        <Route path="*" element={<MainPortal />} />
      </Routes>
    </Router>
  );
}
