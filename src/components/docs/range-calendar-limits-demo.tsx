"use client";

import { parseDate } from "@internationalized/date";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function RangeCalendarLimitsDemo() {
  return (
    <RangeCalendar
      aria-label="Available trip dates in June"
      minValue={parseDate("2026-06-01")}
      maxValue={parseDate("2026-06-30")}
      isDateUnavailable={(date) =>
        date.compare(parseDate("2026-06-18")) >= 0 &&
        date.compare(parseDate("2026-06-19")) <= 0
      }
      defaultValue={{
        start: parseDate("2026-06-15"),
        end: parseDate("2026-06-17"),
      }}
    />
  );
}
