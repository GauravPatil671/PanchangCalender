import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function SunMoonCard({ panchang }) {
  if (!panchang) return null;

  const { sunMoon, moonPhase } = panchang;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* ── Sun Card ── */}
      <div className="vedic-card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-vedic-nightBorder">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sun className="w-4 h-4 animate-spin-slow" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                Sun Timings
                <span className="ml-1 text-stone-400 font-sans font-normal text-xs">सूर्योदय · सूर्यास्त</span>
              </h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">Solar progression & day length</p>
            </div>
          </div>
          <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px]">
            {panchang.sunSign} Rashi
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Sunrise',     labelHi: 'सूर्योदय',  value: sunMoon.sunrise },
            { label: 'Sunset',      labelHi: 'सूर्यास्त', value: sunMoon.sunset },
            { label: 'Solar Noon',  labelHi: 'मध्याह्न',  value: sunMoon.solarNoon },
          ].map((item) => (
            <div key={item.label} className="space-y-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-vedic-nightBorder">
              <p className="panchang-label">{item.label}</p>
              <p className="panchang-value text-base">{item.value || '—'}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span>Daylight: <strong className="text-stone-800 dark:text-stone-200">{sunMoon.dayDuration}</strong></span>
          <span>Ayanam: <strong className="text-stone-800 dark:text-stone-200">{panchang.samvat?.ayanam}</strong></span>
        </div>
      </div>

      {/* ── Moon Card ── */}
      <div className="vedic-card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-vedic-nightBorder">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Moon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-serif">
                Moon Timings
                <span className="ml-1 text-stone-400 font-sans font-normal text-xs">चन्द्र दर्शन</span>
              </h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">Lunar illumination & night span</p>
            </div>
          </div>
          <span className="vedic-badge bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px]">
            {panchang.moonSign} Rashi
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Moonrise',     labelHi: 'चन्द्रोदय', value: sunMoon.moonrise },
            { label: 'Moonset',      labelHi: 'चन्द्रास्त', value: sunMoon.moonset },
            { label: 'Illumination', labelHi: 'प्रकाश',     value: moonPhase?.illumination ? `${moonPhase.illumination}%` : '—' },
          ].map((item) => (
            <div key={item.label} className="space-y-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-vedic-nightBorder">
              <p className="panchang-label">{item.label}</p>
              <p className="panchang-value text-base">{item.value || '—'}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span>Phase: <strong className="text-stone-800 dark:text-stone-200">{moonPhase?.phaseName || 'Waxing'}</strong></span>
          <span>Night: <strong className="text-stone-800 dark:text-stone-200">{sunMoon.nightDuration}</strong></span>
        </div>
      </div>

    </div>
  );
}
