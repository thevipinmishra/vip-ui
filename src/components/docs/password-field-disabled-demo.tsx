"use client";

import { PasswordField } from "@/components/ui/password-field";

export function PasswordFieldDisabledDemo() {
  return (
    <PasswordField
      label="Password"
      defaultValue="correct-horse-battery"
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
