"use client";

import {
  CalendarDate,
  CalendarDateTime,
  toZoned,
} from "@internationalized/date";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import {
  type CalendarEvent,
  EventCalendar,
  type EventCalendarView,
} from "@/components/ui/event-calendar";

const zone = "Europe/London";
const day = new CalendarDate(2026, 11, 25);

function at(hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, 25, hour, minute), zone);
}

const people: Record<string, string> = {
  "design-review": "Maya Chen",
  handoff: "Ruth Okafor",
  critique: "Sam Rivera",
  workshop: "Noah Williams",
};

const events: CalendarEvent[] = [
  {
    id: "design-review",
    title: "Design review",
    label: "Design review with Maya Chen",
    start: at(10),
    end: at(11),
    color: "chart-2",
  },
  {
    id: "handoff",
    title: "Handoff",
    label: "Handoff with Ruth Okafor",
    start: at(12),
    end: at(13),
    color: "chart-3",
  },
  {
    id: "critique",
    title: "Studio critique",
    label: "Studio critique with Sam Rivera",
    start: at(14),
    end: at(15, 30),
    color: "chart-4",
  },
  {
    id: "workshop",
    title: "Roadmap workshop",
    label: "Roadmap workshop with Noah Williams",
    start: at(16),
    end: at(17),
    color: "chart-5",
  },
];

export function EventCalendarCustomDemo() {
  const [view, setView] = useState<EventCalendarView>("day");
  return (
    <EventCalendar
      aria-label="Day with owners"
      view={view}
      onViewChange={setView}
      events={events}
      defaultDate={day}
      timeZone={zone}
      scrollToHour={9}
      renderEvent={(event) => (
        <span className="flex items-center gap-2">
          <Avatar name={people[event.id] ?? event.title} size="xs" />
          <span className="min-w-0">
            <span className="block truncate font-medium">{event.title} </span>
            <span className="block truncate text-muted-foreground">
              {people[event.id]}
            </span>
          </span>
        </span>
      )}
      className="max-w-3xl"
    />
  );
}
