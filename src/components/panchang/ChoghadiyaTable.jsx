import React, { useState } from 'react';
import { Sun, Moon, Sparkles, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function ChoghadiyaTable({ choghadiya }) {
  const [activeTab, setActiveTab] = useState('day');

  if (!choghadiya) return null;

  const { dayChoghadiya, nightChoghadiya } = choghadiya;
  const currentList = activeTab === 'day' ? dayChoghadiya : nightChoghadiya;

  const getStatusBadge = (item) => {
    if (item.name === 'Amrit' || item.name === 'Shubh' || item.name === 'Labh') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {item.name} ({item.nature})
        </span>
      );
    }
    if (item.name === 'Chal') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
          <HelpCircle className="w-3.5 h-3.5" />
          {item.name} (Neutral)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
        <XCircle className="w-3.5 h-3.5" />
        {item.name} ({item.nature})
      </span>
    );
  };

  return (
    <div className="vedic-card p-6 sm:p-7 space-y-6">
      
      {/* Header & Day/Night Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" />
            Choghadiya Timings (चौघड़िया)
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Ancient 8-part division of day and night for traveling, business, and auspicious events
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('day')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'day'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Day Choghadiya (दिन)</span>
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'night'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Night Choghadiya (रात)</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/40 p-3.5 rounded-2xl">
        <span className="font-bold text-stone-900 dark:text-stone-200">Legend:</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> <strong>Amrit / Shubh / Labh</strong>: Auspicious</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> <strong>Chal</strong>: Neutral / Travel</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> <strong>Rog / Kaal / Udveg</strong>: Inauspicious</span>
      </div>

      {/* Table / Timeline */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs uppercase font-semibold">
              <th className="py-3 px-3">#</th>
              <th className="py-3 px-4">Choghadiya</th>
              <th className="py-3 px-4">Hindi</th>
              <th className="py-3 px-4">Timing</th>
              <th className="py-3 px-4">Type & Quality</th>
              <th className="py-3 px-4">Ideal For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
            {currentList.map((item) => {
              const isGood = item.isGood;
              return (
                <tr
                  key={item.index}
                  className={`hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors ${
                    isGood ? 'bg-emerald-50/20 dark:bg-emerald-950/10' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 font-mono text-xs text-stone-400">
                    {item.index}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300 font-devanagari text-base">
                    {item.hindi}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-800 dark:text-stone-200">
                    {item.startTime} - {item.endTime}
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(item)}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                    {item.name === 'Amrit' && 'All works, medical, sacred deeds'}
                    {item.name === 'Shubh' && 'Marriage, celebrations, religious worship'}
                    {item.name === 'Labh' && 'Business trade, wealth, opening shops'}
                    {item.name === 'Chal' && 'Travel, transit, movable tasks'}
                    {item.name === 'Udveg' && 'Government work only; avoid auspicious'}
                    {item.name === 'Kaal' && 'Machine work, mining; avoid good deeds'}
                    {item.name === 'Rog' && 'Combat, illness treatment; avoid all auspicious'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
