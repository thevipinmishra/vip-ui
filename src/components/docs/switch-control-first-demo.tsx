"use client";

import {
  SwitchButton,
  SwitchControl,
  SwitchDescription,
  SwitchField,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";

export function SwitchControlFirstDemo() {
  return (
    <SwitchField defaultSelected className="max-w-sm">
      <SwitchButton>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Autosave</SwitchLabel>
      </SwitchButton>
      <SwitchDescription>Save changes as you type.</SwitchDescription>
    </SwitchField>
  );
}
