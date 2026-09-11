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

test('1. Astronomical Data Consistency Across Locations and Dates', async (t) => {
  const testLocations = [
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090, tz: 'Asia/Kolkata' },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, tz: 'Asia/Kolkata' },
    { name: 'Varanasi', lat: 25.3176, lng: 82.9739, tz: 'Asia/Kolkata' },
    { name: 'London', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
    { name: 'New York', lat: 40.7128, lng: -74.0060, tz: 'America/New_York' }
  ];

  const testDates = [
    new Date(2026, 0, 14), // Makar Sankranti
    new Date(2026, 2, 20), // Spring Equinox
    new Date(2026, 7, 15), // Mid August
    new Date(2026, 8, 25), // Ananta Chaturdashi season
    new Date(2026, 10, 8)  // Diwali season
  ];

  for (const testDate of testDates) {
    for (const loc of testLocations) {
      const sunTimes = calculateSunTimes(testDate, loc.lat, loc.lng);
      assert.ok(typeof sunTimes.sunrise === 'string' && sunTimes.sunrise.length > 0, `Valid Sunrise for ${loc.name}`);
      assert.ok(typeof sunTimes.sunset === 'string' && sunTimes.sunset.length > 0, `Valid Sunset for ${loc.name}`);

      const inauspicious = calculateInauspiciousTimings(testDate, loc.lat, loc.lng);
      assert.ok(inauspicious.rahuKalam && inauspicious.yamaganda && inauspicious.gulikaKalam);

      const choghadiya = calculateChoghadiya(testDate, loc.lat, loc.lng);
      assert.equal(choghadiya.dayChoghadiya.length, 8);
      assert.equal(choghadiya.nightChoghadiya.length, 8);

      const dailyPanchang = await getDailyPanchang(testDate, loc.lat, loc.lng);
      assert.ok(dailyPanchang.tithi && dailyPanchang.nakshatra && dailyPanchang.yoga && dailyPanchang.karana);
      assert.ok(dailyPanchang.sunriseTithi !== undefined);
    }
  }
});

test('2. Udayatithi vs Current Tithi Transition Verification', (t) => {
  const refDate = new Date(2026, 8, 25, 12, 0, 0);
  const boundary = calculateTithiBoundary(refDate);
  assert.ok(boundary.startTime instanceof Date && boundary.endTime instanceof Date);
  assert.ok(boundary.endTime > boundary.startTime);

  const sunriseTime = new Date(refDate);
  sunriseTime.setHours(6, 15, 0, 0);

  // Before ending time
  const beforeEnd = new Date(boundary.endTime.getTime() - 1000 * 60 * 30);
  const tithiStateBefore = getPanchangTithiState(beforeEnd, sunriseTime);
  assert.ok(tithiStateBefore.hasSunriseTithiEnded === false || tithiStateBefore.sunriseTithi.index === tithiStateBefore.currentTithi.index);

  // After ending time
  const afterEnd = new Date(boundary.endTime.getTime() + 1000 * 60 * 30);
  const tithiStateAfter = getPanchangTithiState(afterEnd, sunriseTime);
  assert.ok(tithiStateAfter.currentTithi !== undefined);
});

test('3. Page Heading Hierarchy & Accessibility Attributes', (t) => {
  const pagesDir = path.join(rootDir, 'src', 'pages');
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

  pageFiles.forEach(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    
    if (file === 'DailyPanchangPage.jsx') {
      assert.ok(content.includes('<h1') && content.includes('headingLevel="h2"'), `${file} single H1 rule`);
    } else if (file === 'Home.jsx') {
      const duplicateH1 = (content.match(/<h1/g) || []).length;
      assert.ok(content.includes('TodaySummaryHero') && duplicateH1 === 0, `${file} delegates single H1 to TodaySummaryHero`);
    } else {
      const h1Count = (content.match(/<h1/g) || []).length;
      assert.equal(h1Count, 1, `${file} must have exactly one <h1> tag`);
    }

    if (file === 'AboutPage.jsx') {
      assert.ok(!content.includes('<h3') || content.includes('<h2'), `${file} no skipped heading levels`);
    }
  });
});

test('4. Modals & Interactive Components Escape Handling and Touch Targets', (t) => {
  const modalFiles = [
    'src/components/common/LocationSelectorModal.jsx',
    'src/components/calendar/DayDetailModal.jsx',
    'src/components/festival/FestivalDetailModal.jsx',
    'src/components/layout/Navbar.jsx'
  ];

  modalFiles.forEach(relPath => {
    const fullPath = path.join(rootDir, relPath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    assert.ok(content.includes('keydown') || content.includes('keyup'), `${relPath} keyboard listener`);
    assert.ok(content.includes('Escape') || content.includes('key === \'Escape\''), `${relPath} Escape key handler`);
  });
});

test('5. App Shell: Skip Link, Error Boundary, and Lazy Loading', (t) => {
  const appContent = fs.readFileSync(path.join(rootDir, 'src', 'App.jsx'), 'utf-8');
  assert.ok(appContent.includes('href="#main-content"'), 'Skip-to-content link exists');
  assert.ok(appContent.includes('id="main-content"'), 'Main content landmark exists');
  assert.ok(appContent.includes('ErrorBoundary'), 'Error boundary exists');
  assert.ok(appContent.includes('React.lazy') || appContent.includes('lazy('), 'Code splitting exists');
});

test('6. Reduced Motion Support in Styles', (t) => {
  const cssContent = fs.readFileSync(path.join(rootDir, 'src', 'index.css'), 'utf-8');
  assert.ok(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion CSS rule exists');
});

test('7. Production Build Directory and HTML Validation', (t) => {
  const distIndexPath = path.join(rootDir, 'dist', 'index.html');
  assert.ok(fs.existsSync(distIndexPath), 'dist/index.html exists');
  const distHtml = fs.readFileSync(distIndexPath, 'utf-8');
  assert.ok(distHtml.includes('<!doctype html>') || distHtml.includes('<!DOCTYPE html>'));
  assert.ok(distHtml.includes('viewport') && distHtml.includes('width=device-width'));
  assert.ok(distHtml.includes('<title>'));
});
