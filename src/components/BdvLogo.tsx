import React from 'react';

interface BdvLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'master';
  className?: string;
  withText?: boolean;
}

export const BdvLogo: React.FC<BdvLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  withText = false,
}) => {
  const isLight = variant === 'light';
  const logoImagePath = '/assets/aistudio/image_ab750acf.png';

  // Responsive height scale for the transparent logo
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
    master: 'h-28 sm:h-36 md:h-44',
  }[size] || 'h-11 sm:h-13';

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Official transparent brand logo without circular container */}
      <img
        src={logoImagePath}
        alt="Barceló Digital Ventures"
        className={`${sizeClasses} w-auto object-contain drop-shadow-[0_0_14px_rgba(201,164,92,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_22px_rgba(201,164,92,0.55)]`}
        loading="eager"
      />

      {/* Optional supplementary typography if specifically enabled */}
      {withText && (
        <div className="flex flex-col text-left">
          <span 
            className="font-normal font-serif tracking-[0.2em] text-[#F6F1E7] text-lg leading-tight"
          >
            BARCELÓ
          </span>
          <span 
            className={`font-medium tracking-[0.25em] text-[10px] leading-tight ${
              isLight ? 'text-[#DFC07D]' : 'text-[#76551F]'
            }`}
          >
            DIGITAL VENTURES
          </span>
          <span 
            className="tracking-[0.2em] font-light text-[8px] text-[#B8B5AF]/90 mt-0.5 leading-tight uppercase"
          >
            IDEAS BEYOND TOMORROW
          </span>
        </div>
      )}
    </div>
  );
};

