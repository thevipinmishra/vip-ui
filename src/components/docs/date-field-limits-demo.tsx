"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldLimitsDemo() {
  return (
    <DateField
      label="Delivery date"
      description="Choose a date in June 2026."
      defaultValue={parseDate("2026-06-15")}
      minValue={parseDate("2026-06-01")}
      maxValue={parseDate("2026-06-30")}
      className="w-full max-w-xs"
    />
  );
}
