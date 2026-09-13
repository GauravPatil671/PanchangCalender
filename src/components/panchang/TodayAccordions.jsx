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
  ArrowRight,
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

  // Five Limbs opens by default — most commonly needed section
  const [openAccordions, setOpenAccordions] = useState({
    fiveLimbs:    true,
    auspicious:   false,
    inauspicious: false,
    choghadiya:   false,
    sunMoon:      false,
    festivals:    false,
  });

  const toggle = (key) =>
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!panchang) return null;

  const tithiDisplay     = isHi ? (panchang.tithi?.hindi     || panchang.tithi?.name)     : panchang.tithi?.name;
  const nakshatraDisplay = isHi ? (panchang.nakshatra?.hindi || panchang.nakshatra?.name) : panchang.nakshatra?.name;
  const yogaDisplay      = isHi ? (panchang.yoga?.hindi      || panchang.yoga?.name)      : panchang.yoga?.name;

  const accordionItems = [
    {
      key:   'fiveLimbs',
      id:    'acc-five-limbs',
      title: t('accordions.fiveLimbsTitle'),
      icon:  Compass,
      iconColor: 'text-vedic-gold-600 dark:text-vedic-gold-400',
      summary: `${tithiDisplay || 'Tithi'} · ${nakshatraDisplay || 'Nakshatra'} · ${yogaDisplay || 'Yoga'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <PanchangGrid panchang={panchang} />
          <div className="flex justify-end">
            <Link
              to="/daily"
              className="inline-flex items-center gap-1 text-xs font-semibold text-vedic-saffron-700 dark:text-vedic-saffron-400 hover:underline underline-offset-2 min-h-[36px]"
            >
              {t('accordions.exploreDailyLink')}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ),
    },
    {
      key:   'auspicious',
      id:    'acc-auspicious',
      title: t('accordions.auspiciousTitle'),
      icon:  ShieldCheck,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      summary: `Abhijit: ${panchang.muhurat?.abhijitMuhurat || 'None'} · Brahma: ${panchang.muhurat?.brahmaMuhurat || 'N/A'}`,
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <MuhuratSection panchang={panchang} />
          <div className="flex justify-end">
            <Link
              to="/muhurat"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline underline-offset-2 min-h-[36px]"
            >
              {t('accordions.viewMuhuratHub')}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ),
    },
    {
      key:   'inauspicious',
      id:    'acc-inauspicious',
      title: t('accordions.inauspiciousTitle'),
      icon:  AlertTriangle,
      iconColor: 'text-rose-600 dark:text-rose-400',
      summary: `Rahu Kalam: ${panchang.inauspicious?.rahuKalam || 'N/A'} · Yamaganda: ${panchang.inauspicious?.yamaganda || 'N/A'}`,
      renderContent: () => (
        <div className="pt-2">
          <InauspiciousCard panchang={panchang} />
        </div>
      ),
    },
    {
      key:   'choghadiya',
      id:    'acc-choghadiya',
      title: t('accordions.choghadiyaTitle'),
      icon:  Clock,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      summary: t('accordions.choghadiyaSummary'),
      renderContent: () => (
        <div className="pt-2">
          <ChoghadiyaTable choghadiya={panchang.choghadiya} />
        </div>
      ),
    },
    {
      key:   'sunMoon',
      id:    'acc-sun-moon',
      title: t('accordions.sunMoonTitle'),
      icon:  Sun,
      iconColor: 'text-amber-600 dark:text-amber-400',
      summary: `${t('common.sunrise')} ${panchang.sunMoon?.sunrise} · ${t('common.sunset')} ${panchang.sunMoon?.sunset} · ${t('common.moonrise')} ${panchang.sunMoon?.moonrise || 'N/A'}`,
      renderContent: () => (
        <div className="pt-2">
          <SunMoonCard panchang={panchang} />
        </div>
      ),
    },
    {
      key:   'festivals',
      id:    'acc-festivals',
      title: t('accordions.festivalsTitle'),
      icon:  Sparkles,
      iconColor: 'text-vedic-saffron-600 dark:text-vedic-saffron-400',
      summary: panchang.festivals?.length > 0
        ? t('accordions.eventsCount', { count: panchang.festivals.length })
        : t('accordions.majorFestivalsSummary'),
      renderContent: () => (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {panchang.festivals?.length > 0
              ? panchang.festivals.map((f) => (
                  <FestivalCard key={f.id} festival={f} onSelect={onSelectFestival} />
                ))
              : [
                  { id: 'diwali-preview',       name: isHi ? 'दीपावली (लक्ष्मी पूजन)' : 'Diwali (Deepavali)',  hindi: 'दीपावली',   category: isHi ? 'प्रमुख त्योहार' : 'Major Festival', monthName: 'Kartika',    paksha: 'Krishna', deity: 'Goddess Lakshmi & Lord Ganesha', description: isHi ? 'प्रकाश और सकारात्मकता का महापर्व।' : 'Festival of Lights celebrating victory of light over darkness.', muhuratHint: 'Pradosh Kaal Lakshmi Puja' },
                  { id: 'ganesh-preview',       name: isHi ? 'गणेश चतुर्थी'           : 'Ganesh Chaturthi',   hindi: 'गणेश चतुर्थी', category: isHi ? 'प्रमुख त्योहार' : 'Major Festival', monthName: 'Bhadrapada', paksha: 'Shukla',  deity: 'Lord Ganesha',                   description: isHi ? 'विघ्नहर्ता भगवान गणेश का जन्मोत्सव।' : 'Celebration of Lord Ganesha with auspicious wisdom.', muhuratHint: 'Madhyahna Ganesha Puja' },
                  { id: 'mahashivratri-preview', name: isHi ? 'महाशिवरात्रि'           : 'Maha Shivratri',    hindi: 'महाशिवरात्रि', category: isHi ? 'प्रमुख त्योहार' : 'Major Festival', monthName: 'Phalguna',   paksha: 'Krishna', deity: 'Lord Shiva',                     description: isHi ? 'भगवान शिव की पावन साधना रात्रि।' : 'The Great Night of Shiva for all-night meditation.', muhuratHint: 'Nishita Kaal Midnight Puja' },
                ].map((f) => (
                  <FestivalCard key={f.id} festival={f} onSelect={onSelectFestival} />
                ))
            }
          </div>
          <div className="flex justify-end">
            <Link
              to="/festivals"
              className="inline-flex items-center gap-1 text-xs font-semibold text-vedic-saffron-700 dark:text-vedic-saffron-400 hover:underline underline-offset-2 min-h-[36px]"
            >
              {t('accordions.exploreFestivalsLink')}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="space-y-1" aria-label="Detailed Panchang calculations">

      {/* Section label */}
      <p className="section-divider-label py-3">
        {t('accordions.sectionTitle')}
      </p>

      {/* Accordion list */}
      <div className="space-y-2">
        {accordionItems.map((item) => {
          const isOpen = openAccordions[item.key];
          const Icon   = item.icon;

          return (
            <div
              key={item.key}
              className="vedic-card overflow-hidden"
            >
              {/* Trigger */}
              <button
                onClick={() => toggle(item.key)}
                aria-expanded={isOpen}
                aria-controls={item.id}
                className="w-full text-left px-4 py-3.5 sm:px-5 flex items-center justify-between gap-3 hover:bg-stone-50/80 dark:hover:bg-stone-800/30 transition-colors min-h-[52px]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0 ${item.iconColor}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>

                  {/* Title + summary */}
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 block">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500 truncate block max-w-[220px] xs:max-w-sm sm:max-w-lg mt-0.5">
                      {item.summary}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {/* Body */}
              {isOpen && (
                <div
                  id={item.id}
                  className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 border-t border-stone-100 dark:border-vedic-nightBorder bg-stone-50/30 dark:bg-stone-950/20 animate-in fade-in duration-150"
                  role="region"
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
