import React from 'react';
import { BdvLogo } from './BdvLogo';
import { ArrowUp, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal, onReplayIntro }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-[#F6F1E7] border-t border-[#C9A45C]/20 pt-14 sm:pt-16 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10 items-start">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-6 space-y-3.5">
            <BdvLogo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-[#B8B5AF] max-w-sm leading-relaxed pt-1 font-normal">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                {t.footer.navTitle}
              </div>
              <ul className="space-y-2 text-[#B8B5AF]">
                <li>
                  <a href="#inicio" className="hover:text-[#F6F1E7] transition-colors py-0.5 inline-block">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="hover:text-[#F6F1E7] transition-colors py-0.5 inline-block">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-[#F6F1E7] transition-colors py-0.5 inline-block">
                    {t.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#como-trabajamos" className="hover:text-[#F6F1E7] transition-colors py-0.5 inline-block">
                    {t.nav.process}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-3">
                {t.footer.legalTitle}
              </div>
              <ul className="space-y-2 text-[#B8B5AF]">
                <li>
                  <button
                    onClick={onOpenPrivacyModal}
                    className="hover:text-[#F6F1E7] transition-colors text-left py-0.5 cursor-pointer"
                  >
                    {t.footer.privacyNotice}
                  </button>
                </li>
                {onReplayIntro && (
                  <li>
                    <button
                      onClick={onReplayIntro}
                      className="inline-flex items-center gap-1.5 text-xs text-[#DFC07D] hover:text-[#F6F1E7] transition-colors text-left py-0.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{t.footer.replayIntro}</span>
                    </button>
                  </li>
                )}
                <li>
                  <a
                    href="mailto:contacto@barcelodigitalventures.cl"
                    className="hover:text-[#F6F1E7] transition-colors text-xs text-[#DFC07D] py-0.5 inline-block break-all"
                  >
                    contacto@barcelodigitalventures.cl
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex md:justify-end items-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-white/5 border border-white/10 hover:border-[#C9A45C]/50 text-xs text-[#B8B5AF] hover:text-[#C9A45C] transition-all cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#B8B5AF]/80 tracking-widest uppercase gap-2 text-center sm:text-left">
          <span>{t.footer.rights}</span>
          <span className="text-[#C9A45C]/90 font-light tracking-[0.25em]">
            {t.footer.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
};
