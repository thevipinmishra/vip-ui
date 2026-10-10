"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { Calendar } from "@/components/ui/calendar";

export function CalendarControlledDemo() {
  const [date, setDate] = useState<CalendarDate>(parseDate("2026-06-15"));
  const { locale } = useLocale();
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

  return (
    <div className="grid justify-items-center gap-4">
      <Calendar aria-label="Delivery date" value={date} onChange={setDate} />
      <output className="text-sm text-muted-foreground">
        Selected: {formatter.format(date.toDate(getLocalTimeZone()))}
      </output>
    </div>
  );
}
