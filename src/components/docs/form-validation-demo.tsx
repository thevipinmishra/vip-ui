"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export function FormValidationDemo() {
  const [message, setMessage] = useState("");

  return (
    <Form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Workspace created.");
      }}
    >
      <TextField
        label="Workspace name"
        name="workspace"
        isRequired
        description="Use at least three characters."
        validate={(value) =>
          value.trim().length < 3 ? "Enter at least three characters." : null
        }
      />
      <TextField
        label="Account ID"
        name="accountId"
        defaultValue="VIP-204"
        isReadOnly
      />
      <TextField
        label="Invite code"
        name="inviteCode"
        defaultValue="Not available"
        isDisabled
      />
      <Button type="submit">Create workspace</Button>
      <output className="text-sm text-muted-foreground">{message}</output>
    </Form>
  );
}
