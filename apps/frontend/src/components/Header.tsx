import React, { useState, useEffect } from 'react';
import { BdvLogo } from './BdvLogo';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollPercent, setScrollPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ['inicio', 'nosotros', 'servicios', 'como-trabajamos', 'contacto'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#inicio', id: 'inicio' },
    { label: t.nav.about, href: '#nosotros', id: 'nosotros' },
    { label: t.nav.services, href: '#servicios', id: 'servicios' },
    { label: t.nav.process, href: '#como-trabajamos', id: 'como-trabajamos' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Visual Reading Progress Bar at the very top of the viewport */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[3.5px] bg-[#14120f]/80 backdrop-blur-xs pointer-events-none"
        role="progressbar"
        aria-label={t.nav.readingProgress}
        aria-valuenow={scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          style={{ scaleX }}
          className="h-full w-full bg-gradient-to-r from-[#76551F] via-[#C9A45C] via-[#E6CD8D] to-[#FFF6E3] origin-left shadow-[0_0_12px_rgba(201,164,92,0.95),0_0_24px_rgba(201,164,92,0.5)]"
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-[#C9A45C]/25 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#inicio');
              }}
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] rounded-sm py-1"
            >
              <BdvLogo variant="light" size="md" />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={`text-[14.5px] font-medium tracking-wide transition-colors duration-200 relative py-1 focus-visible:outline-none focus-visible:text-[#C9A45C] ${
                      isActive
                        ? 'text-[#C9A45C]'
                        : 'text-[#B8B5AF] hover:text-[#F6F1E7]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C] rounded-full shadow-[0_0_8px_#C9A45C]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Reading progress numeric indicator */}
              {scrollPercent > 0 && (
                <div
                  className="hidden xl:flex items-center gap-1.5 text-xs text-[#C9A45C]/90 font-mono tracking-wider select-none pr-1"
                  title={`${t.nav.readingProgress}: ${scrollPercent}%`}
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] shadow-[0_0_6px_#C9A45C] animate-pulse" />
                  <span>{scrollPercent}%</span>
                </div>
              )}

              {/* Language Switcher Toggle */}
              <div
                className="flex items-center rounded-full p-1 bg-white/5 border border-[#C9A45C]/30 text-xs font-medium"
                role="radiogroup"
                aria-label="Selector de idioma / Language switcher"
              >
                <div className="flex items-center pl-2 pr-1 text-[#C9A45C]">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  aria-checked={language === 'es'}
                  role="radio"
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'es'
                      ? 'bg-[#C9A45C] text-black font-semibold shadow-[0_0_10px_rgba(201,164,92,0.4)]'
                      : 'text-[#B8B5AF] hover:text-[#F6F1E7]'
                  }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-checked={language === 'en'}
                  role="radio"
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#C9A45C] text-black font-semibold shadow-[0_0_10px_rgba(201,164,92,0.4)]'
                      : 'text-[#B8B5AF] hover:text-[#F6F1E7]'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Primary CTA button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#contacto');
                }}
                className="bdv-btn bdv-btn-gold inline-flex items-center gap-2 px-6 py-2.5 shadow-[0_2px_14px_rgba(201,164,92,0.3)] hover:shadow-[0_4px_20px_rgba(201,164,92,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A45C]"
              >
                <span>{t.nav.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Language Switcher for Mobile Header */}
              <div
                className="flex items-center rounded-full p-0.5 bg-white/5 border border-[#C9A45C]/30 text-xs font-medium"
                role="radiogroup"
                aria-label="Selector de idioma / Language switcher"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  aria-checked={language === 'es'}
                  role="radio"
                  className={`px-2 py-0.5 rounded-full text-[11px] transition-all cursor-pointer ${
                    language === 'es'
                      ? 'bg-[#C9A45C] text-black font-semibold'
                      : 'text-[#B8B5AF]'
                  }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-checked={language === 'en'}
                  role="radio"
                  className={`px-2 py-0.5 rounded-full text-[11px] transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#C9A45C] text-black font-semibold'
                      : 'text-[#B8B5AF]'
                  }`}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F6F1E7] hover:text-[#C9A45C] focus:outline-none rounded active:scale-95 transition-transform cursor-pointer"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-black/98 backdrop-blur-2xl border-b border-[#C9A45C]/30 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.id;
                    return (
                      <motion.a
                        key={link.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className={`py-3 px-3 rounded text-base font-medium tracking-wide transition-all flex items-center justify-between ${
                          isActive
                            ? 'text-[#C9A45C] bg-[#C9A45C]/10 border-l-2 border-[#C9A45C]'
                            : 'text-[#B8B5AF] hover:text-[#F6F1E7] hover:bg-white/5'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />}
                      </motion.a>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#C9A45C]/20 space-y-3">
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo('#contacto');
                    }}
                    className="bdv-btn bdv-btn-gold flex items-center justify-center gap-2 w-full py-3.5 text-center shadow-lg active:scale-[0.99] transition-transform cursor-pointer"
                  >
                    <span>{t.nav.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
