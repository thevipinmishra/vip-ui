"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup
      label="Workspace plan"
      defaultValue="team"
      className="w-full max-w-sm"
    >
      <Radio value="personal">Personal</Radio>
      <Radio value="team">Team</Radio>
      <Radio value="enterprise">Enterprise</Radio>
    </RadioGroup>
  );
}
