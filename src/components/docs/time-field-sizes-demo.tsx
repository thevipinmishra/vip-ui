"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-xs gap-3">
      <TimeField
        size="xs"
        aria-label="Meeting time"
        defaultValue={new Time(9, 30)}
      />
      <TimeField
        size="sm"
        aria-label="Meeting time"
        defaultValue={new Time(9, 30)}
      />
      <TimeField
        size="md"
        aria-label="Meeting time"
        defaultValue={new Time(9, 30)}
      />
      <TimeField aria-label="Meeting time" defaultValue={new Time(9, 30)} />
    </div>
  );
}
