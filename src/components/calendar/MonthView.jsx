import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { isSameDay, getTodayDateString } from '../../utils/dateUtils';

const WEEKDAYS = ['Sun (रवि)', 'Mon (सोम)', 'Tue (मंगल)', 'Wed (बुध)', 'Thu (गुरु)', 'Fri (शुक्र)', 'Sat (शनि)'];

export default function MonthView({ monthData, selectedDate, onSelectDate }) {
  if (!monthData || !monthData.days) return null;

  const todayStr = getTodayDateString();
  const firstDayStr = monthData.days[0]?.date;
  const firstDayDate = new Date(firstDayStr);
  const startDayOfWeek = firstDayDate.getDay(); // 0 = Sun .. 6 = Sat

  // Empty leading cells
  const leadingBlanks = Array.from({ length: startDayOfWeek }, (_, i) => i);

  return (
    <div className="vedic-card overflow-hidden">
      
      {/* Weekday Header */}
      <div className="grid grid-cols-7 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/80 text-center">
        {WEEKDAYS.map((w, idx) => (
          <div
            key={w}
            className={`py-3 px-1 text-xs sm:text-sm font-bold font-serif ${
              idx === 0
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <span className="hidden sm:inline">{w}</span>
            <span className="sm:hidden">{w.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-stone-200/60 dark:divide-stone-800/60">
        
        {/* Leading blanks for offset */}
        {leadingBlanks.map((b) => (
          <div key={`blank-${b}`} className="min-h-[90px] sm:min-h-[120px] bg-stone-50/40 dark:bg-stone-900/40" />
        ))}

        {/* Days of Month */}
        {monthData.days.map((day) => {
          const isToday = isSameDay(day.date, todayStr);
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);
          const hasFestivals = day.festivals && day.festivals.length > 0;
          const isEkadashi = day.isEkadashi;
          const isPurnima = day.isPurnima;
          const isAmavasya = day.isAmavasya;

          return (
            <button
              key={day.date}
              onClick={() => onSelectDate(day.date)}
              className={`min-h-[90px] sm:min-h-[120px] p-2 text-left flex flex-col justify-between transition-all group relative ${
                isSelected
                  ? 'bg-vedic-saffron-50/80 dark:bg-vedic-saffron-950/40 ring-2 ring-vedic-saffron-500 z-10'
                  : 'hover:bg-amber-50/40 dark:hover:bg-stone-800/50'
              } ${isToday ? 'bg-amber-50/70 dark:bg-amber-950/20' : ''}`}
            >
              {/* Top row: Gregorian Day Number & Vedic Badge */}
              <div className="flex items-start justify-between w-full">
                <span
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                    isToday
                      ? 'bg-vedic-saffron-600 text-white shadow-sm'
                      : 'text-stone-800 dark:text-stone-100 group-hover:text-vedic-saffron-600'
                  }`}
                >
                  {day.dayNumber}
                </span>

                {/* Lunar Marker Icons */}
                <div className="flex items-center gap-1">
                  {isPurnima && (
                    <span className="p-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400" title="Purnima (Full Moon)">
                      🌕
                    </span>
                  )}
                  {isAmavasya && (
                    <span className="p-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400" title="Amavasya (New Moon)">
                      🌑
                    </span>
                  )}
                  {isEkadashi && (
                    <span className="text-[10px] px-1 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold" title="Ekadashi Vrat">
                      एका
                    </span>
                  )}
                </div>
              </div>

              {/* Middle: Tithi Name & Paksha */}
              <div className="space-y-0.5 my-1">
                <div className="text-[11px] sm:text-xs font-semibold text-stone-700 dark:text-stone-300 truncate">
                  {day.tithi.hindi || day.tithi.name}
                </div>
                <div className="text-[10px] text-stone-400 dark:text-stone-500 truncate hidden sm:block">
                  {day.nakshatra.name}
                </div>
              </div>

              {/* Bottom: Festival or Vrat Tag */}
              <div className="w-full truncate space-y-1">
                {hasFestivals && (
                  <div className="text-[10px] px-1.5 py-0.5 rounded-lg bg-vedic-saffron-500 text-white font-medium truncate flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{day.festivals[0].name}</span>
                  </div>
                )}
                {!hasFestivals && day.vrats && day.vrats.length > 0 && (
                  <div className="text-[9px] sm:text-[10px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium truncate">
                    {day.vrats[0]}
                  </div>
                )}
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
}
