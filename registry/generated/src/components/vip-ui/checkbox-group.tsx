"use client";

import type { HTMLAttributes } from "react";
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "./utils";

export function CheckboxGroup({
  className,
  label,
  description,
  children,
  ...props
}: Omit<CheckboxGroupProps, "children"> &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    description?: string;
    children: React.ReactNode;
  }) {
  return (
    <AriaCheckboxGroup
      {...props}
      data-slot="checkbox-group"
      className={cn("grid gap-1", className)}
    >
      {label === undefined ? (
        children
      ) : (
        <>
          <CheckboxGroupLabel>{label}</CheckboxGroupLabel>
          {description && (
            <CheckboxGroupDescription>{description}</CheckboxGroupDescription>
          )}
          <CheckboxGroupItems>{children}</CheckboxGroupItems>
          <CheckboxGroupError />
        </>
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
      className={cn("text-sm font-semibold text-foreground", className)}
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
      className={cn("grid gap-1 pt-1", className)}
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
      className={cn("text-xs leading-5 text-muted-foreground", className)}
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
      className={cn("text-xs text-destructive", className)}
    />
  );
}
