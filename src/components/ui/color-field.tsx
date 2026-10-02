"use client";

import {
  ColorField as AriaColorField,
  type ColorFieldProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function ColorField({
  className,
  label,
  description,
  children,
  ...props
}: ColorFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaColorField
      {...props}
      data-slot="color-field"
      className={composeRenderProps(className, (className) =>
        cn("grid gap-2", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="color-field-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <Input
            data-slot="color-field-input"
            className="min-h-12 rounded-lg border border-input bg-card px-3.5 text-base text-foreground shadow-[var(--shadow-card)] outline-none motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 sm:text-sm"
          />
          {description && (
            <Text
              slot="description"
              data-slot="color-field-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="color-field-error"
            className="text-xs text-destructive"
          />
        </>
      )}
    </AriaColorField>
  );
}
