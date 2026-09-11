import React from 'react';
import { Moon, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function TodayDecisionCards({ panchang }) {
  const { t, language } = useLanguage();

  if (!panchang) return null;

  const isHi = language === 'hi';
  const tithiName = isHi 
    ? (panchang.currentTithi?.hindi ? `${panchang.pakshaHindi || ''} ${panchang.currentTithi.hindi}` : panchang.tithi?.hindi || panchang.tithi?.name)
    : (panchang.currentTithi?.name || panchang.tithi?.name || 'Tithi');
  
  const nakshatraName = isHi ? (panchang.nakshatra?.hindi || panchang.nakshatra?.name) : panchang.nakshatra?.name || 'Nakshatra';
  const nakshatraEnd = panchang.nakshatra?.endTimeFormatted;
  
  // Single most relevant auspicious muhurat
  const bestMuhuratName = panchang.muhurat?.abhijitMuhurat 
    ? (isHi ? 'अभिजित मुहूर्त' : 'Abhijit Muhurat') 
    : (isHi ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurat');
  const bestMuhuratTime = panchang.muhurat?.abhijitMuhurat || panchang.muhurat?.brahmaMuhurat || '11:45 AM – 12:35 PM';
  
  // Rahu Kalam
  const rahuKalamTime = panchang.inauspicious?.rahuKalam || 'Check local timings';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      
      {/* 1. Current Tithi & Nakshatra Card (Neutral / Informative) */}
      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              {t('cards.currentTithiTitle')}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {t('cards.activeNow')}
            </span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-white">
              {tithiName}
            </div>
            <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
              {nakshatraEnd ? t('cards.nakshatraUntil', { name: nakshatraName, time: nakshatraEnd }) : nakshatraName}
            </div>
          </div>
        </div>

        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-200/60 dark:border-stone-800/80 pt-2.5">
          {panchang.tithi?.deity 
            ? t('cards.deityGuidance', { deity: panchang.tithi.deity, nature: panchang.tithi.nature || 'auspicious' })
            : t('cards.defaultTithiGuidance')}
        </p>
      </div>

      {/* 2. Best Time Today (Auspicious - Green) */}
      <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              {t('cards.bestTimeTitle')}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              {t('cards.shubhMuhuratBadge')}
            </span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-bold font-serif text-emerald-950 dark:text-emerald-100">
              {bestMuhuratName}
            </div>
            <div className="text-xs sm:text-sm font-semibold font-mono text-emerald-800 dark:text-emerald-300">
              {bestMuhuratTime}
            </div>
          </div>
        </div>

        <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed border-t border-emerald-200/60 dark:border-emerald-900/60 pt-2.5">
          {t('cards.bestTimeGuidance')}
        </p>
      </div>

      {/* 3. Avoid Today (Inauspicious - Rose/Amber Caution) */}
      <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 shadow-sm flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" aria-hidden="true" />
              {t('cards.avoidTitle')}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 border border-rose-300/40">
              {t('cards.ashubhKaalBadge')}
            </span>
          </div>

          <div>
            <div className="text-lg sm:text-xl font-bold font-serif text-rose-950 dark:text-rose-100">
              {t('cards.rahuKalamTitle')}
            </div>
            <div className="text-xs sm:text-sm font-semibold font-mono text-rose-800 dark:text-rose-300">
              {rahuKalamTime}
            </div>
          </div>
        </div>

        <p className="text-xs text-rose-800/80 dark:text-rose-300/80 leading-relaxed border-t border-rose-200/60 dark:border-rose-900/60 pt-2.5">
          {t('cards.avoidGuidance')}
        </p>
      </div>

    </div>
  );
}
