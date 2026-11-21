import {
  CalendarDate,
  CalendarDateTime,
  toZoned,
  type ZonedDateTime,
} from "@internationalized/date";
import type { EventCalendarColor } from "@/components/ui/event-calendar";

export const timeZone = "America/New_York";
export const todayDate = new CalendarDate(2026, 10, 28);
export const currentUser = "Priya Nair";

export type CalendarId = "product" | "design" | "customers" | "time-off";

export const calendars: {
  id: CalendarId;
  name: string;
  color: EventCalendarColor;
}[] = [
  { id: "product", name: "Product", color: "chart-2" },
  { id: "design", name: "Design", color: "chart-3" },
  { id: "customers", name: "Customer calls", color: "chart-4" },
  { id: "time-off", name: "Time off", color: "default" },
];

export const people = [
  "Priya Nair",
  "Jonah Weiss",
  "Ada Mensah",
  "Tomás Ortega",
  "Lena Fischer",
  "Kenji Mori",
];

export interface TeamEvent {
  id: string;
  title: string;
  calendar: CalendarId;
  start: ZonedDateTime;
  end: ZonedDateTime;
  location: string;
  guests: string[];
  isReadOnly?: boolean;
}

function at(month: number, day: number, hour: number, minute = 0) {
  return toZoned(
    new CalendarDateTime(2026, month, day, hour, minute),
    timeZone,
  );
}

function event(
  id: string,
  title: string,
  calendar: CalendarId,
  [month, day]: [number, number],
  [startHour, startMinute]: [number, number],
  [endHour, endMinute]: [number, number],
  location: string,
  guests: string[],
  isReadOnly?: boolean,
): TeamEvent {
  return {
    id,
    title,
    calendar,
    start: at(month, day, startHour, startMinute),
    end: at(month, day, endHour, endMinute),
    location,
    guests,
    isReadOnly,
  };
}

const team = ["Priya Nair", "Jonah Weiss", "Ada Mensah", "Tomás Ortega"];

const standupDays: [number, number][] = [
  [10, 19],
  [10, 20],
  [10, 21],
  [10, 22],
  [10, 23],
  [10, 26],
  [10, 27],
  [10, 28],
  [10, 29],
  [10, 30],
  [11, 2],
  [11, 3],
  [11, 4],
  [11, 5],
  [11, 6],
];

export const initialEvents: TeamEvent[] = [
  ...standupDays.map(([month, day]) =>
    event(
      `standup-${month}-${day}`,
      "Standup",
      "product",
      [month, day],
      [9, 30],
      [9, 45],
      "Video call",
      team,
    ),
  ),
  event(
    "quarterly-planning",
    "Q1 planning",
    "product",
    [10, 22],
    [13, 0],
    [15, 0],
    "Room 4B",
    [...team, "Kenji Mori"],
  ),
  event(
    "critique-oct-21",
    "Design critique",
    "design",
    [10, 21],
    [10, 0],
    [11, 0],
    "Room 2A",
    ["Ada Mensah", "Lena Fischer", "Priya Nair"],
  ),
  event(
    "sprint-planning",
    "Sprint planning",
    "product",
    [10, 26],
    [11, 0],
    [12, 0],
    "Room 4B",
    team,
  ),
  event(
    "fernhill",
    "Fernhill Dental call",
    "customers",
    [10, 26],
    [14, 0],
    [14, 45],
    "Video call",
    ["Priya Nair", "Kenji Mori"],
  ),
  event(
    "critique-oct-27",
    "Design critique",
    "design",
    [10, 27],
    [10, 0],
    [11, 30],
    "Room 2A",
    ["Ada Mensah", "Lena Fischer", "Priya Nair"],
  ),
  event(
    "one-on-one",
    "1:1 with Jonah",
    "product",
    [10, 27],
    [13, 0],
    [13, 30],
    "Video call",
    ["Priya Nair", "Jonah Weiss"],
  ),
  event(
    "bluepeak-onboarding",
    "Bluepeak onboarding",
    "customers",
    [10, 27],
    [15, 0],
    [16, 0],
    "Video call",
    ["Priya Nair", "Kenji Mori", "Tomás Ortega"],
  ),
  event(
    "roadmap-review",
    "Roadmap review",
    "product",
    [10, 28],
    [10, 0],
    [11, 0],
    "Room 4B",
    [...team, "Kenji Mori"],
  ),
  event(
    "lunch-learn",
    "Accessibility lunch",
    "design",
    [10, 28],
    [12, 0],
    [13, 0],
    "Kitchen",
    people,
  ),
  event(
    "orchard-renewal",
    "Orchard Health renewal",
    "customers",
    [10, 28],
    [14, 30],
    [15, 15],
    "Video call",
    ["Priya Nair", "Kenji Mori"],
  ),
  event(
    "lena-out",
    "Lena away",
    "time-off",
    [10, 30],
    [12, 0],
    [14, 30],
    "",
    ["Lena Fischer"],
    true,
  ),
  event(
    "usability",
    "Usability sessions",
    "design",
    [10, 29],
    [11, 0],
    [12, 30],
    "Research lab",
    ["Ada Mensah", "Priya Nair"],
  ),
  event(
    "pricing-review",
    "Pricing page review",
    "product",
    [10, 29],
    [14, 0],
    [15, 0],
    "Room 4B",
    ["Priya Nair", "Jonah Weiss", "Kenji Mori"],
  ),
  event(
    "demo-prep",
    "Demo prep",
    "customers",
    [10, 30],
    [10, 0],
    [10, 45],
    "Video call",
    ["Priya Nair", "Tomás Ortega"],
  ),
  event(
    "sprint-demo",
    "Sprint demo",
    "product",
    [10, 30],
    [15, 0],
    [16, 0],
    "Room 4B",
    people,
  ),
  event(
    "bluepeak-kickoff",
    "Bluepeak rollout kickoff",
    "customers",
    [11, 3],
    [11, 0],
    [12, 0],
    "Video call",
    ["Priya Nair", "Kenji Mori", "Tomás Ortega"],
  ),
  event(
    "critique-nov-4",
    "Design critique",
    "design",
    [11, 4],
    [10, 0],
    [11, 0],
    "Room 2A",
    ["Ada Mensah", "Lena Fischer", "Priya Nair"],
  ),
];
