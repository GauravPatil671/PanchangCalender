import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-vedic-saffron-600 to-vedic-gold-400 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm">
                ॐ
              </div>
              <span className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                Panchang Calendar
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline font-medium min-h-[36px]"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{selectedLocation.city}, {selectedLocation.state}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-serif">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  {t('nav.todayPanchang')}
                </Link>
              </li>
              <li>
                <Link to="/daily" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  {t('nav.dailyPanchang')}
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  {t('nav.calendar')}
                </Link>
              </li>
              <li>
                <Link to="/festivals" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  {t('nav.festivals')}
                </Link>
              </li>
              <li>
                <Link to="/muhurat" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  {t('nav.muhurat')}
                </Link>
              </li>
              <li>
                <Link to="/celestial-simulation" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors font-semibold text-vedic-saffron-600 dark:text-vedic-saffron-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  {t('nav.simulation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Vedic Wisdom */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-serif">
              {isHi ? 'पंचांग के पाँच अंग' : 'The 5 Limbs (Pancha-Anga)'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">1. {isHi ? 'तिथि (Tithi):' : 'Tithi:'}</span> {isHi ? 'चन्द्र दिवस (ऊर्जा एवं सिद्धि)' : 'Lunar day (Energy & Prosperity)'}</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">2. {isHi ? 'वार (Vara):' : 'Vara:'}</span> {isHi ? 'सौर दिवस (आयु एवं आरोग्यता)' : 'Solar weekday (Longevity)'}</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">3. {isHi ? 'नक्षत्र (Nakshatra):' : 'Nakshatra:'}</span> {isHi ? 'तारामंडल (कर्म एवं फल)' : 'Lunar constellation (Deeds)'}</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">4. {isHi ? 'योग (Yoga):' : 'Yoga:'}</span> {isHi ? 'सूर्य-चन्द्र कोण (स्वास्थ्य)' : 'Sun-Moon angle (Health)'}</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">5. {isHi ? 'करण (Karana):' : 'Karana:'}</span> {isHi ? 'अर्ध तिथि (कार्य सफलता)' : 'Half-tithi (Action & Success)'}</li>
            </ul>
          </div>

          {/* Shloka Quote */}
          <div className="space-y-3 bg-vedic-sand/40 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200/60 dark:border-stone-800">
            <div className="flex items-center gap-1 text-vedic-saffron-600 dark:text-vedic-saffron-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isHi ? 'वैदिक श्लोक' : 'Vedic Shloka'}</span>
            </div>
            <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
              "तिथि वारं च नक्षत्रं योगः करणमेव च। पञ्चाङ्गस्य फलं ज्ञात्वा सर्वपापैः प्रमुच्यते॥"
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 border-t border-stone-200/50 dark:border-stone-700/50 pt-2">
              {t('footer.disclaimer')}
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 text-center text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} Hindu Panchang Calendar. All Vedic calculations calibrated for local sunrise.</p>
        </div>
      </div>
    </footer>
  );
}
