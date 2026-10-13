"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDisabledDemo() {
  return (
    <RadioGroup label="Region" defaultValue="us" className="w-full max-w-sm">
      <Radio value="us">United States</Radio>
      <Radio value="eu">Europe</Radio>
      <Radio value="apac" isDisabled description="Not available on your plan.">
        Asia Pacific
      </Radio>
    </RadioGroup>
  );
}
