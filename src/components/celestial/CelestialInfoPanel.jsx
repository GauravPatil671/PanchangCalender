import React from 'react';
import { Sun, Globe, Moon, X, Info, Compass, Thermometer, ShieldAlert, Sparkles } from 'lucide-react';

export default function CelestialInfoPanel({
  selectedObject = 'Earth',
  onSelectObject,
  solarData,
  lunarData,
  tithiData,
  onClose
}) {
  const tabs = [
    { id: 'Sun', label: 'Surya (Sun ☀️)', icon: Sun, color: 'text-amber-400' },
    { id: 'Earth', label: 'Prithvi (Earth 🌍)', icon: Globe, color: 'text-sky-400' },
    { id: 'Moon', label: 'Chandra (Moon 🌙)', icon: Moon, color: 'text-indigo-300' }
  ];

  return (
    <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl text-stone-100 flex flex-col gap-4">
      {/* Top Header & Tab Selectors */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-1.5 bg-stone-950/80 p-1 rounded-xl border border-stone-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSel = selectedObject === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectObject(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSel
                    ? 'bg-vedic-saffron-600 text-white shadow-md shadow-vedic-saffron-600/30'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-white' : tab.color}`} />
                <span>{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-all"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sun Details */}
      {selectedObject === 'Sun' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-gradient-to-r from-amber-950/40 to-stone-950/60 p-3 rounded-xl border border-amber-900/40">
            <div>
              <div className="text-base font-bold font-serif text-amber-300">
                Surya Deva (The Sun)
              </div>
              <div className="text-xs text-stone-400">
                Central Star • Spectral Class G2V
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-amber-400 font-mono">
                {solarData?.rashi?.symbol} {solarData?.rashi?.sanskrit}
              </div>
              <div className="text-[10px] text-stone-400">
                {solarData?.degreeInRashi?.toFixed(2)}° in Sign
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Distance from Earth</span>
              <span className="font-mono font-bold text-white">
                {solarData?.distanceAU?.toFixed(4)} AU
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                ~{Math.round(solarData?.distanceKm || 149597870).toLocaleString()} km
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Diameter</span>
              <span className="font-mono font-bold text-white">1,392,700 km</span>
              <span className="text-[10px] text-stone-400 block">109× Earth</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Surface Temp</span>
              <span className="font-mono font-bold text-amber-400">5,778 K</span>
              <span className="text-[10px] text-stone-400 block">(~5,505 °C)</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Ecliptic Longitude</span>
              <span className="font-mono font-bold text-emerald-400">
                {solarData?.longitude?.toFixed(2)}°
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Declination (δ)</span>
              <span className="font-mono font-bold text-sky-400">
                {solarData?.declinationDeg?.toFixed(2)}°
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Vedic Role</span>
              <span className="font-semibold text-vedic-gold-400">Atmakaraka / King</span>
            </div>
          </div>
        </div>
      )}

      {/* Earth Details */}
      {selectedObject === 'Earth' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-gradient-to-r from-sky-950/40 to-stone-950/60 p-3 rounded-xl border border-sky-900/40">
            <div>
              <div className="text-base font-bold font-serif text-sky-300">
                Prithvi (Earth)
              </div>
              <div className="text-xs text-stone-400">
                Observer's Geocentric Frame of Reference
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-sky-400 font-mono">
                Axial Tilt: 23.44°
              </div>
              <div className="text-[10px] text-stone-400">
                Obliquity to Ecliptic
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Orbital Period</span>
              <span className="font-mono font-bold text-white">365.256 Days</span>
              <span className="text-[10px] text-stone-400 block">1 Sidereal Year</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Orbital Velocity</span>
              <span className="font-mono font-bold text-emerald-400">
                ~{solarData?.orbitalSpeedKmS?.toFixed(2) || 29.78} km/s
              </span>
              <span className="text-[10px] text-stone-400 block">~107,200 km/h</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Equatorial Diameter</span>
              <span className="font-mono font-bold text-white">12,742 km</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Rotation Period</span>
              <span className="font-mono font-bold text-sky-400">23h 56m 04s</span>
              <span className="text-[10px] text-stone-400 block">1 Sidereal Day</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Position in Orbit</span>
              <span className="font-mono font-bold text-amber-400">
                {solarData?.earthHeliocentricLongitude?.toFixed(2)}°
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Current Tithi</span>
              <span className="font-semibold text-vedic-gold-400">
                {tithiData?.fullTithiName}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Moon Details */}
      {selectedObject === 'Moon' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-950/40 to-stone-950/60 p-3 rounded-xl border border-indigo-900/40">
            <div>
              <div className="text-base font-bold font-serif text-indigo-300">
                Chandra Deva (The Moon)
              </div>
              <div className="text-xs text-stone-400">
                Earth's Natural Satellite • Lord of Mind & Emotions
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400 font-mono">
                {tithiData?.illuminationPercent}% Lit
              </div>
              <div className="text-[10px] text-stone-400">
                {tithiData?.phaseName}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Distance from Earth</span>
              <span className="font-mono font-bold text-white">
                {Math.round(lunarData?.distanceKm || 384400).toLocaleString()} km
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Orbital Inclination</span>
              <span className="font-mono font-bold text-amber-400">5.145°</span>
              <span className="text-[10px] text-stone-400 block">Relative to Ecliptic</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Synodic Month</span>
              <span className="font-mono font-bold text-white">29.53 Days</span>
              <span className="text-[10px] text-stone-400 block">Phase cycle</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Sidereal Month</span>
              <span className="font-mono font-bold text-sky-400">27.32 Days</span>
              <span className="text-[10px] text-stone-400 block">Orbit relative to stars</span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Ascending Node (Rahu)</span>
              <span className="font-mono font-bold text-rose-400">
                {lunarData?.rahuLongitude?.toFixed(1)}°
              </span>
            </div>

            <div className="bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
              <span className="text-[10px] text-stone-400 block">Descending Node (Ketu)</span>
              <span className="font-mono font-bold text-purple-400">
                {lunarData?.ketuLongitude?.toFixed(1)}°
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
