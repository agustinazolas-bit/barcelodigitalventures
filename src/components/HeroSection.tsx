import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onExploreApproach: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreApproach,
  onContactClick,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax tracking bounded to the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth, subtle parallax offsets
  const bgGlobeY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const orbitalRingsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-black text-[#F6F1E7]"
    >
      {/* Background Graphic: The illuminated Earth globe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.78 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0 bg-cover pointer-events-none stabilize-gpu"
        style={{
          y: bgGlobeY,
          backgroundImage: `url('/assets/extracted/page_2.jpg')`,
          backgroundPosition: '75% 35%',
        }}
      />

      {/* Atmospheric dark gradient overlays to ensure text is 100% readable and accessible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/85 lg:via-black/75 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/30 to-black/80 pointer-events-none" />
      
      {/* Parallax ambient light aura */}
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(201,164,92,0.18)_0%,transparent_65%)] pointer-events-none stabilize-gpu"
      />

      {/* Hardware-Accelerated Gold Orbital Rings with Parallax Offset */}
      <motion.div
        style={{ y: orbitalRingsY }}
        className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-[560px] h-[560px] pointer-events-none z-0 stabilize-gpu"
      >
        <div className="absolute inset-0 rounded-full border border-[#C9A45C]/20 animate-slow-spin">
          {/* Orbiting golden bead */}
          <div className="absolute top-12 left-16 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#76551F] via-[#C9A45C] to-[#DFC07D] shadow-[0_0_14px_#DFC07D]" />
        </div>
        
        <div className="absolute inset-10 rounded-full border border-[#C9A45C]/15 animate-reverse-spin">
          <div className="absolute bottom-16 right-20 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#76551F] via-[#C9A45C] to-[#DFC07D] shadow-[0_0_10px_#DFC07D]" />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8 sm:py-12">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
          
          {/* Subtle brand kicker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#C9A45C]/10 border border-[#C9A45C]/25 text-[11px] sm:text-xs tracking-[0.25em] text-[#C9A45C] uppercase font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#DFC07D]" />
            <span>{t.hero.kicker}</span>
          </motion.div>

          {/* Main Title - Georgia 400 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="text-[36px] leading-[42px] sm:text-[48px] sm:leading-[54px] md:text-[58px] md:leading-[64px] lg:text-[64px] lg:leading-[72px] font-normal text-[#F6F1E7] tracking-tight mb-5 sm:mb-6 font-serif"
          >
            {t.hero.titlePrefix}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6F1E7] via-[#DFC07D] to-[#C9A45C]">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle - Source Sans 3 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px] md:text-[20px] md:leading-[30px] text-[#B8B5AF] max-w-xl mb-8 sm:mb-10 font-normal"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              className="bdv-btn bdv-btn-gold inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 text-[16px] shadow-[0_4px_24px_rgba(201,164,92,0.35)] cursor-pointer"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreApproach}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[16px] text-[#F6F1E7] hover:text-[#C9A45C] bg-white/5 sm:bg-transparent rounded sm:rounded-none border border-white/10 sm:border-transparent hover:border-[#C9A45C]/30 transition-all cursor-pointer"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A45C] transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom transition banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-14"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-[#C9A45C]/80" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B8B5AF] font-light">
              {t.hero.bannerKicker}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A45C]/40 to-[#C9A45C]/80" />
          </div>

          <div className="inline-flex items-center gap-2.5 sm:gap-3">
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-normal text-[#F6F1E7] tracking-tight font-serif">
              {t.hero.bannerTitle}
            </h2>
            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A45C] shadow-[0_0_10px_#DFC07D] animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
