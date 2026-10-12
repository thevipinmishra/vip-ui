"use client";

import { useState } from "react";
import { PasswordField } from "@/components/ui/password-field";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";

export function PasswordStrengthMeterFieldDemo() {
  const [password, setPassword] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-3">
      <PasswordField
        label="New password"
        name="new-password"
        autoComplete="new-password"
        value={password}
        onChange={setPassword}
        description="Use 12 or more characters. The score is an estimate only."
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
}
