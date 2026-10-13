"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

export function CheckboxGroupDisabledDemo() {
  return (
    <CheckboxGroup
      label="Alert channels"
      defaultValue={["email"]}
      isDisabled
      className="w-full max-w-sm"
    >
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
    </CheckboxGroup>
  );
}
