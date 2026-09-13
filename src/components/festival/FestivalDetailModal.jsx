import React from 'react';
import { X, Sparkles, Heart, BookOpen, Compass, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FestivalDetailModal({ festival, isOpen, onClose }) {
  const { t, language } = useLanguage();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !festival) return null;

  const isHi = language === 'hi';
  const festivalName = isHi ? (festival.hindi || festival.name) : festival.name;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[94vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="festival-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Vedic Gradient */}
        <div className="p-3.5 sm:p-6 bg-gradient-to-br from-vedic-saffron-600 via-amber-600 to-vedic-gold-500 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close festival details"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
          
          <div className="space-y-1 pr-8 sm:pr-10">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 inline-block backdrop-blur-sm">
              {festival.category}
            </span>
            <h3 id="festival-modal-title" className="text-lg sm:text-3xl font-bold font-serif">
              {festivalName}
            </h3>
            <div className="text-xs sm:text-sm font-devanagari opacity-95">
              {festival.hindi}
            </div>
          </div>
        </div>

        {/* Body Details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">{isHi ? 'मास एवं पक्ष' : 'Month & Paksha'}</span>
              <span className="font-bold text-stone-900 dark:text-white">
                {festival.monthName} ({festival.paksha})
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('festivals.rulingDeity')}</span>
              <span className="font-bold text-stone-900 dark:text-white">
                {festival.deity}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">{t('festivals.muhuratHintTitle')}</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {festival.muhuratHint || (isHi ? 'शुभ चौघड़िया' : 'Auspicious Choghadiya')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-vedic-saffron-600" />
              {isHi ? 'पर्व परिचय' : 'About the Celebration'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {festival.description}
            </p>
          </div>

          {/* Significance */}
          {festival.significance && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-vedic-gold-600" />
                {t('festivals.significanceTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {festival.significance}
              </p>
            </div>
          )}

          {/* Rituals and Vidhi */}
          {festival.rituals && (
            <div className="space-y-2 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <h4 className="text-sm font-bold font-serif text-stone-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t('festivals.ritualsTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {festival.rituals}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-300 transition-colors"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
