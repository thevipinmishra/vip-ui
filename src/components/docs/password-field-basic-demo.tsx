"use client";

import { PasswordField } from "@/components/ui/password-field";

export function PasswordFieldBasicDemo() {
  return (
    <PasswordField
      label="Password"
      name="password"
      autoComplete="current-password"
      placeholder="Enter your password"
      className="max-w-sm"
    />
  );
}
