"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <DateField
        size="xs"
        aria-label="Delivery date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DateField
        size="sm"
        aria-label="Delivery date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DateField
        size="md"
        aria-label="Delivery date"
        defaultValue={parseDate("2026-06-15")}
      />
      <DateField
        aria-label="Delivery date"
        defaultValue={parseDate("2026-06-15")}
      />
    </div>
  );
}
