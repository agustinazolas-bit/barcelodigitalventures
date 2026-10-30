import React, { useState, useRef } from 'react';
import { ArrowRight, Layout, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForContact,
}) => {
  const { t } = useLanguage();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax mapping bounded to section visibility
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgAuraY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const leftBeadY = useTransform(scrollYProgress, [0, 1], [-18, 25]);
  const rightBeadY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const pillars = t.services.pillars;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative min-h-[90vh] py-20 sm:py-28 bg-black text-[#F6F1E7] overflow-hidden border-t border-[#C9A45C]/20"
    >
      {/* Native Ambient Lighting & Grid with Parallax Depth and Entrance Fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ y: bgAuraY }}
        className="absolute inset-0 pointer-events-none overflow-hidden stabilize-gpu"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.08)_0%,transparent_70%)]" />
        <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,164,92,0.05)_0%,transparent_65%)]" />
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,164,92,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,164,92,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      {/* Floating subtle beads with differential parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ y: leftBeadY }}
        className="hidden lg:block absolute left-12 top-1/3 w-3 h-3 rounded-full bg-[#C9A45C] shadow-[0_0_12px_#DFC07D] animate-subtle-float pointer-events-none stabilize-gpu"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="hidden lg:block absolute right-16 bottom-1/4 w-2.5 h-2.5 rounded-full bg-[#C9A45C] shadow-[0_0_10px_#DFC07D] animate-subtle-float pointer-events-none stabilize-gpu"
        style={{ y: rightBeadY, animationDelay: '2.5s' }}
      />

      {/* Main Section Content with subtle viewport fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-4"
          >
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-semibold">
              {t.services.kicker}
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-[30px] leading-[38px] sm:text-[42px] sm:leading-[48px] md:text-[50px] md:leading-[56px] font-normal text-[#F6F1E7] tracking-tight mb-3 sm:mb-4 font-serif"
          >
            {t.services.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
            className="text-[16px] leading-[26px] sm:text-[19px] sm:leading-[29px] text-[#B8B5AF] font-normal max-w-xl mx-auto"
          >
            {t.services.lead}
          </motion.p>
        </div>

        {/* 3 Pillar Cards matching Page 4 layout with stable fade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {pillars.map((pillar, idx) => {
            const isSelected = selectedServiceIndex === idx;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setSelectedServiceIndex(isSelected ? null : idx)}
                className={`bdv-card relative group p-6 sm:p-8 rounded-[8px] bg-[#0C0C0C] border transition-all duration-200 cursor-pointer flex flex-col justify-between stabilize-gpu ${
                  isSelected
                    ? 'border-[#C9A45C] shadow-[0_0_32px_rgba(201,164,92,0.3)] ring-1 ring-[#C9A45C]'
                    : 'border-[#C9A45C]/25 hover:border-[#C9A45C]/60 hover:shadow-[0_8px_24px_rgba(201,164,92,0.15)]'
                }`}
              >
                {/* Golden corner highlight */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-[8px]">
                  <div className={`absolute top-0 right-0 w-2.5 h-2.5 transition-colors ${isSelected ? 'bg-[#C9A45C]' : 'bg-[#C9A45C]/40 group-hover:bg-[#C9A45C]'}`} />
                </div>

                <div>
                  {/* Dynamic icon with GPU-accelerated spin */}
                  <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-black border border-[#C9A45C]/40 group-hover:border-[#C9A45C] group-hover:scale-105 transition-all duration-200 shadow-[0_0_18px_rgba(201,164,92,0.18)]">
                    {idx === 0 && (
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-[#C9A45C] animate-slow-spin" />
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#76551F] via-[#C9A45C] to-[#DFC07D] shadow-[0_0_8px_#DFC07D]" />
                        <div className="absolute inset-0 flex items-center justify-start animate-reverse-spin">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#DFC07D]" />
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className="relative w-8 h-8 flex items-center justify-center text-[#C9A45C] group-hover:scale-110 transition-transform">
                        <Layout className="w-7 h-7 stroke-[1.5]" />
                      </div>
                    )}
                    {idx === 2 && (
                      <div className="relative w-8 h-8 flex items-center justify-center text-[#C9A45C] group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-7 h-7 stroke-[1.5]" />
                      </div>
                    )}
                  </div>

                  {/* Title - Georgia font */}
                  <h3 className="text-xl sm:text-2xl font-normal text-center text-[#F6F1E7] mb-3 font-serif">
                    {pillar.title}
                  </h3>

                  {/* Body description */}
                  <p className="text-[15px] sm:text-[16px] text-center text-[#B8B5AF] leading-relaxed mb-6">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs text-[#C9A45C]">
                  <span className="tracking-wider uppercase font-medium">{pillar.tag}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{isSelected ? t.services.hide : t.services.explore}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Service Inspection */}
        <AnimatePresence>
          {selectedServiceIndex !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-w-4xl mx-auto mb-14 bdv-card bg-[#141414] border border-[#C9A45C]/60 p-6 sm:p-8 rounded-[8px] shadow-[0_16px_50px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[#C9A45C]/20 gap-3">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#C9A45C] shrink-0" />
                  <h4 className="text-xl sm:text-2xl font-serif text-[#F6F1E7]">
                    {pillars[selectedServiceIndex].title} — {t.services.integratedServices}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedServiceIndex(null)}
                  className="text-xs uppercase tracking-widest text-[#B8B5AF] hover:text-[#C9A45C] p-1 self-start sm:self-auto cursor-pointer"
                >
                  {t.services.close}
                </button>
              </div>

              <p className="text-[15px] sm:text-base text-[#F6F1E7] mb-6 leading-relaxed">
                {pillars[selectedServiceIndex].summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
                {pillars[selectedServiceIndex].deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 p-3 rounded bg-black/60 border border-[#C9A45C]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#B8B5AF] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-[#C9A45C]/20 gap-3">
                <span className="text-xs text-[#B8B5AF]">
                  {t.services.projectQuestion.replace('{name}', pillars[selectedServiceIndex].title.toLowerCase())}
                </span>
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectServiceForContact(pillars[selectedServiceIndex].title)}
                  className="bdv-btn bdv-btn-gold px-6 py-3 text-sm inline-flex items-center gap-2 justify-center cursor-pointer shadow-md"
                >
                  <span>{t.services.inquireService}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global CTA button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectServiceForContact(t.services.generalServices)}
            className="bdv-btn bdv-btn-gold inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 text-[16px] shadow-[0_4px_24px_rgba(201,164,92,0.35)] cursor-pointer"
          >
            <span>{t.services.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
