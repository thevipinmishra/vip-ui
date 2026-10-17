"use client";

import {
  DateField as AriaDateField,
  composeRenderProps,
  type DateFieldProps,
  DateInput,
  type DateValue,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
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

export function DateField<T extends DateValue>({
  className,
  label,
  description,
  size,
  children,
  ...props
}: DateFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
  }) {
  return (
    <AriaDateField
      {...props}
      data-slot="date-field"
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
            <Label data-slot="date-field-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <DateInput
            data-slot="date-field-input"
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
              data-slot="date-field-description"
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="date-field-error"
            className={fieldErrorStyles}
          />
        </>
      )}
    </AriaDateField>
  );
}
