"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export function FormDemo() {
  const [message, setMessage] = useState("");
  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Invitation ready to send.");
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
      <output className="text-sm text-muted-foreground">{message}</output>
    </Form>
  );
}
