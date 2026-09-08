// Astronomical calculation utilities for Sun, Moon, Muhurat, and Choghadiya timings

import { decimalHoursToTimeString } from '../utils/dateUtils';

/**
 * Approximate Sunrise and Sunset using standard solar declination & hour angle calculation
 */
export function calculateSunTimes(date, latitude, longitude) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  // Solar declination in radians
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180)) * (Math.PI / 180);
  const latRad = latitude * (Math.PI / 180);

  // Equation of time in minutes
  const B = (360 / 365) * (dayOfYear - 81) * (Math.PI / 180);
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

  // Solar noon in hours IST (UTC+5.5, standard meridian 82.5°E)
  const timeOffset = (82.5 - longitude) * 4; // minutes
  const solarNoonMinutes = 12 * 60 + timeOffset - eot;
  const solarNoonHours = solarNoonMinutes / 60;

  // Hour angle for horizon (-0.833 degrees for atmospheric refraction and sun disk)
  const zenith = 90.833 * (Math.PI / 180);
  let cosHA = (Math.cos(zenith) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
  
  if (cosHA > 1) cosHA = 1;
  if (cosHA < -1) cosHA = -1;
  const hourAngleHours = (Math.acos(cosHA) * (180 / Math.PI)) / 15;

  const sunriseHours = solarNoonHours - hourAngleHours;
  const sunsetHours = solarNoonHours + hourAngleHours;

  // Moonrise and Moonset approximations (shifting ~50 mins per day relative to phase)
  const moonPhaseAngle = getMoonPhaseAngle(d);
  const moonOffset = (moonPhaseAngle / 360) * 24;
  const moonriseHours = (sunriseHours + moonOffset) % 24;
  const moonsetHours = (sunsetHours + moonOffset) % 24;

  return {
    sunrise: decimalHoursToTimeString(sunriseHours),
    sunset: decimalHoursToTimeString(sunsetHours),
    solarNoon: decimalHoursToTimeString(solarNoonHours),
    moonrise: decimalHoursToTimeString(moonriseHours),
    moonset: decimalHoursToTimeString(moonsetHours),
    sunriseDecimal: sunriseHours,
    sunsetDecimal: sunsetHours,
    dayDurationHours: sunsetHours - sunriseHours,
    nightDurationHours: 24 - (sunsetHours - sunriseHours)
  };
}

/**
 * Moon Phase Calculation (0 = Amavasya/New Moon, 0.5 = Purnima/Full Moon, 1 = Next New Moon)
 */
export function getMoonPhaseAngle(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Known reference new moon: Jan 11, 2024 11:57 UTC
  const refNewMoon = new Date('2024-01-11T11:57:00Z').getTime();
  const diffDays = (d.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  const phase = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  return (phase / synodicMonth) * 360;
}

export function getMoonPhaseDetails(date) {
  const angle = getMoonPhaseAngle(date);
  const tithiIndex = Math.floor(angle / 12); // 0 to 29
  const isShukla = tithiIndex < 15;
  const tithiNumber = (tithiIndex % 15) + 1;
  
  let phaseName = 'Waxing Crescent';
  let illumination = Math.round((1 - Math.cos((angle * Math.PI) / 180)) / 2 * 100);

  if (tithiIndex === 14) phaseName = 'Full Moon (Purnima)';
  else if (tithiIndex === 29) phaseName = 'New Moon (Amavasya)';
  else if (tithiIndex < 7) phaseName = 'Waxing Crescent';
  else if (tithiIndex === 7) phaseName = 'First Quarter (Ashtami)';
  else if (tithiIndex < 14) phaseName = 'Waxing Gibbous';
  else if (tithiIndex < 22) phaseName = 'Waning Gibbous';
  else if (tithiIndex === 22) phaseName = 'Third Quarter (Ashtami)';
  else phaseName = 'Waning Crescent';

  return {
    tithiIndex,
    isShukla,
    paksha: isShukla ? 'Shukla Paksha' : 'Krishna Paksha',
    pakshaHindi: isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
    tithiNumber,
    illumination,
    phaseName
  };
}

/**
 * Hindu Inauspicious Timings: Rahu Kalam, Yamaganda, Gulika Kalam
 * Divided into 8 equal parts of daylight (sunrise to sunset)
 */
export function calculateInauspiciousTimings(date, sunriseDecimal, sunsetDecimal) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = d.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const partDuration = (sunsetDecimal - sunriseDecimal) / 8;

  // Rahu Kalam part index (1-indexed based on ancient Vedic tradition):
  // Sun: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd
  const rahuOrder = [8, 2, 7, 5, 6, 4, 3];
  // Yamaganda:
  // Sun: 5th, Mon: 4th, Tue: 3rd, Wed: 2nd, Thu: 1st, Fri: 7th, Sat: 6th
  const yamaOrder = [5, 4, 3, 2, 1, 7, 6];
  // Gulika:
  // Sun: 7th, Mon: 6th, Tue: 5th, Wed: 4th, Thu: 3rd, Fri: 2nd, Sat: 1st
  const gulikaOrder = [7, 6, 5, 4, 3, 2, 1];

  const getPartTime = (partNumber) => {
    const start = sunriseDecimal + (partNumber - 1) * partDuration;
    const end = start + partDuration;
    return {
      start: decimalHoursToTimeString(start),
      end: decimalHoursToTimeString(end),
      rawStart: start,
      rawEnd: end
    };
  };

  const rahu = getPartTime(rahuOrder[dayOfWeek]);
  const yamaganda = getPartTime(yamaOrder[dayOfWeek]);
  const gulika = getPartTime(gulikaOrder[dayOfWeek]);

  // Dur Muhurat (usually 2 muhurats in a day)
  const durMuhuratStart = sunriseDecimal + 2.5;
  const durMuhuratEnd = durMuhuratStart + 0.8;

  // Varjyam (Vedic inauspicious window)
  const varjyamStart = sunsetDecimal - 3.2;
  const varjyamEnd = varjyamStart + 1.5;

  return {
    rahuKalam: `${rahu.start} - ${rahu.end}`,
    yamaganda: `${yamaganda.start} - ${yamaganda.end}`,
    gulikaKalam: `${gulika.start} - ${gulika.end}`,
    durMuhurat: `${decimalHoursToTimeString(durMuhuratStart)} - ${decimalHoursToTimeString(durMuhuratEnd)}`,
    varjyam: `${decimalHoursToTimeString(varjyamStart)} - ${decimalHoursToTimeString(varjyamEnd)}`,
    parts: { rahu, yamaganda, gulika }
  };
}

/**
 * Auspicious Muhurats: Brahma, Abhijit, Vijaya, Godhuli, Nishita
 */
export function calculateAuspiciousMuhurats(date, sunriseDecimal, sunsetDecimal) {
  // Brahma Muhurat: 2 Muhurats (96 mins) before sunrise (approx 1h 36m to 48m before sunrise)
  const brahmaStart = sunriseDecimal - (96 / 60);
  const brahmaEnd = sunriseDecimal - (48 / 60);

  // Abhijit Muhurat: 8th Muhurat of the day (centered around solar noon, approx 48 mins)
  const solarNoon = (sunriseDecimal + sunsetDecimal) / 2;
  const abhijitStart = solarNoon - (24 / 60);
  const abhijitEnd = solarNoon + (24 / 60);

  // Vijaya Muhurat: Afternoon victory window (~2 hours after solar noon, 48 mins)
  const vijayaStart = solarNoon + 1.8;
  const vijayaEnd = vijayaStart + (48 / 60);

  // Godhuli Muhurat: 24 mins before sunset to 24 mins after sunset
  const godhuliStart = sunsetDecimal - (24 / 60);
  const godhuliEnd = sunsetDecimal + (24 / 60);

  // Nishita Muhurat: Midnight auspicious window for spiritual sadhana
  // Middle of night (Sunset to next Sunrise)
  const nightLength = 24 - (sunsetDecimal - sunriseDecimal);
  const midnight = (sunsetDecimal + nightLength / 2) % 24;
  const nishitaStart = midnight - (24 / 60);
  const nishitaEnd = midnight + (24 / 60);

  return {
    brahmaMuhurat: `${decimalHoursToTimeString(brahmaStart)} - ${decimalHoursToTimeString(brahmaEnd)}`,
    abhijitMuhurat: `${decimalHoursToTimeString(abhijitStart)} - ${decimalHoursToTimeString(abhijitEnd)}`,
    vijayaMuhurat: `${decimalHoursToTimeString(vijayaStart)} - ${decimalHoursToTimeString(vijayaEnd)}`,
    godhuliMuhurat: `${decimalHoursToTimeString(godhuliStart)} - ${decimalHoursToTimeString(godhuliEnd)}`,
    nishitaMuhurat: `${decimalHoursToTimeString(nishitaStart)} - ${decimalHoursToTimeString(nishitaEnd)}`,
    amritKalam: `${decimalHoursToTimeString(sunriseDecimal + 4.2)} - ${decimalHoursToTimeString(sunriseDecimal + 5.7)}`,
    raw: {
      brahma: { start: brahmaStart, end: brahmaEnd },
      abhijit: { start: abhijitStart, end: abhijitEnd },
      vijaya: { start: vijayaStart, end: vijayaEnd },
      godhuli: { start: godhuliStart, end: godhuliEnd },
      nishita: { start: nishitaStart, end: nishitaEnd }
    }
  };
}

/**
 * Choghadiya calculation for Day (8 periods) and Night (8 periods)
 * Order sequences based on weekday ruler
 */
export function calculateChoghadiya(date, sunriseDecimal, sunsetDecimal) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday

  // Choghadiya types & natures
  // Shubh (Good), Labh (Gain), Amrit (Best), Chal (Neutral), Rog (Evil), Kaal (Loss), Udveg (Anxiety)
  const natures = {
    'Amrit': { type: 'Auspicious', hindi: 'अमृत', nature: 'Best', color: 'emerald', isGood: true },
    'Shubh': { type: 'Auspicious', hindi: 'शुभ', nature: 'Good', color: 'emerald', isGood: true },
    'Labh': { type: 'Auspicious', hindi: 'लाभ', nature: 'Gain', color: 'emerald', isGood: true },
    'Chal': { type: 'Neutral', hindi: 'चल', nature: 'Neutral', color: 'amber', isGood: true },
    'Udveg': { type: 'Inauspicious', hindi: 'उद्वेग', nature: 'Bad (Sun)', color: 'rose', isGood: false },
    'Kaal': { type: 'Inauspicious', hindi: 'काल', nature: 'Loss (Saturn)', color: 'rose', isGood: false },
    'Rog': { type: 'Inauspicious', hindi: 'रोग', nature: 'Evil (Mars)', color: 'rose', isGood: false }
  };

  // Day sequence for each day: [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
  // Standard Vedic Choghadiya cycles:
  const dayPatterns = [
    ['Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
    ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit'], // Mon
    ['Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'], // Tue
    ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh'], // Wed
    ['Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
    ['Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal'], // Fri
    ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal']  // Sat
  ];

  const nightPatterns = [
    ['Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'], // Sun Night
    ['Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal'], // Mon Night
    ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal'], // Tue Night
    ['Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg'], // Wed Night
    ['Amrit', 'Chal', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'], // Thu Night
    ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog'], // Fri Night
    ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Chal', 'Rog', 'Kaal', 'Labh']  // Sat Night
  ];

  const dayDuration = sunsetDecimal - sunriseDecimal;
  const daySlot = dayDuration / 8;

  const nightDuration = 24 - dayDuration;
  const nightSlot = nightDuration / 8;

  const dayList = dayPatterns[dayOfWeek].map((name, i) => {
    const start = sunriseDecimal + i * daySlot;
    const end = start + daySlot;
    const info = natures[name];
    return {
      index: i + 1,
      name,
      hindi: info.hindi,
      type: info.type,
      nature: info.nature,
      color: info.color,
      isGood: info.isGood,
      startTime: decimalHoursToTimeString(start),
      endTime: decimalHoursToTimeString(end),
      rawStart: start,
      rawEnd: end
    };
  });

  const nightList = nightPatterns[dayOfWeek].map((name, i) => {
    const start = (sunsetDecimal + i * nightSlot) % 24;
    const end = (start + nightSlot) % 24;
    const info = natures[name];
    return {
      index: i + 1,
      name,
      hindi: info.hindi,
      type: info.type,
      nature: info.nature,
      color: info.color,
      isGood: info.isGood,
      startTime: decimalHoursToTimeString(start),
      endTime: decimalHoursToTimeString(end),
      rawStart: start,
      rawEnd: end
    };
  });

  return {
    dayChoghadiya: dayList,
    nightChoghadiya: nightList
  };
}
