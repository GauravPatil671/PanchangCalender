import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const quickLinks = [
    { path: '/',                     label: t('nav.todayPanchang') },
    { path: '/daily',                label: t('nav.dailyPanchang') },
    { path: '/calendar',             label: t('nav.calendar') },
    { path: '/festivals',            label: t('nav.festivals') },
    { path: '/muhurat',              label: t('nav.muhurat') },
    { path: '/celestial-simulation', label: t('nav.simulation') },
    { path: '/about',                label: t('nav.about') },
  ];

  const limbs = [
    {
      num: '1',
      name: isHi ? 'तिथि'     : 'Tithi',
      desc: isHi ? 'चन्द्र दिवस — ऊर्जा एवं सिद्धि' : 'Lunar day — energy & prosperity',
    },
    {
      num: '2',
      name: isHi ? 'वार'      : 'Vara',
      desc: isHi ? 'सौर दिवस — आयु एवं आरोग्यता'   : 'Solar weekday — longevity',
    },
    {
      num: '3',
      name: isHi ? 'नक्षत्र' : 'Nakshatra',
      desc: isHi ? 'तारामंडल — कर्म एवं फल'         : 'Lunar constellation — deeds',
    },
    {
      num: '4',
      name: isHi ? 'योग'     : 'Yoga',
      desc: isHi ? 'सूर्य-चन्द्र कोण — स्वास्थ्य'  : 'Sun-Moon angle — health',
    },
    {
      num: '5',
      name: isHi ? 'करण'     : 'Karana',
      desc: isHi ? 'अर्ध तिथि — कार्य सफलता'        : 'Half-tithi — action & success',
    },
  ];

  return (
    <footer className="mt-16 border-t border-stone-200 dark:border-vedic-nightBorder bg-vedic-sand/60 dark:bg-vedic-night/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">

          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md border border-vedic-gold-300 dark:border-vedic-gold-800 bg-vedic-gold-50 dark:bg-vedic-gold-950/40 flex items-center justify-center">
                <span className="text-sm font-serif font-bold text-vedic-gold-700 dark:text-vedic-gold-400" aria-hidden="true">ॐ</span>
              </div>
              <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-50">
                Panchang Calendar
              </span>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            <button
              onClick={() => setIsSelectorOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-vedic-saffron-700 dark:text-vedic-saffron-400 hover:underline underline-offset-2 font-medium min-h-[36px] transition-colors"
              aria-label={`Current city: ${selectedLocation.city}. Click to change.`}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>{selectedLocation.city}, {selectedLocation.state}</span>
            </button>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-3">
            <h3 className="panchang-label text-stone-700 dark:text-stone-300">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xs text-stone-600 dark:text-stone-400 hover:text-vedic-saffron-700 dark:hover:text-vedic-saffron-400 hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Five Limbs + Disclaimer */}
          <div className="space-y-3">
            <h3 className="panchang-label text-stone-700 dark:text-stone-300">
              {isHi ? 'पंचांग के पाँच अंग' : 'The Five Limbs (Pancha-Anga)'}
            </h3>
            <ul className="space-y-2">
              {limbs.map((limb) => (
                <li key={limb.num} className="flex gap-2 text-xs">
                  <span className="font-bold text-stone-700 dark:text-stone-300 flex-shrink-0 w-3">
                    {limb.num}.
                  </span>
                  <span>
                    <strong className="text-stone-800 dark:text-stone-200">{limb.name}</strong>
                    {' — '}
                    <span className="text-stone-500 dark:text-stone-400">{limb.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shloka + Copyright */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-vedic-nightBorder space-y-2 text-center">
          <p className="text-[11px] font-serif italic text-stone-400 dark:text-stone-600">
            "तिथि वारं च नक्षत्रं योगः करणमेव च। पञ्चाङ्गस्य फलं ज्ञात्वा सर्वपापैः प्रमुच्यते॥"
          </p>
          <p className="text-[10px] text-stone-400 dark:text-stone-600">
            {t('footer.disclaimer')}
          </p>
          <p className="text-[10px] text-stone-400 dark:text-stone-600">
            © {new Date().getFullYear()} Hindu Panchang Calendar. All calculations calibrated to local sunrise.
          </p>
        </div>

      </div>
    </footer>
  );
}
