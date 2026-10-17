"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
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
import { cn } from "./utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DateSegment } from "./date-segment";
import {
  fieldChevronStyles,
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  fieldSizeStyles,
  fieldText,
  fieldTriggerStyles,
  segmentedFieldStyles,
} from "./field-styles";
import { Popover } from "./popover";
import type { Size } from "./size";

export function DatePicker<T extends DateValue>({
  className,
  label,
  description,
  size,
  children,
  ...props
}: DatePickerProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
  }) {
  return (
    <AriaDatePicker
      {...props}
      data-slot="date-picker"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group grid gap-2 data-[focus-visible]:outline-none",
          size && fieldSizeStyles[size],
          className,
        ),
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
              className={cn(
                fieldText,
                "min-w-0 flex-1 px-[calc(var(--field-px,0.875rem)-0.25rem)] py-[clamp(0px,calc((var(--field-h,3rem)-2rem)/2),0.5rem)] data-[focus-visible]:outline-none",
              )}
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button
              aria-label="Choose date"
              data-slot="date-picker-trigger"
              variant="ghost"
              iconOnly
              className={cn(fieldTriggerStyles, "me-1")}
            >
              <DatePickerChevron />
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

function DatePickerChevron() {
  return (
    <span aria-hidden="true" className={fieldChevronStyles}>
      <CaretDownIcon />
    </span>
  );
}
