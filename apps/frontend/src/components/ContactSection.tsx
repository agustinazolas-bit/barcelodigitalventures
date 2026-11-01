import React, { useState, useEffect, useRef } from 'react';
import { Mail, Check, Copy, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  initialService?: string;
  onOpenPrivacyModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  onOpenPrivacyModal,
}) => {
  const { t, language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(initialService || '');

  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax mapping bounded to section visibility
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgCurvesY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const auraGlowY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Sync initialService if changed from external component
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  const emailAddress = 'contacto@barcelodigitalventures.cl';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mailSubject = selectedService
    ? `${language === 'es' ? 'Consulta sobre' : 'Inquiry about'} ${selectedService} - Barceló Digital Ventures`
    : `${language === 'es' ? 'Contacto / Consulta Estratégica' : 'Strategic Contact / Inquiry'} - Barceló Digital Ventures`;

  const mailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative min-h-[75vh] py-20 sm:py-28 bg-black text-[#F6F1E7] overflow-hidden border-t border-[#C9A45C]/20"
    >
      {/* Native Pure Ambient Glow with Subtle Parallax Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: auraGlowY }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_20%_80%,rgba(201,164,92,0.12)_0%,transparent_65%)] will-change-transform"
        />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(201,164,92,0.06)_0%,transparent_70%)]" />

        {/* Elegant native orbital curves with parallax movement */}
        <motion.svg
          style={{ y: bgCurvesY }}
          className="hidden lg:block absolute left-4 bottom-4 w-[650px] h-[650px] opacity-25 will-change-transform"
          viewBox="0 0 650 650"
          fill="none"
        >
          <circle cx="200" cy="450" r="280" stroke="#C9A45C" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="450" r="380" stroke="#76551F" strokeWidth="0.75" />
          <circle cx="420" cy="270" r="4.5" fill="#DFC07D" />
        </motion.svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-semibold">
              {t.contact.kicker}
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-[#C9A45C]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.06, ease: 'easeOut' }}
            className="text-[34px] leading-[40px] sm:text-[46px] sm:leading-[52px] md:text-[56px] md:leading-[62px] font-normal text-[#F6F1E7] tracking-tight mb-6 font-serif"
          >
            {t.contact.headline1} {t.contact.headline2} {t.contact.headline3}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
            className="text-[16px] leading-[26px] sm:text-xl text-[#B8B5AF] max-w-2xl font-normal"
          >
            {t.contact.lead}
          </motion.p>

          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-xs text-[#DFC07D]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === 'es' ? 'Interés seleccionado:' : 'Selected area:'} <strong className="text-[#F6F1E7]">{selectedService}</strong>
              </span>
              <button
                onClick={() => setSelectedService('')}
                className="ml-1 text-[#B8B5AF] hover:text-[#F6F1E7] text-xs cursor-pointer"
                title="Limpiar filtro"
              >
                ✕
              </button>
            </motion.div>
          )}
        </div>

        {/* Executive Direct Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Direct Email Channel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-7 bdv-card p-8 sm:p-10 bg-gradient-to-br from-[#121212] via-[#0D0D0D] to-black border border-[#C9A45C]/35 rounded-lg relative overflow-hidden flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_0%,rgba(201,164,92,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-lg bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#DFC07D] mb-6">
                <Mail className="w-6 h-6" />
              </div>

              <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-2">
                {language === 'es' ? 'Canal Oficial de Contacto' : 'Official Contact Channel'}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#F6F1E7] mb-3">
                {language === 'es' ? 'Escríbenos directamente' : 'Write to Us Directly'}
              </h3>

              <p className="text-sm sm:text-base text-[#B8B5AF] leading-relaxed mb-6 max-w-lg">
                {language === 'es'
                  ? 'Atendemos consultas corporativas, alianzas tecnológicas y nuevos proyectos directamente en nuestra casilla institucional.'
                  : 'We handle corporate inquiries, technology partnerships, and new ventures directly through our institutional inbox.'}
              </p>

              {/* Email Address Display */}
              <div className="p-4 sm:p-5 rounded-md bg-white/[0.03] border border-[#C9A45C]/20 mb-6">
                <div className="text-[11px] uppercase tracking-wider text-[#C9A45C]/80 mb-1 font-mono">
                  {language === 'es' ? 'Dirección de correo electrónico' : 'Email Address'}
                </div>
                <a
                  href={mailHref}
                  className="text-lg sm:text-2xl text-[#DFC07D] hover:text-[#F6F1E7] transition-colors font-mono tracking-tight break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A45C]"
                >
                  {emailAddress}
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={mailHref}
                className="bdv-btn bdv-btn-gold px-6 py-3.5 inline-flex items-center justify-center gap-2.5 font-semibold text-sm shadow-[0_4px_16px_rgba(201,164,92,0.3)] cursor-pointer"
              >
                <span>{language === 'es' ? 'Escribir correo' : 'Send an Email'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyEmail}
                className="px-5 py-3.5 rounded-[4px] border border-[#C9A45C]/35 hover:border-[#C9A45C] text-sm text-[#F6F1E7] hover:text-[#DFC07D] bg-white/[0.02] hover:bg-white/[0.05] inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">{t.contact.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#DFC07D]" />
                    <span>{t.contact.copyEmail}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Card 2: Standards, Commitments & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.22, ease: 'easeOut' }}
            className="lg:col-span-5 bdv-card p-8 sm:p-10 bg-gradient-to-br from-[#101010] to-[#0A0A0A] border border-[#76551F]/40 rounded-lg flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C9A45C] font-semibold mb-6">
                {language === 'es' ? 'Compromiso & Alcance' : 'Commitment & Scope'}
              </div>

              <div className="space-y-6">
                {/* Point 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#DFC07D] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F6F1E7] mb-1">
                      {language === 'es' ? 'Respuesta en menos de 24 horas' : 'Response Within 24 Hours'}
                    </h4>
                    <p className="text-xs text-[#B8B5AF] leading-relaxed">
                      {language === 'es'
                        ? 'Revisamos cada mensaje de forma personalizada para dar una respuesta ágil y fundamentada en días hábiles.'
                        : 'Every inquiry receives direct, personalized attention from our leadership team within business hours.'}
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#DFC07D] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F6F1E7] mb-1">
                      {language === 'es' ? 'Confidencialidad rigurosa' : 'Strict Confidentiality'}
                    </h4>
                    <p className="text-xs text-[#B8B5AF] leading-relaxed">
                      {language === 'es'
                        ? 'Tratamos la información estratégica bajo estrictos estándares éticos y acuerdos de confidencialidad (NDA).'
                        : 'All strategic conversations and project details are protected under standard non-disclosure practices.'}
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#C9A45C]/10 border border-[#C9A45C]/30 flex items-center justify-center text-[#DFC07D] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F6F1E7] mb-1">
                      {t.contact.subtext1}
                    </h4>
                    <p className="text-xs text-[#B8B5AF] leading-relaxed">
                      {t.contact.subtext2}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="pt-8 mt-8 border-t border-white/10 text-xs text-[#B8B5AF]/80">
              <p>
                {t.contact.privacyNotice}{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="text-[#DFC07D] underline hover:text-[#F6F1E7] transition-colors cursor-pointer"
                >
                  {t.contact.privacyLink}
                </button>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
