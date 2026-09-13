import React from 'react';
import { ShieldCheck, AlertTriangle, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function TodayDecisionCards({ panchang }) {
  const { t, language } = useLanguage();

  if (!panchang) return null;

  const isHi = language === 'hi';

  // Best muhurat
  const bestMuhuratName = panchang.muhurat?.abhijitMuhurat
    ? (isHi ? 'अभिजित मुहूर्त' : 'Abhijit Muhurat')
    : (isHi ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurat');
  const bestMuhuratTime = panchang.muhurat?.abhijitMuhurat
    || panchang.muhurat?.brahmaMuhurat
    || '—';

  // Rahu Kalam
  const rahuKalamTime = panchang.inauspicious?.rahuKalam || '—';

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      role="region"
      aria-label="Today's key timings"
    >

      {/* ── Card 1: Best Time Today (Auspicious) ── */}
      <div
        className="vedic-card accent-auspicious p-5 flex flex-col gap-4"
        role="region"
        aria-label={t('cards.bestTimeTitle')}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            </div>
            <div>
              <p className="panchang-label text-emerald-700 dark:text-emerald-500">
                {t('cards.bestTimeTitle')}
              </p>
              <p className="panchang-label text-stone-400 dark:text-stone-600 normal-case tracking-normal text-[10px]">
                {t('cards.shubhMuhuratBadge')}
              </p>
            </div>
          </div>
          {/* Status pill */}
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex-shrink-0">
            <span className="status-dot-active" aria-hidden="true" />
            {t('cards.activeNow')}
          </span>
        </div>

        {/* Value */}
        <div className="flex-1">
          <p className="panchang-value text-xl sm:text-2xl">{bestMuhuratName}</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            {bestMuhuratTime}
          </p>
        </div>

        {/* Guidance */}
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-vedic-nightBorder pt-3">
          {t('cards.bestTimeGuidance')}
        </p>
      </div>

      {/* ── Card 2: Avoid Today (Inauspicious) ── */}
      <div
        className="vedic-card accent-inauspicious p-5 flex flex-col gap-4"
        role="region"
        aria-label={t('cards.avoidTitle')}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400" aria-hidden="true" />
            </div>
            <div>
              <p className="panchang-label text-rose-700 dark:text-rose-500">
                {t('cards.avoidTitle')}
              </p>
              <p className="panchang-label text-stone-400 dark:text-stone-600 normal-case tracking-normal text-[10px]">
                {t('cards.ashubhKaalBadge')}
              </p>
            </div>
          </div>
          {/* Status pill */}
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 flex-shrink-0">
            <span className="status-dot-caution" aria-hidden="true" />
            {isHi ? 'अशुभ काल' : 'Caution'}
          </span>
        </div>

        {/* Value */}
        <div className="flex-1">
          <p className="panchang-value text-xl sm:text-2xl">{t('cards.rahuKalamTitle')}</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 mt-1">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            {rahuKalamTime}
          </p>
        </div>

        {/* Guidance */}
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-vedic-nightBorder pt-3">
          {t('cards.avoidGuidance')}
        </p>
      </div>

    </div>
  );
}
