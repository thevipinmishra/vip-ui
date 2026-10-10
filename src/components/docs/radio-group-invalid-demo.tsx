"use client";

import { useState } from "react";
import {
  Radio,
  RadioGroup,
  RadioGroupError,
  RadioGroupItems,
  RadioGroupLabel,
} from "@/components/ui/radio-group";

export function RadioGroupInvalidDemo() {
  const [speed, setSpeed] = useState<string | null>(null);

  return (
    <RadioGroup
      value={speed}
      onChange={setSpeed}
      isInvalid={!speed}
      className="w-full max-w-sm"
    >
      <RadioGroupLabel>Delivery speed</RadioGroupLabel>
      <RadioGroupItems>
        <Radio value="standard" label="Standard" />
        <Radio value="express" label="Express" />
      </RadioGroupItems>
      <RadioGroupError>Select a delivery speed.</RadioGroupError>
    </RadioGroup>
  );
}
