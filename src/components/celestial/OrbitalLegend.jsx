import React from 'react';
import { Eye, Layers, Compass, Sun, Moon, Globe } from 'lucide-react';

export default function OrbitalLegend({
  showOrbits,
  onToggleOrbits,
  showAngleArc,
  onToggleAngleArc,
  showAxis,
  onToggleAxis,
  showLabels,
  onToggleLabels
}) {
  return (
    <div className="bg-stone-900/85 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-3 sm:p-4 shadow-2xl text-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-stone-300 font-semibold">
        <Layers className="w-4 h-4 text-vedic-saffron-400" />
        <span>Orbital Overlays & HUD</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onToggleOrbits}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all ${
            showOrbits
              ? 'bg-sky-950/80 border-sky-600/70 text-sky-300'
              : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          <span>Orbits (Earth & Moon)</span>
        </button>

        <button
          onClick={onToggleAngleArc}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all ${
            showAngleArc
              ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
              : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Sun–Moon Angle Arc</span>
        </button>

        <button
          onClick={onToggleAxis}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all ${
            showAxis
              ? 'bg-amber-950/80 border-amber-600/70 text-amber-300'
              : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:text-stone-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Earth Axial Tilt (23.44°)</span>
        </button>

        <button
          onClick={onToggleLabels}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition-all ${
            showLabels
              ? 'bg-vedic-saffron-950/80 border-vedic-saffron-600/70 text-vedic-saffron-300'
              : 'bg-stone-800/60 border-stone-700/60 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Labels</span>
        </button>
      </div>
    </div>
  );
}
