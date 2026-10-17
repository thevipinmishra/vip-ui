"use client";

import { type ReactNode, useState } from "react";
import {
  CheckboxButton as AriaCheckboxButton,
  type CheckboxButtonProps as AriaCheckboxButtonProps,
  CheckboxField as AriaCheckboxField,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
  composeRenderProps,
  FieldError,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { cn } from "./utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

export interface CheckboxProps
  extends Omit<AriaCheckboxFieldProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  /** The label. Omit it and pass aria-label when the checkbox has no visible label. */
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  children,
  description,
  errorMessage,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  // React Aria only supports a controlled indeterminate state. This keeps
  // defaultChecked="indeterminate" until the first change.
  const [defaultIndeterminate, setDefaultIndeterminate] = useState(
    defaultChecked === "indeterminate",
  );
  return (
    <CheckboxField
      {...props}
      isSelected={checked === undefined ? props.isSelected : checked === true}
      defaultSelected={
        defaultChecked === undefined
          ? props.defaultSelected
          : defaultChecked === true
      }
      isIndeterminate={
        checked === undefined
          ? props.isIndeterminate || defaultIndeterminate || undefined
          : checked === "indeterminate"
      }
      onChange={(isSelected) => {
        setDefaultIndeterminate(false);
        props.onChange?.(isSelected);
        onCheckedChange?.(isSelected);
      }}
    >
      <CheckboxButton>
        <CheckboxIndicator />
        {children != null && <CheckboxLabel>{children}</CheckboxLabel>}
      </CheckboxButton>
      {description != null && (
        <CheckboxDescription>{description}</CheckboxDescription>
      )}
      <CheckboxError>{errorMessage}</CheckboxError>
    </CheckboxField>
  );
}

export function CheckboxField({
  className,
  ...props
}: AriaCheckboxFieldProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaCheckboxField
      {...props}
      data-slot="checkbox"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative inline-flex min-h-11 min-w-0 max-w-full flex-col justify-center gap-1 py-1 text-sm text-foreground disabled:opacity-50",
          className,
        ),
      )}
    />
  );
}

export function CheckboxButton({
  className,
  ...props
}: AriaCheckboxButtonProps & React.RefAttributes<HTMLLabelElement>) {
  return (
    <AriaCheckboxButton
      {...props}
      data-slot="checkbox-button"
      className={composeRenderProps(className, (className) =>
        cn(
          // The ::after layer stretches the hit area over the whole field,
          // so the description toggles the checkbox too.
          "group/checkbox flex min-w-0 cursor-pointer items-start gap-3 after:absolute after:inset-0 disabled:cursor-default read-only:cursor-default",
          className,
        ),
      )}
    />
  );
}

export function CheckboxIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-sm border border-muted-foreground/75 bg-card shadow-[var(--shadow-inset)] outline-offset-4 outline-transparent transition-[background-color,border-color,outline-color,outline-offset,scale] duration-150 ease-out-quint group-hover/checkbox:border-primary motion-safe:group-pressed/checkbox:scale-90 group-selected/checkbox:border-primary group-selected/checkbox:bg-primary group-indeterminate/checkbox:border-primary group-indeterminate/checkbox:bg-primary group-invalid/checkbox:border-destructive group-invalid/checkbox:group-hover/checkbox:border-destructive group-invalid/checkbox:group-selected/checkbox:bg-destructive group-focus-visible/checkbox:outline-2 group-focus-visible/checkbox:outline-offset-2 group-focus-visible/checkbox:outline-ring motion-reduce:outline-offset-2 forced-colors:border-[ButtonText] forced-colors:group-selected/checkbox:border-[Highlight] forced-colors:group-selected/checkbox:bg-[Highlight] forced-colors:group-indeterminate/checkbox:border-[Highlight] forced-colors:group-indeterminate/checkbox:bg-[Highlight] forced-colors:group-disabled/checkbox:border-[GrayText] forced-colors:group-disabled/checkbox:bg-[Canvas]",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-3.5 text-primary-foreground forced-colors:text-[HighlightText] forced-colors:group-disabled/checkbox:text-[GrayText]"
      >
        <path
          d="M2.75 8 6.25 11.5 13.25 4.5"
          pathLength={1}
          className={checkboxStrokeStyles(
            "group-selected/checkbox:not-group-indeterminate/checkbox:[stroke-dashoffset:0]",
          )}
        />
        <path
          d="M3 8h10"
          pathLength={1}
          className={checkboxStrokeStyles(
            "group-indeterminate/checkbox:[stroke-dashoffset:0]",
          )}
        />
      </svg>
    </span>
  );
}

function checkboxStrokeStyles(checked: string) {
  return cn(
    "[stroke-dasharray:1_2] [stroke-dashoffset:1.01] transition-[stroke-dashoffset] duration-200 ease-out-quint motion-reduce:transition-none",
    checked,
  );
}

export function CheckboxLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="checkbox-label"
      className={cn("min-w-0 font-medium [overflow-wrap:anywhere]", className)}
    />
  );
}

export function CheckboxDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="checkbox-description"
      className={cn(fieldDescriptionStyles, "ps-8", className)}
    />
  );
}

export function CheckboxError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="checkbox-error"
      // relative keeps the message above the hit area layer.
      className={cn(fieldErrorStyles, "relative ps-8", className)}
    />
  );
}
