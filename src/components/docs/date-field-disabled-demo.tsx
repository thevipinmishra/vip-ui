"use client";

import { parseDate } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldDisabledDemo() {
  return (
    <DateField
      label="Start date"
      defaultValue={parseDate("2026-06-01")}
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
