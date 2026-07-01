import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialNewsArticles } from '../data/siteInitialData';
import type { NewsArticleData } from '../data/siteInitialData';
import { useLanguage } from '../context/LanguageContext';

export default function LatestNews() {
  const [allNews, setAllNews] = useState<NewsArticleData[]>(initialNewsArticles);
  const { language, t } = useLanguage();

  // Bilingual helper: prefer _en field when English, fallback to Chinese
  const bi = (zh: string, en?: string) => (language === 'en' && en) ? en : zh;
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openArticle = (article: NewsArticleData) => {
    setSelectedArticle(article);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allNews.length));
  };

  const hasMore = visibleCount < allNews.length;

  const visibleNews = allNews.slice(0, visibleCount);

  return (
    <section className="py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full">
              {t('home.news.label')}
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900">
              {t('home.news.title')}
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {visibleNews.map((item) => (
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
                  <div 
                    className="relative h-52 w-full overflow-hidden cursor-pointer"
                    onClick={() => openArticle(item)}
                  >
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
                    <h3 
                      className="text-lg md:text-xl font-heading font-bold text-slate-800 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2 leading-snug cursor-pointer"
                      onClick={() => openArticle(item)}
                    >
                      {bi(item.title, (item as any).title_en)}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-3">
                      {bi(item.summary, (item as any).summary_en)}
                    </p>
                  </div>
                </div>

                {/* Read More button */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                  <button 
                    onClick={() => openArticle(item)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-brand-orange group-hover:text-brand-orange/80 transition-colors duration-300"
                  >
                    <span>{t('home.news.read')}</span>
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
              {t('home.news.loadmore')}
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeArticle}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section (Carousel or Single Image) */}
              <div className="relative h-64 md:h-96 w-full bg-slate-100 overflow-hidden">
                {selectedArticle.images && selectedArticle.images.length > 1 ? (
                  <>
                    {/* Slides */}
                    <div className="w-full h-full relative">
                      <img
                        src={selectedArticle.images[currentImageIndex]}
                        alt={`${selectedArticle.title} - ${currentImageIndex}`}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                    </div>

                    {/* Left/Right Controls */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === 0 ? selectedArticle.images!.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === selectedArticle.images!.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {selectedArticle.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Text / Content Section */}
              <div className="p-6 md:p-10 overflow-y-auto space-y-6 flex-grow">
                {/* Meta details */}
                <div className="flex items-center space-x-4">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-white border border-white/10 ${
                    selectedArticle.category === 'enterprise' ? 'bg-amber-600/70' :
                    selectedArticle.category === 'education' ? 'bg-violet-600/70' :
                    'bg-orange-600/70'
                  }`}>
                    {selectedArticle.categoryLabel}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-3xl font-heading font-extrabold text-slate-900 leading-snug">
                  {bi(selectedArticle.title, (selectedArticle as any).title_en)}
                </h3>

                {/* Divider */}
                <div className="h-[1px] w-full bg-slate-100" />

                {/* Full body content formatted as paragraphs */}
                <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4 font-light whitespace-pre-wrap">
                  {bi(selectedArticle.summary, (selectedArticle as any).summary_en).split('\n').map((para, pIdx) => {
                    const cleanPara = para.trim();
                    if (!cleanPara) return null;
                    return <p key={pIdx}>{cleanPara}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
