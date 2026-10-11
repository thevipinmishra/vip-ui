"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerDemo() {
  return (
    <DatePicker
      label="Appointment date"
      defaultValue={parseDate("2026-06-15")}
      className="w-full max-w-xs"
    />
  );
}
