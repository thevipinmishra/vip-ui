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
import { cn } from "./utils";
import { Button } from "./button";
import { DateSegment } from "./date-segment";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  segmentedFieldStyles,
} from "./field-styles";
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
              className={fieldLabelStyles}
            >
              {label}
            </Label>
          )}
          <Group
            data-slot="date-range-picker-group"
            className={cn(
              segmentedFieldStyles,
              "data-[focus-visible]:outline-none",
            )}
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
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-range-picker-error"
            className={fieldErrorStyles}
          />
          <Popover data-slot="date-range-picker-popover" className="p-3">
            <RangeCalendar />
          </Popover>
        </>
      )}
    </AriaDateRangePicker>
  );
}
