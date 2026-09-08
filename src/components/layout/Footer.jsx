import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Compass, MapPin } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';

export default function Footer() {
  const { selectedLocation, setIsSelectorOpen } = useLocationContext();

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
              Accurate Hindu Panchang, Tithi, Nakshatra, Auspicious Muhurats, Choghadiya timings, and Festivals for Indian and global cities.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-vedic-saffron-600 dark:text-vedic-saffron-400 hover:underline font-medium"
              >
                <MapPin className="w-3.5 h-3.5" />
                Current City: {selectedLocation.city}, {selectedLocation.state}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-serif">
              Explore Panchang
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  Today's Panchang
                </Link>
              </li>
              <li>
                <Link to="/daily" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  Daily Detailed Panchang
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  Monthly Hindu Calendar
                </Link>
              </li>
              <li>
                <Link to="/festivals" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  Hindu Festivals & Vrats
                </Link>
              </li>
              <li>
                <Link to="/muhurat" className="hover:text-vedic-saffron-600 dark:hover:text-vedic-saffron-400 transition-colors">
                  Choghadiya & Shubh Muhurat
                </Link>
              </li>
            </ul>
          </div>

          {/* Vedic Wisdom */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 font-serif">
              The 5 Limbs (Pancha-Anga)
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">1. Tithi:</span> Lunar day (Energy & Prosperity)</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">2. Vara:</span> Solar weekday (Longevity)</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">3. Nakshatra:</span> Lunar constellation (Deeds)</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">4. Yoga:</span> Sun-Moon angle (Health)</li>
              <li><span className="font-semibold text-stone-800 dark:text-stone-200">5. Karana:</span> Half-tithi (Action & Success)</li>
            </ul>
          </div>

          {/* Shloka Quote */}
          <div className="space-y-3 bg-vedic-sand/40 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200/60 dark:border-stone-800">
            <div className="flex items-center gap-1 text-vedic-saffron-600 dark:text-vedic-saffron-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vedic Shloka</span>
            </div>
            <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
              "तिथि वारं च नक्षत्रं योगः करणमेव च। पञ्चाङ्गस्य फलं ज्ञात्वा सर्वपापैः प्रमुच्यते॥"
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Knowing the five limbs of Panchang liberates one from negativities and brings auspicious alignment.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
          <p>© {new Date().getFullYear()} Hindu Panchang Calendar. All astronomical calculations based on Surya Siddhanta & modern ephemeris.</p>
          <p className="flex items-center gap-1">
            Built with modern precision & Vedic tradition
          </p>
        </div>
      </div>
    </footer>
  );
}
