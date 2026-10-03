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
  segmentedFieldStyles,
} from "./field-styles";

export function TimeField<T extends TimeValue>({
  className,
  label,
  description,
  children,
  ...props
}: TimeFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaTimeField
      {...props}
      data-slot="time-field"
      className={composeRenderProps(className, (className) =>
        cn("group grid gap-2 data-[focus-visible]:outline-none", className),
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
              "px-3 text-sm data-[focus-visible]:outline-none",
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
