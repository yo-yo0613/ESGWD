import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import { loadConfig } from '../utils/configLoader';
import { initialProjects } from '../data/siteInitialData';
import type { ProjectData } from '../data/siteInitialData';

interface CoreProjectsProps {
  onCtaClick: (sectionId: string) => void;
}

export default function CoreProjects({ onCtaClick }: CoreProjectsProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);

  // Dynamic Config Loading with Storage Event Sync
  useEffect(() => {
    const fetchConfig = async () => {
      const data = await loadConfig<ProjectData[]>('projects');
      if (data && data.length > 0) {
        setProjects(data);
      }
    };
    fetchConfig();

    window.addEventListener('storage', fetchConfig);
    return () => window.removeEventListener('storage', fetchConfig);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <section className="py-24 bg-slate-50 text-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-amber/5 to-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-brand-amber bg-brand-amber/10 px-3.5 py-1.5 rounded-full"
          >
            OUR INITIATIVES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900"
          >
            基金會三大核心專案
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 leading-relaxed text-base md:text-lg"
          >
            引導世界公民的良善力，攜手學界與產業界，打造永續關懷的明日世界。
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {projects.map((project) => {
            const IconComponent = (Lucide as any)[project.iconName] || Lucide.HelpCircle;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 p-8 md:p-10 relative overflow-hidden group bg-white shadow-md hover:shadow-xl hover:border-slate-350 transition-all duration-300"
              >
                {/* Glow aura behind card icon */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100/50 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${project.color} flex items-center justify-center text-white shadow-lg shadow-white/5`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-800 group-hover:text-brand-orange transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-light min-h-[72px]">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[11px] text-slate-400 tracking-wider uppercase block">{stat.label}</span>
                        <span className={`text-lg md:text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="pt-8">
                  <button 
                    onClick={() => onCtaClick('news')}
                    className="w-full py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold tracking-wide text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                  >
                    {project.ctaText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
