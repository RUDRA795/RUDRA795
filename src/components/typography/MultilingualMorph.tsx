import React, { useState, useEffect } from 'react';
import { languagesData } from '../../data/languages';
import type { SupportedLanguage } from '../../data/languages';

interface MultilingualMorphProps {
  translationKey: keyof typeof languagesData.en.translations;
  className?: string;
  cycleIntervalMs?: number;
  highlightClass?: string;
  showLanguageBadge?: boolean;
}

export const MultilingualMorph: React.FC<MultilingualMorphProps> = ({
  translationKey,
  className = "",
  cycleIntervalMs = 4200,
  highlightClass = "text-gradient-cyan",
  showLanguageBadge = false
}) => {
  const languageSequence: SupportedLanguage[] = ['en', 'hi', 'mr', 'ja'];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % languageSequence.length);
        setIsTransitioning(false);
      }, 350);
    }, cycleIntervalMs);

    return () => clearInterval(interval);
  }, [cycleIntervalMs]);

  const currentLang = languageSequence[currentIndex];
  const langMeta = languagesData[currentLang];
  const text = langMeta.translations[translationKey] || languagesData.en.translations[translationKey];

  const fontClass = currentLang === 'hi' || currentLang === 'mr'
    ? 'font-devanagari'
    : currentLang === 'ja'
    ? 'font-japanese'
    : 'font-display';

  return (
    <div className="inline-flex flex-col items-start">
      {showLanguageBadge && (
        <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 mb-1 flex items-center gap-1.5 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          LANG // {langMeta.nativeLabel} ({langMeta.code.toUpperCase()})
        </span>
      )}
      <span
        className={`transition-all duration-350 transform ${fontClass} ${highlightClass} ${className} ${
          isTransitioning
            ? 'opacity-0 -translate-y-2 blur-sm scale-95'
            : 'opacity-100 translate-y-0 blur-0 scale-100'
        }`}
      >
        {text}
      </span>
    </div>
  );
};
