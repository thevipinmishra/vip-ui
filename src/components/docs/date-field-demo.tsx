"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldDemo() {
  return (
    <DateField
      label="Delivery date"
      defaultValue={parseDate("2026-06-15")}
      className="w-full max-w-xs"
    />
  );
}
