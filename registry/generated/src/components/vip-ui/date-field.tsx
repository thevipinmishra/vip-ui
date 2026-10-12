"use client";

import { useRef } from "react";
import { mergeRefs } from "react-aria/mergeRefs";
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
  revalidateField,
  segmentedFieldStyles,
} from "./field-styles";

export function DateField<T extends DateValue>({
  className,
  label,
  description,
  children,
  ref,
  onChange,
  ...props
}: DateFieldProps<T> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  return (
    <AriaDateField
      {...props}
      ref={mergeRefs(fieldRef, ref)}
      onChange={(value) => {
        revalidateField(fieldRef.current);
        onChange?.(value);
      }}
      data-slot="date-field"
      className={composeRenderProps(className, (className) =>
        cn("group grid gap-2 data-[focus-visible]:outline-none", className),
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
              "block content-center px-2.5 py-2 text-base data-[focus-visible]:outline-none sm:text-sm",
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
