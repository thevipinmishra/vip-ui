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
import { cn } from "./utils";

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  placeholder?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaTextFieldProps["className"];
  children?: AriaTextFieldProps["children"];
}

export function TextField({
  label,
  description,
  placeholder,
  className,
  children,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      data-slot="text-field"
      className={composeRenderProps(className, (className) =>
        cn("flex w-full flex-col gap-2", className),
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
      className={cn("text-[13px] font-medium text-foreground", className)}
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
        cn(
          "min-h-12 w-full cursor-text rounded-lg border border-input bg-card px-3.5 text-base text-foreground shadow-[var(--shadow-card)] outline-none data-[placeholder]:text-muted-foreground/80 hover:border-primary/45 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 data-[focus-visible]:border-primary data-[focus-visible]:ring-3 data-[focus-visible]:ring-accent data-[invalid]:border-destructive data-[disabled]:cursor-not-allowed data-[disabled]:bg-muted data-[disabled]:opacity-60 sm:text-sm",
          className,
        ),
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
      className={cn("text-xs leading-5 text-muted-foreground", className)}
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
      className={cn("text-xs leading-5 text-destructive", className)}
    />
  );
}
