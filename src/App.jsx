import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSkeleton from './components/common/LoadingSkeleton';

// Route Code-Splitting for Optimal Performance & Lean Initial Bundle
const Home = lazy(() => import('./pages/Home'));
const DailyPanchangPage = lazy(() => import('./pages/DailyPanchangPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const FestivalsPage = lazy(() => import('./pages/FestivalsPage'));
const MuhuratPage = lazy(() => import('./pages/MuhuratPage'));
const CelestialSimulation = lazy(() => import('./pages/CelestialSimulation'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-vedic-cream dark:bg-stone-950 text-stone-800 dark:text-stone-100 text-center">
          <div className="max-w-md p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl space-y-4">
            <div className="text-4xl">⚠️</div>
            <h1 className="text-xl font-bold font-serif text-stone-900 dark:text-white">
              Something went wrong
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              An unexpected error occurred while loading this section.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-vedic-saffron-600 hover:bg-vedic-saffron-700 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-vedic-cream dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors duration-200 selection:bg-vedic-saffron-500 selection:text-white">
            
            {/* Accessible Skip to Main Content Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-vedic-saffron-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:font-bold focus:text-xs"
            >
              Skip to main content
            </a>

            <Navbar />

            <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none" role="main">
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <LoadingSkeleton type="hero" />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/daily" element={<DailyPanchangPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/festivals" element={<FestivalsPage />} />
                    <Route path="/muhurat" element={<MuhuratPage />} />
                    <Route
                      path="/celestial-simulation"
                      element={
                        <Suspense
                          fallback={
                            <div className="min-h-screen bg-stone-950 flex items-center justify-center">
                              <div className="text-center space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-vedic-saffron-600/20 flex items-center justify-center mx-auto animate-pulse">
                                  <span className="text-2xl font-serif text-vedic-saffron-400">🪐</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-stone-200 text-sm font-semibold">Loading 3D Celestial Engine…</p>
                                  <p className="text-stone-500 text-xs">Computing planetary ephemeris and orbital geometry</p>
                                </div>
                              </div>
                            </div>
                          }
                        >
                          <CelestialSimulation />
                        </Suspense>
                      }
                    />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>

            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </ThemeProvider>
  );
}
