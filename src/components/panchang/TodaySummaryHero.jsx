import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { formatDateDisplay, formatDayOfWeek } from '../../utils/dateUtils';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TodaySummaryHero({ panchang }) {
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { t, language } = useLanguage();

  if (!panchang) return null;

  // Parse local date cleanly to prevent timezone shifts
  const [pyear, pmon, pday] = (panchang.date || '').split('-').map(Number);
  const dateObj = (pyear && pmon && pday) ? new Date(pyear, pmon - 1, pday) : new Date(panchang.date);
  const dayName = formatDayOfWeek(dateObj);
  const dateFormatted = formatDateDisplay(dateObj);

  // Localized or canonical names
  const isHi = language === 'hi';
  const sunriseTithiName = isHi 
    ? (panchang.sunriseTithi?.hindi ? `${panchang.pakshaHindi || ''} ${panchang.sunriseTithi.hindi}` : panchang.tithi?.hindi || panchang.tithi?.name)
    : (panchang.sunriseTithi?.name || panchang.tithi?.name || 'Tithi');
  
  const currentTithiName = isHi 
    ? (panchang.currentTithi?.hindi ? `${panchang.pakshaHindi || ''} ${panchang.currentTithi.hindi}` : panchang.tithi?.hindi || panchang.tithi?.name)
    : (panchang.currentTithi?.name || panchang.tithi?.name || 'Tithi');
  
  const pakshaDisplay = isHi ? panchang.pakshaHindi : panchang.paksha;
  const endTime = panchang.sunriseTithi?.endTimeFormatted || panchang.tithi?.endTimeFormatted;

  let statusSentence = '';
  if (panchang.hasSunriseTithiEnded && currentTithiName !== sunriseTithiName) {
    statusSentence = t('hero.statusActive', {
      sunriseTithi: sunriseTithiName,
      time: endTime || '',
      currentTithi: currentTithiName
    });
  } else if (endTime) {
    statusSentence = t('hero.statusUntil', {
      tithi: sunriseTithiName,
      time: endTime
    });
  } else {
    statusSentence = t('hero.statusSimple', {
      tithi: sunriseTithiName,
      paksha: pakshaDisplay
    });
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border border-stone-200/90 dark:border-stone-800 shadow-sm transition-all p-5 sm:p-8">
      
      {/* Subtle Background Watermark */}
      <div 
        className="absolute top-2 right-4 text-7xl sm:text-8xl font-serif font-bold text-stone-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none"
        aria-hidden="true"
      >
        ॐ
      </div>

      <div className="relative space-y-4">
        
        {/* Top Meta Badges & City */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-vedic-saffron-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {t('hero.badge')}
            </span>
            <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-200/50 dark:border-amber-900/40">
              {t('hero.samvatPrefix')} {panchang.samvat?.vikram}
            </span>
          </div>

          {/* Single clean location indicator */}
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="inline-flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 font-medium transition-colors min-h-[36px]"
            title={t('nav.changeCityTitle')}
            aria-label={`${t('nav.location')}: ${selectedLocation.city}. ${t('nav.change')}.`}
          >
            <MapPin className="w-3.5 h-3.5 text-vedic-saffron-600 dark:text-vedic-saffron-400" aria-hidden="true" />
            <span className="font-semibold underline decoration-dotted underline-offset-2">{selectedLocation.city}</span>
          </button>
        </div>

        {/* Date & Day Headline (Single H1) */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-stone-900 dark:text-white tracking-tight">
            {dateFormatted}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 flex flex-wrap items-center gap-1.5 font-medium">
            <span className="font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">{dayName}</span>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
            <span>{panchang.month?.purnimanta} {t('hero.maas')}</span>
            <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">•</span>
            <span className="text-amber-700 dark:text-amber-400">{pakshaDisplay}</span>
            {panchang.samvat?.ritu && (
              <>
                <span className="text-stone-300 dark:text-stone-700 hidden xs:inline" aria-hidden="true">•</span>
                <span className="text-stone-500 dark:text-stone-400 hidden xs:inline text-xs">{panchang.samvat.ritu} {t('hero.ritu')}</span>
              </>
            )}
          </p>
        </div>

        {/* Plain-Language Daily Status Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-200/80 dark:border-amber-900/40 text-stone-800 dark:text-stone-200 text-sm sm:text-base font-medium flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <p className="leading-snug">
            {statusSentence}
          </p>
        </div>

      </div>
    </div>
  );
}
