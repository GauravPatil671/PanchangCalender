import React, { useState } from 'react';
import { Sun, Moon, Sparkles, CheckCircle2, XCircle, HelpCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ChoghadiyaTable({ choghadiya }) {
  const [activeTab, setActiveTab] = useState('day');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  if (!choghadiya) return null;

  const { dayChoghadiya, nightChoghadiya } = choghadiya;
  const currentList = activeTab === 'day' ? dayChoghadiya : nightChoghadiya;

  const getStatusBadge = (item) => {
    if (item.name === 'Amrit' || item.name === 'Shubh' || item.name === 'Labh') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Auspicious ({item.nature})
        </span>
      );
    }
    if (item.name === 'Chal') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          <HelpCircle className="w-3.5 h-3.5" />
          Neutral ({item.nature})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
        <XCircle className="w-3.5 h-3.5" />
        Inauspicious ({item.nature})
      </span>
    );
  };

  const getBorderColor = (item) => {
    if (item.name === 'Amrit' || item.name === 'Shubh' || item.name === 'Labh') {
      return 'border-t-4 border-t-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10';
    }
    if (item.name === 'Chal') {
      return 'border-t-4 border-t-amber-500 bg-amber-50/20 dark:bg-amber-950/10';
    }
    return 'border-t-4 border-t-rose-400 bg-rose-50/20 dark:bg-rose-950/10';
  };

  return (
    <div className="vedic-card p-6 sm:p-8 space-y-6">
      
      {/* Header & Day/Night Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" />
            Choghadiya Muhurat (चौघड़िया)
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Ancient 8-part division of day and night for traveling, business commencement, and auspicious deeds
          </p>
        </div>

        {/* Tab & View Mode Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('day')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'day'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Day (दिन)</span>
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'night'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Night (रात)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
        <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-[11px]">Quality Guide:</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> <strong className="text-emerald-700 dark:text-emerald-300">Amrit / Shubh / Labh</strong> (Best / Auspicious)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> <strong className="text-amber-700 dark:text-amber-300">Chal</strong> (Neutral / Good for Transit)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> <strong className="text-rose-700 dark:text-rose-300">Rog / Kaal / Udveg</strong> (Inauspicious / Avoid)</span>
      </div>

      {/* Choghadiya Cards Grid (Superior Readability on All Screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentList.map((item) => {
          return (
            <div
              key={item.index}
              className={`p-5 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3 shadow-sm hover:shadow-md transition-all ${getBorderColor(item)}`}
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-stone-200/80 dark:bg-stone-700 flex items-center justify-center text-xs font-bold font-mono text-stone-700 dark:text-stone-300">
                  {item.index}
                </span>
                {getStatusBadge(item)}
              </div>

              <div>
                <div className="text-xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
                  <span>{item.name}</span>
                  <span className="text-base font-devanagari text-stone-600 dark:text-stone-300">
                    ({item.hindi})
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Timing Window
                </span>
                <div className="text-sm font-extrabold text-stone-900 dark:text-white">
                  {item.startTime} - {item.endTime}
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {item.name === 'Amrit' && 'Ideal for all auspicious works, medical treatments & sacred deeds.'}
                {item.name === 'Shubh' && 'Best for weddings, religious ceremonies & new beginnings.'}
                {item.name === 'Labh' && 'Best for business, profit-making deals & opening shops.'}
                {item.name === 'Chal' && 'Suitable for travel, journeys & shifting movable assets.'}
                {item.name === 'Udveg' && 'Government work only; avoid auspicious commencement.'}
                {item.name === 'Kaal' && 'Mechanical or mining work; avoid auspicious rituals.'}
                {item.name === 'Rog' && 'Combat or treatment; strictly avoid all new ventures.'}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
