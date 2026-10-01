"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldDemo() {
  return (
    <DateField
      label="Delivery date"
      description="Use arrow keys to change the day, month, or year."
      defaultValue={parseDate("2026-06-15")}
      minValue={parseDate("2026-01-01")}
      maxValue={parseDate("2026-12-31")}
      className="w-full max-w-xs"
    />
  );
}
