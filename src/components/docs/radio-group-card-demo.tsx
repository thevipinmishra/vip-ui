"use client";

import {
  Radio,
  RadioGroup,
  RadioGroupItems,
  RadioGroupLabel,
} from "@/components/ui/radio-group";

export function RadioGroupCardDemo() {
  return (
    <RadioGroup defaultValue="monthly" className="w-full max-w-sm">
      <RadioGroupLabel>Billing cadence</RadioGroupLabel>
      <RadioGroupItems className="gap-2">
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
      </RadioGroupItems>
    </RadioGroup>
  );
}
