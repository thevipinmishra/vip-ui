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
              className={cn(
                fieldTriggerStyles,
                "me-[var(--field-inset,0.25rem)]",
              )}
            >
              <CalendarBlankIcon aria-hidden="true" />
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
          <Popover
            data-slot="date-picker-popover"
            placement="bottom start"
            className="flex p-3 max-sm:flex-col"
          >
            {presets && <DatePickerPresets presets={presets} />}
            <Calendar />
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}

function DatePickerPresets<T extends DateValue>({
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
