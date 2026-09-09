/**
 * Coordinate and Astronomical Math Utilities
 * Handles Julian Date calculations, ecliptic to 3D Cartesian coordinates,
 * Sidereal time for Earth rotation, and angle normalization.
 */

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const AU_IN_KM = 149597870.7; // 1 Astronomical Unit in km
export const MOON_DISTANCE_KM = 384400; // Average Earth-Moon distance in km
export const EARTH_OBLIQUITY_DEG = 23.439281; // Earth's axial tilt in degrees

/**
 * Normalizes an angle into [0, 360) degrees
 */
export function normalizeDegrees(deg) {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Normalizes an angle into [-180, 180) degrees
 */
export function normalizeAngle180(deg) {
  let d = normalizeDegrees(deg);
  if (d > 180) d -= 360;
  return d;
}

/**
 * Converts a Date object or ISO string to Julian Date (JD)
 */
export function getJulianDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  const time = d.getTime();
  // Unix epoch (1970-01-01T00:00:00Z) corresponds to JD 2440587.5
  return (time / 86400000) + 2440587.5;
}

/**
 * Julian Centuries from J2000.0 (JD 2451545.0)
 */
export function getJulianCenturies(date) {
  const jd = getJulianDate(date);
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Days since J2000.0 (JD 2451545.0)
 */
export function getDaysSinceJ2000(date) {
  const jd = getJulianDate(date);
  return jd - 2451545.0;
}

/**
 * Converts Ecliptic Coordinates (longitude, latitude, distance) to 3D Cartesian Coordinates
 * In our 3D space:
 * X = along the Vernal Equinox (0° Ecliptic Longitude)
 * Z = 90° Ecliptic Longitude
 * Y = perpendicular to the Ecliptic Plane (North Ecliptic Pole)
 */
export function eclipticToCartesian(longitudeDeg, latitudeDeg = 0, radius = 1) {
  const lonRad = longitudeDeg * DEG_TO_RAD;
  const latRad = latitudeDeg * DEG_TO_RAD;

  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const z = radius * Math.cos(latRad) * Math.sin(lonRad);
  const y = radius * Math.sin(latRad);

  return { x, y, z };
}

/**
 * Calculates Greenwich Mean Sidereal Time (GMST) in radians for Earth's axial rotation
 */
export function getGreenwichSiderealTime(date) {
  const d = date instanceof Date ? date : new Date(date);
  const jd = getJulianDate(d);
  const dSinceJ2000 = jd - 2451545.0;

  // GMST in degrees at 0h UT + rotation
  // GMST = 280.46061837 + 360.98564736629 * d
  const gmstDeg = normalizeDegrees(280.46061837 + 360.98564736629 * dSinceJ2000);
  return gmstDeg * DEG_TO_RAD;
}
