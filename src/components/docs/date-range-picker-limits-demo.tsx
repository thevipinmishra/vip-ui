"use client";

import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerLimitsDemo() {
  return (
    <DateRangePicker
      label="Trip dates"
      description="Choose dates in June. June 18–19 are unavailable."
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
      className="w-full max-w-sm"
    />
  );
}
