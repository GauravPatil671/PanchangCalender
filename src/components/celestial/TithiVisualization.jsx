import React from 'react';
import { Compass, Sparkles, Sun, Moon, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { TITHI_DATA } from '../../astronomy/tithiCalculations';

export default function TithiVisualization({ tithiData, solarData, lunarData }) {
  if (!tithiData) return null;

  const {
    angularSeparation,
    tithiIndex,
    tithiNumber,
    isShukla,
    paksha,
    pakshaHindi,
    tithiName,
    tithiHindi,
    fullTithiName,
    fullTithiHindi,
    degreesIntoTithi,
    tithiProgressPercent,
    tithiRemainingDegrees,
    deity,
    nature
  } = tithiData;

  // Render 30-slice interactive Vedic Tithi Wheel
  const slices = Array.from({ length: 30 }, (_, i) => {
    const startDeg = i * 12;
    const endDeg = (i + 1) * 12;
    const isCurrent = i === tithiIndex;
    const isShuklaSlice = i < 15;
    const sliceName = TITHI_DATA[i]?.name || '';
    const sliceHindi = TITHI_DATA[i]?.hindi || '';

    return {
      index: i,
      startDeg,
      endDeg,
      isCurrent,
      isShuklaSlice,
      sliceName,
      sliceHindi
    };
  });

  return (
    <div className="bg-stone-900/85 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-3 xs:p-4 sm:p-6 shadow-2xl text-stone-100 flex flex-col gap-4 sm:gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-2 xs:gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-vedic-gold-500/20 border border-vedic-gold-500/30 flex items-center justify-center text-vedic-gold-400 flex-shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-sm xs:text-base sm:text-lg font-bold font-serif text-white tracking-wide flex items-center flex-wrap gap-1.5 xs:gap-2">
              <span>Why is today's Tithi?</span>
              <span className="text-[10px] xs:text-xs px-2 py-0.5 rounded-full bg-vedic-saffron-950/80 text-vedic-saffron-400 border border-vedic-saffron-800/80 font-sans font-semibold">
                {fullTithiName}
              </span>
            </h3>
            <p className="text-[10px] xs:text-xs text-stone-400">
              The astronomical angular relationship between Surya (Sun) and Chandra (Moon)
            </p>
          </div>
        </div>
      </div>

      {/* Geometry Diagram & Big Angle Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-stone-950/60 rounded-xl p-4 border border-stone-800/80">
        {/* Sun-Earth-Moon Angular Relationship */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-300">
              <span className="flex items-center gap-1 text-amber-400">
                <Sun className="w-4 h-4 fill-amber-400/20" /> Sun ({Math.round(solarData?.longitude || 0)}°)
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
              <span className="flex items-center gap-1 text-sky-400">
                🌍 Earth
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
              <span className="flex items-center gap-1 text-indigo-300">
                <Moon className="w-4 h-4 fill-indigo-300/20" /> Moon ({Math.round(lunarData?.longitude || 0)}°)
              </span>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-mono font-bold">
              Angle: {angularSeparation.toFixed(2)}°
            </div>
          </div>

          {/* Explanation Quote Box */}
          <div className="bg-stone-900/80 rounded-lg p-3 border border-stone-800 text-xs text-stone-300 leading-relaxed">
            <div className="font-semibold text-vedic-gold-300 mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-vedic-gold-400" />
              <span>Astronomical Principle of Tithi</span>
            </div>
            <p className="text-stone-300">
              "A Tithi corresponds to each <strong className="text-amber-400">12° increase</strong> in the angular separation (λMoon − λSun) between the Sun and Moon as observed from Earth. A full lunar month spans 360° (30 Tithis)."
            </p>
          </div>

          {/* Mathematical Step Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <div className="bg-stone-900/60 rounded-lg p-2 border border-stone-800/80">
              <div className="text-[10px] text-stone-400">Total Angle (θ)</div>
              <div className="text-sm font-bold font-mono text-emerald-400">{angularSeparation}°</div>
            </div>
            <div className="bg-stone-900/60 rounded-lg p-2 border border-stone-800/80">
              <div className="text-[10px] text-stone-400">Tithi Sector Index</div>
              <div className="text-sm font-bold font-mono text-sky-400">
                ⌊{angularSeparation}° ÷ 12°⌋ = <span className="text-white">{tithiIndex + 1}</span>/30
              </div>
            </div>
            <div className="bg-stone-900/60 rounded-lg p-2 border border-stone-800/80">
              <div className="text-[10px] text-stone-400">Current Tithi Arc</div>
              <div className="text-sm font-bold font-mono text-amber-400">{degreesIntoTithi}° / 12°</div>
            </div>
            <div className="bg-stone-900/60 rounded-lg p-2 border border-stone-800/80">
              <div className="text-[10px] text-stone-400">Next Tithi In</div>
              <div className="text-sm font-bold font-mono text-indigo-300">+{tithiRemainingDegrees}°</div>
            </div>
          </div>
        </div>

        {/* Big Current Tithi Badge */}
        <div className="bg-gradient-to-br from-vedic-saffron-950/50 via-stone-900 to-amber-950/40 rounded-xl p-4 border border-vedic-saffron-800/50 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] uppercase tracking-widest text-vedic-saffron-400 font-bold font-sans">
            {paksha} • {pakshaHindi}
          </span>
          <span className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            {tithiName}
          </span>
          <span className="text-base font-serif text-vedic-gold-400">
            {tithiHindi}
          </span>
          <div className="w-full mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
            <span>Ruling Deity: <strong className="text-stone-200">{deity}</strong></span>
            <span>Nature: <strong className="text-stone-200">{nature}</strong></span>
          </div>

          {/* Progress Bar within current Tithi */}
          <div className="w-full mt-2.5">
            <div className="flex justify-between text-[10px] text-stone-400 mb-1">
              <span>Tithi Elapsed</span>
              <span className="font-mono text-vedic-gold-400">{tithiProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-vedic-saffron-500 to-amber-400 transition-all duration-300"
                style={{ width: `${tithiProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 360° Circular Vedic Tithi Wheel Visualization */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-vedic-saffron-400" />
            <span>360° Vedic Tithi Wheel (30 Segments of 12°)</span>
          </span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-vedic-saffron-500" /> Shukla (0° - 180°)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Krishna (180° - 360°)
            </span>
          </div>
        </div>

        {/* 30 Tithi Interactive Grid Strip */}
        <div className="flex sm:grid sm:grid-cols-10 lg:grid-cols-15 gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-thin">
          {slices.map((slice) => (
            <div
              key={slice.index}
              title={`${slice.index + 1}. ${slice.isShuklaSlice ? 'Shukla' : 'Krishna'} ${slice.sliceName} (${slice.startDeg}° - ${slice.endDeg}°)`}
              className={`p-1.5 rounded-xl border text-center transition-all cursor-default flex-shrink-0 min-w-[64px] sm:min-w-0 ${
                slice.isCurrent
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-md shadow-amber-500/30 scale-105 z-10 ring-2 ring-amber-400'
                  : slice.isShuklaSlice
                  ? 'bg-vedic-saffron-950/40 text-stone-300 border-vedic-saffron-900/50 hover:bg-vedic-saffron-900/50'
                  : 'bg-indigo-950/40 text-stone-300 border-indigo-900/50 hover:bg-indigo-900/50'
              }`}
            >
              <div className="text-[9px] font-mono leading-none opacity-70">
                #{slice.index + 1}
              </div>
              <div className="text-[10px] font-semibold truncate leading-tight mt-1">
                {slice.sliceName}
              </div>
              <div className="text-[8px] font-mono opacity-80 mt-0.5">
                {slice.startDeg}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
