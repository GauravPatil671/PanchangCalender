import React, { useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Sparkles, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Globe, 
  Award,
  Layers
} from 'lucide-react';
import { updatePageSeo } from '../utils/seoUtils';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from '../components/common/SectionHeader';

export default function AboutPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    updatePageSeo(
      'About Hindu Panchang',
      'Understanding the Vedic Panchang, 5 Angas (Tithi, Vara, Nakshatra, Yoga, Karana), Vikram Samvat, and astronomical calculations.'
    );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-2.5 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
      
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vedic-saffron-100 dark:bg-vedic-saffron-950/80 text-vedic-saffron-700 dark:text-vedic-saffron-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t('about.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-stone-900 dark:text-white tracking-tight">
          {t('about.title')}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
          {t('about.intro')}
        </p>
      </div>

      {/* The 5 Angas Breakdown */}
      <section className="space-y-6">
        <SectionHeader
          title={t('about.fiveLimbsTitle')}
          hindiTitle={language === 'hi' ? '' : t('accordions.fiveLimbsHindi')}
          subtitle={t('about.fiveLimbsSubtitle')}
          icon={Layers}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Tithi */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold font-serif text-lg">
              <Moon className="w-5 h-5" />
              <span>{t('about.tithiTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.tithiDesc')}
            </p>
            <div className="text-xs text-amber-800 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl">
              {t('about.tithiHighlight')}
            </div>
          </div>

          {/* 2. Vara */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-vedic-saffron-500">
            <div className="flex items-center gap-2 text-vedic-saffron-700 dark:text-vedic-saffron-400 font-bold font-serif text-lg">
              <Sun className="w-5 h-5" />
              <span>{t('about.varaTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.varaDesc')}
            </p>
            <div className="text-xs text-vedic-saffron-800 dark:text-vedic-saffron-300 font-medium bg-vedic-saffron-50 dark:bg-vedic-saffron-950/40 p-2.5 rounded-xl">
              {t('about.varaHighlight')}
            </div>
          </div>

          {/* 3. Nakshatra */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-vedic-gold-500">
            <div className="flex items-center gap-2 text-vedic-gold-700 dark:text-vedic-gold-400 font-bold font-serif text-lg">
              <Sparkles className="w-5 h-5" />
              <span>{t('about.nakshatraTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.nakshatraDesc')}
            </p>
            <div className="text-xs text-vedic-gold-800 dark:text-vedic-gold-300 font-medium bg-vedic-gold-50 dark:bg-vedic-gold-950/40 p-2.5 rounded-xl">
              {t('about.nakshatraHighlight')}
            </div>
          </div>

          {/* 4. Yoga */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold font-serif text-lg">
              <Compass className="w-5 h-5" />
              <span>{t('about.yogaTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.yogaDesc')}
            </p>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl">
              {t('about.yogaHighlight')}
            </div>
          </div>

          {/* 5. Karana */}
          <div className="vedic-card p-6 space-y-3 border-l-4 border-l-purple-500 md:col-span-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold font-serif text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>{t('about.karanaTitle')}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.karanaDesc')}
            </p>
            <div className="text-xs text-purple-800 dark:text-purple-300 font-medium bg-purple-50 dark:bg-purple-950/40 p-2.5 rounded-xl">
              {t('about.karanaHighlight')}
            </div>
          </div>

        </div>
      </section>

      {/* Samvat Systems */}
      <section className="space-y-6">
        <SectionHeader
          title={t('about.samvatTitle')}
          hindiTitle={language === 'hi' ? '' : 'संवत प्रणाली'}
          subtitle={t('about.samvatSubtitle')}
          icon={Award}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="vedic-card p-6 space-y-3">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              {t('about.vikramTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.vikramDesc')}
            </p>
          </div>

          <div className="vedic-card p-6 space-y-3">
            <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
              {t('about.shakaTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {t('about.shakaDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Location Matters */}
      <section className="vedic-card p-8 bg-gradient-to-br from-vedic-saffron-50/50 via-white to-amber-50/50 dark:from-stone-900 dark:to-stone-900 border border-vedic-saffron-200/80 dark:border-stone-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-vedic-saffron-100 dark:bg-vedic-saffron-950 text-vedic-saffron-600 dark:text-vedic-saffron-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-white">
              {t('about.locationTitle')}
            </h2>
            <p className="text-xs text-stone-500">{t('about.locationSubtitle')}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {t('about.locationDesc1')}
        </p>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {t('about.locationDesc2')}
        </p>
      </section>

    </div>
  );
}
