"use client";

import {
  TextField,
  TextFieldError,
  TextFieldInput,
  TextFieldLabel,
} from "../../vip-ui/text-field";
import { cn } from "../../vip-ui/utils";

const slots = [0, 1, 2, 3, 4, 5];

export function CodeInput({
  label,
  value,
  error,
  isReadOnly,
  onChange,
  onComplete,
  ref,
}: {
  label: string;
  value: string;
  error?: string;
  isReadOnly?: boolean;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const active = Math.min(value.length, slots.length - 1);

  return (
    <TextField
      ref={ref}
      name="code"
      value={value}
      isInvalid={Boolean(error)}
      isReadOnly={isReadOnly}
      className="group/code"
      onChange={(next) => {
        const digits = next.replace(/\D/g, "").slice(0, slots.length);
        if (digits === value) return;
        onChange(digits);
        if (digits.length === slots.length) onComplete(digits);
      }}
    >
      <TextFieldLabel>{label}</TextFieldLabel>
      <div className="relative">
        <div aria-hidden="true" className="grid grid-cols-6 gap-2">
          {slots.map((slot) => (
            <span
              key={slot}
              className={cn(
                "grid h-12 place-items-center rounded-lg border border-input bg-card font-mono text-lg font-medium tabular-nums text-foreground shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-150 ease-out-quint group-invalid/code:border-destructive",
                slot === active &&
                  "group-has-[:focus]/code:border-ring group-has-[:focus]/code:ring-1 group-has-[:focus]/code:ring-ring group-invalid/code:group-has-[:focus]/code:border-destructive group-invalid/code:group-has-[:focus]/code:ring-destructive",
              )}
            >
              {value[slot] ? (
                <span className="transition-[opacity,translate] duration-150 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-1">
                  {value[slot]}
                </span>
              ) : (
                slot === active && (
                  <span className="hidden h-5 w-px bg-foreground group-has-[:focus]/code:block motion-safe:animate-pulse" />
                )
              )}
            </span>
          ))}
        </div>
        <TextFieldInput
          inputMode="numeric"
          autoComplete="one-time-code"
          className="absolute inset-0 h-full min-h-0 cursor-text opacity-0"
          onSelect={(event) => {
            const input = event.currentTarget;
            input.setSelectionRange(input.value.length, input.value.length);
          }}
        />
      </div>
      <TextFieldError>{error}</TextFieldError>
    </TextField>
  );
}
