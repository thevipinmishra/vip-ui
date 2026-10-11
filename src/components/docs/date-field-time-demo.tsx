"use client";

import { parseDateTime } from "@internationalized/date";
import { DateField } from "@/components/ui/date-field";

export function DateFieldTimeDemo() {
  return (
    <DateField
      label="Event start"
      defaultValue={parseDateTime("2026-06-15T09:30")}
      className="w-full max-w-xs"
    />
  );
}
