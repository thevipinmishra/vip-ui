"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldDemo() {
  return (
    <TimeField
      label="Meeting time"
      description="Use arrow keys to adjust each segment."
      hourCycle={24}
      defaultValue={new Time(9, 30)}
      className="w-full max-w-xs"
    />
  );
}
