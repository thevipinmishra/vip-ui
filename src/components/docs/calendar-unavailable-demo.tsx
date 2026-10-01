"use client";

import { isWeekend, parseDate } from "@internationalized/date";
import { useLocale } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";

export function CalendarUnavailableDemo() {
  const { locale } = useLocale();

  return (
    <Calendar
      aria-label="Available appointment days"
      defaultValue={parseDate("2026-06-15")}
      minValue={parseDate("2026-06-01")}
      maxValue={parseDate("2026-06-30")}
      isDateUnavailable={(date) => isWeekend(date, locale)}
    />
  );
}
