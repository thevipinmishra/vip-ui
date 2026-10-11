"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeField24HourDemo() {
  return (
    <TimeField
      label="Departure time"
      hourCycle={24}
      defaultValue={new Time(18, 45)}
      className="w-full max-w-xs"
    />
  );
}
