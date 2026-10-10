"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDescriptionDemo() {
  return (
    <RadioGroup
      label="Notifications"
      defaultValue="mentions"
      className="w-full max-w-sm"
    >
      <Radio
        value="all"
        label="All activity"
        description="Every comment, change, and mention."
      />
      <Radio
        value="mentions"
        label="Mentions only"
        description="Only when someone mentions you."
      />
      <Radio value="none" label="None" description="No notifications." />
    </RadioGroup>
  );
}
