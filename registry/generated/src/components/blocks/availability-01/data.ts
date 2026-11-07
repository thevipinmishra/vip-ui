import { CalendarDate, Time } from "@internationalized/date";

export interface HoursRange {
  id: string;
  start: Time;
  end: Time;
}

export interface DayHours {
  id: string;
  label: string;
  short: string;
  enabled: boolean;
  ranges: HoursRange[];
}

export interface TimeOff {
  id: string;
  start: CalendarDate;
  end: CalendarDate;
  note: string;
}

export const weekDays: DayHours[] = [
  {
    id: "mon",
    label: "Monday",
    short: "Mon",
    enabled: true,
    ranges: [
      { id: "mon-1", start: new Time(9, 0), end: new Time(12, 30) },
      { id: "mon-2", start: new Time(14, 0), end: new Time(17, 30) },
    ],
  },
  {
    id: "tue",
    label: "Tuesday",
    short: "Tue",
    enabled: true,
    ranges: [
      { id: "tue-1", start: new Time(9, 0), end: new Time(12, 30) },
      { id: "tue-2", start: new Time(14, 0), end: new Time(17, 30) },
    ],
  },
  {
    id: "wed",
    label: "Wednesday",
    short: "Wed",
    enabled: true,
    ranges: [
      { id: "wed-1", start: new Time(9, 0), end: new Time(12, 30) },
      { id: "wed-2", start: new Time(14, 0), end: new Time(17, 30) },
    ],
  },
  {
    id: "thu",
    label: "Thursday",
    short: "Thu",
    enabled: true,
    ranges: [
      { id: "thu-1", start: new Time(10, 0), end: new Time(13, 0) },
      { id: "thu-2", start: new Time(14, 30), end: new Time(18, 0) },
    ],
  },
  {
    id: "fri",
    label: "Friday",
    short: "Fri",
    enabled: true,
    ranges: [{ id: "fri-1", start: new Time(9, 0), end: new Time(13, 0) }],
  },
  {
    id: "sat",
    label: "Saturday",
    short: "Sat",
    enabled: false,
    ranges: [{ id: "sat-1", start: new Time(10, 0), end: new Time(12, 0) }],
  },
  {
    id: "sun",
    label: "Sunday",
    short: "Sun",
    enabled: false,
    ranges: [{ id: "sun-1", start: new Time(10, 0), end: new Time(12, 0) }],
  },
];

export const initialTimeOff: TimeOff[] = [
  {
    id: "off-1",
    start: new CalendarDate(2026, 10, 26),
    end: new CalendarDate(2026, 10, 30),
    note: "Building works",
  },
];

export const initialBookUntil = new CalendarDate(2026, 12, 31);

export function minutesOf(time: Time) {
  return time.hour * 60 + time.minute;
}

export function durationOf(range: HoursRange) {
  return minutesOf(range.end) - minutesOf(range.start);
}

export function formatHours(minutes: number) {
  if (minutes <= 0) return "0 h";
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} h` : `${hours.toFixed(1)} h`;
}

export function formatDate(date: CalendarDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date.toDate("UTC"));
}

export function formatDateRange(start: CalendarDate, end: CalendarDate) {
  if (start.compare(end) === 0) return formatDate(start);
  if (start.year === end.year) {
    return `${formatDate(start)} – ${formatDate(end)}, ${end.year}`;
  }
  return `${formatDate(start)}, ${start.year} – ${formatDate(end)}, ${end.year}`;
}
