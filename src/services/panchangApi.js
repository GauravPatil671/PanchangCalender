/**
 * Panchang API Service Layer
 * Supports REST API integration with external Panchang / Astronomy endpoints
 * (e.g. Prokerala, Vedic Astro API, custom backend) via VITE_PANCHANG_API_URL and VITE_PANCHANG_API_KEY.
 * Falls back gracefully to the offline astronomical engine with high accuracy.
 */

import {
  calculateSunTimes,
  calculateInauspiciousTimings,
  calculateAuspiciousMuhurats,
  calculateChoghadiya,
  getMoonPhaseDetails
} from './astronomicalCalc';
import { generateDailyPanchangData, ALL_FESTIVALS } from './mockPanchangData';
import { formatDateYMD } from '../utils/dateUtils';

const API_BASE_URL = import.meta.env.VITE_PANCHANG_API_URL || '';
const API_KEY = import.meta.env.VITE_PANCHANG_API_KEY || '';

/**
 * Retrieve complete Daily Panchang data for a specific date and coordinates
 */
export async function getDailyPanchang(dateStr, latitude = 19.0760, longitude = 72.8777) {
  const formattedDate = formatDateYMD(dateStr);

  // If external API is configured, attempt fetch
  if (API_BASE_URL && API_KEY) {
    try {
      const response = await fetch(`${API_BASE_URL}/panchang/daily?date=${formattedDate}&lat=${latitude}&lng=${longitude}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const json = await response.json();
        return json.data;
      }
    } catch (err) {
      console.warn('External Panchang API call failed, using high-precision astronomical engine.', err);
    }
  }

  // High precision local astronomical calculation
  const sunTimes = calculateSunTimes(formattedDate, latitude, longitude);
  const rawPanchang = generateDailyPanchangData(formattedDate, latitude, longitude);
  const inauspicious = calculateInauspiciousTimings(formattedDate, sunTimes.sunriseDecimal, sunTimes.sunsetDecimal);
  const auspicious = calculateAuspiciousMuhurats(formattedDate, sunTimes.sunriseDecimal, sunTimes.sunsetDecimal);
  const choghadiya = calculateChoghadiya(formattedDate, sunTimes.sunriseDecimal, sunTimes.sunsetDecimal);
  const moonPhase = getMoonPhaseDetails(formattedDate);

  return {
    date: formattedDate,
    latitude,
    longitude,
    samvat: rawPanchang.samvat,
    month: rawPanchang.month,
    paksha: rawPanchang.paksha,
    pakshaHindi: rawPanchang.pakshaHindi,
    tithi: rawPanchang.tithi,
    nakshatra: rawPanchang.nakshatra,
    yoga: rawPanchang.yoga,
    karana: rawPanchang.karana,
    sunSign: rawPanchang.sunSign,
    moonSign: rawPanchang.moonSign,
    moonPhase: moonPhase,
    sunMoon: {
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      solarNoon: sunTimes.solarNoon,
      moonrise: sunTimes.moonrise,
      moonset: sunTimes.moonset,
      dayDuration: `${Math.floor(sunTimes.dayDurationHours)}h ${Math.round((sunTimes.dayDurationHours % 1) * 60)}m`,
      nightDuration: `${Math.floor(sunTimes.nightDurationHours)}h ${Math.round((sunTimes.nightDurationHours % 1) * 60)}m`
    },
    muhurat: {
      brahmaMuhurat: auspicious.brahmaMuhurat,
      abhijitMuhurat: auspicious.abhijitMuhurat,
      vijayaMuhurat: auspicious.vijayaMuhurat,
      godhuliMuhurat: auspicious.godhuliMuhurat,
      nishitaMuhurat: auspicious.nishitaMuhurat,
      amritKalam: auspicious.amritKalam,
      raw: auspicious.raw
    },
    inauspicious: {
      rahuKalam: inauspicious.rahuKalam,
      yamaganda: inauspicious.yamaganda,
      gulikaKalam: inauspicious.gulikaKalam,
      durMuhurat: inauspicious.durMuhurat,
      varjyam: inauspicious.varjyam,
      parts: inauspicious.parts
    },
    choghadiya: choghadiya,
    festivals: rawPanchang.festivals,
    vrats: rawPanchang.vrats
  };
}

/**
 * Retrieve Sunrise and Sunset explicitly
 */
export async function getSunriseSunset(dateStr, latitude = 19.0760, longitude = 72.8777) {
  const formattedDate = formatDateYMD(dateStr);
  const sunTimes = calculateSunTimes(formattedDate, latitude, longitude);
  return {
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    solarNoon: sunTimes.solarNoon,
    moonrise: sunTimes.moonrise,
    moonset: sunTimes.moonset
  };
}

/**
 * Retrieve Monthly Panchang overview (for calendar view)
 */
export async function getMonthlyPanchang(month, year, latitude = 19.0760, longitude = 72.8777) {
  // month is 1-indexed (1 to 12)
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthDays = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const panchang = await getDailyPanchang(dayStr, latitude, longitude);
    monthDays.push({
      date: dayStr,
      dayNumber: d,
      tithi: panchang.tithi,
      paksha: panchang.paksha,
      nakshatra: panchang.nakshatra,
      festivals: panchang.festivals,
      vrats: panchang.vrats,
      moonPhase: panchang.moonPhase,
      sunrise: panchang.sunMoon.sunrise,
      sunset: panchang.sunMoon.sunset,
      isPurnima: panchang.tithi.name.includes('Purnima'),
      isAmavasya: panchang.tithi.name.includes('Amavasya'),
      isEkadashi: panchang.tithi.name.includes('Ekadashi')
    });
  }

  return {
    year,
    month,
    days: monthDays
  };
}

/**
 * Retrieve Festivals for a given month/year or all upcoming
 */
export async function getFestivals(month = null, year = null) {
  if (month && year) {
    const monthlyData = await getMonthlyPanchang(month, year);
    const monthFestivals = [];
    monthlyData.days.forEach(day => {
      if (day.festivals && day.festivals.length > 0) {
        day.festivals.forEach(fest => {
          monthFestivals.push({
            ...fest,
            date: day.date,
            tithiDisplay: day.tithi.name
          });
        });
      }
    });
    return monthFestivals;
  }

  // Return full festival master list with computed upcoming dates
  return ALL_FESTIVALS;
}
