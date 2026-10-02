"use client";

import {
  DatePicker as AriaDatePicker,
  composeRenderProps,
  DateInput,
  type DatePickerProps,
  type DateValue,
  FieldError,
  Group,
  Label,
  Text,
} from "react-aria-components";
import { ChevronDown } from "reicon-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DateSegment } from "./date-segment";
import { Popover } from "./popover";

export function DatePicker<T extends DateValue>({
  className,
  label,
  description,
  children,
  ...props
}: DatePickerProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaDatePicker
      {...props}
      data-slot="date-picker"
      className={composeRenderProps(className, (className) =>
        cn("group grid gap-2 data-[focus-visible]:outline-none", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="date-picker-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <Group
            data-slot="date-picker-group"
            className="flex min-h-12 min-w-0 items-center rounded-lg border border-input bg-card shadow-[var(--shadow-card)] hover:border-primary/45 has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-data-[invalid]:border-destructive group-data-[invalid]:has-[[data-focus-visible]]:ring-destructive/20 group-data-[disabled]:bg-muted group-data-[disabled]:opacity-60 data-[focus-visible]:outline-none motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150"
          >
            <DateInput
              data-slot="date-picker-input"
              className="flex min-w-0 flex-1 items-center px-3.5 text-sm data-[focus-visible]:outline-none"
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button
              aria-label="Choose date"
              data-slot="date-picker-trigger"
              variant="ghost"
              size="icon"
              className="me-1 shrink-0"
            >
              <ChevronDown size={17} aria-hidden="true" />
            </Button>
          </Group>
          {description && (
            <Text
              slot="description"
              data-slot="date-picker-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-picker-error"
            className="text-xs text-destructive"
          />
          <Popover data-slot="date-picker-popover" className="p-3">
            <Calendar />
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}
