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
  fieldPaddingX,
  fieldSizeStyles,
} from "./field-styles";
import type { Size } from "./size";

export function ColorField({
  className,
  label,
  description,
  size,
  children,
  ...props
}: ColorFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    size?: Size;
  }) {
  return (
    <AriaColorField
      {...props}
      data-slot="color-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn("grid gap-2", size && fieldSizeStyles[size], className),
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
            className={cn(fieldInputStyles, fieldPaddingX)}
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
