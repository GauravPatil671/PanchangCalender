import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Sliders,
  Compass,
  Globe,
  Sun,
  Moon as MoonIcon,
  Layers,
  Settings2
} from 'lucide-react';

export default function SimulationControls({
  currentDate,
  onDateChange,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onSpeedChange,
  cameraPreset,
  onCameraPresetChange,
  scaleMode,
  onScaleModeChange,
  timeZone,
  onTimeZoneChange,
  onStepTime,
  onResetNow,
  showOrbits,
  onToggleOrbits,
  showAngleArc,
  onToggleAngleArc,
  showAxis,
  onToggleAxis,
  tithiData
}) {
  const [showSettings, setShowSettings] = useState(false);

  const formatDateTimeDisplay = (d) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timeZone === 'IST' ? 'Asia/Kolkata' : timeZone === 'UTC' ? 'UTC' : undefined
      }).format(d);
    } catch {
      return d.toLocaleDateString();
    }
  };

  const getInputValue = (d) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className="relative w-full flex flex-col gap-1.5 pointer-events-none">
      {/* Top Header Bar: Responsive Glass Pill */}
      <div className="w-full flex flex-col gap-1 pointer-events-auto bg-stone-900/90 backdrop-blur-md border border-stone-800/80 rounded-2xl p-1.5 xs:p-2 sm:px-3 sm:py-2 shadow-xl text-stone-100">
        <div className="w-full flex items-center justify-between gap-1 xs:gap-1.5">
          {/* Left: Date/Time + Step Buttons */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <div className="flex items-center bg-stone-800/90 rounded-xl p-0.5 border border-stone-700/60 flex-shrink-0">
              <button
                onClick={() => onStepTime(-86400000)}
                title="Previous Day (-1 Day)"
                className="p-1 xs:p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all active:scale-95"
                aria-label="Previous day"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onStepTime(86400000)}
                title="Next Day (+1 Day)"
                className="p-1 xs:p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-all active:scale-95"
                aria-label="Next day"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-1 flex-1 min-w-0 max-w-[190px] sm:max-w-[220px]">
              <input
                type="datetime-local"
                value={getInputValue(currentDate)}
                onChange={(e) => e.target.value && onDateChange(new Date(e.target.value))}
                className="w-full bg-stone-800/90 text-[10px] xs:text-[11px] sm:text-xs text-white border border-stone-700/80 rounded-xl px-1 xs:px-2 py-1 font-mono focus:outline-none focus:border-vedic-saffron-500 truncate"
              />
              <button
                onClick={onResetNow}
                title="Reset to Current Date/Time"
                className="p-1 xs:px-1.5 xs:py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-[10px] xs:text-[11px] font-semibold text-vedic-saffron-400 border border-stone-700 transition-all flex items-center gap-1 flex-shrink-0 active:scale-95"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden xs:inline">Now</span>
              </button>
            </div>
          </div>

          {/* Center: Live Tithi & Elongation Badge (Desktop) */}
          {tithiData && (
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs flex-shrink-0">
              <span className="text-vedic-saffron-400 font-bold font-serif">
                {tithiData.fullTithiName}
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-emerald-400 font-mono font-semibold">
                ∠ {tithiData.angularSeparation}°
              </span>
              <span className="text-stone-400">({tithiData.phaseEmoji} {tithiData.illuminationPercent}%)</span>
            </div>
          )}

          {/* Right: Timezone & Layer Settings Toggle */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <select
              value={timeZone}
              onChange={(e) => onTimeZoneChange(e.target.value)}
              className="bg-stone-800/90 text-[10px] xs:text-[11px] text-stone-300 border border-stone-700 rounded-xl px-1.5 py-1 focus:outline-none font-semibold cursor-pointer hidden sm:block"
            >
              <option value="IST">IST</option>
              <option value="UTC">UTC</option>
              <option value="LOCAL">Local</option>
            </select>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1 xs:p-1.5 rounded-xl border text-xs transition-all flex items-center gap-1 active:scale-95 ${
                showSettings
                  ? 'bg-vedic-saffron-600 text-white border-vedic-saffron-500 shadow'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
              }`}
              title="Layer & Scale Settings"
              aria-label="Simulation Settings"
            >
              <Settings2 className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Live Tithi Mini Sub-Badge */}
        {tithiData && (
          <div className="flex md:hidden items-center justify-between px-2 py-0.5 rounded-lg bg-stone-950/50 border border-stone-800/60 text-[10px]">
            <div className="flex items-center gap-1 font-serif text-vedic-saffron-400 font-bold truncate">
              <span>{tithiData.phaseEmoji}</span>
              <span className="truncate">{tithiData.fullTithiName}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 font-mono text-emerald-400">
              <span>∠ {tithiData.angularSeparation}°</span>
              <span className="text-stone-400 font-sans">({tithiData.illuminationPercent}%)</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Settings Popover Drawer (Positioned safely within screen) */}
      {showSettings && (
        <div className="self-end pointer-events-auto bg-stone-900/95 backdrop-blur-xl border border-stone-800 rounded-2xl p-3 shadow-2xl text-stone-100 flex flex-col gap-2.5 w-full max-w-[260px] text-xs animate-in fade-in zoom-in-95 duration-150 z-30">
          <div className="font-bold text-stone-300 border-b border-stone-800 pb-1.5 flex items-center justify-between">
            <span>Visual Options</span>
            <span className="text-[10px] text-stone-500">Toggles</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-stone-800">
              <span className="text-stone-300">Show Orbit Lines</span>
              <input
                type="checkbox"
                checked={showOrbits}
                onChange={onToggleOrbits}
                className="accent-vedic-saffron-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-stone-800">
              <span className="text-stone-300">Sun–Moon Angle Arc</span>
              <input
                type="checkbox"
                checked={showAngleArc}
                onChange={onToggleAngleArc}
                className="accent-vedic-saffron-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-stone-800">
              <span className="text-stone-300">Earth Axis Tilt</span>
              <input
                type="checkbox"
                checked={showAxis}
                onChange={onToggleAxis}
                className="accent-vedic-saffron-500 rounded cursor-pointer"
              />
            </label>

            <div className="sm:hidden pt-1 border-t border-stone-800 flex items-center justify-between">
              <span className="text-stone-300">Timezone</span>
              <select
                value={timeZone}
                onChange={(e) => onTimeZoneChange(e.target.value)}
                className="bg-stone-800 text-[11px] text-stone-200 border border-stone-700 rounded-lg px-2 py-0.5"
              >
                <option value="IST">IST</option>
                <option value="UTC">UTC</option>
                <option value="LOCAL">Local</option>
              </select>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-2 flex flex-col gap-1">
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
              Visual Scale
            </span>
            <select
              value={scaleMode}
              onChange={(e) => onScaleModeChange(e.target.value)}
              className="bg-stone-800 text-xs text-stone-200 border border-stone-700 rounded-lg p-1.5 focus:outline-none cursor-pointer"
            >
              <option value="educational">Educational (Clear Orbits)</option>
              <option value="balanced">Balanced</option>
              <option value="realistic_ratio">Realistic Proportions</option>
              <option value="closeup_earth_moon">Close-up Earth-Moon</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
