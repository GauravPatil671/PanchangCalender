import React from 'react';
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
