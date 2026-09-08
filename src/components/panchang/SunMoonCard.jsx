import React from 'react';
import { Sun, Moon, Compass, Clock, Eye } from 'lucide-react';

export default function SunMoonCard({ panchang }) {
  if (!panchang) return null;

  const { sunMoon, moonPhase } = panchang;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Sun Card */}
      <div className="vedic-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-br from-amber-500/5 via-white to-orange-500/5 dark:from-stone-900 dark:to-stone-900">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
                Sun Timings (सूर्योदय - सूर्यास्त)
              </h3>
              <p className="text-xs text-stone-500">Solar Day & Celestial Progression</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
            ☀️ {panchang.sunSign}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5">
          
          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Sunrise (सूर्योदय)
            </span>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-400">
              {sunMoon.sunrise}
            </div>
          </div>

          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Sunset (सूर्यास्त)
            </span>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-400">
              {sunMoon.sunset}
            </div>
          </div>

          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Solar Noon (मध्याह्न)
            </span>
            <div className="text-lg font-bold text-stone-800 dark:text-stone-200">
              {sunMoon.solarNoon}
            </div>
          </div>

        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <span>Daylight Duration (दिनमान): <strong>{sunMoon.dayDuration}</strong></span>
          <span>Ayanam: <strong>{panchang.samvat.ayanam}</strong></span>
        </div>
      </div>

      {/* Moon Card */}
      <div className="vedic-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-br from-indigo-500/5 via-white to-purple-500/5 dark:from-stone-900 dark:to-stone-900">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
                Moon Timings & Phase (चन्द्र दर्शन)
              </h3>
              <p className="text-xs text-stone-500">Lunar Illumination & Rashi</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-semibold">
            🌙 {panchang.moonSign}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5">
          
          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Moonrise (चन्द्रोदय)
            </span>
            <div className="text-lg font-bold text-indigo-700 dark:text-indigo-400">
              {sunMoon.moonrise}
            </div>
          </div>

          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Moonset (चन्द्रास्त)
            </span>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-400">
              {sunMoon.moonset}
            </div>
          </div>

          <div className="space-y-1 p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400">
              Illumination (प्रकाश)
            </span>
            <div className="text-lg font-bold text-stone-800 dark:text-stone-200">
              {moonPhase?.illumination || 50}%
            </div>
          </div>

        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <span>Lunar Phase: <strong>{moonPhase?.phaseName || 'Waxing'}</strong></span>
          <span>Night Duration: <strong>{sunMoon.nightDuration}</strong></span>
        </div>
      </div>

    </div>
  );
}
