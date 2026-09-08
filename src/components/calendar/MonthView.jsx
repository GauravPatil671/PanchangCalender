import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { isSameDay, getTodayDateString } from '../../utils/dateUtils';

const WEEKDAYS = ['Sun (रवि)', 'Mon (सोम)', 'Tue (मंगल)', 'Wed (बुध)', 'Thu (गुरु)', 'Fri (शुक्र)', 'Sat (शनि)'];

export default function MonthView({ monthData, selectedDate, onSelectDate, filter = 'all' }) {
  if (!monthData || !monthData.days) return null;

  const todayStr = getTodayDateString();
  const firstDayStr = monthData.days[0]?.date;
  const firstDayDate = new Date(firstDayStr);
  const startDayOfWeek = firstDayDate.getDay(); // 0 = Sun .. 6 = Sat

  // Empty leading cells
  const leadingBlanks = Array.from({ length: startDayOfWeek }, (_, i) => i);

  return (
    <div className="space-y-4">
      
      {/* Calendar Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-50 dark:bg-stone-800/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
        <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-[11px]">
          Calendar Symbols:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-sm">🌕</span> <strong>Purnima</strong> (Full Moon)
          </span>
          <span className="flex items-center gap-1">
            <span className="text-sm">🌑</span> <strong>Amavasya</strong> (New Moon)
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-[10px]">एका</span>
            <strong>Ekadashi</strong> (Fasting)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-vedic-saffron-500" />
            <strong>Festival</strong>
          </span>
        </div>
      </div>

      {/* Main Grid Card */}
      <div className="vedic-card overflow-hidden">
        
        {/* Weekday Header */}
        <div className="grid grid-cols-7 border-b border-stone-200 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-800 text-center">
          {WEEKDAYS.map((w, idx) => (
            <div
              key={w}
              className={`py-1.5 sm:py-3.5 px-0.5 text-[9px] xs:text-[11px] sm:text-sm font-bold font-serif ${
                idx === 0
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-stone-800 dark:text-stone-200'
              }`}
            >
              <span className="hidden md:inline">{w}</span>
              <span className="hidden xs:inline md:hidden">{w.split(' ')[0]}</span>
              <span className="xs:hidden">{w.slice(0, 2)}</span>
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-stone-200/70 dark:divide-stone-800">
          
          {/* Leading blanks for offset */}
          {leadingBlanks.map((b) => (
            <div key={`blank-${b}`} className="min-h-[56px] xs:min-h-[72px] sm:min-h-[110px] md:min-h-[125px] bg-stone-50/50 dark:bg-stone-900/50" />
          ))}

          {/* Days of Month */}
          {monthData.days.map((day) => {
            const isToday = isSameDay(day.date, todayStr);
            const isSelected = selectedDate && isSameDay(day.date, selectedDate);
            const hasFestivals = day.festivals && day.festivals.length > 0;
            const isEkadashi = day.isEkadashi;
            const isPurnima = day.isPurnima;
            const isAmavasya = day.isAmavasya;

            // Filter check
            let isDimmed = false;
            if (filter === 'festivals' && !hasFestivals) isDimmed = true;
            if (filter === 'ekadashi' && !isEkadashi) isDimmed = true;
            if (filter === 'purnima-amavasya' && !isPurnima && !isAmavasya) isDimmed = true;

            return (
              <button
                key={day.date}
                onClick={() => onSelectDate(day.date)}
                className={`min-h-[56px] xs:min-h-[72px] sm:min-h-[110px] md:min-h-[125px] p-0.5 xs:p-1 sm:p-2.5 text-left flex flex-col justify-between transition-all group relative overflow-hidden ${
                  isDimmed ? 'opacity-30' : 'opacity-100'
                } ${
                  isSelected
                    ? 'bg-vedic-saffron-50 dark:bg-vedic-saffron-950/40 ring-2 ring-vedic-saffron-500 z-10'
                    : 'hover:bg-amber-50/50 dark:hover:bg-stone-800/60'
                } ${isToday ? 'bg-amber-50/90 dark:bg-amber-950/30 font-bold' : ''}`}
              >
                {/* Top row: Gregorian Day Number & Lunar Badges */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] xs:text-[11px] sm:text-xs md:text-sm font-extrabold ${
                      isToday
                        ? 'bg-vedic-saffron-600 text-white shadow-sm'
                        : 'text-stone-900 dark:text-stone-100 group-hover:text-vedic-saffron-600'
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {/* Lunar Marker Icons */}
                  <div className="flex items-center gap-0.5">
                    {isPurnima && (
                      <span className="text-[10px] xs:text-xs sm:text-base" title="Purnima (Full Moon)">
                        🌕
                      </span>
                    )}
                    {isAmavasya && (
                      <span className="text-[10px] xs:text-xs sm:text-base" title="Amavasya (New Moon)">
                        🌑
                      </span>
                    )}
                    {isEkadashi && (
                      <span className="text-[7px] xs:text-[8px] sm:text-[10px] px-0.5 xs:px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold leading-none" title="Ekadashi Vrat">
                        ए
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: Tithi Name in bold & Devanagari */}
                <div className="space-y-0.5 my-0.5 sm:my-1 w-full overflow-hidden">
                  <div className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-stone-800 dark:text-stone-200 truncate font-devanagari leading-tight">
                    {day.tithi.hindi || day.tithi.name}
                  </div>
                  <div className="text-[9px] sm:text-[11px] text-stone-500 dark:text-stone-400 truncate hidden sm:block">
                    {day.nakshatra.name}
                  </div>
                </div>

                {/* Bottom: Festival Tag */}
                <div className="w-full truncate space-y-0.5">
                  {hasFestivals && (
                    <div className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] px-0.5 xs:px-1 sm:px-2 py-0.2 sm:py-0.5 rounded sm:rounded-lg bg-vedic-saffron-600 text-white font-semibold truncate flex items-center gap-0.5 sm:gap-1 shadow-sm leading-tight">
                      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0 hidden xs:inline" />
                      <span className="truncate">{day.festivals[0].name}</span>
                    </div>
                  )}
                  {!hasFestivals && day.vrats && day.vrats.length > 0 && (
                    <div className="text-[7px] xs:text-[8px] sm:text-[10px] px-0.5 xs:px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium truncate leading-tight">
                      {day.vrats[0]}
                    </div>
                  )}
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
