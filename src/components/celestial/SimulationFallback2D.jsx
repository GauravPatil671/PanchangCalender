import React from 'react';
import { Sun, Moon, Globe, Compass, Sparkles, Eye, Info } from 'lucide-react';

/**
 * 2D Static/Interactive SVG Fallback for Celestial Simulation
 * Renders high-accuracy celestial diagram when WebGL is unsupported or disabled.
 */
export default function SimulationFallback2D({
  simulationDate = new Date(),
  solarData,
  lunarData,
  tithiData,
  onSwitchTo3D
}) {
  // SVG Canvas geometry
  const cx = 250;
  const cy = 200;
  const sunR = 24;
  const earthOrbitR = 120;
  const moonOrbitR = 36;
  const earthR = 14;
  const moonR = 7;

  // Calculate coordinates
  // Solar apparent longitude lambdaSun
  const lambdaSun = solarData?.longitude || 0;
  const lambdaMoon = lunarData?.longitude || 0;
  const angularSep = tithiData?.angularSeparation || 0;

  // Earth heliocentric position angle
  const earthAngleRad = ((solarData?.earthHeliocentricLongitude || 0) - 90) * (Math.PI / 180);
  const earthX = cx + earthOrbitR * Math.cos(earthAngleRad);
  const earthY = cy + earthOrbitR * Math.sin(earthAngleRad);

  // Moon geocentric position angle relative to Earth
  const moonAngleRad = ((angularSep + (solarData?.earthHeliocentricLongitude || 0)) - 90) * (Math.PI / 180);
  const moonX = earthX + moonOrbitR * Math.cos(moonAngleRad);
  const moonY = earthY + moonOrbitR * Math.sin(moonAngleRad);

  // SVG arc for angular separation
  const arcRadius = 22;
  const startArcAngle = earthAngleRad;
  const endArcAngle = moonAngleRad;
  const arcStartX = earthX + arcRadius * Math.cos(startArcAngle);
  const arcStartY = earthY + arcRadius * Math.sin(startArcAngle);
  const arcEndX = earthX + arcRadius * Math.cos(endArcAngle);
  const arcEndY = earthY + arcRadius * Math.sin(endArcAngle);
  const largeArcFlag = Math.abs(angularSep) > 180 ? 1 : 0;

  return (
    <div className="relative w-full h-full min-h-[380px] bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4 select-none">
      
      {/* 2D Celestial SVG Viewport */}
      <div className="relative w-full max-w-lg aspect-[5/4] flex items-center justify-center">
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full overflow-visible drop-shadow-2xl"
          role="img"
          aria-label="2D Sun, Earth and Moon Orbit Diagram showing angular separation and Tithi"
        >
          <defs>
            {/* Radial Glows */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
            <radialGradient id="earthGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="70%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="80%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </radialGradient>
          </defs>

          {/* Earth Orbit Track */}
          <circle
            cx={cx}
            cy={cy}
            r={earthOrbitR}
            fill="none"
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="opacity-40"
          />

          {/* Sun Ray Beams */}
          <line x1={cx} y1={cy} x2={earthX} y2={earthY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" className="opacity-30" />

          {/* Central Sun */}
          <circle cx={cx} cy={cy} r={sunR + 10} fill="#f59e0b" className="opacity-20 animate-pulse" />
          <circle cx={cx} cy={cy} r={sunR} fill="url(#sunGlow)" />
          <text x={cx} y={cy + 4} textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            SUN
          </text>

          {/* Moon Orbit around Earth */}
          <circle
            cx={earthX}
            cy={earthY}
            r={moonOrbitR}
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            strokeDasharray="2 2"
            className="opacity-50"
          />

          {/* Earth-Moon Line */}
          <line x1={earthX} y1={earthY} x2={moonX} y2={moonY} stroke="#38bdf8" strokeWidth="1.2" className="opacity-60" />

          {/* Angular Separation Arc */}
          <path
            d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke="#eab308"
            strokeWidth="2"
          />

          {/* Earth */}
          <circle cx={earthX} cy={earthY} r={earthR} fill="url(#earthGlow)" />
          <text x={earthX} y={earthY + 3} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            EARTH
          </text>

          {/* Moon */}
          <circle cx={moonX} cy={moonY} r={moonR} fill="url(#moonGlow)" stroke="#cbd5e1" strokeWidth="1" />
          <text x={moonX} y={moonY - 10} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
            MOON
          </text>

          {/* Angle Display Tag */}
          <g transform={`translate(${earthX + 32}, ${earthY - 24})`}>
            <rect width="80" height="22" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="1" className="opacity-90" />
            <text x="40" y="15" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="monospace">
              θ = {angularSep}°
            </text>
          </g>
        </svg>
      </div>

      {/* Floating 2D Diagram Info Banner */}
      <div className="w-full max-w-xl bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              2D Astronomical Viewport (Fallback)
            </span>
          </div>
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Switch to 3D WebGL</span>
            </button>
          )}
        </div>

        {/* Live Tithi Angle Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">Tithi</span>
            <span className="font-bold text-white block truncate">{tithiData?.fullTithiName}</span>
            <span className="text-[10px] text-amber-400 block font-devanagari">{tithiData?.fullTithiHindi}</span>
          </div>

          <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">Moon Phase</span>
            <span className="font-bold text-white block">
              {tithiData?.phaseEmoji} {tithiData?.phaseName}
            </span>
            <span className="text-[10px] text-stone-400 block">Illum: {tithiData?.illuminationPercent}%</span>
          </div>

          <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">Elongation (θ)</span>
            <span className="font-bold text-amber-300 font-mono block">{tithiData?.angularSeparation}°</span>
            <span className="text-[10px] text-stone-400 block">{tithiData?.degreesIntoTithi}° in Tithi</span>
          </div>

          <div className="bg-stone-950 p-2.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">Lunar Age</span>
            <span className="font-bold text-white font-mono block">{tithiData?.lunarAgeDays} days</span>
            <span className="text-[10px] text-stone-400 block">of 29.53d cycle</span>
          </div>
        </div>
      </div>

    </div>
  );
}
