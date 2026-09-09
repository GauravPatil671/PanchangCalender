/**
 * Eclipse Detection and Alignment Calculations
 * Computes whether the Sun, Earth, and Moon form a physical eclipse alignment,
 * and maintains reference ephemeris of major eclipse dates.
 */

import { getSolarPosition } from './solarCalculations.js';
import { getLunarPosition } from './lunarCalculations.js';
import { normalizeDegrees } from './coordinateConversions.js';

// Notable Solar and Lunar Eclipses (2024 - 2030) for instant simulation jumps
export const NOTABLE_ECLIPSES = [
  {
    date: '2024-04-08T18:18:00Z',
    type: 'Total Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Great North American Total Solar Eclipse',
    saros: 139
  },
  {
    date: '2024-09-18T02:44:00Z',
    type: 'Partial Lunar Eclipse',
    alignment: 'Sun → Earth → Moon',
    description: 'Harvest Moon Partial Lunar Eclipse',
    saros: 118
  },
  {
    date: '2024-10-02T18:45:00Z',
    type: 'Annular Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Ring of Fire over South America / Pacific',
    saros: 144
  },
  {
    date: '2025-03-14T06:59:00Z',
    type: 'Total Lunar Eclipse',
    alignment: 'Sun → Earth → Moon',
    description: 'Blood Moon Total Lunar Eclipse',
    saros: 123
  },
  {
    date: '2025-03-29T10:48:00Z',
    type: 'Partial Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Spring Partial Solar Eclipse (Europe/N. America)',
    saros: 149
  },
  {
    date: '2025-09-07T18:12:00Z',
    type: 'Total Lunar Eclipse',
    alignment: 'Sun → Earth → Moon',
    description: 'Total Lunar Eclipse visible across Asia & Europe',
    saros: 128
  },
  {
    date: '2025-09-21T19:43:00Z',
    type: 'Partial Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'South Pacific Partial Solar Eclipse',
    saros: 154
  },
  {
    date: '2026-02-17T12:12:00Z',
    type: 'Annular Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Southern Polar Annular Eclipse',
    saros: 121
  },
  {
    date: '2026-03-03T11:34:00Z',
    type: 'Total Lunar Eclipse',
    alignment: 'Sun → Earth → Moon',
    description: 'Total Lunar Eclipse (Asia, Americas, Pacific)',
    saros: 133
  },
  {
    date: '2026-08-12T17:47:00Z',
    type: 'Total Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Major European Total Solar Eclipse (Greenland, Iceland, Spain)',
    saros: 126
  },
  {
    date: '2026-08-28T04:14:00Z',
    type: 'Partial Lunar Eclipse',
    alignment: 'Sun → Earth → Moon',
    description: 'Late Summer Partial Lunar Eclipse',
    saros: 138
  },
  {
    date: '2027-08-02T10:07:00Z',
    type: 'Total Solar Eclipse',
    alignment: 'Sun → Moon → Earth',
    description: 'Great Century Eclipse across North Africa & Middle East',
    saros: 136
  }
];

/**
 * Checks if the current Sun-Moon-Earth geometry constitutes a real eclipse
 */
export function checkEclipse(date) {
  const solar = getSolarPosition(date);
  const lunar = getLunarPosition(date);

  const elongation = normalizeDegrees(lunar.longitude - solar.longitude);
  const moonLatAbs = Math.abs(lunar.latitude);

  // Distance from nearest lunar node (Rahu or Ketu)
  const distFromRahu = Math.min(
    Math.abs(lunar.longitude - lunar.rahuLongitude),
    360 - Math.abs(lunar.longitude - lunar.rahuLongitude)
  );
  const distFromKetu = Math.min(
    Math.abs(lunar.longitude - lunar.ketuLongitude),
    360 - Math.abs(lunar.longitude - lunar.ketuLongitude)
  );
  const nodeDistance = Math.min(distFromRahu, distFromKetu);

  // Solar Eclipse condition: New Moon (Elongation within 10°) & Moon very close to ecliptic plane (< 1.5°)
  const isNewMoon = elongation < 10 || elongation > 350;
  const isSolarEclipseAlignment = isNewMoon && moonLatAbs < 1.45 && nodeDistance < 18.5;

  // Lunar Eclipse condition: Full Moon (Elongation within 10° of 180°) & Moon very close to ecliptic plane (< 1.0°)
  const isFullMoon = Math.abs(elongation - 180) < 10;
  const isLunarEclipseAlignment = isFullMoon && moonLatAbs < 1.05 && nodeDistance < 12.5;

  let isEclipse = false;
  let eclipseType = null;
  let alignment = null;
  let summary = 'No eclipse alignment occurs at this selected time.';
  let nodeInvolved = distFromRahu < distFromKetu ? 'Rahu (Ascending Node)' : 'Ketu (Descending Node)';

  if (isSolarEclipseAlignment) {
    isEclipse = true;
    alignment = 'Sun → Moon → Earth';
    if (moonLatAbs < 0.5) {
      eclipseType = 'Total / Annular Solar Eclipse (सूर्य ग्रहण)';
    } else {
      eclipseType = 'Partial Solar Eclipse (आंशिक सूर्य ग्रहण)';
    }
    summary = `Solar Eclipse active: Moon passes directly between Sun and Earth near ${nodeInvolved}.`;
  } else if (isLunarEclipseAlignment) {
    isEclipse = true;
    alignment = 'Sun → Earth → Moon';
    if (moonLatAbs < 0.4) {
      eclipseType = 'Total Lunar Eclipse (पूर्ण चंद्र ग्रहण)';
    } else {
      eclipseType = 'Partial Lunar Eclipse (आंशिक चंद्र ग्रहण)';
    }
    summary = `Lunar Eclipse active: Earth casts its shadow across the Moon near ${nodeInvolved}.`;
  }

  // Find next upcoming eclipse from catalog
  const currentTime = (date instanceof Date ? date : new Date(date)).getTime();
  const nextEclipse = NOTABLE_ECLIPSES.find(e => new Date(e.date).getTime() > currentTime) || NOTABLE_ECLIPSES[0];

  return {
    isEclipse,
    eclipseType,
    alignment,
    summary,
    nodeDistance: Math.round(nodeDistance * 100) / 100,
    moonLatitude: Math.round(lunar.latitude * 100) / 100,
    nodeInvolved,
    nextEclipse
  };
}
