"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupError,
  CheckboxGroupItems,
  CheckboxGroupLabel,
} from "@/components/ui/checkbox-group";

export function CheckboxGroupRequiredDemo() {
  const [channels, setChannels] = useState<string[]>([]);

  return (
    <CheckboxGroup
      value={channels}
      onChange={setChannels}
      isInvalid={channels.length === 0}
      className="w-full max-w-sm"
    >
      <CheckboxGroupLabel>Notification channels</CheckboxGroupLabel>
      <CheckboxGroupItems>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="push">Push</Checkbox>
      </CheckboxGroupItems>
      <CheckboxGroupError>Select at least one channel.</CheckboxGroupError>
    </CheckboxGroup>
  );
}
