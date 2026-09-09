import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getDailyPanchang,
  getMonthlyPanchang,
  getFestivals,
  getSunriseSunset
} from './panchangApi.js';

describe('Panchang API & Data Layer', () => {
  test('getDailyPanchang returns complete Vedic dataset for date', async () => {
    const panchang = await getDailyPanchang('2024-09-15', 19.0760, 72.8777);

    assert.equal(panchang.date, '2024-09-15');
    assert.ok(panchang.samvat?.vikram, 'Vikram Samvat exists');
    assert.ok(panchang.month?.purnimanta, 'Month name exists');
    assert.ok(panchang.tithi?.name, 'Tithi name exists');
    assert.ok(panchang.sunriseTithi, 'Sunrise Tithi exists');
    assert.ok(panchang.currentTithi, 'Current Tithi exists');
    assert.ok(panchang.nakshatra?.name, 'Nakshatra name exists');
    assert.ok(panchang.yoga?.name, 'Yoga name exists');
    assert.ok(panchang.karana?.name, 'Karana name exists');
    assert.ok(panchang.sunMoon?.sunrise, 'Sunrise exists');
    assert.ok(panchang.sunMoon?.sunset, 'Sunset exists');
    assert.ok(panchang.muhurat?.abhijitMuhurat, 'Abhijit Muhurat exists');
    assert.ok(panchang.inauspicious?.rahuKalam, 'Rahu Kalam exists');
    assert.ok(panchang.choghadiya?.dayChoghadiya?.length === 8, 'Day Choghadiya has 8 slots');
  });

  test('getMonthlyPanchang aggregates all days in month', async () => {
    const monthly = await getMonthlyPanchang(9, 2024, 19.0760, 72.8777);

    assert.equal(monthly.month, 9);
    assert.equal(monthly.year, 2024);
    assert.equal(monthly.days.length, 30, 'September has 30 days');
    assert.ok(monthly.days[0].tithi?.name, 'First day has tithi');
    assert.ok(monthly.days[29].tithi?.name, 'Last day has tithi');
  });

  test('getFestivals returns active festival catalog', async () => {
    const festivals = await getFestivals();
    assert.ok(Array.isArray(festivals));
    assert.ok(festivals.length > 0, 'Catalog should contain festivals');
    assert.ok(festivals.some(f => f.name.includes('Diwali') || f.name.includes('Deepavali')));
  });

  test('getSunriseSunset returns accurate sun transit times', async () => {
    const sunTimes = await getSunriseSunset('2024-09-15', 19.0760, 72.8777);
    assert.ok(sunTimes.sunrise);
    assert.ok(sunTimes.sunset);
    assert.ok(sunTimes.solarNoon);
  });
});
