"use client";

import { Meter, type MeterProps } from "./meter";

export interface PasswordStrengthMeterProps {
  password: string;
  className?: MeterProps["className"];
}

export function PasswordStrengthMeter({
  password,
  className,
}: PasswordStrengthMeterProps) {
  const score =
    Number(password.length >= 8) +
    Number(password.length >= 12) +
    Number(password.length >= 16) +
    Number(/[a-zA-Z]/.test(password) && /[0-9\W_]/.test(password));

  return (
    <Meter
      className={className}
      label="Password strength"
      value={score}
      minValue={0}
      maxValue={4}
      valueLabel={password ? `${score} of 4 checks met` : "No password yet"}
    />
  );
}
