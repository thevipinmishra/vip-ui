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
      <Radio value="small">Small</Radio>
      <Radio value="medium">Medium</Radio>
      <Radio value="large">Large</Radio>
    </RadioGroup>
  );
}
