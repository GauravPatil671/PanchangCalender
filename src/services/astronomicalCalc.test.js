import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSunTimes,
  calculateInauspiciousTimings,
  calculateAuspiciousMuhurats,
  calculateChoghadiya,
  getMoonPhaseDetails
} from './astronomicalCalc.js';

describe('Astronomical Calculation Engine', () => {
  test('calculateSunTimes returns valid sunrise, sunset, and solar noon', () => {
    // Mumbai coordinates: lat 19.0760, lng 72.8777
    const sunTimes = calculateSunTimes('2024-09-15', 19.0760, 72.8777);

    assert.ok(sunTimes.sunrise, 'sunrise time exists');
    assert.ok(sunTimes.sunset, 'sunset time exists');
    assert.ok(sunTimes.solarNoon, 'solarNoon exists');
    assert.ok(sunTimes.dayDurationHours > 10 && sunTimes.dayDurationHours < 14, 'day duration is reasonable');
    assert.ok(sunTimes.sunriseDecimal < sunTimes.sunsetDecimal, 'sunrise is before sunset');
  });

  test('calculateInauspiciousTimings computes Rahu Kalam, Yamaganda, Gulika Kalam', () => {
    const inauspicious = calculateInauspiciousTimings('2024-09-15', 6.25, 18.5);

    assert.ok(inauspicious.rahuKalam, 'Rahu Kalam string exists');
    assert.ok(inauspicious.yamaganda, 'Yamaganda string exists');
    assert.ok(inauspicious.gulikaKalam, 'Gulika Kalam string exists');
    assert.ok(inauspicious.durMuhurat, 'Dur Muhurat string exists');
    assert.ok(inauspicious.varjyam, 'Varjyam string exists');
    assert.ok(inauspicious.parts?.rahu, 'Rahu part raw values exist');
  });

  test('calculateAuspiciousMuhurats computes Abhijit, Brahma, Vijaya Muhurats', () => {
    const auspicious = calculateAuspiciousMuhurats('2024-09-15', 6.25, 18.5);

    assert.ok(auspicious.brahmaMuhurat, 'Brahma Muhurat exists');
    assert.ok(auspicious.abhijitMuhurat, 'Abhijit Muhurat exists');
    assert.ok(auspicious.vijayaMuhurat, 'Vijaya Muhurat exists');
    assert.ok(auspicious.godhuliMuhurat, 'Godhuli Muhurat exists');
    assert.ok(auspicious.nishitaMuhurat, 'Nishita Muhurat exists');
  });

  test('calculateChoghadiya returns 8 day slots and 8 night slots', () => {
    const choghadiya = calculateChoghadiya('2024-09-15', 6.25, 18.5);

    assert.equal(choghadiya.dayChoghadiya.length, 8, 'Day choghadiya must have 8 slots');
    assert.equal(choghadiya.nightChoghadiya.length, 8, 'Night choghadiya must have 8 slots');
    assert.ok(choghadiya.dayChoghadiya[0].name, 'First slot has a name');
    assert.ok(choghadiya.dayChoghadiya[0].startTime, 'First slot has a start time');
    assert.ok(choghadiya.dayChoghadiya[0].endTime, 'First slot has an end time');
  });

  test('getMoonPhaseDetails provides correct Paksha and phase name', () => {
    const details = getMoonPhaseDetails('2024-09-15');

    assert.ok(details.paksha === 'Shukla Paksha' || details.paksha === 'Krishna Paksha');
    assert.ok(details.illumination >= 0 && details.illumination <= 100);
    assert.ok(typeof details.phaseName === 'string');
  });
});
