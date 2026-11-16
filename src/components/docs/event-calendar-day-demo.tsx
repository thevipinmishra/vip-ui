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
const day = new CalendarDate(2026, 11, 25);

function at(hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, 25, hour, minute), zone);
}

const events: CalendarEvent[] = [
  {
    id: "planning",
    title: "Morning planning",
    start: at(9),
    end: at(9, 30),
    color: "chart-2",
  },
  {
    id: "critique",
    title: "Studio critique",
    start: at(10),
    end: at(11, 30),
    color: "chart-3",
  },
  {
    id: "focus",
    title: "Focus block",
    start: at(13),
    end: at(15),
    color: "chart-4",
  },
  {
    id: "handoff",
    title: "Handoff with Sam",
    start: at(16),
    end: at(16, 45),
    color: "chart-5",
  },
];

export function EventCalendarDayDemo() {
  return (
    <EventCalendar
      aria-label="Studio schedule"
      defaultView="day"
      events={events}
      defaultDate={day}
      timeZone={zone}
      scrollToHour={8}
      className="max-w-xl"
    />
  );
}
