"use client";

import { parseDate } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerDisabledDemo() {
  return (
    <DateRangePicker
      label="Billing period"
      defaultValue={{
        start: parseDate("2026-06-01"),
        end: parseDate("2026-06-30"),
      }}
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
