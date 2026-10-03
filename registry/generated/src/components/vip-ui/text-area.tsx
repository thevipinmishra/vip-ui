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
} from "./field-styles";

export interface TextAreaProps
  extends Omit<AriaTextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  placeholder?: string;
  rows?: number;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaTextFieldProps["className"];
  children?: AriaTextFieldProps["children"];
}

export function TextArea({
  label,
  description,
  placeholder,
  rows = 4,
  className,
  children,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      data-slot="text-area"
      className={composeRenderProps(className, (className) =>
        cn("flex w-full flex-col gap-2", className),
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
          "min-h-28 resize-y px-3.5 py-3 leading-6",
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
