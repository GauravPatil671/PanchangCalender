import test from 'node:test';
import assert from 'node:assert/strict';
import en from './locales/en.js';
import hi from './locales/hi.js';

test('1. Localization Dictionary Parity and Integrity', (t) => {
  assert.ok(en.nav && hi.nav, 'Navigation dictionaries exist in both locales');
  assert.ok(en.hero && hi.hero, 'Hero dictionaries exist in both locales');
  assert.ok(en.cards && hi.cards, 'Decision cards dictionaries exist in both locales');
  assert.ok(en.accordions && hi.accordions, 'Accordions dictionaries exist in both locales');
  assert.ok(en.footer && hi.footer, 'Footer dictionaries exist in both locales');

  // Verify key parity in nav
  Object.keys(en.nav).forEach((k) => {
    assert.ok(hi.nav[k] !== undefined, `Hindi nav has key: ${k}`);
  });

  // Verify key parity in hero
  Object.keys(en.hero).forEach((k) => {
    assert.ok(hi.hero[k] !== undefined, `Hindi hero has key: ${k}`);
  });

  // Verify key parity in cards
  Object.keys(en.cards).forEach((k) => {
    assert.ok(hi.cards[k] !== undefined, `Hindi cards has key: ${k}`);
  });

  // Verify key parity in accordions
  Object.keys(en.accordions).forEach((k) => {
    assert.ok(hi.accordions[k] !== undefined, `Hindi accordions has key: ${k}`);
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
