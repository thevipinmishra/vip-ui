"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupRequiredDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <RadioGroup
        label="Delivery speed"
        name="speed"
        isRequired
        errorMessage="Select a delivery speed."
      >
        <Radio value="standard" description="3 to 5 business days.">
          Standard
        </Radio>
        <Radio value="express" description="Next business day.">
          Express
        </Radio>
      </RadioGroup>
      <Button type="submit">Continue</Button>
    </Form>
  );
}
