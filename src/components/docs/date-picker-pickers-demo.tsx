"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Calendar,
  CalendarGrid,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarYearPicker,
} from "@/components/ui/calendar";
import {
  DatePicker,
  DatePickerContent,
  DatePickerError,
  DatePickerGroup,
  DatePickerLabel,
} from "@/components/ui/date-picker";

export function DatePickerPickersDemo() {
  return (
    <DatePicker
      maxValue={today(getLocalTimeZone())}
      className="w-full max-w-xs"
    >
      <DatePickerLabel>Date of birth</DatePickerLabel>
      <DatePickerGroup />
      <DatePickerError />
      <DatePickerContent>
        <Calendar>
          <CalendarHeader>
            <CalendarMonthPicker />
            <CalendarYearPicker visibleYears={100} />
          </CalendarHeader>
          <CalendarGrid />
        </Calendar>
      </DatePickerContent>
    </DatePicker>
  );
}
