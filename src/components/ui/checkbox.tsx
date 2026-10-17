"use client";

import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
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
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

const CheckboxStateContext = createContext({
  isSelected: false,
  isIndeterminate: false,
  isHovered: false,
  isPressed: false,
});

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
  children,
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
    >
      {composeRenderProps(children, (children, state) => (
        <CheckboxStateContext.Provider value={state}>
          {children}
        </CheckboxStateContext.Provider>
      ))}
    </AriaCheckboxButton>
  );
}

export function CheckboxIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { isSelected, isIndeterminate, isHovered, isPressed } =
    useContext(CheckboxStateContext);
  const reduceMotion = useReducedMotion();
  const isChecked = isSelected || isIndeterminate;
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-sm border border-muted-foreground/75 bg-card shadow-[var(--shadow-inset)] outline-offset-4 outline-transparent transition-[background-color,border-color,outline-color,outline-offset] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/checkbox:border-primary group-selected/checkbox:border-primary group-selected/checkbox:bg-primary group-indeterminate/checkbox:border-primary group-indeterminate/checkbox:bg-primary group-invalid/checkbox:border-destructive group-invalid/checkbox:group-hover/checkbox:border-destructive group-invalid/checkbox:group-selected/checkbox:bg-destructive group-focus-visible/checkbox:outline-2 group-focus-visible/checkbox:outline-offset-2 group-focus-visible/checkbox:outline-ring motion-reduce:outline-offset-2 forced-colors:border-[ButtonText] forced-colors:group-selected/checkbox:border-[Highlight] forced-colors:group-selected/checkbox:bg-[Highlight] forced-colors:group-indeterminate/checkbox:border-[Highlight] forced-colors:group-indeterminate/checkbox:bg-[Highlight] forced-colors:group-disabled/checkbox:border-[GrayText] forced-colors:group-disabled/checkbox:bg-[Canvas]",
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={{
          scale: isChecked ? (isPressed ? 0.9 : isHovered ? 1.06 : 1) : 0.86,
          opacity: isChecked ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : duration.fast,
          ease: easeOut,
        }}
        className="text-primary-foreground forced-colors:text-[HighlightText] forced-colors:group-disabled/checkbox:text-[GrayText]"
      >
        {isIndeterminate ? (
          <MinusIcon size={13} weight="bold" />
        ) : (
          <CheckIcon size={13} weight="bold" />
        )}
      </motion.span>
    </span>
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
