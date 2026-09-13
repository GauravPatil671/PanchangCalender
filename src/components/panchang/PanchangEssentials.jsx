import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * PanchangEssentials — flat 5-item strip showing the Pancha Anga
 * Tithi · Nakshatra · Yoga · Karana · Vara
 *
 * Above the fold. No card shadows. Simple table-like layout.
 */
export default function PanchangEssentials({ panchang }) {
  const { language } = useLanguage();
  if (!panchang) return null;

  const isHi = language === 'hi';

  const items = [
    {
      label: 'Tithi',
      labelHindi: 'तिथि',
      desc: 'Lunar Day',
      value: isHi
        ? (panchang.tithi?.hindi || panchang.tithi?.name)
        : panchang.tithi?.name,
      sub: panchang.tithi?.endTimeFormatted
        ? `Ends ${panchang.tithi.endTimeFormatted}`
        : panchang.tithi?.endTime
          ? `Ends ${panchang.tithi.endTime}`
          : null,
      active: true,
    },
    {
      label: 'Nakshatra',
      labelHindi: 'नक्षत्र',
      desc: 'Lunar Mansion',
      value: isHi
        ? (panchang.nakshatra?.hindi || panchang.nakshatra?.name)
        : panchang.nakshatra?.name,
      sub: panchang.nakshatra?.endTimeFormatted
        ? `Ends ${panchang.nakshatra.endTimeFormatted}`
        : panchang.nakshatra?.endTime
          ? `Ends ${panchang.nakshatra.endTime}`
          : null,
      active: true,
    },
    {
      label: 'Yoga',
      labelHindi: 'योग',
      desc: 'Solilunar Angle',
      value: isHi
        ? (panchang.yoga?.hindi || panchang.yoga?.name)
        : panchang.yoga?.name,
      sub: null,
      active: false,
    },
    {
      label: 'Karana',
      labelHindi: 'करण',
      desc: 'Half-Tithi',
      value: panchang.karana?.name,
      sub: null,
      active: false,
    },
    {
      label: 'Vara',
      labelHindi: 'वार',
      desc: 'Weekday',
      value: panchang.vara || panchang.weekday,
      sub: panchang.samvat?.vikram ? `VS ${panchang.samvat.vikram}` : null,
      active: false,
    },
  ];

  return (
    <section aria-label="Panchang Essentials — Five Limbs at a glance">
      {/* Mobile: vertical list; Desktop: horizontal 5-col strip */}
      <div className="vedic-card divide-y divide-stone-100 dark:divide-vedic-nightBorder sm:divide-y-0 sm:divide-x sm:flex">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 px-4 py-3 sm:flex-col sm:items-start sm:justify-start sm:px-5 sm:py-4 sm:flex-1 sm:gap-1.5"
          >
            {/* Label row */}
            <div className="flex items-center gap-1.5 sm:gap-1">
              {item.active && (
                <span className="status-dot-active" aria-label="Active now" />
              )}
              <span className="panchang-label">
                {item.label}
                <span className="ml-1 text-stone-400 dark:text-stone-600 font-normal normal-case tracking-normal">
                  — {item.labelHindi}
                </span>
              </span>
            </div>

            {/* Value */}
            <div className="text-right sm:text-left">
              <div className="panchang-value text-sm sm:text-base">
                {item.value || '—'}
              </div>
              {item.sub && (
                <div className="text-[10px] text-stone-400 dark:text-stone-500 mt-0.5 sm:mt-0">
                  {item.sub}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
