import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

import { 
  getTithiDetails, 
  calculateTithiBoundary, 
  getPanchangTithiState 
} from './astronomy/tithiCalculations.js';

import { 
  calculateSunTimes, 
  calculateInauspiciousTimings, 
  calculateAuspiciousMuhurats, 
  calculateChoghadiya,
  getMoonPhaseDetails 
} from './services/astronomicalCalc.js';

import { 
  getDailyPanchang, 
  getMonthlyPanchang, 
  getFestivals, 
  getSunriseSunset 
} from './services/panchangApi.js';

import en from './i18n/locales/en.js';
import hi from './i18n/locales/hi.js';

// ----------------------------------------------------
// Section 1: Route Integrity and Page Structure
// ----------------------------------------------------
test('QA 1. Route and Page Structure Verification', (t) => {
  const routes = [
    { path: '/', component: 'Home.jsx', title: "Today's Panchang" },
    { path: '/daily', component: 'DailyPanchangPage.jsx', title: 'Daily Panchang' },
    { path: '/calendar', component: 'CalendarPage.jsx', title: 'Calendar' },
    { path: '/festivals', component: 'FestivalsPage.jsx', title: 'Festivals' },
    { path: '/muhurat', component: 'MuhuratPage.jsx', title: 'Muhurat & Choghadiya' },
    { path: '/celestial-simulation', component: 'CelestialSimulation.jsx', title: 'Celestial 3D' },
    { path: '/about', component: 'AboutPage.jsx', title: 'About Panchang' },
    { path: '*', component: 'NotFoundPage.jsx', title: 'Page Not Found' }
  ];

  const pagesDir = path.join(rootDir, 'src', 'pages');

  routes.forEach((route) => {
    const filePath = path.join(pagesDir, route.component);
    assert.ok(fs.existsSync(filePath), `Page component exists: ${route.component}`);

    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.length > 100, `Page content is valid and non-empty: ${route.component}`);
    assert.ok(content.includes('export default function'), `Valid default export in: ${route.component}`);

    // Verify H1 accessibility requirement
    if (route.component === 'Home.jsx') {
      assert.ok(content.includes('TodaySummaryHero'), 'Home delegates single H1 to TodaySummaryHero');
    } else if (route.component === 'DailyPanchangPage.jsx') {
      const h1Count = (content.match(/<h1/g) || []).length;
      assert.equal(h1Count, 1, 'Daily page has exactly 1 H1 and passes headingLevel="h2" to hero card');
    } else {
      const h1Count = (content.match(/<h1/g) || []).length;
      assert.equal(h1Count, 1, `${route.component} has exactly 1 H1`);
    }
  });
});

// ----------------------------------------------------
// Section 2: Full Multilingual Dictionary Verification
// ----------------------------------------------------
test('QA 2. Multilingual (Hindi & English) System Verification', (t) => {
  const expectedNamespaces = [
    'nav', 'hero', 'cards', 'accordions', 'daily', 'calendar',
    'festivals', 'muhurat', 'simulation', 'about', 'locationModal',
    'notFound', 'common', 'footer'
  ];

  expectedNamespaces.forEach((ns) => {
    assert.ok(en[ns], `English locale has namespace: ${ns}`);
    assert.ok(hi[ns], `Hindi locale has namespace: ${ns}`);

    Object.keys(en[ns]).forEach((k) => {
      assert.ok(
        hi[ns][k] !== undefined && typeof hi[ns][k] === 'string' && hi[ns][k].length > 0,
        `Hindi locale missing or empty translation for: ${ns}.${k}`
      );
    });

    Object.keys(hi[ns]).forEach((k) => {
      assert.ok(
        en[ns][k] !== undefined && typeof en[ns][k] === 'string' && en[ns][k].length > 0,
        `English locale missing or empty translation for: ${ns}.${k}`
      );
    });
  });

  // Verify parameter interpolation formatting
  const enInterp = en.daily.sunMoonSubtitle.replace('{lat}', '19.08').replace('{lng}', '72.88');
  assert.equal(enInterp, 'Timings computed for latitude 19.08°, longitude 72.88°');

  const hiInterp = hi.daily.sunMoonSubtitle.replace('{lat}', '19.08').replace('{lng}', '72.88');
  assert.equal(hiInterp, 'अक्षांश 19.08°, देशांतर 72.88° के अनुसार गणना');
});

// ----------------------------------------------------
// Section 3: Panchang Data Consistency Across Modules
// ----------------------------------------------------
test('QA 3. Astronomical Calculations Consistency & Integrity', async (t) => {
  const testLocations = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 }
  ];

  const testDates = [
    '2026-01-14', // Makar Sankranti
    '2026-03-03', // Holi season
    '2026-08-15', // Mid August
    '2026-11-08'  // Diwali season
  ];

  for (const dateStr of testDates) {
    for (const loc of testLocations) {
      const data = await getDailyPanchang(dateStr, loc.lat, loc.lng);

      // Verify Tithi
      assert.ok(data.tithi && data.tithi.name && data.tithi.hindi, 'Valid Tithi object');
      assert.ok(data.tithi.number >= 1 && data.tithi.number <= 15, 'Tithi number is 1-15');
      assert.ok(data.sunriseTithi.tithiIndex >= 0 && data.sunriseTithi.tithiIndex <= 29, 'Sunrise Tithi index is 0-29');
      assert.ok(data.tithi.nature, 'Tithi nature exists');

      // Verify Nakshatra
      assert.ok(data.nakshatra && data.nakshatra.name && data.nakshatra.hindi, 'Valid Nakshatra');
      assert.ok(data.nakshatra.lord, 'Nakshatra ruling lord exists');

      // Verify Yoga & Karana
      assert.ok(data.yoga && data.yoga.name, 'Valid Yoga');
      assert.ok(data.karana && data.karana.name, 'Valid Karana');

      // Verify Sun and Moon calculations
      assert.ok(data.sunMoon.sunrise && data.sunMoon.sunset, 'Valid Sunrise/Sunset strings');
      assert.ok(data.sunMoon.solarNoon, 'Valid Solar Noon');
      assert.ok(data.sunMoon.dayDuration, 'Valid Day Duration');

      // Verify Choghadiya
      assert.equal(data.choghadiya.dayChoghadiya.length, 8, '8 Day Choghadiya slots');
      assert.equal(data.choghadiya.nightChoghadiya.length, 8, '8 Night Choghadiya slots');

      // Verify Inauspicious & Auspicious Muhurats
      assert.ok(data.inauspicious.rahuKalam, 'Rahu Kalam exists');
      assert.ok(data.inauspicious.yamaganda, 'Yamaganda exists');
      assert.ok(data.inauspicious.gulikaKalam, 'Gulika Kalam exists');
      assert.ok(data.muhurat.brahmaMuhurat, 'Brahma Muhurat exists');
    }
  }
});

// ----------------------------------------------------
// Section 4: Udayatithi and Current Tithi Distinction
// ----------------------------------------------------
test('QA 4. Udayatithi vs Current Tithi Logic and Labeling', (t) => {
  const simDate = new Date(2026, 8, 25, 12, 0, 0); // Noon
  const boundary = calculateTithiBoundary(simDate);
  assert.ok(boundary.startTime instanceof Date && boundary.endTime instanceof Date);

  const sunrise = new Date(simDate);
  sunrise.setHours(6, 10, 0, 0);

  // Case 1: Time is at sunrise
  const stateAtSunrise = getPanchangTithiState(sunrise, sunrise);
  assert.equal(stateAtSunrise.hasSunriseTithiEnded, false);
  assert.equal(stateAtSunrise.sunriseTithi.index, stateAtSunrise.currentTithi.index);

  // Case 2: Time is well after Tithi ends
  const pastEndTime = new Date(boundary.endTime.getTime() + 1000 * 60 * 60); // 1 hr after end
  const statePastEnd = getPanchangTithiState(pastEndTime, sunrise);
  assert.ok(statePastEnd.currentTithi !== undefined);
  assert.ok(statePastEnd.currentTithi.fullTithiName);
});

// ----------------------------------------------------
// Section 5: Modal & Dialog Accessibility & Focus Traps
// ----------------------------------------------------
test('QA 5. Modal and Drawer Escape Handlers & Accessible Attributes', (t) => {
  const dialogComponents = [
    'src/components/common/LocationSelectorModal.jsx',
    'src/components/calendar/DayDetailModal.jsx',
    'src/components/festival/FestivalDetailModal.jsx',
    'src/components/layout/Navbar.jsx'
  ];

  dialogComponents.forEach(file => {
    const code = fs.readFileSync(path.join(rootDir, file), 'utf-8');
    assert.ok(code.includes('role="dialog"'), `${file} has role="dialog"`);
    assert.ok(code.includes('aria-modal="true"'), `${file} has aria-modal="true"`);
    assert.ok(code.includes("key === 'Escape'"), `${file} handles Escape key dismissal`);
  });
});

// ----------------------------------------------------
// Section 6: Responsive Tokens & CSS Utility Integrity
// ----------------------------------------------------
test('QA 6. Responsive Tokens & CSS Utility Integrity', (t) => {
  const tailwindConfig = fs.readFileSync(path.join(rootDir, 'tailwind.config.js'), 'utf-8');
  assert.ok(tailwindConfig.includes("'xs': '475px'"), 'xs breakpoint configured');
  assert.ok(tailwindConfig.includes("'sm': '640px'"), 'sm breakpoint configured');
  assert.ok(tailwindConfig.includes("'md': '768px'"), 'md breakpoint configured');
  assert.ok(tailwindConfig.includes("'lg': '1024px'"), 'lg breakpoint configured');

  const css = fs.readFileSync(path.join(rootDir, 'src', 'index.css'), 'utf-8');
  assert.ok(css.includes('.vedic-card'), '.vedic-card class defined');
  assert.ok(css.includes('.panchang-label'), '.panchang-label class defined');
  assert.ok(css.includes('.panchang-value'), '.panchang-value class defined');
  assert.ok(css.includes('.accent-auspicious'), '.accent-auspicious class defined');
  assert.ok(css.includes('.accent-inauspicious'), '.accent-inauspicious class defined');
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'), 'Reduced motion media query present');
});
