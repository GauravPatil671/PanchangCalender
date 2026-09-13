import React from 'react';
import { MapPin } from 'lucide-react';
import { formatDateDisplay, formatDayOfWeek } from '../../utils/dateUtils';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';

export default function TodaySummaryHero({ panchang }) {
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { t, language } = useLanguage();

  if (!panchang) return null;

  const isHi = language === 'hi';

  // Parse date safely without timezone shift
  const [pyear, pmon, pday] = (panchang.date || '').split('-').map(Number);
  const dateObj = (pyear && pmon && pday)
    ? new Date(pyear, pmon - 1, pday)
    : new Date(panchang.date);
  const dayName       = formatDayOfWeek(dateObj);
  const dateFormatted = formatDateDisplay(dateObj);

  // Tithi names
  const sunriseTithiName = isHi
    ? (panchang.sunriseTithi?.hindi
        ? `${panchang.pakshaHindi || ''} ${panchang.sunriseTithi.hindi}`
        : panchang.tithi?.hindi || panchang.tithi?.name)
    : (panchang.sunriseTithi?.name || panchang.tithi?.name || 'Tithi');

  const currentTithiName = isHi
    ? (panchang.currentTithi?.hindi
        ? `${panchang.pakshaHindi || ''} ${panchang.currentTithi.hindi}`
        : panchang.tithi?.hindi || panchang.tithi?.name)
    : (panchang.currentTithi?.name || panchang.tithi?.name || 'Tithi');

  const pakshaDisplay = isHi ? panchang.pakshaHindi : panchang.paksha;
  const endTime       = panchang.sunriseTithi?.endTimeFormatted || panchang.tithi?.endTimeFormatted;

  // Plain-language status sentence
  let statusSentence = '';
  if (panchang.hasSunriseTithiEnded && currentTithiName !== sunriseTithiName) {
    statusSentence = t('hero.statusActive', {
      sunriseTithi: sunriseTithiName,
      time:         endTime || '',
      currentTithi: currentTithiName,
    });
  } else if (endTime) {
    statusSentence = t('hero.statusUntil', { tithi: sunriseTithiName, time: endTime });
  } else {
    statusSentence = t('hero.statusSimple', { tithi: sunriseTithiName, paksha: pakshaDisplay });
  }

  return (
    <section
      className="relative overflow-hidden rounded-xl bg-white dark:bg-vedic-nightCard border border-stone-200 dark:border-vedic-nightBorder shadow-card-sm vedic-watermark"
      aria-label="Today's Panchang Summary"
    >
      <div className="relative px-5 py-6 sm:px-8 sm:py-8 space-y-5">

        {/* ── Top meta row ── */}
        <div className="flex flex-wrap items-center justify-between gap-2">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="panchang-label text-vedic-saffron-700 dark:text-vedic-saffron-400">
              {t('hero.badge')}
            </span>
            {panchang.samvat?.vikram && (
              <span className="panchang-label text-stone-400 dark:text-stone-600">
                {t('hero.samvatPrefix')}&nbsp;{panchang.samvat.vikram}
              </span>
            )}
          </div>

          {/* City selector */}
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-vedic-saffron-700 dark:hover:text-vedic-saffron-400 font-medium transition-colors min-h-[36px]"
            aria-label={`${t('nav.location')}: ${selectedLocation.city}. ${t('nav.change')}.`}
          >
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>{selectedLocation.city}</span>
          </button>
        </div>

        {/* ── Date headline ── */}
        <div className="space-y-1">
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 tracking-tight leading-none">
            {dateFormatted}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-semibold text-stone-700 dark:text-stone-300">{dayName}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>{panchang.month?.purnimanta} {t('hero.maas')}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-vedic-gold-700 dark:text-vedic-gold-400">{pakshaDisplay}</span>
            {panchang.samvat?.ritu && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700 hidden xs:inline">·</span>
                <span className="hidden xs:inline text-stone-400 dark:text-stone-500">
                  {panchang.samvat.ritu} {t('hero.ritu')}
                </span>
              </>
            )}
          </p>
        </div>

        {/* ── Status line ── */}
        <div
          className="flex items-start gap-3 pl-4 border-l-4 border-l-vedic-gold-500 dark:border-l-vedic-gold-600"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-snug font-medium">
            {statusSentence}
          </p>
        </div>

      </div>
    </section>
  );
}
