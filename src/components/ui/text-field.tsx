"use client";

import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldInputStyles,
  fieldLabelStyles,
  fieldPaddingX,
  fieldSizeStyles,
} from "./field-styles";
import type { Size } from "./size";

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaTextFieldProps["className"];
  children?: AriaTextFieldProps["children"];
}

export function TextField({
  label,
  description,
  placeholder,
  size,
  className,
  children,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      data-slot="text-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "flex w-full min-w-0 flex-col gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      {children ?? (
        <>
          {label && <TextFieldLabel>{label}</TextFieldLabel>}
          <TextFieldInput placeholder={placeholder} />
          {description && (
            <TextFieldDescription>{description}</TextFieldDescription>
          )}
          <TextFieldError />
        </>
      )}
    </AriaTextField>
  );
}

export function TextFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="text-field-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function TextFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      data-slot="text-field-input"
      className={composeRenderProps(className, (className) =>
        cn(fieldInputStyles, fieldPaddingX, className),
      )}
    />
  );
}

export function TextFieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="text-field-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function TextFieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="text-field-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
