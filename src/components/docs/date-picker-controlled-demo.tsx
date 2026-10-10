"use client";

import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { useState } from "react";
import { useLocale } from "react-aria-components";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerControlledDemo() {
  const [date, setDate] = useState<CalendarDate | null>(
    parseDate("2026-06-15"),
  );
  const { locale } = useLocale();
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

  return (
    <div className="grid w-full max-w-xs gap-4">
      <DatePicker label="Delivery date" value={date} onChange={setDate} />
      <output className="text-sm text-muted-foreground">
        {date
          ? `Selected: ${formatter.format(date.toDate(getLocalTimeZone()))}`
          : "No date selected."}
      </output>
    </div>
  );
}
