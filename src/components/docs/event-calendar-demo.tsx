"use client";

import {
  CalendarDate,
  CalendarDateTime,
  toZoned,
} from "@internationalized/date";
import {
  type CalendarEvent,
  EventCalendar,
} from "@/components/ui/event-calendar";

const zone = "Europe/London";

function at(day: number, hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, day, hour, minute), zone);
}

const events: CalendarEvent[] = [
  { id: "stand-up", title: "Stand-up", start: at(23, 9), end: at(23, 9, 30) },
  {
    id: "design-review",
    title: "Design review",
    start: at(23, 10),
    end: at(23, 11),
    color: "chart-2",
  },
  {
    id: "lunch",
    title: "Team lunch",
    start: at(23, 12),
    end: at(23, 13),
    color: "chart-3",
  },
  {
    id: "sam",
    title: "1:1 with Sam",
    start: at(24, 9, 30),
    end: at(24, 10),
    color: "chart-4",
  },
  {
    id: "roadmap",
    title: "Roadmap workshop",
    start: at(24, 14),
    end: at(24, 15, 30),
    color: "chart-5",
  },
  {
    id: "sprint-review",
    title: "Sprint review",
    start: at(25, 11),
    end: at(25, 12),
    color: "chart-2",
  },
  {
    id: "critique",
    title: "Studio critique",
    start: at(26, 10),
    end: at(26, 11, 30),
    color: "chart-3",
  },
  {
    id: "hiring",
    title: "Hiring panel",
    start: at(27, 14),
    end: at(27, 15),
    color: "chart-4",
  },
];

export function EventCalendarDemo() {
  return (
    <EventCalendar
      aria-label="Studio week"
      events={events}
      defaultDate={new CalendarDate(2026, 11, 25)}
      timeZone={zone}
      className="max-w-4xl"
    />
  );
}
