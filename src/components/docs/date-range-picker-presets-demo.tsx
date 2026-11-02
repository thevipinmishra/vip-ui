"use client";

import {
  endOfMonth,
  getLocalTimeZone,
  startOfMonth,
  today,
} from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function DateRangePickerPresetsDemo() {
  const now = today(getLocalTimeZone());
  const lastMonth = now.subtract({ months: 1 });

  return (
    <DateRangePicker
      label="Report period"
      presets={[
        {
          label: "Last 7 days",
          value: { start: now.subtract({ days: 6 }), end: now },
        },
        {
          label: "Last 30 days",
          value: { start: now.subtract({ days: 29 }), end: now },
        },
        {
          label: "This month",
          value: { start: startOfMonth(now), end: endOfMonth(now) },
        },
        {
          label: "Last month",
          value: { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) },
        },
      ]}
      className="w-full max-w-sm"
    />
  );
}
