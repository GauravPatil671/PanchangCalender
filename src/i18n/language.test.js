import test from 'node:test';
import assert from 'node:assert/strict';
import en from './locales/en.js';
import hi from './locales/hi.js';

test('1. Localization Dictionary Parity and Integrity across all sections', (t) => {
  const sections = [
    'nav',
    'hero',
    'cards',
    'accordions',
    'daily',
    'calendar',
    'festivals',
    'muhurat',
    'simulation',
    'about',
    'locationModal',
    'notFound',
    'common',
    'footer'
  ];

  sections.forEach((section) => {
    assert.ok(en[section] && hi[section], `Section "${section}" exists in both en and hi`);
    
    // Check every key in en exists in hi
    Object.keys(en[section]).forEach((k) => {
      assert.ok(
        hi[section][k] !== undefined,
        `Hindi section "${section}" is missing key: "${k}"`
      );
    });

    // Check every key in hi exists in en
    Object.keys(hi[section]).forEach((k) => {
      assert.ok(
        en[section][k] !== undefined,
        `English section "${section}" is missing key: "${k}"`
      );
    });
  });
});

test('2. Parameter Interpolation Formatting in Locales', (t) => {
  // Test interpolation in English
  const enStatus = en.hero.statusUntil.replace('{tithi}', 'Amavasya').replace('{time}', '8:55 AM');
  assert.equal(enStatus, 'Today is Amavasya until 8:55 AM.');

  // Test interpolation in Hindi
  const hiStatus = hi.hero.statusUntil.replace('{tithi}', 'अमावस्या').replace('{time}', '8:55 AM');
  assert.equal(hiStatus, 'आज अमावस्या 8:55 AM तक है।');
});
