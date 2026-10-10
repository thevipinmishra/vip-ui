"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDisabledDemo() {
  return (
    <div className="grid gap-1">
      <Checkbox isDisabled defaultChecked>
        Security alerts
      </Checkbox>
      <Checkbox isDisabled>Beta features</Checkbox>
    </div>
  );
}
