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
  orientation?: "horizontal" | "vertical";
  children: ReactNode;
}

export function CheckboxGroup({
  className,
  label,
  description,
  errorMessage,
  orientation = "vertical",
  children,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      data-slot="checkbox-group"
      data-orientation={orientation}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/checkbox-group flex min-w-0 flex-col gap-1 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-x-6",
          className,
        ),
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
        "w-full pb-1 text-sm font-semibold text-foreground [overflow-wrap:anywhere]",
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
      className={cn(
        "flex w-full flex-col gap-1 group-data-[orientation=horizontal]/checkbox-group:flex-row group-data-[orientation=horizontal]/checkbox-group:flex-wrap group-data-[orientation=horizontal]/checkbox-group:gap-x-6",
        className,
      )}
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
        "w-full pb-1 [[data-slot=checkbox-group-label]+&]:-mt-1",
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
      className={cn(fieldErrorStyles, "w-full", className)}
    />
  );
}
