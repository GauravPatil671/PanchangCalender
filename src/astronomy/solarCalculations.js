/**
 * High-Precision Solar Astronomical Calculations
 * Based on standard celestial algorithms (Jean Meeus / VSOP87 approximations)
 */

import {
  DEG_TO_RAD,
  RAD_TO_DEG,
  AU_IN_KM,
  normalizeDegrees,
  getJulianCenturies,
  getDaysSinceJ2000
} from './coordinateConversions.js';

export const ZODIAC_SIGNS = [
  { name: 'Aries', hindi: 'मेष', sanskrit: 'Mesha', symbol: '♈', lord: 'Mars' },
  { name: 'Taurus', hindi: 'वृषभ', sanskrit: 'Vrishabha', symbol: '♉', lord: 'Venus' },
  { name: 'Gemini', hindi: 'मिथुन', sanskrit: 'Mithuna', symbol: '♊', lord: 'Mercury' },
  { name: 'Cancer', hindi: 'कर्क', sanskrit: 'Karka', symbol: '♋', lord: 'Moon' },
  { name: 'Leo', hindi: 'सिंह', sanskrit: 'Simha', symbol: '♌', lord: 'Sun' },
  { name: 'Virgo', hindi: 'कन्या', sanskrit: 'Kanya', symbol: '♍', lord: 'Mercury' },
  { name: 'Libra', hindi: 'तुला', sanskrit: 'Tula', symbol: '♎', lord: 'Venus' },
  { name: 'Scorpio', hindi: 'वृश्चिक', sanskrit: 'Vrischika', symbol: '♏', lord: 'Mars' },
  { name: 'Sagittarius', hindi: 'धनु', sanskrit: 'Dhanu', symbol: '♐', lord: 'Jupiter' },
  { name: 'Capricorn', hindi: 'मकर', sanskrit: 'Makara', symbol: '♑', lord: 'Saturn' },
  { name: 'Aquarius', hindi: 'कुम्भ', sanskrit: 'Kumbha', symbol: '♒', lord: 'Saturn' },
  { name: 'Pisces', hindi: 'मीन', sanskrit: 'Meena', symbol: '♓', lord: 'Jupiter' }
];

/**
 * Calculates high-accuracy solar position for a given Date
 */
export function getSolarPosition(date) {
  const T = getJulianCenturies(date);
  const d = getDaysSinceJ2000(date);

  // Geometric mean longitude of the Sun (degrees)
  const L0 = normalizeDegrees(280.46646 + 36000.76983 * T + 0.0003032 * T * T);

  // Mean anomaly of the Sun (degrees)
  const M = normalizeDegrees(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mrad = M * DEG_TO_RAD;

  // Sun's Equation of the Center (degrees)
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);

  // Sun's true longitude (degrees)
  const trueLongitude = normalizeDegrees(L0 + C);

  // Sun's apparent longitude (degrees), corrected for aberration and nutation
  const omega = 125.04 - 1934.136 * T;
  const lambdaSun = normalizeDegrees(trueLongitude - 0.00569 - 0.00478 * Math.sin(omega * DEG_TO_RAD));

  // Sun's true anomaly (degrees)
  const v = normalizeDegrees(M + C);

  // Eccentricity of Earth's orbit
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;

  // Earth-Sun distance in Astronomical Units (AU)
  const distanceAU = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(v * DEG_TO_RAD));
  const distanceKm = distanceAU * AU_IN_KM;

  // Earth's heliocentric longitude (180° opposite to Sun's apparent geocentric longitude)
  const earthHeliocentricLongitude = normalizeDegrees(lambdaSun + 180);

  // Earth's orbital speed in km/s: v = sqrt(GM * (2/r - 1/a)) ~ 29.78 km/s average
  // Precise vis-viva approximation
  const orbitalSpeedKmS = 29.78 * Math.sqrt((2 / distanceAU) - 1);

  // Surya Rashi (Zodiac Sign)
  const rashiIndex = Math.floor(lambdaSun / 30);
  const rashi = ZODIAC_SIGNS[rashiIndex] || ZODIAC_SIGNS[0];
  const degreeInRashi = lambdaSun % 30;

  // Obliquity of the Ecliptic (degrees)
  const eps0 = 23.43929111 - (46.8150 * T - 0.00059 * T * T + 0.001813 * T * T * T) / 3600;
  const epsRad = eps0 * DEG_TO_RAD;
  const lambdaRad = lambdaSun * DEG_TO_RAD;

  // Sun's Right Ascension and Declination
  const alphaRad = Math.atan2(Math.cos(epsRad) * Math.sin(lambdaRad), Math.cos(lambdaRad));
  const rightAscensionHours = normalizeDegrees(alphaRad * RAD_TO_DEG) / 15;
  const deltaRad = Math.asin(Math.sin(epsRad) * Math.sin(lambdaRad));
  const declinationDeg = deltaRad * RAD_TO_DEG;

  return {
    longitude: lambdaSun, // Geocentric apparent ecliptic longitude (0°-360°)
    trueLongitude,
    meanAnomaly: M,
    earthHeliocentricLongitude, // Earth's position along its orbit around the Sun
    distanceAU,
    distanceKm,
    orbitalSpeedKmS,
    eccentricity: e,
    rashi,
    rashiIndex,
    degreeInRashi,
    declinationDeg,
    rightAscensionHours,
    obliquityDeg: eps0
  };
}
