"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupError,
  CheckboxGroupItems,
  CheckboxGroupLabel,
} from "@/components/ui/checkbox-group";

const days = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
];

export function CheckboxGroupLayoutDemo() {
  return (
    <CheckboxGroup
      defaultValue={["mon", "wed", "fri"]}
      className="w-full max-w-sm"
    >
      <CheckboxGroupLabel>Backup days</CheckboxGroupLabel>
      <CheckboxGroupItems className="flex-row flex-wrap gap-x-5">
        {days.map((day) => (
          <Checkbox key={day.id} value={day.id}>
            {day.label}
          </Checkbox>
        ))}
      </CheckboxGroupItems>
      <CheckboxGroupError />
    </CheckboxGroup>
  );
}
