import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { PrivacyModal } from '../components/PrivacyModal';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomePageProps {
  onReplayIntro?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onReplayIntro }) => {
  const { t } = useLanguage();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 480);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForContact = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen bg-black text-[#F6F1E7] selection:bg-[#C9A45C] selection:text-black antialiased">
      {/* Top Navigation with Language Switcher & Scroll Progress */}
      <Header />

      <main>
        {/* Section 1: Inicio / Hero */}
        <HeroSection
          onExploreApproach={() => scrollToSection('nosotros')}
          onContactClick={() => scrollToSection('contacto')}
        />

        {/* Section 2: Quiénes Somos / Nosotros */}
        <AboutSection
          onExploreApproach={() => scrollToSection('servicios')}
        />

        {/* Section 3: Nuestro Enfoque & Servicios */}
        <ServicesSection
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* Section 4: Cómo trabajamos */}
        <ProcessSection
          onContactClick={() => scrollToSection('contacto')}
        />

        {/* Section 5: Contacto */}
        <ContactSection
          initialService={selectedService}
          onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onReplayIntro={onReplayIntro}
      />

      {/* Floating Back-To-Top button */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-black/85 backdrop-blur-md border border-[#C9A45C]/50 text-[#DFC07D] hover:text-[#F6F1E7] hover:border-[#C9A45C] shadow-[0_4px_20px_rgba(0,0,0,0.85)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] stabilize-gpu"
            aria-label={t.footer.backToTop}
            title={t.footer.backToTop}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
};
