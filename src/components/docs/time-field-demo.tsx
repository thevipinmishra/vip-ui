"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldDemo() {
  return (
    <TimeField
      label="Meeting time"
      defaultValue={new Time(9, 30)}
      className="w-full max-w-xs"
    />
  );
}
