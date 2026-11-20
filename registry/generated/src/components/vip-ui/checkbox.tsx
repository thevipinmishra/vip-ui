"use client";

import { createContext, type ReactNode, useContext } from "react";
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
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";
import {
  choiceCardStyles,
  fieldDescriptionStyles,
  fieldErrorStyles,
} from "./field-styles";

const checkboxFieldStyles = tv({
  base: "relative inline-flex min-w-0 max-w-full flex-col justify-center gap-1 py-1 text-sm text-foreground disabled:opacity-50",
  variants: {
    variant: {
      default: "",
      card: ["flex", choiceCardStyles],
    },
  },
  defaultVariants: { variant: "default" },
});

type CheckboxVariant = NonNullable<
  VariantProps<typeof checkboxFieldStyles>["variant"]
>;

const CheckboxVariantContext = createContext<CheckboxVariant>("default");

export interface CheckboxProps extends Omit<CheckboxFieldProps, "children"> {
  /** The label. Omit it and pass aria-label when the checkbox has no visible label. */
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Checkbox({
  children,
  description,
  errorMessage,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxField {...props}>
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

export interface CheckboxFieldProps extends AriaCheckboxFieldProps {
  ref?: React.Ref<HTMLDivElement>;
  variant?: CheckboxVariant;
}

export function CheckboxField({
  variant = "default",
  className,
  ...props
}: CheckboxFieldProps) {
  return (
    <CheckboxVariantContext.Provider value={variant}>
      <AriaCheckboxField
        {...props}
        data-slot="checkbox"
        data-variant={variant}
        className={composeRenderProps(className, (className) =>
          checkboxFieldStyles({ variant, className }),
        )}
      />
    </CheckboxVariantContext.Provider>
  );
}

export function CheckboxButton({
  className,
  ...props
}: AriaCheckboxButtonProps & React.RefAttributes<HTMLLabelElement>) {
  const variant = useContext(CheckboxVariantContext);
  return (
    <AriaCheckboxButton
      {...props}
      data-slot="checkbox-button"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/checkbox flex min-w-0 cursor-pointer items-center gap-3 disabled:cursor-default read-only:cursor-default",
          // Extends the hit area to 44px on touch screens without adding row
          // height. Descriptions stay outside it.
          variant === "default" &&
            "relative pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:top-1/2 pointer-coarse:after:h-[max(100%,2.75rem)] pointer-coarse:after:-translate-y-1/2",
          // Card only: the card itself is the target, so include the padding
          // and description. Keep descriptions plain text in this variant.
          variant === "card" && "items-start after:absolute after:inset-0",
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
  const variant = useContext(CheckboxVariantContext);
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-sm border border-muted-foreground/75 bg-card shadow-(--shadow-inset) transition-[background-color,border-color,box-shadow,outline-color,outline-offset,scale] duration-150 ease-out-quint group-hover/checkbox:border-primary motion-safe:group-pressed/checkbox:scale-90 group-selected/checkbox:border-primary group-selected/checkbox:bg-primary group-selected/checkbox:shadow-none group-indeterminate/checkbox:border-primary group-indeterminate/checkbox:bg-primary group-indeterminate/checkbox:shadow-none group-invalid/checkbox:border-destructive group-invalid/checkbox:group-hover/checkbox:border-destructive group-invalid/checkbox:group-selected/checkbox:bg-destructive group-invalid/checkbox:group-indeterminate/checkbox:bg-destructive forced-colors:border-[ButtonText] forced-colors:group-selected/checkbox:border-[Highlight] forced-colors:group-selected/checkbox:bg-[Highlight] forced-colors:group-indeterminate/checkbox:border-[Highlight] forced-colors:group-indeterminate/checkbox:bg-[Highlight] forced-colors:group-disabled/checkbox:border-[GrayText] forced-colors:group-disabled/checkbox:bg-[Canvas]",
        variant === "default" &&
          "outline-offset-4 outline-transparent group-focus-visible/checkbox:outline-2 group-focus-visible/checkbox:outline-offset-2 group-focus-visible/checkbox:outline-ring motion-reduce:outline-offset-2",
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
      className={cn("min-w-0 font-medium wrap-anywhere", className)}
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
      // relative keeps the message above the card hit area.
      className={cn(fieldErrorStyles, "relative ps-8", className)}
    />
  );
}
