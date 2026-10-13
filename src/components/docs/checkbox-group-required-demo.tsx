"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Form } from "@/components/ui/form";

export function CheckboxGroupRequiredDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <CheckboxGroup
        label="Notification channels"
        name="channels"
        isRequired
        errorMessage="Select at least one channel."
      >
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="push">Push</Checkbox>
      </CheckboxGroup>
      <Button type="submit">Save</Button>
    </Form>
  );
}
