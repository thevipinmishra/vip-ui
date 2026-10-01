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
    <div className="flex w-full max-w-sm flex-col gap-4">
      <DatePicker label="Delivery date" value={date} onChange={setDate} />
      <output className="rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {date
          ? `Scheduled for ${formatter.format(date.toDate(getLocalTimeZone()))}`
          : "Choose a delivery date."}
      </output>
    </div>
  );
}
