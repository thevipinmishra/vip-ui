"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext } from "react";
import {
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioProps as AriaRadioProps,
  composeRenderProps,
  Label,
  Text,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";

const radioStyles = tv({
  base: "group flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-foreground hover:bg-muted/70 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-50",
  variants: {
    variant: {
      default: "",
      card: "min-h-14 rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-card)] ring-1 ring-border hover:bg-muted data-[selected]:bg-accent data-[selected]:ring-primary/40",
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
        cn("grid gap-1", className),
      )}
    >
      {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
      {description && (
        <RadioGroupDescription>{description}</RadioGroupDescription>
      )}
      {label ? (
        <div data-slot="radio-group-items" className="grid gap-1 pt-2">
          {children}
        </div>
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
        radioStyles({ variant, className }),
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
      className={cn("text-xs leading-5 text-muted-foreground", className)}
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
        "grid size-5 shrink-0 place-items-center rounded-full border border-input bg-card group-data-[selected]:border-primary",
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
          duration: reduceMotion ? 0 : 0.16,
          ease: [0.23, 1, 0.32, 1],
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
        "mt-0.5 block text-xs leading-5 text-muted-foreground",
        className,
      )}
    />
  );
}

export const RadioGroupItem = Radio;
