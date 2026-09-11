import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createEarthDayTexture,
  createEarthCloudTexture,
  createMoonTexture,
  createSunTexture,
  createCoronaTexture
} from '../../astronomy/textureGenerators';
import { eclipticToCartesian, getGreenwichSiderealTime, EARTH_OBLIQUITY_DEG, DEG_TO_RAD } from '../../astronomy/coordinateConversions';

export default function SolarSystemCanvas({
  simulationDate,
  solarData,
  lunarData,
  tithiData,
  scaleMode = 'educational',
  showOrbits = true,
  showAngleArc = true,
  showLabels = true,
  showAxis = true,
  cameraPreset = 'isometric',
  onSelectObject,
  selectedObject,
  onError
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const objectsRef = useRef({});
  const animFrameRef = useRef(null);
  
  // Smooth Camera Vectors & Spherical Controls
  const sphericalRef = useRef(new THREE.Spherical(210, Math.PI / 3, Math.PI / 4));
  const targetSphericalRef = useRef(new THREE.Spherical(210, Math.PI / 3, Math.PI / 4));
  const currentCamLookRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamLookRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPosRef = useRef(new THREE.Vector3(130, 90, 160));

  // Scale parameters based on scaleMode
  const getScaleParams = (mode) => {
    switch (mode) {
      case 'balanced':
        return {
          sunRadius: 18,
          earthOrbitR: 150,
          earthRadius: 5.5,
          moonOrbitR: 26,
          moonRadius: 2.2
        };
      case 'realistic_ratio':
        return {
          sunRadius: 22,
          earthOrbitR: 220,
          earthRadius: 4.5,
          moonOrbitR: 18,
          moonRadius: 1.5
        };
      case 'closeup_earth_moon':
        return {
          sunRadius: 25,
          earthOrbitR: 120,
          earthRadius: 8.5,
          moonOrbitR: 35,
          moonRadius: 3.2
        };
      case 'educational':
      default:
        return {
          sunRadius: 16,
          earthOrbitR: 100,
          earthRadius: 6.2,
          moonOrbitR: 22,
          moonRadius: 2.5
        };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    try {
      // Check WebGL support before attempting to create renderer
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        container.innerHTML = '<div class="flex items-center justify-center h-full text-stone-400 text-sm p-4">WebGL is required to render the 3D celestial simulation.</div>';
        return;
      }
    } catch (e) {
      container.innerHTML = '<div class="flex items-center justify-center h-full text-stone-400 text-sm p-4">Unable to initialize WebGL 3D context.</div>';
      return;
    }

    const width = container.clientWidth || window.innerWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 4000);
    camera.position.set(130, 90, 160);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 2. WebGL Renderer with adaptive pixel ratio for mobile performance
    const isMobile = width < 768 || (typeof window !== 'undefined' && window.innerWidth < 768);
    const maxPixelRatio = isMobile ? 1.5 : 2;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // antialias on desktop, boost FPS on mobile
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.touchAction = 'none'; // prevent mobile scroll hijacking
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Deep Space Starfield
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 800 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorType = Math.random();
      if (colorType > 0.8) {
        starColors[i * 3] = 0.75; starColors[i * 3 + 1] = 0.85; starColors[i * 3 + 2] = 1.0;
      } else if (colorType > 0.4) {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 0.85;
      } else {
        starColors[i * 3] = 1.0; starColors[i * 3 + 1] = 0.75; starColors[i * 3 + 2] = 0.55;
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 4. Lighting
    const sunLight = new THREE.PointLight(0xfff8ee, 4.0, 0, 0.0);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x22263a, 1.2);
    scene.add(ambientLight);

    // 5. Build Celestial Bodies with Cached Textures
    const sunTexture = createSunTexture();
    const coronaTexture = createCoronaTexture();
    const earthDayTexture = createEarthDayTexture();
    const earthCloudTexture = createEarthCloudTexture();
    const moonTexture = createMoonTexture();

    // --- SUN ---
    const scale = getScaleParams(scaleMode);
    const sunGeo = new THREE.SphereGeometry(scale.sunRadius, 36, 36);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
      color: 0xfff0aa
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.name = 'Sun';
    scene.add(sunMesh);

    // Sun Corona Sprite
    const coronaMat = new THREE.SpriteMaterial({
      map: coronaTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9
    });
    const coronaSprite = new THREE.Sprite(coronaMat);
    coronaSprite.scale.set(scale.sunRadius * 4.2, scale.sunRadius * 4.2, 1);
    scene.add(coronaSprite);

    // --- EARTH ROOT GROUP ---
    const earthGroup = new THREE.Group();
    earthGroup.name = 'EarthSystem';
    scene.add(earthGroup);

    // Earth Axial Tilt Pivot (tilted by 23.44°)
    const earthTiltGroup = new THREE.Group();
    earthTiltGroup.rotation.z = -EARTH_OBLIQUITY_DEG * DEG_TO_RAD;
    earthGroup.add(earthTiltGroup);

    // Earth Day & Surface Mesh
    const earthGeo = new THREE.SphereGeometry(scale.earthRadius, 36, 36);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthDayTexture,
      roughness: 0.6,
      metalness: 0.1
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthMesh.name = 'Earth';
    earthTiltGroup.add(earthMesh);

    // Earth Clouds Mesh
    const cloudGeo = new THREE.SphereGeometry(scale.earthRadius * 1.02, 36, 36);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: earthCloudTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthTiltGroup.add(cloudMesh);

    // Earth Atmosphere Rim / Glow
    const atmosGeo = new THREE.SphereGeometry(scale.earthRadius * 1.05, 24, 24);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4da6ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    earthTiltGroup.add(atmosMesh);

    // Earth Rotation Axis Line
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -scale.earthRadius * 1.8, 0),
      new THREE.Vector3(0, scale.earthRadius * 1.8, 0)
    ]);
    const axisMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const axisLine = new THREE.Line(axisGeo, axisMat);
    earthTiltGroup.add(axisLine);

    // --- MOON ---
    const moonGroup = new THREE.Group();
    moonGroup.name = 'MoonSystem';
    earthGroup.add(moonGroup);

    const moonGeo = new THREE.SphereGeometry(scale.moonRadius, 28, 28);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.name = 'Moon';
    moonGroup.add(moonMesh);

    // --- ORBIT LINES & VISUAL GUIDES ---
    const earthOrbitPoints = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const pt = eclipticToCartesian(angle * (180 / Math.PI), 0, scale.earthOrbitR);
      earthOrbitPoints.push(new THREE.Vector3(pt.x, pt.y, pt.z));
    }
    const earthOrbitGeo = new THREE.BufferGeometry().setFromPoints(earthOrbitPoints);
    const earthOrbitMat = new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.45 });
    const earthOrbitLine = new THREE.Line(earthOrbitGeo, earthOrbitMat);
    scene.add(earthOrbitLine);

    // Moon Orbit Ellipse (tilted at 5.145°)
    const moonOrbitPoints = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const pt = eclipticToCartesian(angle * (180 / Math.PI), 5.145 * Math.sin(angle), scale.moonOrbitR);
      moonOrbitPoints.push(new THREE.Vector3(pt.x, pt.y, pt.z));
    }
    const moonOrbitGeo = new THREE.BufferGeometry().setFromPoints(moonOrbitPoints);
    const moonOrbitMat = new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.5 });
    const moonOrbitLine = new THREE.Line(moonOrbitGeo, moonOrbitMat);
    earthGroup.add(moonOrbitLine);

    // Sun-Earth Ray & Earth-Moon Ray
    const sunEarthRayGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
    const sunEarthRayMat = new THREE.LineDashedMaterial({ color: 0xf59e0b, dashSize: 3, gapSize: 2, transparent: true, opacity: 0.6 });
    const sunEarthRay = new THREE.Line(sunEarthRayGeo, sunEarthRayMat);
    sunEarthRay.computeLineDistances();
    scene.add(sunEarthRay);

    const earthMoonRayGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
    const earthMoonRayMat = new THREE.LineBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.8 });
    const earthMoonRay = new THREE.Line(earthMoonRayGeo, earthMoonRayMat);
    scene.add(earthMoonRay);

    // Angular Separation Arc
    const angleArcGeo = new THREE.BufferGeometry();
    const angleArcMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2, transparent: true, opacity: 0.85 });
    const angleArcLine = new THREE.Line(angleArcGeo, angleArcMat);
    earthGroup.add(angleArcLine);

    // Initial position setup if solar/lunar data exists
    if (solarData && lunarData) {
      const initEarthPos = eclipticToCartesian(solarData.earthHeliocentricLongitude, 0, scale.earthOrbitR * (solarData.distanceAU || 1));
      earthGroup.position.set(initEarthPos.x, initEarthPos.y, initEarthPos.z);

      const moonPos = eclipticToCartesian(lunarData.longitude, lunarData.latitude, scale.moonOrbitR);
      moonGroup.position.set(moonPos.x, moonPos.y, moonPos.z);
    }

    // Store references
    objectsRef.current = {
      sunMesh,
      coronaSprite,
      earthGroup,
      earthTiltGroup,
      earthMesh,
      cloudMesh,
      atmosMesh,
      axisLine,
      moonGroup,
      moonMesh,
      earthOrbitLine,
      moonOrbitLine,
      sunEarthRay,
      earthMoonRay,
      angleArcLine
    };

    // 6. Smooth Inertial Orbit Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      if (e.button === 0) {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      prevMousePos = { x: e.clientX, y: e.clientY };

      targetSphericalRef.current.theta -= deltaX * 0.005;
      targetSphericalRef.current.phi = Math.max(0.05, Math.min(Math.PI - 0.05, targetSphericalRef.current.phi - deltaY * 0.005));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetSphericalRef.current.radius = Math.max(25, Math.min(800, targetSphericalRef.current.radius + e.deltaY * 0.15));
    };

    // Raycasting for clicking celestial bodies
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX);
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0]?.clientY);
      if (clientX === undefined || clientY === undefined) return;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([sunMesh, earthMesh, moonMesh]);
      if (intersects.length > 0 && onSelectObject) {
        const clickedName = intersects[0].object.name;
        onSelectObject(clickedName);
      }
    };

    // Mobile Touch Controls with Smooth Inertia & Pinch Zoom
    let touchStartDist = 0;
    let prevTouchPos = { x: 0, y: 0 };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - prevTouchPos.x;
        const deltaY = e.touches[0].clientY - prevTouchPos.y;
        prevTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        targetSphericalRef.current.theta -= deltaX * 0.007;
        targetSphericalRef.current.phi = Math.max(0.05, Math.min(Math.PI - 0.05, targetSphericalRef.current.phi - deltaY * 0.007));
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        if (touchStartDist > 0 && dist > 0) {
          const delta = touchStartDist - dist;
          targetSphericalRef.current.radius = Math.max(25, Math.min(800, targetSphericalRef.current.radius + delta * 0.4));
          touchStartDist = dist;
        }
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length === 1) {
        // Transition back to 1-finger drag without jump
        isDragging = true;
        prevTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchStartDist = 0;
      } else {
        isDragging = false;
        touchStartDist = 0;
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });
    domEl.addEventListener('click', onClick);

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    domEl.addEventListener('touchmove', onTouchMove, { passive: true });
    domEl.addEventListener('touchend', onTouchEnd, { passive: true });

    // ResizeObserver for reliable dimension handling
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || window.innerWidth || 800;
      const h = container.clientHeight || 500;
      if (w > 0 && h > 0) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h, false);
      }
    });
    resizeObserver.observe(container);

    // 7. Butter-Smooth Animation Render Loop with Inertia Damping
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (cloudMesh) cloudMesh.rotation.y += 0.0006;
      if (sunMesh) sunMesh.rotation.y += 0.0002;

      // Track focus target if in Earth or Moon view
      const objs = objectsRef.current;
      if (cameraPreset === 'earth' && objs.earthGroup) {
        targetCamLookRef.current.copy(objs.earthGroup.position);
      } else if (cameraPreset === 'moon' && objs.moonGroup) {
        objs.moonGroup.getWorldPosition(targetCamLookRef.current);
      }

      // Inertia interpolation for spherical coordinates
      sphericalRef.current.theta += (targetSphericalRef.current.theta - sphericalRef.current.theta) * 0.09;
      sphericalRef.current.phi += (targetSphericalRef.current.phi - sphericalRef.current.phi) * 0.09;
      sphericalRef.current.radius += (targetSphericalRef.current.radius - sphericalRef.current.radius) * 0.09;

      // Calculate camera position from spherical offset around look target
      currentCamLookRef.current.lerp(targetCamLookRef.current, 0.08);
      targetCamPosRef.current.setFromSpherical(sphericalRef.current).add(currentCamLookRef.current);

      camera.position.lerp(targetCamPosRef.current, 0.08);
      camera.lookAt(currentCamLookRef.current);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('mousedown', onMouseDown);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('click', onClick);
      domEl.removeEventListener('touchstart', onTouchStart);
      domEl.removeEventListener('touchmove', onTouchMove);
      domEl.removeEventListener('touchend', onTouchEnd);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scaleMode]);

  // Update Positions & Geometry when simulationDate or data changes
  useEffect(() => {
    const objs = objectsRef.current;
    if (!objs.earthGroup || !solarData || !lunarData) return;

    const scale = getScaleParams(scaleMode);

    // 1. Earth Position along Ecliptic Orbit around Sun
    const earthPos = eclipticToCartesian(solarData.earthHeliocentricLongitude, 0, scale.earthOrbitR * (solarData.distanceAU || 1));
    objs.earthGroup.position.set(earthPos.x, earthPos.y, earthPos.z);

    // 2. Earth Axial Rotation (Sidereal Time)
    const gmstRad = getGreenwichSiderealTime(simulationDate);
    if (objs.earthMesh) {
      objs.earthMesh.rotation.y = gmstRad;
    }

    // 3. Moon Position relative to Earth
    const moonDistFactor = (lunarData.distanceKm || 384400) / 384400;
    const moonPos = eclipticToCartesian(
      lunarData.longitude,
      lunarData.latitude,
      scale.moonOrbitR * moonDistFactor
    );
    objs.moonGroup.position.set(moonPos.x, moonPos.y, moonPos.z);

    if (objs.moonMesh) {
      objs.moonMesh.rotation.y = (lunarData.longitude * DEG_TO_RAD) + Math.PI;
    }

    // 4. Update Visual Guides & Rays
    if (objs.sunEarthRay) {
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(earthPos.x, earthPos.y, earthPos.z)];
      objs.sunEarthRay.geometry.setFromPoints(pts);
      objs.sunEarthRay.computeLineDistances();
    }

    if (objs.earthMoonRay) {
      const earthWorld = new THREE.Vector3(earthPos.x, earthPos.y, earthPos.z);
      const moonWorld = new THREE.Vector3(earthPos.x + moonPos.x, earthPos.y + moonPos.y, earthPos.z + moonPos.z);
      objs.earthMoonRay.geometry.setFromPoints([earthWorld, moonWorld]);
    }

    // 5. Angular Separation Arc
    if (objs.angleArcLine && tithiData) {
      const arcPts = [];
      const arcRadius = scale.moonOrbitR * 0.45;
      const startAngle = (solarData.longitude + 180) * DEG_TO_RAD;
      const totalAngle = tithiData.angularSeparation * DEG_TO_RAD;
      const arcSegments = 32;

      for (let i = 0; i <= arcSegments; i++) {
        const theta = startAngle + (i / arcSegments) * totalAngle;
        arcPts.push(new THREE.Vector3(arcRadius * Math.cos(theta), 0, arcRadius * Math.sin(theta)));
      }
      objs.angleArcLine.geometry.setFromPoints(arcPts);
    }

    // 6. Visibility Toggles
    if (objs.earthOrbitLine) objs.earthOrbitLine.visible = showOrbits;
    if (objs.moonOrbitLine) objs.moonOrbitLine.visible = showOrbits;
    if (objs.axisLine) objs.axisLine.visible = showAxis;
    if (objs.sunEarthRay) objs.sunEarthRay.visible = showAngleArc;
    if (objs.earthMoonRay) objs.earthMoonRay.visible = showAngleArc;
    if (objs.angleArcLine) objs.angleArcLine.visible = showAngleArc;
  }, [simulationDate, solarData, lunarData, tithiData, scaleMode, showOrbits, showAngleArc, showAxis]);

  // Handle Camera Preset Switches
  useEffect(() => {
    const scale = getScaleParams(scaleMode);
    const objs = objectsRef.current;

    switch (cameraPreset) {
      case 'top':
        targetCamLookRef.current.set(0, 0, 0);
        targetSphericalRef.current.set(scale.earthOrbitR * 2.2, 0.01, 0);
        break;
      case 'earth':
        if (objs.earthGroup) {
          targetCamLookRef.current.copy(objs.earthGroup.position);
        }
        targetSphericalRef.current.set(scale.earthRadius * 3.8, Math.PI / 2.3, 0.4);
        break;
      case 'moon':
        if (objs.moonGroup) {
          objs.moonGroup.getWorldPosition(targetCamLookRef.current);
        }
        targetSphericalRef.current.set(scale.moonRadius * 4.5, Math.PI / 2.3, 0.4);
        break;
      case 'sun':
        targetCamLookRef.current.set(0, 0, 0);
        targetSphericalRef.current.set(scale.sunRadius * 2.8, Math.PI / 3, Math.PI / 4);
        break;
      case 'reset':
      case 'isometric':
      default:
        targetCamLookRef.current.set(0, 0, 0);
        targetSphericalRef.current.set(220, Math.PI / 3, Math.PI / 4);
        break;
    }
  }, [cameraPreset, scaleMode]);

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-stone-950 select-none">
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Floating Celestial Name Indicators (Positioned safely below controls on desktop) */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          <div className="absolute top-16 left-4 bg-stone-900/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700/50 text-[11px] text-stone-300 shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive 3D Planetarium • Drag to orbit, pinch to zoom</span>
          </div>
        </div>
      )}
    </div>
  );
}
