"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxStatesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Checkbox defaultChecked="indeterminate">Partially selected</Checkbox>
      <Checkbox defaultChecked>Selected</Checkbox>
      <Checkbox isDisabled checked>
        Managed by your workspace
      </Checkbox>
    </div>
  );
}
