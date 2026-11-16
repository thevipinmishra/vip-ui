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
  {
    id: "planning",
    title: "Morning planning",
    start: at(23, 9),
    end: at(23, 9, 30),
    color: "chart-2",
  },
  {
    id: "critique",
    title: "Studio critique",
    start: at(24, 10),
    end: at(24, 11, 30),
    color: "chart-3",
  },
  {
    id: "sam",
    title: "1:1 with Sam",
    start: at(24, 16),
    end: at(24, 16, 30),
    color: "chart-4",
  },
  {
    id: "review",
    title: "Sprint review",
    start: at(26, 14),
    end: at(26, 15),
    color: "chart-5",
  },
];

export function EventCalendarHoursDemo() {
  return (
    <EventCalendar
      aria-label="Working hours"
      events={events}
      defaultDate={new CalendarDate(2026, 11, 25)}
      timeZone={zone}
      dayStart={8}
      dayEnd={18}
      scrollToHour={8}
      className="max-w-4xl"
    />
  );
}
