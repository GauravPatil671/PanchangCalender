import React from 'react';
import { ShieldAlert, Sparkles, Orbit, ArrowRight, Calendar } from 'lucide-react';
import { NOTABLE_ECLIPSES } from '../../astronomy/eclipseCalculations';

export default function EclipsePanel({ eclipseData, onJumpToDate }) {
  if (!eclipseData) return null;

  const {
    isEclipse,
    eclipseType,
    alignment,
    summary,
    nodeDistance,
    moonLatitude,
    nodeInvolved,
    nextEclipse
  } = eclipseData;

  return (
    <div className="bg-stone-900/85 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl text-stone-100 flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isEclipse
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse'
              : 'bg-stone-800 border border-stone-700 text-stone-400'
          }`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-serif text-white flex items-center gap-2">
              Eclipse Alignment (Grahan / ग्रहण)
              {isEclipse && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-sans font-bold">
                  ACTIVE
                </span>
              )}
            </h4>
            <span className="text-[10px] text-stone-400">
              Syzygy + Rahu/Ketu Node Alignment Check
            </span>
          </div>
        </div>
      </div>

      {/* Alignment Status Card */}
      <div className={`p-3.5 rounded-xl border flex flex-col gap-2 ${
        isEclipse
          ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
          : 'bg-stone-950/60 border-stone-800/80 text-stone-300'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold">
            {isEclipse ? eclipseType : 'No Eclipse Alignment'}
          </span>
          {alignment && (
            <span className="text-xs font-mono font-bold bg-stone-900/80 px-2 py-0.5 rounded border border-stone-700">
              {alignment}
            </span>
          )}
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">
          {summary}
        </p>

        {/* Technical Alignment Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
            <span className="text-stone-400 block text-[10px]">Moon Ecliptic Lat:</span>
            <span className="font-mono font-bold text-white">
              {moonLatitude > 0 ? `+${moonLatitude}` : moonLatitude}°
            </span>
            <span className="text-[9px] text-stone-400 block">(Must be &lt; 1.5° for eclipse)</span>
          </div>

          <div className="bg-stone-900/60 p-2 rounded-lg border border-stone-800/60">
            <span className="text-stone-400 block text-[10px]">Distance to Node:</span>
            <span className="font-mono font-bold text-white">
              {nodeDistance}° from {nodeInvolved.split(' ')[0]}
            </span>
            <span className="text-[9px] text-stone-400 block">(Must be &lt; 18.5°)</span>
          </div>
        </div>
      </div>

      {/* Jump to Notable Eclipses presets */}
      <div className="flex flex-col gap-2">
        <div className="text-[11px] text-stone-400 font-semibold flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-vedic-gold-400" />
          <span>Quick Jump to Notable Eclipses:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {NOTABLE_ECLIPSES.slice(8, 12).map((ecl, i) => (
            <button
              key={i}
              onClick={() => onJumpToDate(new Date(ecl.date))}
              className="text-left p-2 rounded-xl bg-stone-950/60 hover:bg-stone-800/80 border border-stone-800/80 hover:border-vedic-saffron-500/50 text-xs transition-all group flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-stone-200 group-hover:text-vedic-saffron-300">
                  {ecl.type}
                </div>
                <div className="text-[10px] text-stone-400">
                  {new Date(ecl.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-600 group-hover:text-vedic-saffron-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
