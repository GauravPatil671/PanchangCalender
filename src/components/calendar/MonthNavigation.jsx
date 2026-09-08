import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MonthNavigation({ month, year, onMonthChange, onYearChange, onToday }) {
  const currentMonthName = MONTH_NAMES[month - 1];

  const handlePrev = () => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white dark:bg-stone-900 p-3.5 sm:p-5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
      
      {/* Current Month & Year Display */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-600 dark:text-vedic-saffron-400">
          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-2xl font-bold font-serif text-stone-900 dark:text-white">
            {currentMonthName} {year}
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
            Hindu Monthly Calendar & Festivals
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        
        {/* Today Button */}
        <button
          onClick={onToday}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Today</span>
        </button>

        {/* Month Selector Dropdown */}
        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50 cursor-pointer"
        >
          {MONTH_NAMES.map((name, i) => (
            <option key={name} value={i + 1}>
              {name}
            </option>
          ))}
        </select>

        {/* Year Selector */}
        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-vedic-saffron-500/50 cursor-pointer"
        >
          {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
            title="Previous Month"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-vedic-saffron-100 hover:text-vedic-saffron-700 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
            title="Next Month"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
