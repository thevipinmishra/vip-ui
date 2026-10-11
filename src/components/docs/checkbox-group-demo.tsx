"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupError,
  CheckboxGroupItems,
  CheckboxGroupLabel,
} from "@/components/ui/checkbox-group";

export function CheckboxGroupDemo() {
  return (
    <CheckboxGroup defaultValue={["security"]} className="w-full max-w-sm">
      <CheckboxGroupLabel>Email updates</CheckboxGroupLabel>
      <CheckboxGroupDescription>
        Select the messages you want to receive.
      </CheckboxGroupDescription>
      <CheckboxGroupItems>
        <Checkbox value="product">Product updates</Checkbox>
        <Checkbox value="security">Security alerts</Checkbox>
        <Checkbox value="events">Events</Checkbox>
      </CheckboxGroupItems>
      <CheckboxGroupError />
    </CheckboxGroup>
  );
}
