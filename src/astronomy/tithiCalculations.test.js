import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getTithiDetails,
  calculateTithiBoundary,
  getPanchangTithiState,
  formatTithiTime,
  TITHI_DATA
} from './tithiCalculations.js';

describe('Tithi and Moon Phase Astronomical Calculations', () => {
  test('Tithi dataset contains 30 distinct lunar days', () => {
    assert.equal(TITHI_DATA.length, 30);
    assert.equal(TITHI_DATA[0].name, 'Pratipada');
    assert.equal(TITHI_DATA[14].name, 'Purnima');
    assert.equal(TITHI_DATA[29].name, 'Amavasya');
  });

  test('Computes valid angular separation between 0° and 360°', () => {
    const testDate = new Date('2024-04-08T18:20:00Z'); // Solar Eclipse / Amavasya
    const details = getTithiDetails(testDate);
    assert.ok(details.angularSeparation >= 0 && details.angularSeparation <= 360);
    assert.ok(details.tithiIndex >= 0 && details.tithiIndex <= 29);
    assert.ok(details.illuminationPercent >= 0 && details.illuminationPercent <= 100);
    assert.ok(typeof details.fullTithiName === 'string' && details.fullTithiName.length > 0);
  });

  test('calculateTithiBoundary returns valid start and end timestamps', () => {
    const testDate = new Date('2024-09-15T12:00:00+05:30');
    const boundary = calculateTithiBoundary(testDate);

    assert.ok(boundary.startTime instanceof Date, 'startTime should be a Date');
    assert.ok(boundary.endTime instanceof Date, 'endTime should be a Date');
    assert.ok(boundary.startTime.getTime() < boundary.endTime.getTime(), 'startTime < endTime');
    assert.ok(typeof boundary.endTimeFormatted === 'string');
    assert.ok(typeof boundary.startTimeFormatted === 'string');
  });

  test('getPanchangTithiState distinguishes Udayatithi and Current Tithi', () => {
    const morningDate = new Date('2024-09-17T06:30:00+05:30');
    const state = getPanchangTithiState(morningDate);

    assert.ok(state.sunriseTithi, 'sunriseTithi must be present');
    assert.ok(state.currentTithi, 'currentTithi must be present');
    assert.equal(typeof state.hasSunriseTithiEnded, 'boolean');
    assert.equal(state.sunriseTithi.label, 'Tithi at Sunrise');
    assert.equal(state.currentTithi.label, 'Current Tithi');
  });

  test('formatTithiTime formats 12-hour AM/PM and Next Day properly', () => {
    const base = new Date('2024-09-15T10:00:00+05:30');
    const sameDayTime = new Date('2024-09-15T16:45:00+05:30');
    const nextDayTime = new Date('2024-09-16T05:30:00+05:30');

    assert.equal(formatTithiTime(sameDayTime, base), '04:45 PM');
    assert.equal(formatTithiTime(nextDayTime, base), 'Next Day 05:30 AM');
  });
});
