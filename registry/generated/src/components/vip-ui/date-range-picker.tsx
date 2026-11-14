"use client";

import { CalendarBlankIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import {
  DateRangePicker as AriaDateRangePicker,
  composeRenderProps,
  DateInput,
  type DateRangePickerProps,
  DateRangePickerStateContext,
  type DateValue,
  FieldError,
  Group,
  Label,
  type RangeValue,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
import { Button } from "./button";
import { CalendarPresets } from "./calendar";
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
import { RangeCalendar } from "./range-calendar";
import type { Size } from "./size";

export interface DateRangePickerPreset<T extends DateValue = DateValue> {
  label: string;
  value: RangeValue<T>;
}

export function DateRangePicker<T extends DateValue>({
  className,
  label,
  description,
  size,
  presets,
  children,
  ...props
}: DateRangePickerProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
    presets?: DateRangePickerPreset<T>[];
  }) {
  return (
    <AriaDateRangePicker
      {...props}
      data-slot="date-range-picker"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group grid gap-2 data-focus-visible:outline-none",
          size && fieldSizeStyles[size],
          className,
        ),
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
              "data-focus-visible:outline-none",
            )}
          >
            <div
              className={cn(
                fieldText,
                "flex min-w-0 flex-1 flex-wrap items-center gap-x-1 px-[calc(var(--field-px,0.875rem)-0.25rem)] py-[clamp(0px,calc((var(--field-h,3rem)-2rem)/2),0.5rem)]",
              )}
            >
              <div className="flex min-w-0 items-end gap-x-1">
                <DateInput
                  slot="start"
                  data-slot="date-range-picker-start"
                  className="min-w-0 data-focus-visible:outline-none"
                >
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true" className="text-muted-foreground">
                  –
                </span>
              </div>
              <DateInput
                slot="end"
                data-slot="date-range-picker-end"
                className="min-w-0 data-[focus-visible]:outline-none"
              >
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
            <Button
              aria-label="Choose date range"
              data-slot="date-range-picker-trigger"
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
          <Popover
            data-slot="date-range-picker-popover"
            placement="bottom start"
            className="flex p-3 max-sm:flex-col"
          >
            {presets && <DateRangePickerPresets presets={presets} />}
            <RangeCalendar />
          </Popover>
        </>
      )}
    </AriaDateRangePicker>
  );
}

function DateRangePickerPresets<T extends DateValue>({
  presets,
}: {
  presets: DateRangePickerPreset<T>[];
}) {
  const state = useContext(DateRangePickerStateContext);
  const value = state?.value;
  return (
    <CalendarPresets
      presets={presets.map((preset) => preset.label)}
      selected={
        presets.find(
          (preset) =>
            value?.start &&
            value.end &&
            preset.value.start.compare(value.start) === 0 &&
            preset.value.end.compare(value.end) === 0,
        )?.label ?? null
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
