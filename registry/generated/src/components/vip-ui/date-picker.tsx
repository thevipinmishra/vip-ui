"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useContext } from "react";
import {
  DatePicker as AriaDatePicker,
  composeRenderProps,
  DateInput,
  type DatePickerProps,
  DatePickerStateContext,
  type DateValue,
  FieldError,
  Group,
  Label,
  Text,
} from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { DateSegment } from "./date-segment";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  fieldTriggerStyles,
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
              className="flex min-w-0 flex-1 items-center px-2.5 text-base data-[focus-visible]:outline-none sm:text-sm"
            >
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button
              aria-label="Choose date"
              data-slot="date-picker-trigger"
              variant="ghost"
              size="icon"
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
  const isOpen = useContext(DatePickerStateContext)?.isOpen;
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: reduceMotion ? 0 : duration.base, ease: easeOut }}
    >
      <CaretDownIcon size={16} />
    </motion.span>
  );
}
