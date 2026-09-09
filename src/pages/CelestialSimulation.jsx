import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { getSolarPosition } from '../astronomy/solarCalculations';
import { getLunarPosition } from '../astronomy/lunarCalculations';
import { getTithiDetails } from '../astronomy/tithiCalculations';
import { checkEclipse } from '../astronomy/eclipseCalculations';
import { getDailyPanchang } from '../services/panchangApi';
import { updatePageSeo } from '../utils/seoUtils';
import SolarSystemCanvas from '../components/celestial/SolarSystemCanvas';
import SimulationFallback2D from '../components/celestial/SimulationFallback2D';
import SimulationControls from '../components/celestial/SimulationControls';
import TithiVisualization from '../components/celestial/TithiVisualization';
import MoonPhasePanel from '../components/celestial/MoonPhasePanel';
import CelestialInfoPanel from '../components/celestial/CelestialInfoPanel';
import EclipsePanel from '../components/celestial/EclipsePanel';
import {
  Play,
  Pause,
  Compass,
  Sun,
  Moon,
  Globe,
  Eye,
  Sparkles,
  Calendar,
  RotateCcw,
  ChevronDown
} from 'lucide-react';

export default function CelestialSimulation() {
  const { selectedLocation } = useLocationContext();

  // Simulation State
  const [simulationDate, setSimulationDate] = useState(() => new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(86400); // 1 day per sec when playing
  const [cameraPreset, setCameraPreset] = useState('isometric');
  const [scaleMode, setScaleMode] = useState('educational');
  const [timeZone, setTimeZone] = useState('IST');
  const [selectedObject, setSelectedObject] = useState('Earth');
  const [renderMode, setRenderMode] = useState('3d'); // '3d' | '2d'

  // Overlay Toggles
  const [showOrbits, setShowOrbits] = useState(true);
  const [showAngleArc, setShowAngleArc] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [activeTab, setActiveTab] = useState('tithi'); // 'tithi' | 'info' | 'eclipse'

  // Panchang data from service
  const [panchangData, setPanchangData] = useState(null);

  useEffect(() => {
    updatePageSeo(
      'Interactive Sun–Earth–Moon Simulation',
      'Interactive 3D and 2D celestial simulation illustrating solar and lunar orbits, Vedic Tithi angles, Moon phases, and eclipses.'
    );
  }, []);

  // Smooth Time Progression Loop with React Render Throttling (avoids 60 FPS DOM re-renders)
  const lastTickRef = useRef(performance.now());
  const simTimeRef = useRef(simulationDate.getTime());
  const lastReactUpdateRef = useRef(0);

  // Sync ref when user directly changes date
  useEffect(() => {
    simTimeRef.current = simulationDate.getTime();
  }, [simulationDate]);

  useEffect(() => {
    let animId;
    const tick = (now) => {
      const deltaSec = Math.min(0.1, (now - lastTickRef.current) / 1000);
      lastTickRef.current = now;

      if (isPlaying) {
        simTimeRef.current += deltaSec * playbackSpeed * 1000;

        // Throttle React state re-renders to ~25-30 FPS for buttery smooth performance
        if (now - lastReactUpdateRef.current > 35) {
          lastReactUpdateRef.current = now;
          setSimulationDate(new Date(simTimeRef.current));
        }
      }
      animId = requestAnimationFrame(tick);
    };

    lastTickRef.current = performance.now();
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed]);

  // Compute live astronomical data based on simulationDate
  const solarData = useMemo(() => getSolarPosition(simulationDate), [simulationDate]);
  const lunarData = useMemo(() => getLunarPosition(simulationDate), [simulationDate]);
  const tithiData = useMemo(() => getTithiDetails(simulationDate), [simulationDate]);
  const eclipseData = useMemo(() => checkEclipse(simulationDate), [simulationDate]);

  // Debounced Panchang Data Fetching during playback
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      try {
        const dStr = simulationDate.toISOString().split('T')[0];
        const lat = selectedLocation?.latitude || 19.0760;
        const lng = selectedLocation?.longitude || 72.8777;
        const res = await getDailyPanchang(dStr, lat, lng);
        if (!isCancelled) {
          setPanchangData(res);
        }
      } catch (err) {
        console.warn('Panchang fetch error in simulation:', err);
      }
    }, isPlaying ? 350 : 0);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [simulationDate, selectedLocation, isPlaying]);

  const handleStepTime = (ms) => {
    setSimulationDate((prev) => new Date(prev.getTime() + ms));
  };

  const handleResetNow = () => {
    setSimulationDate(new Date());
    setIsPlaying(false);
  };

  const cameraButtons = [
    { id: 'isometric', label: '3D Orbit', icon: Eye },
    { id: 'top', label: 'Top View', icon: Compass },
    { id: 'earth', label: 'Earth', icon: Globe },
    { id: 'moon', label: 'Moon', icon: Moon },
    { id: 'sun', label: 'Sun', icon: Sun }
  ];

  const speedButtons = [
    { label: 'Live', val: 1 },
    { label: '1h/s', val: 3600 },
    { label: '1d/s', val: 86400 },
    { label: '10d/s', val: 864000 }
  ];

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      
      {/* Top Page Header with Visible h1 */}
      <div className="bg-stone-900/90 border-b border-stone-800 px-3 xs:px-4 sm:px-6 py-3 z-30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-vedic-saffron-950/80 text-vedic-saffron-400 text-xs font-semibold border border-vedic-saffron-900/50 mb-1">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Vedic Celestial Ephemeris</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              Interactive Sun–Earth–Moon Simulation
            </h1>
            <p className="text-xs text-stone-400">
              Visualize orbital dynamics, lunar elongation angle (θ), Udayatithi, Moon illumination, and eclipses.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 self-start sm:self-auto">
            <button
              onClick={() => setRenderMode('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                renderMode === '3d'
                  ? 'bg-vedic-saffron-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>3D WebGL</span>
            </button>
            <button
              onClick={() => setRenderMode('2d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                renderMode === '2d'
                  ? 'bg-vedic-saffron-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>2D Diagram</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D / 2D Simulation Hero Viewport */}
      <div className="relative w-full h-[52vh] xs:h-[60vh] sm:h-[70vh] md:h-[75vh] min-h-[340px] overflow-hidden border-b border-stone-800">
        {renderMode === '3d' ? (
          <SolarSystemCanvas
            simulationDate={simulationDate}
            solarData={solarData}
            lunarData={lunarData}
            tithiData={tithiData}
            scaleMode={scaleMode}
            showOrbits={showOrbits}
            showAngleArc={showAngleArc}
            showLabels={showLabels}
            showAxis={showAxis}
            cameraPreset={cameraPreset}
            onSelectObject={(obj) => {
              setSelectedObject(obj);
              setActiveTab('info');
            }}
            selectedObject={selectedObject}
            onError={() => setRenderMode('2d')}
          />
        ) : (
          <SimulationFallback2D
            simulationDate={simulationDate}
            solarData={solarData}
            lunarData={lunarData}
            tithiData={tithiData}
            onSwitchTo3D={() => setRenderMode('3d')}
          />
        )}

        {/* Top Slim Floating Date & Time Controls Bar */}
        <div className="absolute top-2 xs:top-3 inset-x-2 xs:inset-x-4 sm:inset-x-6 z-20 pointer-events-auto max-w-4xl mx-auto">
          <SimulationControls
            currentDate={simulationDate}
            onDateChange={setSimulationDate}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
            cameraPreset={cameraPreset}
            onCameraPresetChange={setCameraPreset}
            scaleMode={scaleMode}
            onScaleModeChange={setScaleMode}
            timeZone={timeZone}
            onTimeZoneChange={setTimeZone}
            onStepTime={handleStepTime}
            onResetNow={handleResetNow}
            showOrbits={showOrbits}
            onToggleOrbits={() => setShowOrbits(!showOrbits)}
            showAngleArc={showAngleArc}
            onToggleAngleArc={() => setShowAngleArc(!showAngleArc)}
            showAxis={showAxis}
            onToggleAxis={() => setShowAxis(!showAxis)}
            tithiData={tithiData}
          />
        </div>

        {/* Bottom Centered Floating Player Transport Bar */}
        <div className="absolute bottom-2 xs:bottom-3 inset-x-2 xs:inset-x-4 z-20 pointer-events-none flex flex-col items-center gap-1">
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-stone-900/95 backdrop-blur-xl border border-stone-800/90 rounded-2xl p-1.5 xs:p-2 sm:px-3 sm:py-1.5 shadow-2xl max-w-full">
            
            {/* Top Row on Mobile: Play/Pause + Speeds */}
            <div className="flex items-center gap-1.5 xs:gap-2 w-full sm:w-auto justify-center">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all active:scale-95 flex-shrink-0 ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20'
                    : 'bg-vedic-saffron-600 hover:bg-vedic-saffron-500 text-white shadow-vedic-saffron-600/30'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </button>

              {/* Speeds */}
              <div className="flex items-center bg-stone-800/90 rounded-xl p-0.5 border border-stone-700/60 flex-shrink-0">
                {speedButtons.map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setPlaybackSpeed(s.val)}
                    className={`px-1.5 xs:px-2 py-1 rounded-lg text-[10px] xs:text-[11px] font-medium transition-all ${
                      playbackSpeed === s.val
                        ? 'bg-vedic-saffron-500 text-white font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px h-4 bg-stone-700 mx-0.5 hidden sm:block" />

            {/* Bottom Row on Mobile / Right Group on Desktop: Camera Switcher Buttons */}
            <div className="flex items-center bg-stone-800/90 rounded-xl p-0.5 border border-stone-700/60 flex-shrink-0 w-full sm:w-auto justify-center">
              {cameraButtons.map((c) => {
                const Icon = c.icon;
                const isSel = cameraPreset === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCameraPreset(c.id)}
                    title={c.label}
                    aria-label={c.label}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] xs:text-[11px] font-medium transition-all active:scale-95 ${
                      isSel
                        ? 'bg-vedic-gold-500/20 text-vedic-gold-300 border border-vedic-gold-500/40 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3 flex-shrink-0" />
                    <span className="inline sm:hidden md:inline">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <span className="text-[9px] xs:text-[10px] text-stone-400/80 italic select-none text-center px-2 hidden xs:block">
            * Distances and sizes visually scaled for educational clarity
          </span>
        </div>
      </div>

      {/* Clean Lower Educational Dashboard */}
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-6 w-full flex flex-col gap-4 sm:gap-6">
        
        {/* Simple Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800/80 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-1.5 xs:gap-2 overflow-x-auto pb-0.5 max-w-full">
            <button
              onClick={() => setActiveTab('tithi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                activeTab === 'tithi'
                  ? 'bg-vedic-saffron-600 text-white shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tithi & Angle</span>
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                activeTab === 'info'
                  ? 'bg-vedic-saffron-600 text-white shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Planet Info</span>
            </button>

            <button
              onClick={() => setActiveTab('eclipse')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                activeTab === 'eclipse'
                  ? 'bg-vedic-saffron-600 text-white shadow'
                  : 'bg-stone-900 text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Eclipse Mode</span>
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            City: <strong className="text-stone-200">{selectedLocation?.city || 'New Delhi'}, {selectedLocation?.state || 'India'}</strong>
          </div>
        </div>

        {/* Tab 1: Tithi & 12° Angle Educational Explanation */}
        {activeTab === 'tithi' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <TithiVisualization
                tithiData={tithiData}
                solarData={solarData}
                lunarData={lunarData}
              />
            </div>
            <div>
              <MoonPhasePanel
                tithiData={tithiData}
                lunarData={lunarData}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Celestial Planet Inspector */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <CelestialInfoPanel
                selectedObject={selectedObject}
                onSelectObject={setSelectedObject}
                solarData={solarData}
                lunarData={lunarData}
                tithiData={tithiData}
              />
            </div>
            <div>
              <MoonPhasePanel
                tithiData={tithiData}
                lunarData={lunarData}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Eclipse Alignment */}
        {activeTab === 'eclipse' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <EclipsePanel
                eclipseData={eclipseData}
                onJumpToDate={(d) => {
                  setSimulationDate(d);
                  setIsPlaying(false);
                }}
              />
            </div>
            <div>
              <MoonPhasePanel
                tithiData={tithiData}
                lunarData={lunarData}
              />
            </div>
          </div>
        )}

        {/* Synchronized Panchang Summary Card */}
        {panchangData && (
          <div className="bg-stone-900/60 rounded-2xl p-4 border border-stone-800/80">
            <div className="flex items-center justify-between mb-2.5 border-b border-stone-800 pb-2">
              <h3 className="text-xs font-bold font-serif text-vedic-gold-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-vedic-saffron-500" aria-hidden="true" />
                <span>Panchang for {panchangData.date}</span>
              </h3>
              <span className="text-[11px] text-stone-400 font-mono">
                {panchangData.samvat?.vikram} Vikram Samvat
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Tithi</span>
                <span className="font-bold text-white truncate block">{panchangData.tithi?.name}</span>
                <span className="text-[10px] text-vedic-saffron-400 block">{panchangData.paksha}</span>
              </div>

              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Nakshatra</span>
                <span className="font-bold text-white truncate block">{panchangData.nakshatra?.name}</span>
                <span className="text-[10px] text-amber-400 block">{panchangData.nakshatra?.lord}</span>
              </div>

              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Yoga</span>
                <span className="font-bold text-white truncate block">{panchangData.yoga?.name}</span>
              </div>

              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Karana</span>
                <span className="font-bold text-white truncate block">{panchangData.karana?.name}</span>
              </div>

              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Sunrise - Sunset</span>
                <span className="font-bold text-amber-300 font-mono block">
                  {panchangData.sunMoon?.sunrise} - {panchangData.sunMoon?.sunset}
                </span>
              </div>

              <div className="bg-stone-950/60 p-2 rounded-xl border border-stone-800/70">
                <span className="text-stone-400 block text-[10px]">Surya / Chandra Rashi</span>
                <span className="font-bold text-white block truncate">
                  ☀️ {solarData.rashi.name} / 🌙 {lunarData.rashi.name}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
