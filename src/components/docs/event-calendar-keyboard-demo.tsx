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
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";

const zone = "Europe/London";

function at(day: number, hour: number, minute = 0) {
  return toZoned(new CalendarDateTime(2026, 11, day, hour, minute), zone);
}

const initial: CalendarEvent[] = [
  {
    id: "critique",
    title: "Studio critique",
    start: at(24, 10),
    end: at(24, 11),
    color: "chart-2",
  },
  {
    id: "sam",
    title: "1:1 with Sam",
    start: at(25, 13),
    end: at(25, 13, 30),
    color: "chart-4",
  },
  {
    id: "readout",
    title: "Research readout",
    start: at(26, 15),
    end: at(26, 16),
    color: "chart-3",
  },
];

const shortcuts = [
  [["Alt", "Up"], "Move 15 minutes earlier"],
  [["Alt", "Down"], "Move 15 minutes later"],
  [["Alt", "Left"], "Move one day earlier"],
  [["Alt", "Right"], "Move one day later"],
  [["Alt", "Shift", "Down"], "End 15 minutes later"],
  [["Alt", "Shift", "Up"], "End 15 minutes earlier"],
] as const;

export function EventCalendarKeyboardDemo() {
  const [events, setEvents] = useState(initial);
  function update(event: CalendarEvent, range: CalendarEventRange) {
    setEvents((current) =>
      current.map((item) =>
        item.id === event.id ? { ...item, ...range } : item,
      ),
    );
  }
  return (
    <div className="grid w-full max-w-4xl gap-3">
      <EventCalendar
        aria-label="Keyboard week"
        events={events}
        onEventChange={update}
        defaultDate={new CalendarDate(2026, 11, 25)}
        timeZone={zone}
      />
      <ul className="grid gap-x-6 gap-y-1.5 text-xs text-muted-foreground sm:grid-cols-2">
        {shortcuts.map(([keys, label]) => (
          <li key={label} className="flex items-center gap-2">
            <KbdGroup>
              {keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
