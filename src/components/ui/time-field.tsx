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
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  fieldSizeStyles,
  fieldText,
  segmentedFieldStyles,
} from "./field-styles";
import type { Size } from "./size";

export function TimeField<T extends TimeValue>({
  className,
  label,
  description,
  size,
  children,
  ...props
}: TimeFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
  }) {
  return (
    <AriaTimeField
      {...props}
      data-slot="time-field"
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
            <Label data-slot="time-field-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <DateInput
            data-slot="time-field-input"
            className={cn(
              segmentedFieldStyles,
              fieldText,
              "block content-center px-[calc(var(--field-px,0.875rem)-0.25rem)] py-[clamp(0px,calc((var(--field-h,3rem)-2rem)/2),0.5rem)] data-[focus-visible]:outline-none",
            )}
          >
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          {description && (
            <Text
              slot="description"
              data-slot="time-field-description"
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="time-field-error"
            className={fieldErrorStyles}
          />
        </>
      )}
    </AriaTimeField>
  );
}
