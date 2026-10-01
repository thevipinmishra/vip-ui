"use client";

import { isWeekend, parseDate } from "@internationalized/date";
import { useLocale } from "react-aria-components";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerUnavailableDemo() {
  const { locale } = useLocale();
  const firstDay = parseDate("2026-06-15");
  const lastDay = parseDate("2026-06-30");
  const blockedStart = parseDate("2026-06-18");
  const blockedEnd = parseDate("2026-06-19");

  return (
    <DatePicker
      label="Appointment date"
      description="Weekends and June 18–19 are unavailable. Book by June 30."
      defaultValue={firstDay}
      minValue={firstDay}
      maxValue={lastDay}
      isDateUnavailable={(date) =>
        isWeekend(date, locale) ||
        (date.compare(blockedStart) >= 0 && date.compare(blockedEnd) <= 0)
      }
      className="w-full max-w-xs"
    />
  );
}
