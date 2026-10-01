"use client";

import {
  TimeField as AriaTimeField,
  composeRenderProps,
  DateInput,
  FieldError,
  Label,
  Text,
  type TimeFieldProps,
  type TimeValue,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { DateSegment } from "./date-segment";

export function TimeField<T extends TimeValue>({
  className,
  label,
  description,
  children,
  ...props
}: TimeFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaTimeField
      {...props}
      data-slot="time-field"
      className={composeRenderProps(className, (className) =>
        cn("grid gap-2 data-[focus-visible]:outline-none", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="time-field-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <DateInput
            data-slot="time-field-input"
            className="flex min-h-12 items-center rounded-lg border border-input bg-card px-3 text-sm shadow-[var(--shadow-card)] hover:border-primary/45 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 data-[focus-visible]:outline-none invalid:border-destructive disabled:opacity-50 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150"
          >
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          {description && (
            <Text
              slot="description"
              data-slot="time-field-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="time-field-error"
            className="text-xs text-destructive"
          />
        </>
      )}
    </AriaTimeField>
  );
}
