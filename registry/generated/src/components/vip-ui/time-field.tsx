"use client";

import { useRef } from "react";
import { mergeRefs } from "react-aria/mergeRefs";
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
import { cn } from "./utils";
import { DateSegment } from "./date-segment";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  revalidateField,
  segmentedFieldStyles,
} from "./field-styles";

export function TimeField<T extends TimeValue>({
  className,
  label,
  description,
  children,
  ref,
  onChange,
  ...props
}: TimeFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  return (
    <AriaTimeField
      {...props}
      ref={mergeRefs(fieldRef, ref)}
      onChange={(value) => {
        revalidateField(fieldRef.current);
        onChange?.(value);
      }}
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
              "block content-center px-2.5 py-2 text-base data-[focus-visible]:outline-none sm:text-sm",
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
