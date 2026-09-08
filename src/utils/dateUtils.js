import { format, parseISO, isValid, addDays, subDays } from 'date-fns';

export function formatDateYMD(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'yyyy-MM-dd');
}

export function formatDateDisplay(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'MMMM d, yyyy');
}

export function formatDayOfWeek(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'EEEE');
}

export function formatShortDate(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'dd MMM yyyy');
}

export function formatMonthYear(date) {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'MMMM yyyy');
}

export function formatTime24to12(timeStr) {
  if (!timeStr || !timeStr.includes(':')) return timeStr;
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${h12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function decimalHoursToTimeString(decimalHours) {
  let normalized = ((decimalHours % 24) + 24) % 24;
  const hours = Math.floor(normalized);
  const minutes = Math.floor((normalized - hours) * 60);
  const period = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${h12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function isSameDay(d1, d2) {
  return formatDateYMD(d1) === formatDateYMD(d2);
}

export function getTodayDateString() {
  return formatDateYMD(new Date());
}

export function getNextDay(date) {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDateYMD(addDays(d, 1));
}

export function getPrevDay(date) {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDateYMD(subDays(d, 1));
}
