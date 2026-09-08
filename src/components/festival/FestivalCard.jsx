import React from 'react';
import { Sparkles, Calendar, Heart, ArrowRight, Sun, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FestivalCard({ festival, onSelect }) {
  if (!festival) return null;

  return (
    <div className="vedic-card p-6 flex flex-col justify-between space-y-4 hover:border-vedic-saffron-400 dark:hover:border-vedic-saffron-600 transition-all hover:shadow-lg group">
      
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="vedic-badge bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-800 dark:text-vedic-saffron-300">
            <Sparkles className="w-3 h-3" />
            {festival.category}
          </span>
          <span className="text-xs text-stone-500 font-devanagari text-base">
            {festival.hindi}
          </span>
        </div>

        <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white group-hover:text-vedic-saffron-600 transition-colors">
          {festival.name}
        </h3>

        <div className="text-xs text-stone-600 dark:text-stone-300 flex flex-wrap items-center gap-2 pt-1">
          <span className="font-semibold text-vedic-gold-700 dark:text-vedic-gold-400">
            {festival.monthName} Maas ({festival.paksha} Paksha)
          </span>
          {festival.date && (
            <>
              <span>•</span>
              <span className="font-medium text-stone-800 dark:text-stone-200">
                📅 {festival.date}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
        {festival.description}
      </p>

      {/* Deity & Muhurat Info */}
      <div className="p-3 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300">
          <span className="font-semibold text-stone-900 dark:text-white">Deity:</span>
          <span>{festival.deity}</span>
        </div>
        {festival.muhuratHint && (
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            ✨ {festival.muhuratHint}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <button
          onClick={() => onSelect(festival)}
          className="text-xs font-semibold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline inline-flex items-center gap-1"
        >
          <span>View Rituals & Vidhi</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {festival.date && (
          <Link
            to={`/daily?date=${festival.date}`}
            className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium transition-colors"
          >
            Day Panchang
          </Link>
        )}
      </div>

    </div>
  );
}
