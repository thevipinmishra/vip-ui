"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PasswordField } from "@/components/ui/password-field";

export function PasswordFieldDemo() {
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");

  return (
    <Form
      className="w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice("Valid password. This demo does not save credentials.");
      }}
    >
      <PasswordField
        label="New password"
        name="new-password"
        autoComplete="new-password"
        description="Use at least eight characters. Password managers can fill this field."
        placeholder="Choose a password"
        value={password}
        onChange={(value) => {
          setPassword(value);
          setNotice("");
        }}
        isRequired
        minLength={8}
      />
      <Button type="submit">Check password</Button>
      <output aria-live="polite" className="text-xs text-muted-foreground">
        {notice}
      </output>
    </Form>
  );
}
