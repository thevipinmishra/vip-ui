"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupHorizontalDemo() {
  return (
    <RadioGroup
      label="Size"
      orientation="horizontal"
      defaultValue="medium"
      className="w-full max-w-sm"
    >
      <Radio value="small" label="Small" />
      <Radio value="medium" label="Medium" />
      <Radio value="large" label="Large" />
    </RadioGroup>
  );
}
