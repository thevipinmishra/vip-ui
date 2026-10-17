"use client";

import { parseDate } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <DatePicker
        size="xs"
        aria-label="Appointment date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DatePicker
        size="sm"
        aria-label="Appointment date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DatePicker
        size="md"
        aria-label="Appointment date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DatePicker
        aria-label="Appointment date"
        defaultValue={parseDate("2026-06-15")}
      />
    </div>
  );
}
