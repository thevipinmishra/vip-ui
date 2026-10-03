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
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DateSegment } from "./date-segment";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  segmentedFieldStyles,
} from "./field-styles";
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
            <Label data-slot="date-picker-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <Group
            data-slot="date-picker-group"
            className={cn(
              segmentedFieldStyles,
              "data-[focus-visible]:outline-none",
            )}
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
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-picker-error"
            className={fieldErrorStyles}
          />
          <Popover data-slot="date-picker-popover" className="p-3">
            <Calendar />
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}
