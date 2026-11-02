"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

const days = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
];

export function CheckboxGroupHorizontalDemo() {
  return (
    <CheckboxGroup
      label="Backup days"
      orientation="horizontal"
      defaultValue={["mon", "wed", "fri"]}
      className="w-full max-w-sm"
    >
      {days.map((day) => (
        <Checkbox key={day.id} value={day.id}>
          {day.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
