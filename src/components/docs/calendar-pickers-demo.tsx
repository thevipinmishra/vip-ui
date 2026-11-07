"use client";

import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Calendar,
  CalendarGrid,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarYearPicker,
} from "@/components/ui/calendar";

export function CalendarPickersDemo() {
  return (
    <Calendar
      aria-label="Date of birth"
      defaultValue={parseDate("1994-08-21")}
      maxValue={today(getLocalTimeZone())}
    >
      <CalendarHeader>
        <CalendarMonthPicker />
        <CalendarYearPicker visibleYears={100} />
      </CalendarHeader>
      <CalendarGrid />
    </Calendar>
  );
}
