import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Sparkles, MapPin } from 'lucide-react';
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

  // Collect all festivals in this month
  const monthFestivals = [];
  if (monthData && monthData.days) {
    monthData.days.forEach((d) => {
      if (d.festivals && d.festivals.length > 0) {
        d.festivals.forEach((f) => {
          monthFestivals.push({
            ...f,
            date: d.date,
            dayNumber: d.dayNumber,
            tithiName: d.tithi.name
          });
        });
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Navigation Header */}
      <MonthNavigation
        month={currentMonth}
        year={currentYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
        onToday={handleToday}
      />

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
          />

          {/* Month Festivals Summary List */}
          {monthFestivals.length > 0 && (
            <div className="vedic-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <Sparkles className="w-5 h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" />
                <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
                  Festivals & Important Vrats in this Month ({monthFestivals.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {monthFestivals.map((fest, idx) => (
                  <button
                    key={`${fest.id}-${idx}`}
                    onClick={() => setSelectedDateForModal(fest.date)}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/60 text-left hover:border-vedic-saffron-400 dark:hover:border-vedic-saffron-600 transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-vedic-saffron-700 dark:text-vedic-saffron-400">
                        📅 {fest.date}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-vedic-gold-100 dark:bg-vedic-gold-950 text-vedic-gold-800 dark:text-vedic-gold-300">
                        {fest.tithiName}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-stone-900 dark:text-white">
                      {fest.name}
                    </div>
                    <div className="text-xs text-stone-500 line-clamp-1">
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
