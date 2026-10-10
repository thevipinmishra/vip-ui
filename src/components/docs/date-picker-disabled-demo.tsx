"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerDisabledDemo() {
  return (
    <DatePicker
      label="Contract start"
      defaultValue={parseDate("2026-06-01")}
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
