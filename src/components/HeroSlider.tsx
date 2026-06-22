import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialHeroSlides } from '../data/siteInitialData';
import type { HeroSlideData } from '../data/siteInitialData';

interface HeroSliderProps {
  onCtaClick: (sectionId: string) => void;
}

export default function HeroSlider({ onCtaClick }: HeroSliderProps) {
  const [slides, setSlides] = useState<HeroSlideData[]>(initialHeroSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  
  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<HeroSlideData[]>('hero_slides');
      if (data && data.length > 0) {
        setSlides(data);
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);
  
  const slideDuration = 6000; // 6 seconds
  const updateInterval = 50;  // 50ms for progress bar smoothness

  const startTimer = () => {
    // Clear any existing timers
    stopTimer();
    
    // Reset progress
    setProgress(0);
    
    // Start progress counter
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / slideDuration) * 100, 100);
      setProgress(percentage);
      
      if (elapsed >= slideDuration) {
        handleNext();
      }
    }, updateInterval);
  };

  const stopTimer = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[800px] bg-brand-navy overflow-hidden flex items-center justify-center">
      {/* Background Images / Gradients */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Fallback gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${currentSlide.bgGradient} z-10`} />
            
            {/* Real Background Image with overlay */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
              style={{ 
                backgroundImage: `url(${currentSlide.bgImage})`,
                backgroundColor: '#0B192C'
              }}
            />
            {/* 40% Black overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />
            
            {/* Decorative background aura */}
            <div 
              className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000"
              style={{ backgroundColor: currentSlide.themeColor }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center h-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Badge */}
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-white border border-white/20 backdrop-blur-sm"
              style={{ backgroundColor: `${currentSlide.themeColor}30` }}
            >
              世界公民活動焦點
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight max-w-4xl tracking-wide drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-sans font-light">
              {currentSlide.subtitle}
            </p>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onCtaClick('projects')}
                className="px-8 py-4 rounded-xl font-heading font-semibold text-white tracking-wide shadow-lg group flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ 
                  backgroundColor: currentSlide.themeColor,
                  boxShadow: `0 10px 20px -5px ${currentSlide.themeColor}40`
                }}
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-brand-navy/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-brand-navy/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators and Progress Bar */}
      <div className="absolute bottom-10 left-0 w-full z-20 flex flex-col items-center space-y-4">
        {/* Dot Indicators */}
        <div className="flex space-x-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Global Progress Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
