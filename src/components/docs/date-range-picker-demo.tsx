"use client";

import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerDemo() {
  return (
    <DateRangePicker
      label="Trip dates"
      defaultValue={{
        start: parseDate("2026-06-18"),
        end: parseDate("2026-06-24"),
      }}
      className="w-full max-w-sm"
    />
  );
}
