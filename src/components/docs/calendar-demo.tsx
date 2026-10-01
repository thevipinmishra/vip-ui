"use client";

import { parseDate } from "@internationalized/date";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  return (
    <Calendar
      aria-label="Appointment date"
      defaultValue={parseDate("2026-06-15")}
    />
  );
}
