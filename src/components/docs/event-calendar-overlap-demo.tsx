"use client";

import {
  CalendarDate,
  CalendarDateTime,
  toZoned,
} from "@internationalized/date";
import { useState } from "react";
import {
  type CalendarEvent,
  EventCalendar,
  type EventCalendarView,
} from "@/components/ui/event-calendar";

const zone = "Europe/London";
const day = new CalendarDate(2026, 11, 24);

function at(hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, 24, hour, minute), zone);
}

const events: CalendarEvent[] = [
  {
    id: "design-review",
    title: "Design review",
    start: at(9),
    end: at(10),
    color: "chart-2",
  },
  {
    id: "critique",
    title: "Studio critique",
    start: at(9, 30),
    end: at(10, 30),
    color: "chart-3",
  },
  {
    id: "planning",
    title: "Sprint planning",
    start: at(13),
    end: at(14),
    color: "chart-4",
  },
  {
    id: "readout",
    title: "Research readout",
    start: at(13),
    end: at(14),
    color: "chart-5",
  },
  {
    id: "handoff",
    title: "Handoff with Sam",
    start: at(13, 30),
    end: at(14, 30),
    color: "chart-2",
  },
  {
    id: "lunch",
    title: "Lunch with Maya",
    start: at(16),
    end: at(16, 45),
  },
];

export function EventCalendarOverlapDemo() {
  const [view, setView] = useState<EventCalendarView>("day");
  return (
    <EventCalendar
      aria-label="Overlapping day"
      view={view}
      onViewChange={setView}
      events={events}
      defaultDate={day}
      timeZone={zone}
      scrollToHour={8}
      className="max-w-3xl"
    />
  );
}
