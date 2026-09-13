import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FestivalFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange
}) {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const categories = [
    { id: 'All', label: t('festivals.allCategories') },
    { id: 'Major Festival', label: t('festivals.majorFestival') },
    { id: 'Vrat & Fasting', label: t('festivals.vratFasting') },
    { id: 'Solar Festival', label: t('festivals.solarFestival') }
  ];

  const hinduMonths = [
    { id: 'All', label: t('festivals.allMonths') },
    { id: 'Chaitra', label: isHi ? 'चैत्र' : 'Chaitra (चैत्र)' },
    { id: 'Vaishakha', label: isHi ? 'वैशाख' : 'Vaishakha (वैशाख)' },
    { id: 'Jyeshtha', label: isHi ? 'ज्येष्ठ' : 'Jyeshtha (ज्येष्ठ)' },
    { id: 'Ashadha', label: isHi ? 'आषाढ़' : 'Ashadha (आषाढ़)' },
    { id: 'Shravana', label: isHi ? 'श्रावण' : 'Shravana (श्रावण)' },
    { id: 'Bhadrapada', label: isHi ? 'भाद्रपद' : 'Bhadrapada (भाद्रपद)' },
    { id: 'Ashwina', label: isHi ? 'अश्विन' : 'Ashwina (अश्विन)' },
    { id: 'Kartika', label: isHi ? 'कार्तिक' : 'Kartika (कार्तिक)' },
    { id: 'Margashirsha', label: isHi ? 'मार्गशीर्ष' : 'Margashirsha (मार्गशीर्ष)' },
    { id: 'Pausha', label: isHi ? 'पौष' : 'Pausha (पौष)' },
    { id: 'Magha', label: isHi ? 'माघ' : 'Magha (माघ)' },
    { id: 'Phalguna', label: isHi ? 'फाल्गुन' : 'Phalguna (फाल्गुन)' }
  ];

  return (
    <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-3 sm:space-y-4">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={t('festivals.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            {t('common.clear')}
          </button>
        )}
      </div>

      {/* Category Pills & Month Select */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none -mx-1 px-1">
          <span className="text-stone-400 font-medium whitespace-nowrap pr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            {t('festivals.typeFilter')}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-vedic-saffron-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Month Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap">{t('festivals.monthFilter')}</span>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50 cursor-pointer"
          >
            {hinduMonths.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
