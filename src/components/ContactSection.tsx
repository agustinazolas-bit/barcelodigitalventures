import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Copy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  initialService?: string;
  onOpenPrivacyModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  onOpenPrivacyModal,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    organizacion: '',
    servicio: initialService || '',
    mensaje: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      setFormData((prev) => ({ ...prev, servicio: initialService }));
    }
  }, [initialService]);

  const emailAddress = 'contacto@barcelodigitalventures.cl';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.nombre.trim()) {
      setErrorMessage(t.contact.errName);
      return;
    }

    if (!formData.correo.trim() || !formData.correo.includes('@')) {
      setErrorMessage(t.contact.errEmail);
      return;
    }

    if (!formData.mensaje.trim()) {
      setErrorMessage(t.contact.errMessage);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative min-h-[90vh] py-20 sm:py-28 bg-black text-[#F6F1E7] overflow-hidden border-t border-[#C9A45C]/20"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-6 xl:col-span-7 pt-2">
            
            {/* Section Tag */}
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

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.06, ease: 'easeOut' }}
              className="text-[34px] leading-[40px] sm:text-[46px] sm:leading-[52px] md:text-[58px] md:leading-[64px] lg:text-[66px] lg:leading-[72px] font-normal text-[#F6F1E7] tracking-tight mb-6 sm:mb-8 font-serif"
            >
              {t.contact.headline1}<br />
              {t.contact.headline2}<br />
              {t.contact.headline3}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
              className="text-[16px] leading-[26px] sm:text-xl text-[#B8B5AF] max-w-lg mb-8 sm:mb-10 font-normal"
            >
              {t.contact.lead}
            </motion.p>

            {/* Direct Email Address with copy button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
              className="pt-2 pb-6 border-b border-[#C9A45C]/30 max-w-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-lg sm:text-2xl text-[#DFC07D] hover:text-[#F6F1E7] transition-colors font-sans tracking-wide break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A45C]"
                >
                  {emailAddress}
                </a>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B8B5AF] hover:text-[#C9A45C] transition-colors py-1.5 px-3 rounded border border-[#C9A45C]/30 hover:border-[#C9A45C] self-start sm:self-auto cursor-pointer"
                  title="Copiar dirección al portapapeles"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">{t.contact.copiedEmail}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Additional details */}
            <div className="mt-6 space-y-1.5 text-xs sm:text-sm text-[#B8B5AF]/80">
              <p>{t.contact.subtext1}</p>
              <p>{t.contact.subtext2}</p>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-5 stabilize-gpu"
          >
            <div className="bdv-card p-6 sm:p-10 bg-[#F6F1E7] text-[#242424] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#76551F]/30 relative">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#76551F]/15 border border-[#76551F]/30 mx-auto flex items-center justify-center text-[#76551F]">
                      <Sparkles className="w-7 h-7 text-[#76551F]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#242424]">
                      {t.contact.successTitle}
                    </h3>
                    <p className="text-[15px] text-[#4A4A4A] leading-relaxed max-w-sm mx-auto">
                      {t.contact.successDesc}
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          nombre: '',
                          correo: '',
                          organizacion: '',
                          servicio: '',
                          mensaje: '',
                        });
                      }}
                      className="bdv-btn bdv-btn-bronze px-6 py-2.5 text-sm mt-4 cursor-pointer"
                    >
                      {t.contact.sendAnother}
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded text-sm bg-rose-50 border border-rose-300 text-rose-800"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    {/* Field: Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-[#242424] mb-1">
                        {t.contact.nameLabel} <span className="text-[#76551F]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={t.contact.namePlaceholder}
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#76551F]/25 text-[#242424] placeholder-[#8A8A8A] focus:outline-none focus:ring-1 focus:ring-[#76551F] focus:border-[#76551F] text-[15px]"
                      />
                    </div>

                    {/* Field: Correo */}
                    <div>
                      <label className="block text-sm font-medium text-[#242424] mb-1">
                        {t.contact.emailLabel} <span className="text-[#76551F]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        placeholder={t.contact.emailPlaceholder}
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#76551F]/25 text-[#242424] placeholder-[#8A8A8A] focus:outline-none focus:ring-1 focus:ring-[#76551F] focus:border-[#76551F] text-[15px]"
                      />
                    </div>

                    {/* Field: Organización */}
                    <div>
                      <label className="block text-sm font-medium text-[#242424] mb-1">
                        {t.contact.orgLabel} <span className="text-xs text-[#76551F]/70">{t.contact.orgOptional}</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="organization"
                        placeholder={t.contact.orgPlaceholder}
                        value={formData.organizacion}
                        onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#76551F]/25 text-[#242424] placeholder-[#8A8A8A] focus:outline-none focus:ring-1 focus:ring-[#76551F] focus:border-[#76551F] text-[15px]"
                      />
                    </div>

                    {/* Field: Servicio de Interés */}
                    <div>
                      <label className="block text-sm font-medium text-[#242424] mb-1">
                        {t.contact.serviceLabel} <span className="text-xs text-[#76551F]/70">{t.contact.orgOptional}</span>
                      </label>
                      <select
                        value={formData.servicio}
                        onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#76551F]/25 text-[#242424] focus:outline-none focus:ring-1 focus:ring-[#76551F] focus:border-[#76551F] text-[15px]"
                      >
                        <option value="">{t.contact.servicePlaceholder}</option>
                        {t.contact.serviceOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Field: Mensaje */}
                    <div>
                      <label className="block text-sm font-medium text-[#242424] mb-1">
                        {t.contact.messageLabel} <span className="text-[#76551F]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={t.contact.messagePlaceholder}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-white border border-[#76551F]/25 text-[#242424] placeholder-[#8A8A8A] focus:outline-none focus:ring-1 focus:ring-[#76551F] focus:border-[#76551F] text-[15px] resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="bdv-btn w-full py-3.5 px-6 rounded-[4px] bg-[#76551F] hover:bg-[#8E6B2A] text-[#F6F1E7] font-semibold text-[16px] inline-flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(118,85,31,0.35)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#76551F]"
                    >
                      <span>{isSubmitting ? t.contact.sending : t.contact.sendMessage}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    {/* Privacy Link */}
                    <div className="pt-2 text-center">
                      <p className="text-xs text-[#5A5A5A]">
                        {t.contact.privacyNotice}{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacyModal}
                          className="text-[#76551F] underline hover:text-[#242424] transition-colors cursor-pointer"
                        >
                          {t.contact.privacyLink}
                        </button>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
