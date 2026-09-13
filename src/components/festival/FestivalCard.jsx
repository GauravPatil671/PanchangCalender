import React from 'react';
import { Sparkles, Calendar, Heart, ArrowRight, Sun, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function FestivalCard({ festival, onSelect }) {
  const { t, language } = useLanguage();
  if (!festival) return null;

  const isHi = language === 'hi';
  const festivalName = isHi ? (festival.hindi || festival.name) : festival.name;
  const pakshaDisplay = isHi 
    ? (festival.paksha === 'Shukla' ? 'शुक्ल पक्ष' : festival.paksha === 'Krishna' ? 'कृष्ण पक्ष' : festival.paksha)
    : `${festival.paksha} Paksha`;

  return (
    <div className="vedic-card p-6 flex flex-col justify-between space-y-4 hover:border-vedic-saffron-500 hover:shadow-lg transition-all group">
      
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="vedic-badge bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-800 dark:text-vedic-saffron-300 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            {festival.category}
          </span>
          <span className="text-sm text-stone-600 dark:text-stone-300 font-devanagari font-semibold">
            {festival.hindi}
          </span>
        </div>

        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white group-hover:text-vedic-saffron-600 transition-colors">
          {festivalName}
        </h3>

        <div className="text-xs text-stone-600 dark:text-stone-300 flex flex-wrap items-center gap-2 pt-1">
          <span className="font-semibold text-vedic-gold-700 dark:text-vedic-gold-400">
            {festival.monthName} {t('hero.maas')} ({pakshaDisplay})
          </span>
          {festival.date && (
            <>
              <span className="text-stone-300 dark:text-stone-600">•</span>
              <span className="font-bold text-stone-900 dark:text-white">
                📅 {festival.date}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
        {festival.description}
      </p>

      {/* Deity & Muhurat Info */}
      <div className="p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 text-xs space-y-1.5">
        <div className="flex items-center justify-between gap-1.5 text-stone-700 dark:text-stone-300">
          <span className="font-semibold text-stone-500">{t('festivals.rulingDeity')}</span>
          <span className="font-bold text-stone-900 dark:text-white">{festival.deity}</span>
        </div>
        {festival.muhuratHint && (
          <div className="text-xs text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
            <span>✨</span>
            <span>{festival.muhuratHint}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={() => onSelect(festival)}
          className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline inline-flex items-center gap-1.5"
        >
          <span>{t('festivals.viewRituals')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {festival.date && (
          <Link
            to={`/daily?date=${festival.date}`}
            className="text-xs px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold transition-colors"
          >
            {t('festivals.dayPanchangBtn')}
          </Link>
        )}
      </div>

    </div>
  );
}
