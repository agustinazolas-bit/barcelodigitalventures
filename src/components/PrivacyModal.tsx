import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#0F0F0F] border border-[#C9A45C]/40 rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden text-[#F6F1E7] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#C9A45C]/20 bg-black/90">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />
                <h3 className="text-base sm:text-lg font-serif text-[#F6F1E7]">
                  {t.privacyModal.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#B8B5AF] hover:text-white rounded hover:bg-white/10 cursor-pointer transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-4 text-xs sm:text-sm text-[#B8B5AF] leading-relaxed">
              <p>{t.privacyModal.p1}</p>

              <h4 className="text-sm sm:text-base font-serif text-[#F6F1E7] pt-2">
                {t.privacyModal.h1}
              </h4>
              <p>{t.privacyModal.p2}</p>

              <h4 className="text-sm sm:text-base font-serif text-[#F6F1E7] pt-2">
                {t.privacyModal.h2}
              </h4>
              <p>{t.privacyModal.p3}</p>

              <h4 className="text-sm sm:text-base font-serif text-[#F6F1E7] pt-2">
                {t.privacyModal.h3}
              </h4>
              <p>{t.privacyModal.p4}</p>
              <div className="p-3 rounded bg-black/60 border border-[#C9A45C]/30 text-[#DFC07D] font-mono text-xs break-all">
                contacto@barcelodigitalventures.cl
              </div>

              <p className="text-[11px] pt-4 text-[#B8B5AF]/70">
                {t.privacyModal.lastUpdate}
              </p>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-3.5 border-t border-[#C9A45C]/20 bg-black/90 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="bdv-btn bdv-btn-gold px-5 py-2 text-xs cursor-pointer"
              >
                {t.privacyModal.close}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
