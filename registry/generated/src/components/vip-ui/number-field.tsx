"use client";

import {
  CaretDownIcon,
  CaretUpIcon,
  MinusIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
  type ButtonProps,
  composeRenderProps,
  FieldError,
  Group,
  type GroupProps,
  Input,
  type InputProps,
  Label,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldIcon,
  fieldInnerHeight,
  fieldLabelStyles,
  fieldSizeStyles,
  fieldText,
  fieldTriggerStyles,
  segmentedFieldStyles,
} from "./field-styles";
import type { Size } from "./size";

const stepperButtonStyles = cn(
  fieldTriggerStyles,
  "bg-muted/70 text-foreground hover:bg-accent hover:text-accent-foreground pressed:bg-accent pressed:text-accent-foreground disabled:bg-muted/40 disabled:opacity-40 disabled:hover:bg-muted/40 disabled:hover:text-foreground",
);

const stackedButtonStyles =
  "grid min-h-0 w-full cursor-pointer place-items-center text-muted-foreground outline-none transition-[color,background-color] duration-150 ease-out-quint hover:bg-muted hover:text-foreground pressed:bg-accent pressed:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-muted-foreground [&_svg]:size-3 [&_svg]:transition-[translate] [&_svg]:duration-150 [&_svg]:ease-out-quint";

export interface NumberFieldProps
  extends Omit<AriaNumberFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  size?: Size;
  steppers?: "split" | "stacked";
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaNumberFieldProps["className"];
  children?: AriaNumberFieldProps["children"];
}

export function NumberField({
  label,
  description,
  size,
  steppers = "split",
  className,
  children,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      data-slot="number-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group grid w-full min-w-0 grid-cols-1 gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      {children ?? (
        <>
          {label && <NumberFieldLabel>{label}</NumberFieldLabel>}
          {steppers === "stacked" ? (
            <NumberFieldGroup>
              <NumberFieldInput className="text-start" />
              <NumberFieldSteppers />
            </NumberFieldGroup>
          ) : (
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          )}
          {description && (
            <NumberFieldDescription>{description}</NumberFieldDescription>
          )}
          <NumberFieldError />
        </>
      )}
    </AriaNumberField>
  );
}

export function NumberFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="number-field-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function NumberFieldGroup({
  className,
  ...props
}: GroupProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <Group
      {...props}
      data-slot="number-field-group"
      className={composeRenderProps(className, (className) =>
        cn(
          segmentedFieldStyles,
          fieldIcon,
          "gap-(--field-inset,0.25rem) px-(--field-inset,0.25rem)",
          className,
        ),
      )}
    />
  );
}

export function NumberFieldInput({ className, ...props }: InputProps) {
  return (
    <Input
      {...props}
      data-slot="number-field-input"
      className={composeRenderProps(className, (className) =>
        cn(
          fieldInnerHeight,
          fieldText,
          "min-w-0 flex-1 cursor-text bg-transparent px-[calc(var(--field-px,0.875rem)-var(--field-inset,0.25rem))] text-center font-medium tabular-nums outline-none placeholder:font-normal placeholder:text-muted-foreground/80 disabled:cursor-not-allowed",
          className,
        ),
      )}
    />
  );
}

export function NumberFieldDecrement({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      slot="decrement"
      data-slot="number-field-decrement"
      aria-label={props["aria-label"] ?? "Decrease"}
      className={composeRenderProps(className, (className) =>
        cn(stepperButtonStyles, className),
      )}
    >
      {children ?? <MinusIcon aria-hidden="true" />}
    </Button>
  );
}

export function NumberFieldIncrement({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      slot="increment"
      data-slot="number-field-increment"
      aria-label={props["aria-label"] ?? "Increase"}
      className={composeRenderProps(className, (className) =>
        cn(stepperButtonStyles, className),
      )}
    >
      {children ?? <PlusIcon aria-hidden="true" />}
    </Button>
  );
}

export function NumberFieldSteppers({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      data-slot="number-field-steppers"
      className={cn(
        "grid h-[calc(var(--field-h,3rem)-2px-2*var(--field-inset,0.25rem))] w-[calc((var(--field-h,3rem)-2px-2*var(--field-inset,0.25rem))*0.75)] shrink-0 grid-rows-2 overflow-hidden rounded-[max(0.1875rem,calc(var(--field-radius,var(--radius-lg))-1px-var(--field-inset,0.25rem)))] bg-muted/50 inset-ring-1 inset-ring-border/60 forced-colors:border",
        className,
      )}
    >
      <Button
        slot="increment"
        data-slot="number-field-increment"
        aria-label="Increase"
        className={cn(
          stackedButtonStyles,
          "motion-safe:pressed:[&_svg]:-translate-y-px",
        )}
      >
        <CaretUpIcon weight="bold" aria-hidden="true" />
      </Button>
      <Button
        slot="decrement"
        data-slot="number-field-decrement"
        aria-label="Decrease"
        className={cn(
          stackedButtonStyles,
          "border-t border-border/60 motion-safe:pressed:[&_svg]:translate-y-px",
        )}
      >
        <CaretDownIcon weight="bold" aria-hidden="true" />
      </Button>
    </div>
  );
}

export function NumberFieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="number-field-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function NumberFieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="number-field-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
