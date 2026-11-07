"use client";

import { CalendarBlankIcon } from "@phosphor-icons/react";
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
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar, CalendarPresets } from "./calendar";
import { DateSegment } from "./date-segment";
import {
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

export interface DatePickerPreset<T extends DateValue = DateValue> {
  label: string;
  value: T;
}

export function DatePicker<T extends DateValue>({
  className,
  label,
  description,
  size,
  presets,
  children,
  ...props
}: DatePickerProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
    presets?: DatePickerPreset<T>[];
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
          {label && <DatePickerLabel>{label}</DatePickerLabel>}
          <DatePickerGroup />
          {description && (
            <DatePickerDescription>{description}</DatePickerDescription>
          )}
          <DatePickerError />
          <DatePickerContent>
            {presets && <DatePickerPresets presets={presets} />}
            <Calendar />
          </DatePickerContent>
        </>
      )}
    </AriaDatePicker>
  );
}

export function DatePickerLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="date-picker-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function DatePickerGroup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Group>) {
  return (
    <Group
      {...props}
      data-slot="date-picker-group"
      className={composeRenderProps(className, (className) =>
        cn(
          segmentedFieldStyles,
          "data-[focus-visible]:outline-none",
          className,
        ),
      )}
    >
      {children ?? (
        <>
          <DatePickerInput />
          <DatePickerTrigger />
        </>
      )}
    </Group>
  );
}

export function DatePickerInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DateInput>, "children">) {
  return (
    <DateInput
      {...props}
      data-slot="date-picker-input"
      className={composeRenderProps(className, (className) =>
        cn(
          fieldText,
          "min-w-0 flex-1 px-[calc(var(--field-px,0.875rem)-0.25rem)] py-[clamp(0px,calc((var(--field-h,3rem)-2rem)/2),0.5rem)] data-[focus-visible]:outline-none",
          className,
        ),
      )}
    >
      {(segment) => <DateSegment segment={segment} />}
    </DateInput>
  );
}

export function DatePickerTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Choose date"
      {...props}
      data-slot="date-picker-trigger"
      variant="ghost"
      iconOnly
      className={composeRenderProps(className, (className) =>
        cn(fieldTriggerStyles, "me-[var(--field-inset,0.25rem)]", className),
      )}
    >
      {children ?? <CalendarBlankIcon aria-hidden="true" />}
    </Button>
  );
}

export function DatePickerDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="date-picker-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function DatePickerError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="date-picker-error"
      className={composeRenderProps(className, (className) =>
        cn(fieldErrorStyles, className),
      )}
    />
  );
}

export function DatePickerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      placement="bottom start"
      {...props}
      data-slot="date-picker-popover"
      className={composeRenderProps(className, (className) =>
        cn("flex p-3 max-sm:flex-col", className),
      )}
    >
      {children ?? <Calendar />}
    </Popover>
  );
}

export function DatePickerPresets<T extends DateValue>({
  presets,
}: {
  presets: DatePickerPreset<T>[];
}) {
  const state = useContext(DatePickerStateContext);
  const value = state?.value;
  return (
    <CalendarPresets
      presets={presets.map((preset) => preset.label)}
      selected={
        presets.find((preset) => value && preset.value.compare(value) === 0)
          ?.label ?? null
      }
      onSelect={(label) => {
        const preset = presets.find((preset) => preset.label === label);
        if (!preset || !state) return;
        state.setValue(preset.value);
        state.close();
      }}
    />
  );
}
