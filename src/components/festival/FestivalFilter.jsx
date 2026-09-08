import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Major Festival', 'Vrat & Fasting', 'Solar Festival'];

export default function FestivalFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange
}) {
  return (
    <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search festivals by name, deity (e.g. Diwali, Shiva, Krishna, Navratri)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills & Month Select */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap pr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Type:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-vedic-saffron-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Month Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap">Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50"
          >
            <option value="All">All Hindu Months</option>
            <option value="Chaitra">Chaitra (चैत्र)</option>
            <option value="Vaishakha">Vaishakha (वैशाख)</option>
            <option value="Jyeshtha">Jyeshtha (ज्येष्ठ)</option>
            <option value="Ashadha">Ashadha (आषाढ़)</option>
            <option value="Shravana">Shravana (श्रावण)</option>
            <option value="Bhadrapada">Bhadrapada (भाद्रपद)</option>
            <option value="Ashwina">Ashwina (अश्विन)</option>
            <option value="Kartika">Kartika (कार्तिक)</option>
            <option value="Margashirsha">Margashirsha (मार्गशीर्ष)</option>
            <option value="Pausha">Pausha (पौष)</option>
            <option value="Magha">Magha (माघ)</option>
            <option value="Phalguna">Phalguna (फाल्गुन)</option>
          </select>
        </div>

      </div>
    </div>
  );
}
