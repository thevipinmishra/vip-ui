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
import { cn } from "@/lib/utils";

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
      className={cn("text-[13px] font-medium text-foreground", className)}
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
          "min-h-28 w-full cursor-text resize-y rounded-lg border border-input bg-card px-3.5 py-3 text-base leading-6 text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground/80 hover:border-primary/45 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-3 invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 sm:text-sm",
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
      className={cn("text-xs leading-5 text-muted-foreground", className)}
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
      className={cn("text-xs leading-5 text-destructive", className)}
    />
  );
}
