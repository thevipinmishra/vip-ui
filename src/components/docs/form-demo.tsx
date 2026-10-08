"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export function FormDemo() {
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        isRequired
        placeholder="teammate@example.com"
      />
      <Button type="submit">Invite teammate</Button>
    </Form>
  );
}
