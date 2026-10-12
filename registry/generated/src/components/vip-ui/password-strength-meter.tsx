"use client";

import { Label } from "react-aria-components";
import { cn } from "./utils";
import { Meter, type MeterProps } from "./meter";

export interface PasswordStrengthMeterProps {
  password: string;
  className?: MeterProps["className"];
}

const levels = ["Very weak", "Weak", "Fair", "Good", "Strong"];

const fills = [
  "bg-destructive",
  "bg-destructive",
  "bg-warning",
  "bg-success",
  "bg-success",
];

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
      value={score}
      minValue={0}
      maxValue={4}
      valueLabel={password ? levels[score] : "No password"}
    >
      {({ valueText }) => (
        <>
          <div className="flex items-baseline gap-3 text-sm">
            <Label className="min-w-0 font-medium [overflow-wrap:anywhere]">
              Password strength
            </Label>
            <span
              data-slot="password-strength-meter-value"
              className="ms-auto min-w-0 text-end text-muted-foreground"
            >
              {valueText}
            </span>
          </div>
          <div aria-hidden="true" className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                data-slot="password-strength-meter-segment"
                data-filled={score >= step || undefined}
                className={cn(
                  "h-1.5 rounded-full bg-secondary shadow-[var(--shadow-inset)] transition-[background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] forced-colors:border",
                  score >= step &&
                    cn(
                      fills[score],
                      "shadow-none forced-colors:bg-[Highlight]",
                    ),
                )}
              />
            ))}
          </div>
        </>
      )}
    </Meter>
  );
}
