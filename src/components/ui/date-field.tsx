"use client";

import {
  DateField as AriaDateField,
  composeRenderProps,
  type DateFieldProps,
  DateInput,
  type DateValue,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { DateSegment } from "./date-segment";

export function DateField<T extends DateValue>({
  className,
  label,
  description,
  children,
  ...props
}: DateFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaDateField
      {...props}
      data-slot="date-field"
      className={composeRenderProps(className, (className) =>
        cn("group grid gap-2 data-[focus-visible]:outline-none", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="date-field-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <DateInput
            data-slot="date-field-input"
            className="flex min-h-12 items-center rounded-lg border border-input bg-card px-3 text-sm shadow-[var(--shadow-card)] hover:border-primary/45 has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-invalid:border-destructive group-invalid:has-[[data-focus-visible]]:ring-destructive/20 group-disabled:bg-muted group-disabled:opacity-60 data-[focus-visible]:outline-none motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150"
          >
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          {description && (
            <Text
              slot="description"
              data-slot="date-field-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-field-error"
            className="text-xs text-destructive"
          />
        </>
      )}
    </AriaDateField>
  );
}
