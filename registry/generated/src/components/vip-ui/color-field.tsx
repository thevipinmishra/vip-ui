"use client";

import {
  ColorField as AriaColorField,
  type ColorFieldProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldInputStyles,
  fieldLabelStyles,
} from "./field-styles";

export function ColorField({
  className,
  label,
  description,
  children,
  ...props
}: ColorFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
  }) {
  return (
    <AriaColorField
      {...props}
      data-slot="color-field"
      className={composeRenderProps(className, (className) =>
        cn("grid gap-2", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label data-slot="color-field-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <Input
            data-slot="color-field-input"
            className={cn(fieldInputStyles, "px-3.5")}
          />
          {description && (
            <Text
              slot="description"
              data-slot="color-field-description"
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="color-field-error"
            className={fieldErrorStyles}
          />
        </>
      )}
    </AriaColorField>
  );
}
