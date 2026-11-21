"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export function FormDemo() {
  const [submittedEmail, setSubmittedEmail] = useState("");

  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        if (typeof email === "string") setSubmittedEmail(email);
      }}
    >
      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        isRequired
        placeholder="teammate@example.com"
        onChange={() => setSubmittedEmail("")}
      />
      <Button type="submit">Invite teammate</Button>
      <output className="text-sm text-muted-foreground empty:sr-only">
        {submittedEmail && `Form submitted for ${submittedEmail}.`}
      </output>
    </Form>
  );
}
