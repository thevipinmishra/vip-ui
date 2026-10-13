"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

export function CheckboxGroupDemo() {
  return (
    <CheckboxGroup
      label="Email updates"
      description="Select the messages you want to receive."
      defaultValue={["security"]}
      className="w-full max-w-sm"
    >
      <Checkbox value="product">Product updates</Checkbox>
      <Checkbox value="security">Security alerts</Checkbox>
      <Checkbox value="events">Events</Checkbox>
    </CheckboxGroup>
  );
}
