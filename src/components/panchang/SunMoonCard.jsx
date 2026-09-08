import React from 'react';
import { Sun, Moon, Compass, Clock, Eye, Sparkles } from 'lucide-react';

export default function SunMoonCard({ panchang }) {
  if (!panchang) return null;

  const { sunMoon, moonPhase } = panchang;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      
      {/* Sun Card */}
      <div className="vedic-card p-4 sm:p-7 relative overflow-hidden bg-gradient-to-br from-amber-500/5 via-white to-orange-500/5 dark:from-stone-900 dark:to-stone-900 border-t-4 border-t-amber-500 space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sun className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-white">
                Sun Timings (सूर्योदय - सूर्यास्त)
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">Solar Progression & Day Length</p>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
            ☀️ {panchang.sunSign} Rashi
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-2">
          
          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-amber-800 dark:text-amber-400">
              Sunrise (सूर्योदय)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {sunMoon.sunrise}
            </div>
          </div>

          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-orange-800 dark:text-orange-400">
              Sunset (सूर्यास्त)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {sunMoon.sunset}
            </div>
          </div>

          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 col-span-2 sm:col-span-1">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-stone-700 dark:text-stone-300">
              Solar Noon (मध्याह्न)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {sunMoon.solarNoon}
            </div>
          </div>

        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
          <span>Daylight Duration (दिनमान): <strong className="text-stone-900 dark:text-white">{sunMoon.dayDuration}</strong></span>
          <span>Ayanam: <strong className="text-stone-900 dark:text-white">{panchang.samvat.ayanam}</strong></span>
        </div>
      </div>

      {/* Moon Card */}
      <div className="vedic-card p-4 sm:p-7 relative overflow-hidden bg-gradient-to-br from-indigo-500/5 via-white to-purple-500/5 dark:from-stone-900 dark:to-stone-900 border-t-4 border-t-indigo-500 space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-white">
                Moon Timings & Phase (चन्द्र दर्शन)
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">Lunar Illumination & Night Span</p>
            </div>
          </div>
          <span className="text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold">
            🌙 {panchang.moonSign} Rashi
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-2">
          
          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-indigo-800 dark:text-indigo-400">
              Moonrise (चन्द्रोदय)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {sunMoon.moonrise}
            </div>
          </div>

          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-purple-800 dark:text-purple-400">
              Moonset (चन्द्रास्त)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {sunMoon.moonset}
            </div>
          </div>

          <div className="space-y-1 p-3 sm:p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 col-span-2 sm:col-span-1">
            <span className="text-[11px] sm:text-xs uppercase font-bold text-stone-700 dark:text-stone-300">
              Illumination (प्रकाश)
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
              {moonPhase?.illumination || 50}%
            </div>
          </div>

        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
          <span>Lunar Phase: <strong className="text-stone-900 dark:text-white">{moonPhase?.phaseName || 'Waxing'}</strong></span>
          <span>Night Duration: <strong className="text-stone-900 dark:text-white">{sunMoon.nightDuration}</strong></span>
        </div>
      </div>

    </div>
  );
}
