import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Sun, 
  Sparkles, 
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import PanchangGrid from './PanchangGrid';
import MuhuratSection from './MuhuratSection';
import InauspiciousCard from './InauspiciousCard';
import ChoghadiyaTable from './ChoghadiyaTable';
import SunMoonCard from './SunMoonCard';
import FestivalCard from '../festival/FestivalCard';

export default function TodayAccordions({ panchang, onSelectFestival }) {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  // All accordions collapsed by default as required
  const [openAccordions, setOpenAccordions] = useState({
    fiveLimbs: false,
    auspicious: false,
    inauspicious: false,
    choghadiya: false,
    sunMoon: false,
    festivals: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!panchang) return null;

  const tithiDisplay = isHi ? (panchang.tithi?.hindi || panchang.tithi?.name) : panchang.tithi?.name;
  const nakshatraDisplay = isHi ? (panchang.nakshatra?.hindi || panchang.nakshatra?.name) : panchang.nakshatra?.name;
  const yogaDisplay = isHi ? (panchang.yoga?.hindi || panchang.yoga?.name) : panchang.yoga?.name;

  const accordionItems = [
    {
      key: 'fiveLimbs',
      id: 'accordion-five-limbs',
      title: t('accordions.fiveLimbsTitle'),
      supportingLabel: isHi ? 'Five Limbs of Panchang' : t('accordions.fiveLimbsHindi'),
      icon: Compass,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-100 dark:bg-amber-950/80',
      summary: `${tithiDisplay || 'Tithi'} • ${nakshatraDisplay || 'Nakshatra'} • ${yogaDisplay || 'Yoga'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <PanchangGrid panchang={panchang} />
          <div className="flex justify-end pt-2">
            <Link
              to="/daily"
              className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline inline-flex items-center gap-1 min-h-[36px]"
            >
              <span>{t('accordions.exploreDailyLink')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )
    },
    {
      key: 'auspicious',
      id: 'accordion-auspicious',
      title: t('accordions.auspiciousTitle'),
      supportingLabel: isHi ? 'Shubh Muhurat' : t('accordions.auspiciousHindi'),
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-100 dark:bg-emerald-950/80',
      summary: `Abhijit: ${panchang.muhurat?.abhijitMuhurat || 'None'} • Brahma: ${panchang.muhurat?.brahmaMuhurat || 'N/A'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <MuhuratSection panchang={panchang} />
          <div className="flex justify-end pt-2">
            <Link
              to="/muhurat"
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 min-h-[36px]"
            >
              <span>{t('accordions.viewMuhuratHub')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )
    },
    {
      key: 'inauspicious',
      id: 'accordion-inauspicious',
      title: t('accordions.inauspiciousTitle'),
      supportingLabel: isHi ? 'Ashubh Kaal' : t('accordions.inauspiciousHindi'),
      icon: AlertTriangle,
      iconColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-100 dark:bg-rose-950/80',
      summary: `Rahu Kalam: ${panchang.inauspicious?.rahuKalam || 'N/A'} • Yamaganda: ${panchang.inauspicious?.yamaganda || 'N/A'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <InauspiciousCard panchang={panchang} />
        </div>
      )
    },
    {
      key: 'choghadiya',
      id: 'accordion-choghadiya',
      title: t('accordions.choghadiyaTitle'),
      supportingLabel: isHi ? 'Choghadiya Table' : t('accordions.choghadiyaHindi'),
      icon: Clock,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-950/80',
      summary: t('accordions.choghadiyaSummary'),
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <ChoghadiyaTable choghadiya={panchang.choghadiya} />
        </div>
      )
    },
    {
      key: 'sunMoon',
      id: 'accordion-sun-moon',
      title: t('accordions.sunMoonTitle'),
      supportingLabel: isHi ? 'Sun & Moon Timings' : t('accordions.sunMoonHindi'),
      icon: Sun,
      iconColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-950/80',
      summary: `${t('common.sunrise')} ${panchang.sunMoon?.sunrise} • ${t('common.sunset')} ${panchang.sunMoon?.sunset} • ${t('common.moonrise')} ${panchang.sunMoon?.moonrise || 'N/A'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <SunMoonCard panchang={panchang} />
        </div>
      )
    },
    {
      key: 'festivals',
      id: 'accordion-festivals',
      title: t('accordions.festivalsTitle'),
      supportingLabel: isHi ? 'Festivals & Vrats' : t('accordions.festivalsHindi'),
      icon: Sparkles,
      iconColor: 'text-vedic-saffron-600 dark:text-vedic-saffron-400',
      iconBg: 'bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80',
      summary: panchang.festivals && panchang.festivals.length > 0 
        ? t('accordions.eventsCount', { count: panchang.festivals.length })
        : t('accordions.majorFestivalsSummary'),
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {panchang.festivals && panchang.festivals.length > 0 ? (
              panchang.festivals.map((f) => (
                <FestivalCard
                  key={f.id}
                  festival={f}
                  onSelect={(fest) => onSelectFestival(fest)}
                />
              ))
            ) : (
              [
                {
                  id: 'diwali-preview',
                  name: isHi ? 'दीपावली (लक्ष्मी पूजन)' : 'Diwali (Deepavali)',
                  hindi: 'दीपावली',
                  category: isHi ? 'प्रमुख त्योहार' : 'Major Festival',
                  monthName: 'Kartika',
                  paksha: 'Krishna',
                  deity: 'Goddess Lakshmi & Lord Ganesha',
                  description: isHi ? 'प्रकाश और सकारात्मकता का महापर्व।' : 'The Festival of Lights celebrating victory of light over darkness and inner wisdom.',
                  muhuratHint: 'Pradosh Kaal Lakshmi Puja'
                },
                {
                  id: 'ganesh-preview',
                  name: isHi ? 'गणेश चतुर्थी' : 'Ganesh Chaturthi',
                  hindi: 'गणेश चतुर्थी',
                  category: isHi ? 'प्रमुख त्योहार' : 'Major Festival',
                  monthName: 'Bhadrapada',
                  paksha: 'Shukla',
                  deity: 'Lord Ganesha',
                  description: isHi ? 'विघ्नहर्ता भगवान गणेश का जन्मोत्सव।' : 'Celebration of the arrival of Lord Ganesha to Earth with auspicious wisdom.',
                  muhuratHint: 'Madhyahna Ganesha Puja'
                },
                {
                  id: 'mahashivratri-preview',
                  name: isHi ? 'महाशिवरात्रि' : 'Maha Shivratri',
                  hindi: 'महाशिवरात्रि',
                  category: isHi ? 'प्रमुख त्योहार' : 'Major Festival',
                  monthName: 'Phalguna',
                  paksha: 'Krishna',
                  deity: 'Lord Shiva',
                  description: isHi ? 'भगवान शिव की पावन साधना रात्रि।' : 'The Great Night of Shiva dedicated to all-night meditation and spiritual peace.',
                  muhuratHint: 'Nishita Kaal Midnight Puja'
                }
              ].map((f) => (
                <FestivalCard
                  key={f.id}
                  festival={f}
                  onSelect={(fest) => onSelectFestival(fest)}
                />
              ))
            )}
          </div>
          <div className="flex justify-end pt-2">
            <Link
              to="/festivals"
              className="text-xs font-bold text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline inline-flex items-center gap-1 min-h-[36px]"
            >
              <span>{t('accordions.exploreFestivalsLink')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="space-y-4 pt-2">
      {/* Section Headline */}
      <div className="pb-3 border-b border-stone-200/80 dark:border-stone-800">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
          {t('accordions.sectionTitle')}
          <span className="text-xs sm:text-sm font-sans font-normal text-stone-500 dark:text-stone-400">
            ({t('accordions.sectionHindi')})
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          {t('accordions.sectionSubtitle')}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {accordionItems.map((item) => {
          const isOpen = openAccordions[item.key];
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm transition-all"
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleAccordion(item.key)}
                aria-expanded={isOpen}
                aria-controls={item.id}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition-colors min-h-[56px]"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                        {item.title}
                      </span>
                      {item.supportingLabel && (
                        <span className="text-xs font-normal text-stone-500 dark:text-stone-400 hidden xs:inline">
                          ({item.supportingLabel})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 truncate max-w-[260px] xs:max-w-md sm:max-w-xl font-normal mt-0.5">
                      {item.summary}
                    </div>
                  </div>
                </div>

                <div className={`p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </button>

              {/* Accordion Body */}
              {isOpen && (
                <div
                  id={item.id}
                  className="px-4 pb-5 pt-2 sm:px-6 sm:pb-6 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/40 dark:bg-stone-950/40 animate-in fade-in duration-200"
                >
                  {item.renderContent()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

