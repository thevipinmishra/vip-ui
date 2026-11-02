"use client";

import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function RangeCalendarMonthsDemo() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      visibleDuration={{ months: 2 }}
      pageBehavior="single"
      defaultValue={{
        start: parseDate("2026-06-26"),
        end: parseDate("2026-07-04"),
      }}
    />
  );
}
