import React, { useState } from 'react';
import { Sun, Moon, Sparkles, CheckCircle2, XCircle, HelpCircle, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ChoghadiyaTable({ choghadiya }) {
  const [activeTab, setActiveTab] = useState('day');
  const { t, language } = useLanguage();

  if (!choghadiya) return null;

  const { dayChoghadiya, nightChoghadiya } = choghadiya;
  const currentList = activeTab === 'day' ? dayChoghadiya : nightChoghadiya;
  const isHi = language === 'hi';

  const getStatusBadge = (item) => {
    if (item.name === 'Amrit' || item.name === 'Shubh' || item.name === 'Labh') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t('choghadiya.auspiciousBadge')} ({item.nature})
        </span>
      );
    }
    if (item.name === 'Chal') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
          <HelpCircle className="w-3.5 h-3.5" />
          {t('choghadiya.neutralBadge')} ({item.nature})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
        <XCircle className="w-3.5 h-3.5" />
        {t('choghadiya.inauspiciousBadge')} ({item.nature})
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
    <div className="vedic-card p-4 sm:p-8 space-y-5 sm:space-y-6">
      
      {/* Header & Day/Night Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <h3 className="text-lg sm:text-2xl font-bold font-serif text-stone-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-vedic-saffron-600 dark:text-vedic-saffron-400" />
            {t('choghadiya.title')}
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5 sm:mt-1">
            {t('choghadiya.subtitle')}
          </p>
        </div>

        {/* Tab Buttons */}
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
              <span>{t('choghadiya.dayTab')}</span>
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
              <span>{t('choghadiya.nightTab')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
        <span className="font-bold text-stone-900 dark:text-white uppercase tracking-wider text-[11px]">{t('choghadiya.qualityGuide')}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> <strong className="text-emerald-700 dark:text-emerald-300">{t('choghadiya.bestAuspicious')}</strong></span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> <strong className="text-amber-700 dark:text-amber-300">{t('choghadiya.neutralTransit')}</strong></span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> <strong className="text-rose-700 dark:text-rose-300">{t('choghadiya.inauspiciousAvoid')}</strong></span>
      </div>

      {/* Choghadiya Cards Grid */}
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
                  <Clock className="w-3.5 h-3.5" /> {t('choghadiya.timingWindow')}
                </span>
                <div className="text-sm font-extrabold text-stone-900 dark:text-white">
                  {item.startTime} - {item.endTime}
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {item.name === 'Amrit' && (isHi ? 'सभी मांगलिक कार्यों, औषधि सेवन एवं पूजा-अर्चना के लिए सर्वोत्तम।' : 'Ideal for all auspicious works, medical treatments & sacred deeds.')}
                {item.name === 'Shubh' && (isHi ? 'विवाह, धार्मिक अनुष्ठान एवं नवीन कार्यों के शुभारंभ हेतु श्रेष्ठ।' : 'Best for weddings, religious ceremonies & new beginnings.')}
                {item.name === 'Labh' && (isHi ? 'व्यापार, वित्तीय सौदों एवं नवीन प्रतिष्ठान खोलने के लिए शुभ।' : 'Best for business, profit-making deals & opening shops.')}
                {item.name === 'Chal' && (isHi ? 'यात्रा, आवागमन एवं चल संपत्ति के कार्यों हेतु अनुकूल।' : 'Suitable for travel, journeys & shifting movable assets.')}
                {item.name === 'Udveg' && (isHi ? 'केवल शासकीय कार्यों हेतु; मांगलिक कार्य वर्जित।' : 'Government work only; avoid auspicious commencement.')}
                {item.name === 'Kaal' && (isHi ? 'मशीनरी एवं खनन कार्य हेतु; मांगलिक कार्य टालें।' : 'Mechanical or mining work; avoid auspicious rituals.')}
                {item.name === 'Rog' && (isHi ? 'विवाद या चिकित्सा हेतु; नए शुभ कार्य पूर्णतः वर्जित।' : 'Combat or treatment; strictly avoid all new ventures.')}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
