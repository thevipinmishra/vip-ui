"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";

export function CheckboxRequiredDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Checkbox
        name="terms"
        isRequired
        errorMessage="Accept the terms to continue."
      >
        I accept the terms of service
      </Checkbox>
      <Button type="submit">Create account</Button>
    </Form>
  );
}
