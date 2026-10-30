import React, { useRef } from 'react';
import { ArrowRight, Target, Eye } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onExploreApproach: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreApproach }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax mapping bounded to section visibility
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const decorativeY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="relative min-h-[90vh] py-20 sm:py-28 bg-[#F6F1E7] text-[#242424] overflow-hidden border-t border-[#C9A45C]/30"
    >
      {/* Native Pure Decorative Graphic on the right with subtle parallax depth and entrance fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ y: decorativeY }}
        className="absolute top-0 right-0 w-full lg:w-1/2 h-full pointer-events-none overflow-hidden flex items-center justify-center lg:justify-end pr-0 lg:pr-12 opacity-80 stabilize-gpu"
      >
        <svg
          className="w-[380px] sm:w-[520px] lg:w-[600px] h-[380px] sm:h-[520px] lg:h-[600px]"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle concentric orbital rings */}
          <ellipse
            cx="320"
            cy="300"
            rx="240"
            ry="140"
            transform="rotate(-25 320 300)"
            stroke="#76551F"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.3"
          />
          <ellipse
            cx="320"
            cy="300"
            rx="180"
            ry="90"
            transform="rotate(-15 320 300)"
            stroke="#C9A45C"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <ellipse
            cx="320"
            cy="300"
            rx="270"
            ry="180"
            transform="rotate(10 320 300)"
            stroke="#76551F"
            strokeWidth="0.8"
            opacity="0.2"
          />

          {/* Central vision sphere with warm gold/bronze gradient */}
          <circle cx="320" cy="300" r="42" fill="url(#aboutSphereGrad)" filter="url(#sphereShadow)" />
          
          {/* Orbital golden beads */}
          <circle cx="160" cy="240" r="6" fill="#C9A45C" />
          <circle cx="440" cy="340" r="4.5" fill="#DFC07D" />
          <circle cx="370" cy="180" r="3.5" fill="#76551F" />

          <defs>
            <radialGradient id="aboutSphereGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#DFC07D" />
              <stop offset="45%" stopColor="#C9A45C" />
              <stop offset="100%" stopColor="#76551F" />
            </radialGradient>
            <filter id="sphereShadow" x="250" y="230" width="140" height="140" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#76551F" floodOpacity="0.25" />
            </filter>
          </defs>
        </svg>
      </motion.div>

      {/* Gentle gradient wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F6F1E7] via-[#F6F1E7]/95 lg:via-[#F6F1E7]/80 to-transparent pointer-events-none" />

      {/* Main Section Content with gentle viewport fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          
          {/* Section Sub-tag */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 sm:gap-4 mb-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#76551F] font-semibold">
              {t.about.kicker}
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-[#76551F]/40" />
          </motion.div>

          {/* Heading - Georgia 400 */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-[30px] leading-[38px] sm:text-[40px] sm:leading-[48px] md:text-[48px] md:leading-[54px] font-normal text-[#242424] tracking-tight mb-5 sm:mb-6 font-serif"
          >
            {t.about.title}
          </motion.h2>

          {/* Lead paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
            className="text-[16px] leading-[26px] sm:text-[19px] sm:leading-[29px] text-[#3A3A3A] mb-7 sm:mb-8 font-normal"
          >
            {t.about.lead}
          </motion.p>

          {/* CTA Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
            className="mb-10 sm:mb-14"
          >
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreApproach}
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-[4px] bg-[#76551F]/10 hover:bg-[#76551F]/15 text-[#76551F] font-semibold text-[15px] border border-[#76551F]/30 hover:border-[#76551F] transition-all cursor-pointer"
            >
              <span>{t.about.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Cards Grid: Propósito y Visión */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
            
            {/* Card 1: Propósito */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
              className="bdv-card p-6 bg-white/90 backdrop-blur-sm border border-[#76551F]/20 hover:border-[#76551F]/50 hover:shadow-lg transition-all duration-200 stabilize-gpu"
            >
              <div className="w-10 h-10 rounded-full bg-[#76551F]/10 border border-[#76551F]/25 flex items-center justify-center mb-4 text-[#76551F]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-normal text-[#242424] mb-2 font-serif">
                {t.about.purposeTitle}
              </h3>
              <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                {t.about.purposeDesc}
              </p>
            </motion.div>

            {/* Card 2: Visión */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
              className="bdv-card p-6 bg-white/90 backdrop-blur-sm border border-[#76551F]/20 hover:border-[#76551F]/50 hover:shadow-lg transition-all duration-200 stabilize-gpu"
            >
              <div className="w-10 h-10 rounded-full bg-[#76551F]/10 border border-[#76551F]/25 flex items-center justify-center mb-4 text-[#76551F]">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-normal text-[#242424] mb-2 font-serif">
                {t.about.visionTitle}
              </h3>
              <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                {t.about.visionDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom separator bar matching Page 3 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 pt-6 border-t border-[#76551F]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#76551F]/70 tracking-widest uppercase gap-2"
      >
        <span>Barceló Digital Ventures</span>
        <span className="font-light tracking-[0.25em]">{t.about.tagline}</span>
      </motion.div>
    </section>
  );
};
