"use client";

import type { HTMLAttributes, ReactNode } from "react";
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  composeRenderProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
}

export function CheckboxGroup({
  className,
  label,
  description,
  errorMessage,
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      data-slot="checkbox-group"
      className={composeRenderProps(className, (className) =>
        cn("flex min-w-0 flex-col gap-1", className),
      )}
    >
      {label != null && <CheckboxGroupLabel>{label}</CheckboxGroupLabel>}
      {description != null && (
        <CheckboxGroupDescription>{description}</CheckboxGroupDescription>
      )}
      {children}
      {(label != null || description != null || errorMessage != null) && (
        <CheckboxGroupError>{errorMessage}</CheckboxGroupError>
      )}
    </AriaCheckboxGroup>
  );
}

export function CheckboxGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="checkbox-group-label"
      className={cn(
        "pb-1 text-sm font-semibold text-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function CheckboxGroupItems({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="checkbox-group-items"
      className={cn("flex flex-col gap-1", className)}
    />
  );
}

export function CheckboxGroupDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="checkbox-group-description"
      className={cn(
        fieldDescriptionStyles,
        "pb-1 [[data-slot=checkbox-group-label]+&]:-mt-1",
        className,
      )}
    />
  );
}

export function CheckboxGroupError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="checkbox-group-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
