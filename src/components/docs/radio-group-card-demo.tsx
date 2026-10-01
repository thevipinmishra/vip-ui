"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupCardDemo() {
  return (
    <RadioGroup
      label="Billing cadence"
      description="Choose how often your workspace is billed."
      defaultValue="monthly"
      className="w-full max-w-sm [&_[data-slot=radio-group-items]]:gap-2"
    >
      <Radio
        variant="card"
        value="monthly"
        label="Monthly"
        description="Pay at the start of each month."
      />
      <Radio
        variant="card"
        value="yearly"
        label="Yearly"
        description="One payment for the whole year."
      />
    </RadioGroup>
  );
}
