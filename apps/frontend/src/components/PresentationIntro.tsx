import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PresentationIntroProps {
  show: boolean;
  onFinish: () => void;
}

export const PresentationIntro: React.FC<PresentationIntroProps> = ({ show, onFinish }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;

    // Prevent body scroll during presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-advance after 2.6 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);

    // Subtle progress bar ticker for luxury polish
    const start = Date.now();
    const duration = 2800;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="bdv-presentation-intro"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
          }}
          onClick={onFinish}
          className="fixed inset-0 z-[100] bg-black text-[#F6F1E7] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          role="dialog"
          aria-label="Pantalla de presentación Barceló Digital Ventures"
        >
          {/* Ambient Lighting & Celestial Aura */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Deep gold radial aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.18)_0%,rgba(12,12,12,0.6)_50%,transparent_75%)]" />
            
            {/* Subtle starry backdrop speckles */}
            <div className="absolute inset-0 bg-[radial-gradient(#C9A45C_0.8px,transparent_0.8px)] [background-size:32px_32px] opacity-15" />
          </div>

          {/* Rotating Celestial Orbital Rings in Background */}
          <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-[#C9A45C]/15 animate-slow-spin">
              <div className="absolute top-8 left-16 w-3 h-3 rounded-full bg-gradient-to-tr from-[#76551F] via-[#C9A45C] to-[#DFC07D] shadow-[0_0_12px_#DFC07D]" />
            </div>
            <div className="absolute inset-10 rounded-full border border-[#C9A45C]/10 animate-reverse-spin">
              <div className="absolute bottom-12 right-16 w-2 h-2 rounded-full bg-[#DFC07D] shadow-[0_0_8px_#DFC07D]" />
            </div>
          </div>

          {/* Central Brand Presentation Stack */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto">
            
            {/* 1. Main Transparent Brand Logo without circular frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 sm:mb-8 flex items-center justify-center"
            >
              {/* Soft ambient golden backlight glow behind the transparent logo */}
              <div className="absolute inset-0 max-w-[260px] max-h-[260px] sm:max-w-[360px] sm:max-h-[360px] m-auto rounded-full bg-gradient-to-tr from-[#76551F]/30 via-[#C9A45C]/35 to-[#DFC07D]/30 blur-3xl pointer-events-none animate-pulse" />
              
              {/* Transparent Brand Logo Image */}
              <img
                src="/assets/aistudio/image_ab750acf.png"
                alt="Barceló Digital Ventures - Ideas Beyond Tomorrow"
                className="relative z-10 w-64 sm:w-80 md:w-96 max-w-[85vw] max-h-[46vh] h-auto object-contain drop-shadow-[0_0_35px_rgba(201,164,92,0.45)] select-none pointer-events-none"
              />
            </motion.div>

            {/* 2. Subline / Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
              className="space-y-1.5 mb-6 text-center"
            >
              <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#DFC07D] font-medium font-sans">
                {t.intro.purpose}
              </p>
              <p className="text-[13px] sm:text-[14px] text-[#B8B5AF]/80 font-light tracking-wide">
                {t.intro.subline}
              </p>
            </motion.div>

            {/* 3. Luxury Progress Shimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="w-40 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6"
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#76551F] via-[#C9A45C] to-[#FFF6E3] transition-all duration-75 ease-out shadow-[0_0_8px_#C9A45C]"
              />
            </motion.div>

            {/* 6. Skip / Enter Action */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                onFinish();
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#C9A45C]/15 border border-[#C9A45C]/30 text-xs text-[#B8B5AF] hover:text-[#DFC07D] transition-colors cursor-pointer group"
            >
              <span>{t.intro.enter}</span>
              <ArrowRight className="w-3 h-3 text-[#C9A45C] group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Bottom subtle hint */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <span className="text-[11px] text-[#B8B5AF]/40 tracking-widest uppercase">
              {t.intro.skip} · [Click / Esc]
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
