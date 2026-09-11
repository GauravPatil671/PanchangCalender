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
  Compass, 
  Orbit,
  Globe
} from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useThemeContext } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import LocationSelectorModal from '../common/LocationSelectorModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { theme, toggleTheme } = useThemeContext();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.todayPanchang'), path: '/', icon: Compass },
    { name: t('nav.dailyPanchang'), path: '/daily', icon: Clock },
    { name: t('nav.calendar'), path: '/calendar', icon: CalendarIcon },
    { name: t('nav.festivals'), path: '/festivals', icon: Sparkles },
    { name: t('nav.muhurat'), path: '/muhurat', icon: Clock },
    { name: t('nav.simulation'), path: '/celestial-simulation', icon: Orbit, isSpecial: true },
    { name: t('nav.about'), path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors shadow-sm">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-h-[44px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-vedic-saffron-600 via-amber-500 to-vedic-gold-400 flex items-center justify-center text-white shadow-md shadow-vedic-saffron-500/20 group-hover:scale-105 transition-transform">
                <span className="text-base sm:text-xl font-bold font-serif" aria-hidden="true">ॐ</span>
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
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 min-h-[40px] ${
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

            {/* Right Controls: Location & Desktop Language/Theme & Mobile Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Compact Location Selector Button */}
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-vedic-sand/70 dark:bg-stone-800/90 border border-stone-300/70 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-vedic-saffron-400 dark:hover:border-vedic-saffron-500 text-[11px] sm:text-sm font-medium transition-all shadow-sm min-h-[44px]"
                title={t('nav.changeCityTitle')}
                aria-label={`${t('nav.location')}: ${selectedLocation.city}, ${selectedLocation.state}. ${t('nav.change')}.`}
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vedic-saffron-600 dark:text-vedic-saffron-400 flex-shrink-0 animate-pulse" aria-hidden="true" />
                <span className="max-w-[85px] xs:max-w-[120px] sm:max-w-[180px] truncate font-semibold">
                  {selectedLocation.city}
                </span>
              </button>

              {/* Desktop Language Selector Pill */}
              <div className="hidden lg:flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700" role="group" aria-label={t('nav.language')}>
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all min-h-[34px] ${
                      language === lang.code
                        ? 'bg-white dark:bg-stone-700 text-vedic-saffron-600 dark:text-vedic-saffron-400 shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                    aria-pressed={language === lang.code}
                    aria-label={`Select language ${lang.label}`}
                  >
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>

              {/* Desktop Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex p-2.5 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:border-stone-700 transition-all min-w-[44px] min-h-[44px] items-center justify-center"
                title={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
                aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" aria-hidden="true" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
                className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile Navigation Drawer"
            className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-2.5 shadow-xl animate-in slide-in-from-top-2 duration-200"
          >
            {/* Quick Location Action in Mobile Drawer */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 truncate mr-2">
                <MapPin className="w-4 h-4 text-vedic-saffron-600 flex-shrink-0" aria-hidden="true" />
                <span className="font-semibold truncate">{selectedLocation.city}, {selectedLocation.state}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSelectorOpen(true);
                }}
                className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 underline min-h-[36px] px-2 flex-shrink-0 flex items-center"
              >
                {t('nav.change')}
              </button>
            </div>

            {/* Language Selector inside Mobile Drawer */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <Globe className="w-4 h-4 text-vedic-saffron-600" aria-hidden="true" />
                <span>{t('nav.language')}</span>
              </div>
              <div className="flex items-center gap-1 bg-stone-200/70 dark:bg-stone-900 p-1 rounded-xl">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                      language === lang.code
                        ? 'bg-vedic-saffron-600 text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    {lang.nativeLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle inside Mobile Drawer */}
            <div className="p-3 bg-stone-50 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />
                )}
                <span>{t('nav.theme')}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-xs font-semibold text-stone-800 dark:text-stone-100 shadow-sm min-h-[36px] flex items-center gap-1.5"
              >
                <span>{theme === 'dark' ? t('nav.dark') : t('nav.light')}</span>
                <span className="text-[10px] text-stone-400">({theme === 'dark' ? t('nav.light') : t('nav.dark')})</span>
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
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] ${
                    active
                      ? 'text-vedic-saffron-600 dark:text-vedic-saffron-400 bg-vedic-saffron-50 dark:bg-vedic-saffron-950/50 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" aria-hidden="true" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Global Location Selector Modal */}
      <LocationSelectorModal />
    </>
  );
}

