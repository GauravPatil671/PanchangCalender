import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Navigation, Check, Globe } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';
import { POPULAR_CITIES, INDIAN_STATES } from '../../utils/locationsData';

export default function LocationSelectorModal() {
  const {
    selectedLocation,
    setLocation,
    isSelectorOpen,
    setIsSelectorOpen,
    detectCurrentLocation,
    isDetecting,
    geoError
  } = useLocationContext();

  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const isHi = language === 'hi';

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSelectorOpen) {
        setIsSelectorOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelectorOpen, setIsSelectorOpen]);

  const filteredCities = useMemo(() => {
    return POPULAR_CITIES.filter((city) => {
      const matchesSearch = 
        city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = selectedState === 'All' || city.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  if (!isSelectorOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setIsSelectorOpen(false)}
    >
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[94vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-gradient-to-r from-vedic-saffron-50/50 to-amber-50/30 dark:from-stone-900 dark:to-stone-900">
          <div>
            <h3 id="modal-title" className="text-base sm:text-xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-1.5 sm:gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" aria-hidden="true" />
              {t('locationModal.title')}
            </h3>
            <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {t('locationModal.subtitle')}
            </p>
          </div>
          <button
            onClick={() => setIsSelectorOpen(false)}
            aria-label={isHi ? 'स्थान चयन बंद करें' : 'Close location selector modal'}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Current Location Badge & GPS Button */}
        <div className="px-5 sm:px-6 py-4 bg-vedic-sand/30 dark:bg-stone-800/40 border-b border-stone-100 dark:border-stone-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-600 dark:text-stone-300 flex items-center gap-2">
            <span className="font-semibold text-stone-900 dark:text-white">{isHi ? 'सक्रिय स्थान:' : 'Active Location:'}</span>
            <span className="px-2.5 py-1 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-800 dark:text-vedic-saffron-300 font-medium">
              📍 {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.country}
            </span>
          </div>
          <button
            onClick={detectCurrentLocation}
            disabled={isDetecting}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-vedic-saffron-600 hover:bg-vedic-saffron-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
            {isDetecting ? t('locationModal.detecting') : t('locationModal.detectBtn')}
          </button>
        </div>

        {geoError && (
          <div className="px-5 sm:px-6 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs border-b border-rose-100 dark:border-rose-900">
            {geoError}
          </div>
        )}

        {/* Search and State Filters */}
        <div className="p-5 sm:px-6 pb-3 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('locationModal.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50 focus:border-vedic-saffron-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
              >
                {t('common.clear')}
              </button>
            )}
          </div>

          {/* State Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin text-xs">
            <span className="text-stone-500 dark:text-stone-400 whitespace-nowrap pr-1 font-medium">
              {t('locationModal.stateLabel')}
            </span>
            <button
              onClick={() => setSelectedState('All')}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedState === 'All'
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {t('locationModal.allStates')}
            </button>
            {INDIAN_STATES.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedState === st
                    ? 'bg-vedic-saffron-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* City Grid List */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-2 space-y-1.5">
          {filteredCities.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <Globe className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">{t('locationModal.noCityFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-4">
              {filteredCities.map((city) => {
                const isSelected = selectedLocation.city === city.city && selectedLocation.state === city.state;
                return (
                  <button
                    key={`${city.city}-${city.state}`}
                    onClick={() => setLocation(city)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-vedic-saffron-50 dark:bg-vedic-saffron-950/40 border-vedic-saffron-500 text-vedic-saffron-900 dark:text-vedic-saffron-200 ring-1 ring-vedic-saffron-500'
                        : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-800 hover:border-vedic-saffron-300 dark:hover:border-vedic-saffron-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-1.5">
                        {city.city}
                        {city.isPopular && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-normal">
                            {isHi ? 'प्रमुख' : 'Popular'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">
                        {city.state}, {city.country} • {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-vedic-saffron-600 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex justify-end gap-2">
          <button
            onClick={() => setIsSelectorOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            {isHi ? 'पूर्ण' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
