import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Sparkles, MapPin, Filter } from 'lucide-react';
import { useMonthlyPanchang } from '../hooks/useMonthlyPanchang';
import { useLocationContext } from '../context/LocationContext';
import { updatePageSeo } from '../utils/seoUtils';
import MonthNavigation from '../components/calendar/MonthNavigation';
import MonthView from '../components/calendar/MonthView';
import DayDetailModal from '../components/calendar/DayDetailModal';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorDisplay from '../components/common/ErrorDisplay';
import SectionHeader from '../components/common/SectionHeader';

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-12
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'festivals', 'ekadashi', 'purnima-amavasya'

  const { selectedLocation } = useLocationContext();
  const { data: monthData, loading, error, refetch } = useMonthlyPanchang(currentMonth, currentYear);

  useEffect(() => {
    updatePageSeo(
      `Hindu Calendar ${currentMonth}/${currentYear}`,
      `Monthly Hindu Calendar for ${currentMonth}/${currentYear} with Tithis, Ekadashi, Purnima, Amavasya, and major festivals.`
    );
  }, [currentMonth, currentYear]);

  const handleToday = () => {
    setCurrentMonth(today.getMonth() + 1);
    setCurrentYear(today.getFullYear());
  };

  // Collect unique festivals in this month
  const monthFestivals = [];
  const seenFestivalIds = new Set();
  if (monthData && monthData.days) {
    monthData.days.forEach((d) => {
      if (d.festivals && d.festivals.length > 0) {
        d.festivals.forEach((f) => {
          if (!seenFestivalIds.has(f.id)) {
            seenFestivalIds.add(f.id);
            monthFestivals.push({
              ...f,
              date: d.date,
              dayNumber: d.dayNumber,
              tithiName: d.tithi.name
            });
          }
        });
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      
      {/* Navigation Header */}
      <MonthNavigation
        month={currentMonth}
        year={currentYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
        onToday={handleToday}
      />

      {/* Quick Calendar Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300">
          <Filter className="w-4 h-4 text-vedic-saffron-600" />
          <span>Filter View:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-vedic-saffron-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setActiveFilter('festivals')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'festivals'
                ? 'bg-vedic-saffron-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            ✨ Major Festivals ({monthFestivals.length})
          </button>
          <button
            onClick={() => setActiveFilter('ekadashi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'ekadashi'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 hover:bg-purple-100'
            }`}
          >
            🌾 Ekadashi Vrats
          </button>
          <button
            onClick={() => setActiveFilter('purnima-amavasya')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === 'purnima-amavasya'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            🌕 Purnima & 🌑 Amavasya
          </button>
        </div>
      </div>

      {/* Main Calendar Grid */}
      {loading ? (
        <LoadingSkeleton type="grid" />
      ) : error ? (
        <ErrorDisplay message={error} onRetry={refetch} />
      ) : (
        <div className="space-y-8">
          <MonthView
            monthData={monthData}
            selectedDate={selectedDateForModal}
            onSelectDate={(dateStr) => setSelectedDateForModal(dateStr)}
            filter={activeFilter}
          />

          {/* Month Festivals Summary List */}
          {monthFestivals.length > 0 && (
            <div className="vedic-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" />
                  <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
                    Festivals & Important Vrats in this Month ({monthFestivals.length})
                  </h3>
                </div>
                <span className="text-xs text-stone-500">
                  Click any card to open day details
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {monthFestivals.map((fest, idx) => (
                  <button
                    key={`${fest.id}-${idx}`}
                    onClick={() => setSelectedDateForModal(fest.date)}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-left hover:border-vedic-saffron-500 hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">
                        📅 {fest.date}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-vedic-gold-100 dark:bg-vedic-gold-950 text-vedic-gold-800 dark:text-vedic-gold-300 font-semibold">
                        {fest.tithiName}
                      </span>
                    </div>
                    <div className="font-bold text-base text-stone-900 dark:text-white group-hover:text-vedic-saffron-600 transition-colors">
                      {fest.name}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {fest.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Day Details Modal */}
      <DayDetailModal
        dateStr={selectedDateForModal}
        isOpen={!!selectedDateForModal}
        onClose={() => setSelectedDateForModal(null)}
      />

    </div>
  );
}
