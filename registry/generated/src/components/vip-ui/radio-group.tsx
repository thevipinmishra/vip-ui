"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
  composeRenderProps,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

const radioStyles = tv({
  base: "group flex min-h-11 cursor-pointer items-center gap-3 rounded-md text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring read-only:cursor-default disabled:cursor-default disabled:opacity-50",
  variants: {
    variant: {
      default: "",
      card: "min-h-14 rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-card)] ring-1 ring-border transition-[background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted selected:bg-accent selected:ring-primary/40",
    },
  },
  defaultVariants: { variant: "default" },
});

const RadioStateContext = createContext({
  isSelected: false,
  isHovered: false,
  isPressed: false,
});

export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, "children" | "className"> {
  label?: string;
  description?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaRadioGroupProps["className"];
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  label,
  description,
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
        cn("group/radio-group grid gap-1", className),
      )}
    >
      {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
      {description && (
        <RadioGroupDescription>{description}</RadioGroupDescription>
      )}
      {label ? (
        <>
          <RadioGroupItems>{children}</RadioGroupItems>
          <RadioGroupError />
        </>
      ) : (
        children
      )}
    </AriaRadioGroup>
  );
}

export interface RadioProps
  extends Omit<AriaRadioProps, "children" | "className"> {
  label?: string;
  description?: string;
  variant?: NonNullable<VariantProps<typeof radioStyles>["variant"]>;
  ref?: React.Ref<HTMLLabelElement>;
  className?: AriaRadioProps["className"];
  children?: AriaRadioProps["children"];
}

export function Radio({
  label,
  description,
  variant = "default",
  className,
  children,
  ...props
}: RadioProps) {
  return (
    <AriaRadio
      {...props}
      data-slot="radio"
      data-variant={variant}
      className={composeRenderProps(className, (className) =>
        radioStyles({
          variant,
          className: cn(description && "items-start", className),
        }),
      )}
    >
      {(state) => (
        <RadioStateContext.Provider value={state}>
          {typeof children === "function"
            ? children(state)
            : (children ?? (
                <>
                  <RadioIndicator />
                  <span className="min-w-0">
                    {label && <RadioLabel>{label}</RadioLabel>}
                    {description && (
                      <RadioDescription>{description}</RadioDescription>
                    )}
                  </span>
                </>
              ))}
        </RadioStateContext.Provider>
      )}
    </AriaRadio>
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
      className={cn("text-sm font-semibold text-foreground", className)}
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
      className={cn(fieldDescriptionStyles, className)}
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
        "grid gap-1 pt-2 group-data-[orientation=horizontal]/radio-group:flex group-data-[orientation=horizontal]/radio-group:flex-wrap group-data-[orientation=horizontal]/radio-group:gap-x-6",
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
      className={cn(fieldErrorStyles, className)}
    />
  );
}

export function RadioIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { isSelected, isHovered, isPressed } = useContext(RadioStateContext);
  const reduceMotion = useReducedMotion();
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="radio-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full border border-input bg-card shadow-[var(--shadow-inset)] transition-[border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-primary/60 group-invalid:border-destructive group-invalid:group-hover:border-destructive group-selected:border-primary",
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
        className="size-2 rounded-full bg-primary"
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
      className={cn("block text-sm font-medium", className)}
    />
  );
}

export function RadioDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="radio-description"
      className={cn(
        "mt-1 block text-xs leading-5 text-muted-foreground",
        className,
      )}
    />
  );
}

export const RadioGroupItem = Radio;
