"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldLimitsDemo() {
  return (
    <TimeField
      label="Call time"
      description="Choose a time from 9:00 to 17:00."
      defaultValue={new Time(10, 0)}
      minValue={new Time(9, 0)}
      maxValue={new Time(17, 0)}
      className="w-full max-w-xs"
    />
  );
}
