import React from 'react';
import { Moon, Sparkles, Star, Orbit } from 'lucide-react';

export default function MoonPhasePanel({ tithiData, lunarData }) {
  if (!tithiData || !lunarData) return null;

  const {
    phaseName,
    phaseHindi,
    phaseEmoji,
    illuminationPercent,
    lunarAgeDays,
    angularSeparation
  } = tithiData;

  const {
    nakshatra,
    nakshatraProgress,
    rashi,
    degreeInRashi,
    distanceKm,
    latitude
  } = lunarData;

  return (
    <div className="bg-stone-900/85 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl text-stone-100 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-serif text-white">
              Current Moon Phase & Chandra
            </h3>
            <span className="text-[10px] text-stone-400">
              Synodic Month: ~29.53 Days • Sidereal: ~27.32 Days
            </span>
          </div>
        </div>

        <div className="text-2xl select-none" title={phaseName}>
          {phaseEmoji}
        </div>
      </div>

      {/* Main Phase Hero */}
      <div className="flex items-center justify-between bg-stone-950/60 rounded-xl p-3 border border-stone-800/80">
        <div>
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Lunar Phase
          </div>
          <div className="text-base font-bold font-serif text-white">
            {phaseName}
          </div>
          <div className="text-xs text-vedic-gold-400 font-serif">
            {phaseHindi}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Illumination
          </div>
          <div className="text-lg font-bold font-mono text-emerald-400">
            {illuminationPercent}%
          </div>
          <div className="text-[10px] text-stone-400 font-mono">
            Age: {lunarAgeDays} d
          </div>
        </div>
      </div>

      {/* Vedic Astrological Positions (Chandra Nakshatra & Rashi) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Chandra Nakshatra */}
        <div className="bg-stone-950/40 rounded-xl p-2.5 border border-stone-800/60">
          <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
            <Star className="w-3 h-3 text-amber-400" />
            <span>Chandra Nakshatra</span>
          </div>
          <div className="text-xs font-bold text-white">
            {nakshatra?.name} ({nakshatra?.hindi})
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">
            Lord: <strong className="text-stone-300">{nakshatra?.lord}</strong>
          </div>
          {/* Nakshatra progress bar */}
          <div className="w-full h-1 bg-stone-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-amber-400"
              style={{ width: `${nakshatraProgress || 50}%` }}
            />
          </div>
        </div>

        {/* Chandra Rashi */}
        <div className="bg-stone-950/40 rounded-xl p-2.5 border border-stone-800/60">
          <div className="flex items-center gap-1 text-[10px] text-stone-400 font-semibold mb-1">
            <Orbit className="w-3 h-3 text-sky-400" />
            <span>Chandra Rashi</span>
          </div>
          <div className="text-xs font-bold text-white">
            {rashi?.symbol} {rashi?.sanskrit} ({rashi?.hindi})
          </div>
          <div className="text-[10px] text-stone-400 mt-0.5">
            Lord: <strong className="text-stone-300">{rashi?.lord}</strong> • {degreeInRashi?.toFixed(1)}°
          </div>
          <div className="text-[10px] text-stone-400 mt-1">
            Dist: <strong className="text-stone-300 font-mono">{Math.round(distanceKm).toLocaleString()} km</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
