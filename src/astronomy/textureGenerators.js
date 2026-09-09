/**
 * High-Performance Procedural Texture Generator for Three.js
 * Generates realistic procedural textures for Earth (Day, Night lights, Clouds),
 * Moon (Craters & Maria), Sun (Solar Corona/Granulation).
 * Uses cached textures and fast math to ensure < 15ms instant generation.
 */

import * as THREE from 'three';

// Texture Cache so textures are generated only once
const textureCache = {
  earthDay: null,
  earthNight: null,
  earthCloud: null,
  moon: null,
  sun: null,
  corona: null
};

/**
 * Creates Earth Day Texture with realistic continents, oceans, and polar caps
 */
export function createEarthDayTexture(width = 1024, height = 512) {
  if (textureCache.earthDay) return textureCache.earthDay;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Deep Ocean Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0c2444');
  oceanGrad.addColorStop(0.2, '#0f3868');
  oceanGrad.addColorStop(0.5, '#134e8d');
  oceanGrad.addColorStop(0.8, '#0f3868');
  oceanGrad.addColorStop(1, '#0c2444');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw Continents using stylized organic geometric landmass paths
  // Eurasia / Africa
  ctx.fillStyle = '#2d6a4f';
  ctx.beginPath();
  // Africa
  ctx.ellipse(width * 0.52, height * 0.58, width * 0.08, height * 0.22, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Eurasia
  ctx.fillStyle = '#386641';
  ctx.beginPath();
  ctx.ellipse(width * 0.65, height * 0.32, width * 0.18, height * 0.15, -0.05, 0, Math.PI * 2);
  ctx.fill();

  // India & South Asia
  ctx.fillStyle = '#40916c';
  ctx.beginPath();
  ctx.moveTo(width * 0.68, height * 0.4);
  ctx.lineTo(width * 0.72, height * 0.56);
  ctx.lineTo(width * 0.75, height * 0.42);
  ctx.closePath();
  ctx.fill();

  // Americas (North & South)
  ctx.fillStyle = '#2d6a4f';
  ctx.beginPath();
  ctx.ellipse(width * 0.22, height * 0.32, width * 0.09, height * 0.16, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#40916c';
  ctx.beginPath();
  ctx.ellipse(width * 0.28, height * 0.68, width * 0.07, height * 0.2, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.fillStyle = '#b08968';
  ctx.beginPath();
  ctx.ellipse(width * 0.82, height * 0.72, width * 0.06, height * 0.09, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Fast procedural noise overlay for coastal detail & mountain ranges
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = ((y / height) - 0.5) * Math.PI;
    const isPole = Math.abs(lat) > 1.25;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      if (isPole) {
        // Polar Ice
        data[idx] = 235;
        data[idx + 1] = 245;
        data[idx + 2] = 255;
      } else {
        const isLand = data[idx + 1] > 90 && data[idx + 2] < 120;
        if (isLand) {
          // Add terrain shading
          const shade = ((Math.sin(x * 0.15) * Math.cos(y * 0.15) + 1) * 0.5) * 30;
          data[idx] += shade * 0.5;
          data[idx + 1] += shade * 0.8;
          data[idx + 2] += shade * 0.2;
        }
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.earthDay = texture;
  return texture;
}

/**
 * Creates Earth Night Lights Texture
 */
export function createEarthNightTexture(width = 512, height = 256) {
  if (textureCache.earthNight) return textureCache.earthNight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#020206';
  ctx.fillRect(0, 0, width, height);

  // Clusters of golden city lights across major population zones
  const cityClusters = [
    { x: 0.52, y: 0.38, r: 28, n: 60 }, // Europe
    { x: 0.72, y: 0.44, r: 35, n: 80 }, // India & South Asia
    { x: 0.80, y: 0.36, r: 35, n: 70 }, // East Asia
    { x: 0.22, y: 0.35, r: 35, n: 75 }, // North America East/West
    { x: 0.28, y: 0.68, r: 25, n: 40 }, // South America
    { x: 0.82, y: 0.72, r: 18, n: 25 }  // Australia
  ];

  cityClusters.forEach(c => {
    const cx = c.x * width;
    const cy = c.y * height;
    for (let i = 0; i < c.n; i++) {
      const px = cx + (Math.sin(i * 91.3) * c.r * (i % 2 === 0 ? 1 : 0.6));
      const py = cy + (Math.cos(i * 47.7) * (c.r * 0.6) * (i % 3 === 0 ? 1 : 0.7));
      const bright = Math.random() > 0.4 ? 'rgba(255, 215, 110, 0.9)' : 'rgba(255, 180, 70, 0.7)';
      ctx.fillStyle = bright;
      ctx.fillRect(Math.floor(px), Math.floor(py), Math.random() > 0.6 ? 2 : 1, Math.random() > 0.6 ? 2 : 1);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.earthNight = texture;
  return texture;
}

/**
 * Creates Earth Cloud Texture
 */
export function createEarthCloudTexture(width = 512, height = 256) {
  if (textureCache.earthCloud) return textureCache.earthCloud;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Draw soft cloud bands
  for (let i = 0; i < 16; i++) {
    const cy = (0.15 + (i / 16) * 0.7) * height;
    const cx = Math.random() * width;
    const rw = (0.15 + Math.random() * 0.25) * width;
    const rh = (0.04 + Math.random() * 0.08) * height;

    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, rw);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wrap around seam
    ctx.beginPath();
    ctx.ellipse(cx - width, cy, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + width, cy, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache.earthCloud = texture;
  return texture;
}

/**
 * Creates Moon Crater Texture
 */
export function createMoonTexture(width = 512, height = 256) {
  if (textureCache.moon) return textureCache.moon;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base Lunar grey
  ctx.fillStyle = '#8b8e95';
  ctx.fillRect(0, 0, width, height);

  // Large Dark Lunar Maria (Sea of Tranquility, Oceanus Procellarum, etc.)
  const maria = [
    { x: 0.35, y: 0.42, rx: 70, ry: 45 },
    { x: 0.52, y: 0.38, rx: 55, ry: 40 },
    { x: 0.65, y: 0.48, rx: 60, ry: 50 },
    { x: 0.28, y: 0.62, rx: 45, ry: 35 },
    { x: 0.58, y: 0.65, rx: 50, ry: 30 }
  ];

  maria.forEach(m => {
    const grad = ctx.createRadialGradient(m.x * width, m.y * height, 10, m.x * width, m.y * height, m.rx);
    grad.addColorStop(0, '#4b4e54');
    grad.addColorStop(0.7, '#5b5e65');
    grad.addColorStop(1, 'rgba(139, 142, 149, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(m.x * width, m.y * height, m.rx, m.ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Impact craters with highlighted rims
  for (let c = 0; c < 45; c++) {
    const cx = (Math.sin(c * 99.1) * 0.48 + 0.5) * width;
    const cy = (Math.cos(c * 43.7) * 0.45 + 0.5) * height;
    const r = 3 + (c % 5) * 3;

    ctx.fillStyle = '#3a3c40';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Bright rim
    ctx.strokeStyle = '#d0d4dc';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 0.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.moon = texture;
  return texture;
}

/**
 * Creates Sun Plasma Texture
 */
export function createSunTexture(width = 512, height = 256) {
  if (textureCache.sun) return textureCache.sun;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#ff7b00');
  grad.addColorStop(0.3, '#ffaa00');
  grad.addColorStop(0.7, '#ffd000');
  grad.addColorStop(1, '#ff6000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Solar flares / granulation spots
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 5 + Math.random() * 20;

    const fgrad = ctx.createRadialGradient(x, y, 2, x, y, r);
    fgrad.addColorStop(0, '#fff4cc');
    fgrad.addColorStop(0.4, 'rgba(255, 180, 0, 0.8)');
    fgrad.addColorStop(1, 'rgba(255, 100, 0, 0)');

    ctx.fillStyle = fgrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.sun = texture;
  return texture;
}

/**
 * Creates Glowing Sun Corona Texture
 */
export function createCoronaTexture() {
  if (textureCache.corona) return textureCache.corona;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255, 255, 240, 1)');
  grad.addColorStop(0.18, 'rgba(255, 200, 50, 0.85)');
  grad.addColorStop(0.4, 'rgba(255, 120, 20, 0.35)');
  grad.addColorStop(0.7, 'rgba(255, 60, 0, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.corona = texture;
  return texture;
}
