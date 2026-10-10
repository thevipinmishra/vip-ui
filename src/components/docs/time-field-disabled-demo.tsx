"use client";

import { Time } from "@internationalized/date";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldDisabledDemo() {
  return (
    <TimeField
      label="Reminder time"
      defaultValue={new Time(8, 0)}
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
