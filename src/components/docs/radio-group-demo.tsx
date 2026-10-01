"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  const [plan, setPlan] = useState("team");

  return (
    <div className="w-full max-w-sm">
      <RadioGroup
        label="Workspace plan"
        description="Choose one plan for this workspace."
        value={plan}
        onValueChange={setPlan}
      >
        <Radio value="personal" label="Personal" />
        <Radio value="team" label="Team" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
      <output className="mt-3 block text-xs text-muted-foreground">
        Selected plan: {plan}
      </output>
    </div>
  );
}
