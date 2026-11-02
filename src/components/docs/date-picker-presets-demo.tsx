"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import { DatePicker } from "@/components/ui/date-picker";

export function DatePickerPresetsDemo() {
  const now = today(getLocalTimeZone());

  return (
    <DatePicker
      label="Due date"
      presets={[
        { label: "Today", value: now },
        { label: "Tomorrow", value: now.add({ days: 1 }) },
        { label: "In 1 week", value: now.add({ weeks: 1 }) },
        { label: "In 1 month", value: now.add({ months: 1 }) },
      ]}
      className="w-full max-w-xs"
    />
  );
}
