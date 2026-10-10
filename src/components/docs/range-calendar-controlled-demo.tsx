"use client";

import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { type DateRange, useLocale } from "react-aria-components";
import { RangeCalendar } from "@/components/ui/range-calendar";

export function RangeCalendarControlledDemo() {
  const [range, setRange] = useState<DateRange>({
    start: parseDate("2026-06-18"),
    end: parseDate("2026-06-24"),
  });
  const { locale } = useLocale();
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const format = (date: DateRange["start"]) =>
    formatter.format(date.toDate(getLocalTimeZone()));
  const nights = range.end.compare(range.start);

  return (
    <div className="grid justify-items-center gap-4">
      <RangeCalendar
        aria-label="Trip dates"
        value={range}
        onChange={setRange}
      />
      <output className="text-sm text-muted-foreground">
        {format(range.start)} – {format(range.end)} · {nights}{" "}
        {nights === 1 ? "night" : "nights"}
      </output>
    </div>
  );
}
