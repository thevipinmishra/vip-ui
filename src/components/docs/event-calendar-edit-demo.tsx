"use client";

import {
  CalendarDate,
  CalendarDateTime,
  toZoned,
} from "@internationalized/date";
import { useState } from "react";
import {
  type CalendarEvent,
  type CalendarEventRange,
  EventCalendar,
} from "@/components/ui/event-calendar";

const zone = "Europe/London";

function at(day: number, hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, day, hour, minute), zone);
}

const initial: CalendarEvent[] = [
  {
    id: "design-review",
    title: "Design review",
    start: at(24, 10),
    end: at(24, 11),
    color: "chart-2",
  },
  {
    id: "sam",
    title: "1:1 with Sam",
    start: at(24, 13),
    end: at(24, 13, 30),
    color: "chart-4",
  },
  {
    id: "workshop",
    title: "Roadmap workshop",
    start: at(25, 9),
    end: at(25, 10, 30),
    color: "chart-5",
  },
  {
    id: "readout",
    title: "Research readout",
    start: at(26, 15),
    end: at(26, 16),
    color: "chart-3",
    isReadOnly: true,
  },
];

export function EventCalendarEditDemo() {
  const [events, setEvents] = useState(initial);
  function update(event: CalendarEvent, range: CalendarEventRange) {
    setEvents((current) =>
      current.map((item) =>
        item.id === event.id ? { ...item, ...range } : item,
      ),
    );
  }
  return (
    <EventCalendar
      aria-label="Editable week"
      events={events}
      onEventChange={update}
      defaultDate={new CalendarDate(2026, 11, 25)}
      timeZone={zone}
      className="max-w-4xl"
    />
  );
}
