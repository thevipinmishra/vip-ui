import type { CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";

export const host = {
  name: "Iris Bell",
  role: "Product strategist",
  company: "Arbor",
  email: "iris@arbor.studio",
};

export const meeting = {
  title: "Intro call",
  duration: 30,
  location: "Google Meet",
  description:
    "A short call about your design system, your team, and the next step.",
};

const blockedDays = new Set([
  "2026-10-08",
  "2026-10-14",
  "2026-10-21",
  "2026-10-27",
]);

const baseSlots = [
  "09:00",
  "09:30",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "15:00",
  "15:30",
];

const reducedSlots: Record<string, string[]> = {
  "2026-10-13": ["09:00", "10:30", "11:00", "13:00", "13:30", "15:00"],
  "2026-10-15": ["09:00", "09:30", "10:30", "11:00", "13:30", "15:00", "15:30"],
  "2026-10-20": ["09:30", "10:30", "11:00", "13:00", "15:00", "15:30"],
  "2026-10-23": ["09:00", "09:30", "10:30", "11:00", "13:00", "13:30", "15:00"],
};

export const timeZones = [
  { id: "europe-london", name: "London", description: "GMT+01:00", offset: 1 },
  { id: "europe-berlin", name: "Berlin", description: "GMT+02:00", offset: 2 },
  {
    id: "america-new-york",
    name: "New York",
    description: "GMT−04:00",
    offset: -4,
  },
  {
    id: "america-los-angeles",
    name: "Los Angeles",
    description: "GMT−07:00",
    offset: -7,
  },
  { id: "asia-tokyo", name: "Tokyo", description: "GMT+09:00", offset: 9 },
  {
    id: "australia-sydney",
    name: "Sydney",
    description: "GMT+11:00",
    offset: 11,
  },
];

export function isUnavailable(date: DateValue) {
  if (date.year !== 2026 || date.month !== 10) return true;
  const weekday = date.toDate("UTC").getUTCDay();
  if (weekday === 0 || weekday === 6) return true;
  return blockedDays.has(date.toString());
}

export function slotsFor(date: CalendarDate | null) {
  if (!date) return [];
  const reduced = reducedSlots[date.toString()];
  if (reduced) return reduced;
  return baseSlots;
}

function formatClock(minutes: number) {
  const total = ((minutes % 1440) + 1440) % 1440;
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  const suffix = hour < 12 ? "AM" : "PM";
  const shown = hour % 12 === 0 ? 12 : hour % 12;
  return `${shown}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function slotLabel(time: string, offset: number) {
  const [hour, minute] = time.split(":").map(Number);
  return formatClock(hour * 60 + minute + (offset - 1) * 60);
}

export function formatDate(date: CalendarDate) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date.toDate("UTC"));
}

export function shortDate(date: CalendarDate) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date.toDate("UTC"));
}

export function calendarFile(
  date: CalendarDate,
  time: string,
  name: string,
  email: string,
) {
  const [hour, minute] = time.split(":").map(Number);
  const start = new Date(
    Date.UTC(date.year, date.month - 1, date.day, hour - 1, minute),
  );
  const end = new Date(start.getTime() + meeting.duration * 60_000);
  const stamp = (value: Date) =>
    value
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replace(".000", "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arbor//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${date.toString()}-${time.replace(":", "")}@arbor.studio`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${meeting.title} with ${host.name}`,
    `DESCRIPTION:${meeting.description}`,
    `LOCATION:${meeting.location}`,
    `ATTENDEE;CN=${name}:mailto:${email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
