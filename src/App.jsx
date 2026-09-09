import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DailyPanchangPage from './pages/DailyPanchangPage';
import CalendarPage from './pages/CalendarPage';
import FestivalsPage from './pages/FestivalsPage';
import MuhuratPage from './pages/MuhuratPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-load the heavy Three.js Celestial Simulation to keep the initial bundle small
const CelestialSimulation = lazy(() => import('./pages/CelestialSimulation'));

export default function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-vedic-cream dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-200 selection:bg-vedic-saffron-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/daily" element={<DailyPanchangPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/festivals" element={<FestivalsPage />} />
                <Route path="/muhurat" element={<MuhuratPage />} />
                <Route
                  path="/celestial-simulation"
                  element={
                    <Suspense fallback={
                      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-12 h-12 rounded-2xl bg-vedic-saffron-600/20 flex items-center justify-center mx-auto animate-pulse">
                            <span className="text-2xl font-serif text-vedic-saffron-400">🪐</span>
                          </div>
                          <p className="text-stone-400 text-sm">Loading 3D Simulation…</p>
                        </div>
                      </div>
                    }>
                      <CelestialSimulation />
                    </Suspense>
                  }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </ThemeProvider>
  );
}
