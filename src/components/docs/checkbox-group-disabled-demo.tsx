"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupItems,
  CheckboxGroupLabel,
} from "@/components/ui/checkbox-group";

export function CheckboxGroupDisabledDemo() {
  return (
    <CheckboxGroup
      defaultValue={["email"]}
      isDisabled
      className="w-full max-w-sm"
    >
      <CheckboxGroupLabel>Alert channels</CheckboxGroupLabel>
      <CheckboxGroupItems>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </CheckboxGroupItems>
    </CheckboxGroup>
  );
}
