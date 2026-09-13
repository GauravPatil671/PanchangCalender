import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  Calendar as CalendarIcon,
  Sparkles,
  Clock,
  Info,
  Compass,
  Orbit,
  ChevronRight,
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
    { name: t('nav.todayPanchang'),  path: '/',                    icon: Compass },
    { name: t('nav.dailyPanchang'),  path: '/daily',               icon: Clock },
    { name: t('nav.calendar'),       path: '/calendar',            icon: CalendarIcon },
    { name: t('nav.festivals'),      path: '/festivals',           icon: Sparkles },
    { name: t('nav.muhurat'),        path: '/muhurat',             icon: Clock },
    { name: t('nav.simulation'),     path: '/celestial-simulation',icon: Orbit },
    { name: t('nav.about'),          path: '/about',               icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-vedic-cream/98 dark:bg-vedic-night/98 backdrop-blur-sm border-b border-stone-200 dark:border-vedic-nightBorder transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group flex-shrink-0 min-h-[44px]"
              aria-label="Panchang Calendar — Home"
            >
              {/* OM glyph mark */}
              <div className="w-8 h-8 rounded-lg border border-vedic-gold-300 dark:border-vedic-gold-800 bg-vedic-gold-50 dark:bg-vedic-gold-950/40 flex items-center justify-center flex-shrink-0 group-hover:border-vedic-gold-500 transition-colors">
                <span className="text-lg font-serif font-bold text-vedic-gold-700 dark:text-vedic-gold-400 leading-none" aria-hidden="true">
                  ॐ
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold font-serif text-stone-900 dark:text-stone-50 tracking-tight">
                  Panchang
                </span>
                <span className="text-[10px] font-sans text-stone-500 dark:text-stone-400 tracking-wider hidden xs:block">
                  Vedic Calendar
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[40px] flex items-center ${
                      active
                        ? 'text-vedic-saffron-700 dark:text-vedic-saffron-400 font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2">

              {/* Location */}
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-vedic-nightBorder bg-white dark:bg-vedic-nightCard text-stone-700 dark:text-stone-300 hover:border-vedic-gold-500 dark:hover:border-vedic-gold-600 text-xs font-medium transition-colors min-h-[36px]"
                aria-label={`${t('nav.location')}: ${selectedLocation.city}, ${selectedLocation.state}. ${t('nav.change')}.`}
              >
                <MapPin className="w-3.5 h-3.5 text-vedic-saffron-600 dark:text-vedic-saffron-400 flex-shrink-0" aria-hidden="true" />
                <span className="max-w-[100px] sm:max-w-[160px] truncate font-semibold">
                  {selectedLocation.city}
                </span>
              </button>

              {/* Desktop Language toggle — text-only */}
              <div
                className="hidden lg:flex items-center gap-0 text-xs font-medium"
                role="group"
                aria-label={t('nav.language')}
              >
                {supportedLanguages.map((lang, i) => (
                  <React.Fragment key={lang.code}>
                    {i > 0 && (
                      <span className="text-stone-300 dark:text-stone-700 px-0.5" aria-hidden="true">|</span>
                    )}
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={`px-1.5 py-1 rounded transition-colors min-h-[36px] ${
                        language === lang.code
                          ? 'text-vedic-saffron-700 dark:text-vedic-saffron-400 font-semibold'
                          : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                      aria-pressed={language === lang.code}
                      aria-label={`Select language ${lang.label}`}
                    >
                      {lang.nativeLabel}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Desktop Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-vedic-nightBorder bg-white dark:bg-vedic-nightCard text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              >
                {theme === 'dark'
                  ? <Sun  className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  : <Moon className="w-4 h-4" aria-hidden="true" />
                }
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 dark:border-vedic-nightBorder bg-white dark:bg-vedic-nightCard text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
              >
                {mobileMenuOpen
                  ? <X    className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <nav
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-vedic-cream dark:bg-vedic-night border-b border-stone-200 dark:border-vedic-nightBorder shadow-card-lg animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-3.5rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">

              {/* Nav links */}
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                      active
                        ? 'text-vedic-saffron-700 dark:text-vedic-saffron-400 bg-vedic-saffron-50 dark:bg-vedic-saffron-950/30 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 opacity-70" aria-hidden="true" />
                    <span className="flex-1">{link.name}</span>
                    {active && <ChevronRight className="w-3.5 h-3.5 opacity-40" aria-hidden="true" />}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="pt-3 mt-3 border-t border-stone-200 dark:border-vedic-nightBorder space-y-3">

                {/* Location row */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-vedic-nightCard border border-stone-200 dark:border-vedic-nightBorder">
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                    <MapPin className="w-3.5 h-3.5 text-vedic-saffron-600 flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold truncate max-w-[160px]">
                      {selectedLocation.city}, {selectedLocation.state}
                    </span>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setIsSelectorOpen(true); }}
                    className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline min-h-[36px] flex items-center px-1"
                  >
                    {t('nav.change')}
                  </button>
                </div>

                {/* Language + Theme row */}
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-vedic-nightCard border border-stone-200 dark:border-vedic-nightBorder">
                  {/* Language */}
                  <div className="flex items-center gap-2" role="group" aria-label={t('nav.language')}>
                    <Globe className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
                    {supportedLanguages.map((lang, i) => (
                      <React.Fragment key={lang.code}>
                        {i > 0 && <span className="text-stone-300 dark:text-stone-700 text-xs" aria-hidden="true">|</span>}
                        <button
                          onClick={() => setLanguage(lang.code)}
                          className={`text-xs font-semibold min-h-[36px] px-1 transition-colors ${
                            language === lang.code
                              ? 'text-vedic-saffron-700 dark:text-vedic-saffron-400'
                              : 'text-stone-500 dark:text-stone-400'
                          }`}
                          aria-pressed={language === lang.code}
                        >
                          {lang.nativeLabel}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Theme */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 min-h-[36px] px-1 transition-colors"
                    aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
                  >
                    {theme === 'dark'
                      ? <><Sun  className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" /><span>{t('nav.light')}</span></>
                      : <><Moon className="w-3.5 h-3.5" aria-hidden="true" /><span>{t('nav.dark')}</span></>
                    }
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      {/* Global Location Selector Modal */}
      <LocationSelectorModal />
    </>
  );
}
