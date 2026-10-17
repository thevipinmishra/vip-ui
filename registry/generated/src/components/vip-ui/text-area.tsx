"use client";

import {
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  FieldError,
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

export interface TextAreaProps
  extends Omit<AriaTextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  size?: Size;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaTextFieldProps["className"];
  children?: AriaTextFieldProps["children"];
}

export function TextArea({
  label,
  description,
  placeholder,
  rows = 4,
  size,
  className,
  children,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      data-slot="text-area"
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
          {label && <TextAreaLabel>{label}</TextAreaLabel>}
          <TextAreaInput rows={rows} placeholder={placeholder} />
          {description && (
            <TextAreaDescription>{description}</TextAreaDescription>
          )}
          <TextAreaError />
        </>
      )}
    </AriaTextField>
  );
}

export function TextAreaLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="text-area-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function TextAreaInput({
  className,
  ...props
}: React.ComponentProps<typeof AriaTextArea>) {
  return (
    <AriaTextArea
      {...props}
      data-slot="text-area-input"
      className={composeRenderProps(className, (className) =>
        cn(
          fieldInputStyles,
          fieldPaddingX,
          "min-h-28 resize-y py-3 leading-6",
          className,
        ),
      )}
    />
  );
}

export function TextAreaDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="text-area-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function TextAreaError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="text-area-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
