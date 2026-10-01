"use client";

import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function RangeCalendarDemo() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{
        start: parseDate("2026-06-18"),
        end: parseDate("2026-06-24"),
      }}
    />
  );
}
