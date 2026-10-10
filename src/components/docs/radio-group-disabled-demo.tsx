"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDisabledDemo() {
  return (
    <RadioGroup label="Region" defaultValue="us" className="w-full max-w-sm">
      <Radio value="us" label="United States" />
      <Radio value="eu" label="Europe" />
      <Radio value="apac" label="Asia Pacific" isDisabled />
    </RadioGroup>
  );
}
