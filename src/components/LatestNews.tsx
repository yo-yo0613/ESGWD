import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialNewsArticles } from '../data/siteInitialData';
import type { NewsArticleData } from '../data/siteInitialData';

export default function LatestNews() {
  const [allNews, setAllNews] = useState<NewsArticleData[]>(initialNewsArticles);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<NewsArticleData[]>('news_articles');
      if (data && data.length > 0) {
        setAllNews(data);
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);

  const tabs = [
    { id: 'all', name: '全部消息' },
    { id: 'enterprise', name: '企業論壇' },
    { id: 'education', name: '學童教育' },
    { id: 'concert', name: '音樂會' }
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allNews.length));
  };

  const hasMore = visibleCount < allNews.length;

  // Slice visible news and then apply filter to match original behavior
  const visibleNews = allNews.slice(0, visibleCount);
  const filteredNews = activeTab === 'all'
    ? visibleNews
    : visibleNews.filter(item => item.category === activeTab);

  return (
    <section className="py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
              LATEST UPDATES
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900">
              最新消息與動態
            </h2>
          </div>
          
          {/* Tabs - Glassmorphism style */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 border border-slate-200/80 rounded-xl max-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-white font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-brand-amber to-brand-orange rounded-lg -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                    
                    {/* Badge */}
                    <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-lg text-white backdrop-blur-md border border-white/10 ${
                      item.category === 'enterprise' ? 'bg-amber-600/70' :
                      item.category === 'education' ? 'bg-violet-600/70' :
                      'bg-orange-600/70'
                    }`}>
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 space-y-4">
                    {/* Date */}
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-heading font-bold text-slate-800 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Read More button */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                  <button className="flex items-center space-x-1.5 text-xs font-bold text-brand-orange group-hover:text-brand-orange/80 transition-colors duration-300">
                    <span>詳細閱讀</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 rounded-xl border border-slate-300 hover:border-slate-800 bg-transparent text-slate-700 hover:text-slate-900 text-sm font-semibold tracking-wide shadow-md transition-all duration-300"
            >
              載入更多消息
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
