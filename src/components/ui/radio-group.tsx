"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from "react";
import {
  RadioButton as AriaRadioButton,
  type RadioButtonProps as AriaRadioButtonProps,
  RadioField as AriaRadioField,
  type RadioFieldProps as AriaRadioFieldProps,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  composeRenderProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

const radioFieldStyles = tv({
  base: "relative flex min-h-11 min-w-0 flex-col justify-center gap-1 py-1 text-sm text-foreground disabled:opacity-50",
  variants: {
    variant: {
      default: "",
      card: "min-h-12 rounded-lg bg-card px-3.5 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-border outline-offset-4 outline-transparent transition-[background-color,box-shadow,outline-color,outline-offset] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] has-[[data-hovered]]:bg-muted has-[[data-focus-visible]]:outline-2 has-[[data-focus-visible]]:outline-offset-2 has-[[data-focus-visible]]:outline-ring motion-reduce:outline-offset-2 selected:bg-accent selected:ring-primary/40 invalid:ring-destructive/60 forced-colors:border forced-colors:selected:border-[Highlight]",
    },
  },
  defaultVariants: { variant: "default" },
});

type RadioVariant = NonNullable<
  VariantProps<typeof radioFieldStyles>["variant"]
>;

const RadioVariantContext = createContext<RadioVariant>("default");

const RadioStateContext = createContext({
  isSelected: false,
  isHovered: false,
  isPressed: false,
});

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  className,
  children,
  onValueChange,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      data-slot="radio-group"
      onChange={(value) => {
        props.onChange?.(value);
        onValueChange?.(value);
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/radio-group flex min-w-0 flex-col gap-1 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-x-6",
          className,
        ),
      )}
    >
      {label != null && <RadioGroupLabel>{label}</RadioGroupLabel>}
      {description != null && (
        <RadioGroupDescription>{description}</RadioGroupDescription>
      )}
      {children}
      {(label != null || description != null || errorMessage != null) && (
        <RadioGroupError>{errorMessage}</RadioGroupError>
      )}
    </AriaRadioGroup>
  );
}

export function RadioGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="radio-group-label"
      className={cn(
        "w-full pb-1 text-sm font-semibold text-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function RadioGroupDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="radio-group-description"
      className={cn(
        fieldDescriptionStyles,
        "w-full pb-1 [[data-slot=radio-group-label]+&]:-mt-1",
        className,
      )}
    />
  );
}

export function RadioGroupItems({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="radio-group-items"
      className={cn(
        "flex w-full flex-col gap-1 group-data-[orientation=horizontal]/radio-group:flex-row group-data-[orientation=horizontal]/radio-group:flex-wrap group-data-[orientation=horizontal]/radio-group:gap-x-6",
        className,
      )}
    />
  );
}

export function RadioGroupError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="radio-group-error"
      className={cn(fieldErrorStyles, "w-full", className)}
    />
  );
}

export interface RadioProps extends Omit<RadioFieldProps, "children"> {
  /** The label. Omit it and pass aria-label when the option has no visible label. */
  children?: ReactNode;
  description?: ReactNode;
}

export function Radio({ children, description, ...props }: RadioProps) {
  return (
    <RadioField {...props}>
      <RadioButton>
        <RadioIndicator />
        {children != null && <RadioLabel>{children}</RadioLabel>}
      </RadioButton>
      {description != null && (
        <RadioDescription>{description}</RadioDescription>
      )}
    </RadioField>
  );
}

export interface RadioFieldProps extends AriaRadioFieldProps {
  ref?: React.Ref<HTMLDivElement>;
  variant?: RadioVariant;
}

export function RadioField({
  variant = "default",
  className,
  ...props
}: RadioFieldProps) {
  return (
    <RadioVariantContext.Provider value={variant}>
      <AriaRadioField
        {...props}
        data-slot="radio"
        data-variant={variant}
        className={composeRenderProps(className, (className) =>
          radioFieldStyles({ variant, className }),
        )}
      />
    </RadioVariantContext.Provider>
  );
}

export function RadioButton({
  className,
  children,
  ...props
}: AriaRadioButtonProps & React.RefAttributes<HTMLLabelElement>) {
  return (
    <AriaRadioButton
      {...props}
      data-slot="radio-button"
      className={composeRenderProps(className, (className) =>
        cn(
          // The ::after layer stretches the hit area over the whole field,
          // so the description and card padding select the option too.
          "group/radio flex min-w-0 cursor-pointer items-start gap-3 after:absolute after:inset-0 disabled:cursor-default read-only:cursor-default",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (children, state) => (
        <RadioStateContext.Provider value={state}>
          {children}
        </RadioStateContext.Provider>
      ))}
    </AriaRadioButton>
  );
}

export function RadioIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const variant = useContext(RadioVariantContext);
  const { isSelected, isHovered, isPressed } = useContext(RadioStateContext);
  const reduceMotion = useReducedMotion();
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="radio-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full border border-muted-foreground/75 bg-card shadow-[var(--shadow-inset)] transition-[border-color,outline-color,outline-offset] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/radio:border-primary group-selected/radio:border-primary group-invalid/radio:border-destructive group-invalid/radio:group-hover/radio:border-destructive forced-colors:border-[ButtonText] forced-colors:group-selected/radio:border-[Highlight] forced-colors:group-disabled/radio:border-[GrayText]",
        // Card radios show the focus ring around the whole card instead.
        variant === "default" &&
          "outline-offset-4 outline-transparent group-focus-visible/radio:outline-2 group-focus-visible/radio:outline-offset-2 group-focus-visible/radio:outline-ring motion-reduce:outline-offset-2",
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={{
          scale: isSelected ? (isPressed ? 0.85 : isHovered ? 1.12 : 1) : 0.86,
          opacity: isSelected ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : duration.fast,
          ease: easeOut,
        }}
        className="size-2 rounded-full bg-primary forced-colors:bg-[Highlight] forced-colors:group-disabled/radio:bg-[GrayText]"
      />
    </span>
  );
}

export function RadioLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="radio-label"
      className={cn("min-w-0 font-medium [overflow-wrap:anywhere]", className)}
    />
  );
}

export function RadioDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="radio-description"
      className={cn(fieldDescriptionStyles, "ps-8", className)}
    />
  );
}

export const RadioGroupItem = Radio;
