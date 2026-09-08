import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Clock, 
  Info,
  Compass
} from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useThemeContext } from '../../context/ThemeContext';
import LocationSelectorModal from '../common/LocationSelectorModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();

  const navLinks = [
    { name: 'Today\'s Panchang', path: '/', icon: Compass },
    { name: 'Daily Panchang', path: '/daily', icon: Clock },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Festivals', path: '/festivals', icon: Sparkles },
    { name: 'Muhurat & Choghadiya', path: '/muhurat', icon: Clock },
    { name: 'About Panchang', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-vedic-saffron-600 via-amber-500 to-vedic-gold-400 flex items-center justify-center text-white shadow-md shadow-vedic-saffron-500/20 group-hover:scale-105 transition-transform">
                <span className="text-base sm:text-xl font-bold font-serif">ॐ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold tracking-tight font-serif text-stone-900 dark:text-white flex items-center gap-1">
                  Panchang
                  <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-700 dark:text-vedic-saffron-400 font-semibold border border-vedic-saffron-200 dark:border-vedic-saffron-800 hidden xs:inline">
                    पंचांग
                  </span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 tracking-wider hidden xs:block">
                  Vedic Calendar
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      active
                        ? 'text-vedic-saffron-600 dark:text-vedic-saffron-400 bg-vedic-saffron-50 dark:bg-vedic-saffron-950/40 font-semibold'
                        : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Location & Theme & Mobile Toggle */}
            <div className="flex items-center gap-1 sm:gap-2.5">
              
              {/* Location Badge Button */}
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-vedic-sand/70 dark:bg-stone-800/90 border border-stone-300/70 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-vedic-saffron-400 dark:hover:border-vedic-saffron-500 text-[11px] sm:text-sm font-medium transition-all shadow-sm"
                title="Change city or location"
                aria-label="Select location"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-vedic-saffron-600 dark:text-vedic-saffron-400 flex-shrink-0 animate-pulse" />
                <span className="max-w-[70px] xs:max-w-[100px] sm:max-w-[180px] truncate font-semibold">
                  {selectedLocation.city}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:border-stone-700 transition-all"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Quick Location Action in Mobile Drawer */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <MapPin className="w-4 h-4 text-vedic-saffron-600" />
                <span className="font-semibold">{selectedLocation.city}, {selectedLocation.state}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSelectorOpen(true);
                }}
                className="text-xs font-bold text-vedic-saffron-600 underline"
              >
                Change
              </button>
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                    active
                      ? 'text-vedic-saffron-600 dark:text-vedic-saffron-400 bg-vedic-saffron-50 dark:bg-vedic-saffron-950/50 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Location Selector Modal */}
      <LocationSelectorModal />
    </>
  );
}
