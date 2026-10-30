import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ProcessSectionProps {
  onContactClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onContactClick }) => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax mapping bounded to section visibility
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const topBeadY = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const bannerArcY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  const steps = t.process.steps;

  return (
    <section
      ref={sectionRef}
      id="como-trabajamos"
      className="relative bg-[#F6F1E7] text-[#242424] border-t border-[#76551F]/20 overflow-hidden"
    >
      {/* Upper Reading Marfil Section */}
      <div className="relative pt-20 sm:pt-28 pb-16 sm:pb-24">
        
        {/* Native Pure SVG Gold Orbital Bead with Parallax and Entrance Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ y: topBeadY }}
          className="hidden lg:block absolute right-20 top-20 w-32 h-32 pointer-events-none will-change-transform"
        >
          <svg className="w-full h-full" viewBox="0 0 140 140" fill="none">
            <path
              d="M 10 70 Q 70 20 130 70"
              stroke="#76551F"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.35"
            />
            <circle cx="70" cy="45" r="16" fill="url(#processSphereGrad)" />
            <circle cx="70" cy="45" r="16" stroke="#C9A45C" strokeWidth="0.5" opacity="0.5" />
            <defs>
              <radialGradient id="processSphereGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#DFC07D" />
                <stop offset="50%" stopColor="#C9A45C" />
                <stop offset="100%" stopColor="#76551F" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Main Process Content with subtle viewport entrance fade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-3 sm:gap-4 mb-4"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#76551F] font-semibold">
                {t.process.kicker}
              </span>
              <div className="w-12 sm:w-16 h-[1px] bg-[#76551F]/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
              className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] md:text-[50px] md:leading-[56px] font-normal text-[#242424] tracking-tight mb-5 sm:mb-6 font-serif"
            >
              {t.process.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
              className="text-[16px] leading-[26px] sm:text-[19px] sm:leading-[29px] text-[#3A3A3A] max-w-2xl font-normal"
            >
              {t.process.lead}
            </motion.p>
          </div>

          {/* Desktop Timeline (md+) */}
          <div className="hidden md:block relative my-10">
            {/* Connecting horizontal line */}
            <div className="absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-[#76551F]/20 via-[#C9A45C] to-[#76551F]/20 z-0" />

            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.09, ease: 'easeOut' }}
                    onClick={() => setActiveStep(isActive ? null : idx)}
                    className="group cursor-pointer flex flex-col items-start stabilize-gpu"
                  >
                    {/* Number and sphere indicator */}
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className="text-4xl sm:text-[44px] font-normal font-serif text-[#76551F] group-hover:text-[#C9A45C] transition-colors leading-none">
                        {step.number}
                      </span>
                      {/* Sphere node */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#76551F] to-[#C9A45C] shadow-sm group-hover:scale-125 transition-transform" />
                        <div className="absolute w-6 h-6 rounded-full border border-[#C9A45C]/0 group-hover:border-[#C9A45C]/50 transition-all" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-normal text-[#242424] mb-2 font-serif group-hover:text-[#76551F] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-[16px] text-[#4A4A4A] leading-relaxed mb-3">
                      {step.description}
                    </p>

                    <div className="mt-2 text-xs font-semibold text-[#76551F] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isActive ? t.process.hideScope : t.process.seeScope}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-3 p-4 rounded-[8px] bg-white border border-[#76551F]/25 text-xs text-[#333333] leading-relaxed shadow-sm overflow-hidden"
                        >
                          {step.details}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical Timeline (<md) */}
          <div className="md:hidden relative my-6 pl-4 border-l-2 border-[#C9A45C]/40 space-y-6">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
                  onClick={() => setActiveStep(isActive ? null : idx)}
                  className="relative pl-6 py-2 cursor-pointer active:scale-[0.99] transition-transform stabilize-gpu"
                >
                  {/* Timeline Node Bead */}
                  <div className="absolute -left-[23px] top-3 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#76551F] to-[#C9A45C] shadow-sm border border-white" />
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-serif text-[#76551F] font-semibold">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-serif text-[#242424]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-[15px] text-[#4A4A4A] leading-relaxed mb-2">
                    {step.description}
                  </p>

                  <div className="text-xs font-semibold text-[#76551F] inline-flex items-center gap-1">
                    <span>{isActive ? t.process.hideScope : t.process.seeScope}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-3 p-3.5 rounded-[8px] bg-white border border-[#76551F]/25 text-xs text-[#333333] leading-relaxed shadow-sm overflow-hidden"
                      >
                        {step.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

      {/* Bottom Transition Banner with Parallax Curve and Entrance Fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative py-16 sm:py-20 bg-black text-[#F6F1E7] overflow-hidden border-t border-[#C9A45C]/20"
      >
        <motion.div
          style={{ y: bannerArcY }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center will-change-transform"
        >
          <div className="w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,164,92,0.12)_0%,transparent_70%)]" />
          <svg className="absolute w-[800px] h-[200px] opacity-40" viewBox="0 0 800 200" fill="none">
            <path
              d="M 50 150 Q 400 30 750 150"
              stroke="#C9A45C"
              strokeWidth="1.5"
            />
            <circle cx="400" cy="90" r="4.5" fill="#DFC07D" />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-[40px] font-normal text-[#F6F1E7] tracking-tight mb-6 sm:mb-8 font-serif"
          >
            {t.process.bottomTitle}
          </motion.h3>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            className="bdv-btn bdv-btn-gold inline-flex items-center gap-2.5 px-8 py-3.5 text-[16px] shadow-[0_4px_20px_rgba(201,164,92,0.35)] cursor-pointer"
          >
            <span>{t.process.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
