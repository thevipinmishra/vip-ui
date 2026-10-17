"use client";

import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-range-picker";

const tripDates = {
  start: parseDate("2026-06-18"),
  end: parseDate("2026-06-24"),
};

export function DateRangePickerSizesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <DateRangePicker
        size="xs"
        aria-label="Trip dates"
        defaultValue={tripDates}
      />
      <DateRangePicker
        size="sm"
        aria-label="Trip dates"
        defaultValue={tripDates}
      />
      <DateRangePicker
        size="md"
        aria-label="Trip dates"
        defaultValue={tripDates}
      />
      <DateRangePicker aria-label="Trip dates" defaultValue={tripDates} />
    </div>
  );
}
