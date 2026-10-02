"use client";

import {
  DateRangePicker as AriaDateRangePicker,
  composeRenderProps,
  DateInput,
  type DateRangePickerProps,
  type DateValue,
  FieldError,
  Group,
  Label,
  Text,
} from "react-aria-components";
import { ChevronDown } from "reicon-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { DateSegment } from "./date-segment";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";

export function DateRangePicker<T extends DateValue>({
  className,
  label,
  description,
  children,
  ...props
}: DateRangePickerProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaDateRangePicker
      {...props}
      data-slot="date-range-picker"
      className={composeRenderProps(className, (className) =>
        cn("group grid gap-2 data-[focus-visible]:outline-none", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="date-range-picker-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <Group
            data-slot="date-range-picker-group"
            className="flex min-h-12 min-w-0 items-center rounded-lg border border-input bg-card shadow-[var(--shadow-card)] hover:border-primary/45 has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-invalid:border-destructive group-invalid:has-[[data-focus-visible]]:ring-destructive/20 group-disabled:bg-muted group-disabled:opacity-60 data-[focus-visible]:outline-none motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150"
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1 px-3 py-2 text-sm">
              <DateInput
                slot="start"
                data-slot="date-range-picker-start"
                className="flex items-center data-[focus-visible]:outline-none"
              >
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <span aria-hidden="true" className="text-muted-foreground">
                –
              </span>
              <DateInput
                slot="end"
                data-slot="date-range-picker-end"
                className="flex items-center data-[focus-visible]:outline-none"
              >
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
            <Button
              aria-label="Choose date range"
              data-slot="date-range-picker-trigger"
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
              data-slot="date-range-picker-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-range-picker-error"
            className="text-xs text-destructive"
          />
          <Popover data-slot="date-range-picker-popover" className="p-3">
            <RangeCalendar />
          </Popover>
        </>
      )}
    </AriaDateRangePicker>
  );
}
