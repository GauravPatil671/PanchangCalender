/**
 * High-Precision Lunar Astronomical Calculations
 * Calculates Moon's true geocentric ecliptic coordinates, orbital inclination,
 * distance, Rahu/Ketu lunar nodes, Chandra Rashi, and Nakshatra.
 */

import {
  DEG_TO_RAD,
  RAD_TO_DEG,
  MOON_DISTANCE_KM,
  normalizeDegrees,
  getJulianCenturies
} from './coordinateConversions.js';
import { ZODIAC_SIGNS } from './solarCalculations.js';

export const NAKSHATRA_LIST = [
  { id: 1, name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', deity: 'Ashwini Kumaras' },
  { id: 2, name: 'Bharani', hindi: 'भरणी', lord: 'Shukra', deity: 'Yama' },
  { id: 3, name: 'Krittika', hindi: 'कृत्तिका', lord: 'Surya', deity: 'Agni' },
  { id: 4, name: 'Rohini', hindi: 'रोहिणी', lord: 'Chandra', deity: 'Brahma' },
  { id: 5, name: 'Mrigashirsha', hindi: 'मृगशिरा', lord: 'Mangal', deity: 'Soma' },
  { id: 6, name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', deity: 'Rudra' },
  { id: 7, name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Guru', deity: 'Aditi' },
  { id: 8, name: 'Pushya', hindi: 'पुष्य', lord: 'Shani', deity: 'Brihaspati' },
  { id: 9, name: 'Ashlesha', hindi: 'आश्लेषा', lord: 'Budha', deity: 'Nagas' },
  { id: 10, name: 'Magha', hindi: 'मघा', lord: 'Ketu', deity: 'Pitrus' },
  { id: 11, name: 'Purva Phalguni', hindi: 'पूर्वाफाल्गुनी', lord: 'Shukra', deity: 'Bhaga' },
  { id: 12, name: 'Uttara Phalguni', hindi: 'उत्तराफाल्गुनी', lord: 'Surya', deity: 'Aryaman' },
  { id: 13, name: 'Hasta', hindi: 'हस्त', lord: 'Chandra', deity: 'Savita' },
  { id: 14, name: 'Chitra', hindi: 'चित्रा', lord: 'Mangal', deity: 'Vishwakarma' },
  { id: 15, name: 'Swati', hindi: 'स्वाति', lord: 'Rahu', deity: 'Vayu' },
  { id: 16, name: 'Vishakha', hindi: 'विशाखा', lord: 'Guru', deity: 'Indragni' },
  { id: 17, name: 'Anuradha', hindi: 'अनुराधा', lord: 'Shani', deity: 'Mitra' },
  { id: 18, name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Budha', deity: 'Indra' },
  { id: 19, name: 'Mula', hindi: 'मूल', lord: 'Ketu', deity: 'Nirriti' },
  { id: 20, name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Shukra', deity: 'Apas' },
  { id: 21, name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Surya', deity: 'Vishvadevas' },
  { id: 22, name: 'Shravana', hindi: 'श्रवण', lord: 'Chandra', deity: 'Vishnu' },
  { id: 23, name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mangal', deity: 'Vasus' },
  { id: 24, name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', deity: 'Varuna' },
  { id: 25, name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपद', lord: 'Guru', deity: 'Aja Ekapada' },
  { id: 26, name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपद', lord: 'Shani', deity: 'Ahirbudhnya' },
  { id: 27, name: 'Revati', hindi: 'रेवती', lord: 'Budha', deity: 'Pushan' }
];

/**
 * Calculates Moon's 3D astronomical position and Vedic attributes
 */
export function getLunarPosition(date) {
  const T = getJulianCenturies(date);

  // Moon's mean longitude (degrees)
  const Lp = normalizeDegrees(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841);

  // Moon's mean elongation (degrees)
  const D = normalizeDegrees(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868);

  // Sun's mean anomaly (degrees)
  const M = normalizeDegrees(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000);

  // Moon's mean anomaly (degrees)
  const Mp = normalizeDegrees(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699);

  // Moon's argument of latitude (degrees)
  const F = normalizeDegrees(93.272095 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000);

  // Ascending Node (Rahu) longitude (degrees)
  const nodeOmega = normalizeDegrees(125.04452 - 1934.136261 * T + 0.0020708 * T * T + T * T * T / 450000);
  const rahuLongitude = nodeOmega;
  const ketuLongitude = normalizeDegrees(nodeOmega + 180);

  const Drad = D * DEG_TO_RAD;
  const Mrad = M * DEG_TO_RAD;
  const Mprad = Mp * DEG_TO_RAD;
  const Frad = F * DEG_TO_RAD;

  // Major periodic terms for Moon's geocentric ecliptic longitude
  let deltaL = 6.288774 * Math.sin(Mprad)
             + 1.274027 * Math.sin(2 * Drad - Mprad)
             + 0.658314 * Math.sin(2 * Drad)
             + 0.213618 * Math.sin(2 * Mprad)
             - 0.185116 * Math.sin(Mrad)
             - 0.114332 * Math.sin(2 * Frad)
             + 0.058793 * Math.sin(2 * Drad - 2 * Mprad)
             + 0.057066 * Math.sin(2 * Drad - Mrad - Mprad)
             + 0.053322 * Math.sin(2 * Drad + Mprad)
             + 0.045758 * Math.sin(2 * Drad - Mrad)
             - 0.040923 * Math.sin(Mrad - Mprad)
             - 0.034720 * Math.sin(Drad)
             - 0.030383 * Math.sin(Mrad + Mprad);

  const lambdaMoon = normalizeDegrees(Lp + deltaL);

  // Major periodic terms for Moon's geocentric ecliptic latitude (Inclination ~ 5.145°)
  let betaMoon = 5.128122 * Math.sin(Frad)
               + 0.280606 * Math.sin(Mprad + Frad)
               + 0.277693 * Math.sin(Mprad - Frad)
               + 0.173238 * Math.sin(2 * Drad - Frad)
               + 0.055413 * Math.sin(2 * Drad - Mprad + Frad)
               + 0.046271 * Math.sin(2 * Drad - Mprad - Frad)
               + 0.032573 * Math.sin(2 * Drad + Frad)
               + 0.017198 * Math.sin(2 * Mprad + Frad);

  // Moon distance in km
  let deltaR = -20954 * Math.cos(Mprad)
             - 3699 * Math.cos(2 * Drad - Mprad)
             - 2956 * Math.cos(2 * Drad)
             - 570 * Math.cos(2 * Mprad)
             + 246 * Math.cos(2 * Drad - 2 * Mprad)
             - 205 * Math.cos(Mrad - Mprad)
             - 171 * Math.cos(2 * Drad + Mprad)
             - 152 * Math.cos(2 * Drad - Mrad - Mprad);

  const distanceKm = 385000.56 + deltaR;

  // Chandra Rashi (Zodiac Sign)
  const rashiIndex = Math.floor(lambdaMoon / 30);
  const rashi = ZODIAC_SIGNS[rashiIndex] || ZODIAC_SIGNS[0];
  const degreeInRashi = lambdaMoon % 30;

  // Nakshatra (27 equal divisions of 13°20' = 13.3333°)
  // Using standard Nirayana (Lahiri Ayanamsha correction approx ~24.1°)
  // Or Tropical to Sidereal conversion:
  const ayanamsha = 24.1 + (T * 50.29 / 3600); // Approximate Lahiri Ayanamsha
  const siderealMoonLon = normalizeDegrees(lambdaMoon - ayanamsha);
  const nakshatraIndex = Math.floor(siderealMoonLon / (360 / 27));
  const nakshatra = NAKSHATRA_LIST[nakshatraIndex] || NAKSHATRA_LIST[0];
  const nakshatraProgress = (siderealMoonLon % (360 / 27)) / (360 / 27) * 100;

  return {
    longitude: lambdaMoon, // Geocentric apparent ecliptic longitude (0°-360°)
    latitude: betaMoon,   // Geocentric apparent ecliptic latitude (-5.3° to +5.3°)
    distanceKm,
    inclinationDeg: 5.145, // Moon's orbital inclination relative to Ecliptic
    rahuLongitude,
    ketuLongitude,
    rashi,
    rashiIndex,
    degreeInRashi,
    nakshatra,
    nakshatraIndex: nakshatraIndex + 1,
    nakshatraProgress
  };
}
