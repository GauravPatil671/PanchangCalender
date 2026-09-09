/**
 * Tithi and Moon Phase Astronomical Calculations
 * Connects Solar and Lunar Ecliptic Longitudes to compute Vedic Tithi, Paksha,
 * Angular Separation, and Moon Phase Illumination.
 */

import { normalizeDegrees } from './coordinateConversions.js';
import { getSolarPosition } from './solarCalculations.js';
import { getLunarPosition } from './lunarCalculations.js';

export const TITHI_DATA = [
  { id: 1, name: 'Pratipada', hindi: 'प्रतिपदा', deity: 'Agni', type: 'Nanda' },
  { id: 2, name: 'Dwitiya', hindi: 'द्वितीया', deity: 'Brahma', type: 'Bhadra' },
  { id: 3, name: 'Tritiya', hindi: 'तृतीया', deity: 'Gauri', type: 'Jaya' },
  { id: 4, name: 'Chaturthi', hindi: 'चतुर्थी', deity: 'Ganesha', type: 'Rikta' },
  { id: 5, name: 'Panchami', hindi: 'पंचमी', deity: 'Sarpa', type: 'Purna' },
  { id: 6, name: 'Shashthi', hindi: 'षष्ठी', deity: 'Kartikeya', type: 'Nanda' },
  { id: 7, name: 'Saptami', hindi: 'सप्तमी', deity: 'Surya', type: 'Bhadra' },
  { id: 8, name: 'Ashtami', hindi: 'अष्टमी', deity: 'Shiva / Durga', type: 'Jaya' },
  { id: 9, name: 'Navami', hindi: 'नवमी', deity: 'Durga', type: 'Rikta' },
  { id: 10, name: 'Dashami', hindi: 'दशमी', deity: 'Yama', type: 'Purna' },
  { id: 11, name: 'Ekadashi', hindi: 'एकादशी', deity: 'Vishnu', type: 'Nanda' },
  { id: 12, name: 'Dwadashi', hindi: 'द्वादशी', deity: 'Vishnu', type: 'Bhadra' },
  { id: 13, name: 'Trayodashi', hindi: 'त्रयोदशी', deity: 'Kamadeva / Shiva', type: 'Jaya' },
  { id: 14, name: 'Chaturdashi', hindi: 'चतुर्दशी', deity: 'Shiva / Kali', type: 'Rikta' },
  { id: 15, name: 'Purnima', hindi: 'पूर्णिमा', deity: 'Chandra / Lakshmi', type: 'Purna' },
  { id: 16, name: 'Pratipada', hindi: 'प्रतिपदा', deity: 'Agni', type: 'Nanda' },
  { id: 17, name: 'Dwitiya', hindi: 'द्वितीया', deity: 'Brahma', type: 'Bhadra' },
  { id: 18, name: 'Tritiya', hindi: 'तृतीया', deity: 'Gauri', type: 'Jaya' },
  { id: 19, name: 'Chaturthi', hindi: 'चतुर्थी', deity: 'Ganesha', type: 'Rikta' },
  { id: 20, name: 'Panchami', hindi: 'पंचमी', deity: 'Sarpa', type: 'Purna' },
  { id: 21, name: 'Shashthi', hindi: 'षष्ठी', deity: 'Kartikeya', type: 'Nanda' },
  { id: 22, name: 'Saptami', hindi: 'सप्तमी', deity: 'Surya', type: 'Bhadra' },
  { id: 23, name: 'Ashtami', hindi: 'अष्टमी', deity: 'Shiva / Durga', type: 'Jaya' },
  { id: 24, name: 'Navami', hindi: 'नवमी', deity: 'Durga', type: 'Rikta' },
  { id: 25, name: 'Dashami', hindi: 'दशमी', deity: 'Yama', type: 'Purna' },
  { id: 26, name: 'Ekadashi', hindi: 'एकादशी', deity: 'Vishnu', type: 'Nanda' },
  { id: 27, name: 'Dwadashi', hindi: 'द्वादशी', deity: 'Vishnu', type: 'Bhadra' },
  { id: 28, name: 'Trayodashi', hindi: 'त्रयोदशी', deity: 'Kamadeva / Shiva', type: 'Jaya' },
  { id: 29, name: 'Chaturdashi', hindi: 'चतुर्दशी', deity: 'Shiva / Kali', type: 'Rikta' },
  { id: 30, name: 'Amavasya', hindi: 'अमावस्या', deity: 'Pitrus', type: 'Purna' }
];

export const MOON_PHASE_NAMES = [
  { name: 'New Moon', hindi: 'अमावस्या', emoji: '🌑', minAngle: 354, maxAngle: 6 },
  { name: 'Waxing Crescent', hindi: 'शुक्ल प्रतिपदा - षष्ठी', emoji: '🌒', minAngle: 6, maxAngle: 84 },
  { name: 'First Quarter', hindi: 'शुक्ल अष्टमी', emoji: '🌓', minAngle: 84, maxAngle: 96 },
  { name: 'Waxing Gibbous', hindi: 'शुक्ल नवमी - चतुर्दशी', emoji: '🌔', minAngle: 96, maxAngle: 174 },
  { name: 'Full Moon', hindi: 'पूर्णिमा', emoji: '🌕', minAngle: 174, maxAngle: 186 },
  { name: 'Waning Gibbous', hindi: 'कृष्ण प्रतिपदा - षष्ठी', emoji: '🌖', minAngle: 186, maxAngle: 264 },
  { name: 'Third Quarter', hindi: 'कृष्ण अष्टमी', emoji: '🌗', minAngle: 264, maxAngle: 276 },
  { name: 'Waning Crescent', hindi: 'कृष्ण नवमी - चतुर्दशी', emoji: '🌘', minAngle: 276, maxAngle: 354 }
];

/**
 * Calculates complete Tithi & Phase breakdown for a given date
 */
export function getTithiDetails(date) {
  const solar = getSolarPosition(date);
  const lunar = getLunarPosition(date);

  // Angular separation / Elongation θ = (λMoon - λSun) mod 360°
  const angularSeparation = normalizeDegrees(lunar.longitude - solar.longitude);

  // Tithi Index (0 to 29)
  const tithiIndex = Math.floor(angularSeparation / 12);
  const tithiInfo = TITHI_DATA[tithiIndex] || TITHI_DATA[0];

  // Paksha (Shukla if 0° to < 180°, Krishna if 180° to < 360°)
  const isShukla = tithiIndex < 15;
  const paksha = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';
  const pakshaHindi = isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';

  // Tithi number (1 to 15)
  const tithiNumber = (tithiIndex % 15) + 1;

  // Exact degree into current 12° Tithi
  const degreesIntoTithi = angularSeparation % 12;
  const tithiProgressPercent = (degreesIntoTithi / 12) * 100;
  const tithiRemainingDegrees = 12 - degreesIntoTithi;

  // Moon Illumination fraction = (1 - cos(θ)) / 2
  const illuminationFraction = (1 - Math.cos(angularSeparation * (Math.PI / 180))) / 2;
  const illuminationPercent = Math.round(illuminationFraction * 1000) / 10;

  // Synodic lunar age in days (0 to ~29.53 days)
  const lunarAgeDays = (angularSeparation / 360) * 29.530589;

  // Determine standard Moon phase category
  let phase = MOON_PHASE_NAMES[0];
  if (angularSeparation >= 354 || angularSeparation < 6) {
    phase = MOON_PHASE_NAMES[0]; // New Moon
  } else if (angularSeparation >= 6 && angularSeparation < 84) {
    phase = MOON_PHASE_NAMES[1]; // Waxing Crescent
  } else if (angularSeparation >= 84 && angularSeparation < 96) {
    phase = MOON_PHASE_NAMES[2]; // First Quarter
  } else if (angularSeparation >= 96 && angularSeparation < 174) {
    phase = MOON_PHASE_NAMES[3]; // Waxing Gibbous
  } else if (angularSeparation >= 174 && angularSeparation < 186) {
    phase = MOON_PHASE_NAMES[4]; // Full Moon
  } else if (angularSeparation >= 186 && angularSeparation < 264) {
    phase = MOON_PHASE_NAMES[5]; // Waning Gibbous
  } else if (angularSeparation >= 264 && angularSeparation < 276) {
    phase = MOON_PHASE_NAMES[6]; // Third Quarter
  } else {
    phase = MOON_PHASE_NAMES[7]; // Waning Crescent
  }

  // Full formatted Tithi display name (e.g., "Shukla Panchami")
  let fullTithiName = '';
  if (tithiIndex === 14) {
    fullTithiName = 'Purnima';
  } else if (tithiIndex === 29) {
    fullTithiName = 'Amavasya';
  } else {
    fullTithiName = `${isShukla ? 'Shukla' : 'Krishna'} ${tithiInfo.name}`;
  }

  let fullTithiHindi = '';
  if (tithiIndex === 14) {
    fullTithiHindi = 'पूर्णिमा';
  } else if (tithiIndex === 29) {
    fullTithiHindi = 'अमावस्या';
  } else {
    fullTithiHindi = `${pakshaHindi} ${tithiInfo.hindi}`;
  }

  return {
    angularSeparation: Math.round(angularSeparation * 100) / 100,
    tithiIndex,
    tithiNumber,
    isShukla,
    paksha,
    pakshaHindi,
    tithiName: tithiInfo.name,
    tithiHindi: tithiInfo.hindi,
    fullTithiName,
    fullTithiHindi,
    deity: tithiInfo.deity,
    nature: tithiInfo.type,
    degreesIntoTithi: Math.round(degreesIntoTithi * 100) / 100,
    tithiProgressPercent: Math.round(tithiProgressPercent * 10) / 10,
    tithiRemainingDegrees: Math.round(tithiRemainingDegrees * 100) / 100,
    illuminationPercent,
    lunarAgeDays: Math.round(lunarAgeDays * 10) / 10,
    phaseName: phase.name,
    phaseHindi: phase.hindi,
    phaseEmoji: phase.emoji,
    solar,
    lunar
  };
}

/**
 * Format a Date object to a user-friendly 12-hour time string with optional relative day prefix.
 */
export function formatTithiTime(dateObj, baseDate = new Date()) {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '11:59 PM';
  }
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const timeStr = `${hoursStr}:${minutesStr} ${ampm}`;

  // Check if it crosses into next day relative to baseDate
  const baseDay = baseDate.getDate();
  const targetDay = dateObj.getDate();
  if (targetDay !== baseDay) {
    const diffDays = Math.round((new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()) - 
      new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate())) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      return `Next Day ${timeStr}`;
    }
  }
  return timeStr;
}

/**
 * Computes exact start and end times for the Tithi active at referenceDate.
 * Uses fast bisection search against astronomical ephemeris (within 1 minute precision).
 */
export function calculateTithiBoundary(referenceDate) {
  const d = referenceDate instanceof Date ? referenceDate : new Date(referenceDate);
  const currentDetails = getTithiDetails(d);
  const targetIndex = currentDetails.tithiIndex;

  // Search forward for Tithi End Time
  const tLow = d.getTime();
  const tHigh = d.getTime() + 36 * 3600 * 1000;
  let bracketLow = tLow;
  let bracketHigh = tHigh;
  let crossingFound = false;

  for (let t = tLow; t <= tHigh; t += 30 * 60 * 1000) {
    const idx = getTithiDetails(new Date(t)).tithiIndex;
    if (idx !== targetIndex) {
      bracketLow = t - 30 * 60 * 1000;
      bracketHigh = t;
      crossingFound = true;
      break;
    }
  }

  let exactEndTime = new Date(bracketHigh);
  if (crossingFound) {
    let low = bracketLow;
    let high = bracketHigh;
    while (high - low > 30000) {
      const mid = Math.floor((low + high) / 2);
      const midIdx = getTithiDetails(new Date(mid)).tithiIndex;
      if (midIdx === targetIndex) {
        low = mid;
      } else {
        high = mid;
      }
    }
    exactEndTime = new Date(high);
  }

  // Search backward for Tithi Start Time
  const startLow = d.getTime() - 36 * 3600 * 1000;
  let startBracketLow = startLow;
  let startBracketHigh = d.getTime();
  let startCrossingFound = false;

  for (let t = d.getTime(); t >= startLow; t -= 30 * 60 * 1000) {
    const idx = getTithiDetails(new Date(t)).tithiIndex;
    if (idx !== targetIndex) {
      startBracketLow = t;
      startBracketHigh = t + 30 * 60 * 1000;
      startCrossingFound = true;
      break;
    }
  }

  let exactStartTime = new Date(startBracketLow);
  if (startCrossingFound) {
    let low = startBracketLow;
    let high = startBracketHigh;
    while (high - low > 30000) {
      const mid = Math.floor((low + high) / 2);
      const midIdx = getTithiDetails(new Date(mid)).tithiIndex;
      if (midIdx === targetIndex) {
        high = mid;
      } else {
        low = mid;
      }
    }
    exactStartTime = new Date(high);
  }

  return {
    ...currentDetails,
    startTime: exactStartTime,
    endTime: exactEndTime,
    endTimeFormatted: formatTithiTime(exactEndTime, d),
    startTimeFormatted: formatTithiTime(exactStartTime, d)
  };
}

/**
 * Calculates complete Vedic Tithi State distinguishing between:
 * 1. Sunrise Tithi (सूर्योदयकालीन तिथि / Udayatithi) - Primary for Hindu ritual day & vrat
 * 2. Real-time Current Tithi (वर्तमान तिथि) - Active at the specified moment
 */
export function getPanchangTithiState(targetDate, sunriseDate = null) {
  const now = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const sunrise = sunriseDate instanceof Date 
    ? sunriseDate 
    : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

  // Udayatithi: Tithi prevailing at sunrise
  const sunriseTithiDetails = calculateTithiBoundary(sunrise);

  // Real-time instantaneous Tithi
  const currentTithiDetails = calculateTithiBoundary(now);

  // Has the sunrise Tithi ended relative to the given time?
  const hasSunriseTithiEnded = now.getTime() >= sunriseTithiDetails.endTime.getTime();

  return {
    sunriseTithi: {
      ...sunriseTithiDetails,
      label: 'Tithi at Sunrise',
      labelHindi: 'सूर्योदयकालीन तिथि (उदयतिथि)',
      endsAt: sunriseTithiDetails.endTimeFormatted,
      isCurrentlyActive: !hasSunriseTithiEnded
    },
    currentTithi: {
      ...currentTithiDetails,
      label: 'Current Tithi',
      labelHindi: 'वर्तमान तिथि',
      endsAt: currentTithiDetails.endTimeFormatted,
      isSameAsSunrise: sunriseTithiDetails.tithiIndex === currentTithiDetails.tithiIndex
    },
    hasSunriseTithiEnded
  };
}

