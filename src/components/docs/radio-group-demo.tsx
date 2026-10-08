"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <RadioGroup
        label="Workspace plan"
        description="Choose one plan for this workspace."
        defaultValue="team"
      >
        <Radio value="personal" label="Personal" />
        <Radio value="team" label="Team" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
    </div>
  );
}
