"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  ToggleButton as AriaToggleButton,
  composeRenderProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const toggleButtonStyles = tv({
  base: "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium disabled:cursor-default disabled:opacity-50 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  variants: {
    variant: {
      default:
        "border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-muted pressed:bg-muted selected:border-primary/40 selected:bg-accent selected:text-accent-foreground",
      segmented:
        "min-h-11 border border-transparent bg-transparent px-3 sm:min-h-9 text-muted-foreground shadow-none hover:bg-card/70 hover:text-foreground pressed:bg-card/70 selected:border-border selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)]",
      ghost:
        "border border-transparent bg-transparent text-foreground hover:bg-muted pressed:bg-muted selected:bg-accent selected:text-accent-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ToggleButtonStyleProps extends ToggleButtonProps {
  variant?: NonNullable<VariantProps<typeof toggleButtonStyles>["variant"]>;
}

export function ToggleButton({
  className,
  variant = "default",
  ...props
}: ToggleButtonStyleProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaToggleButton
      {...props}
      data-slot="toggle-button"
      data-variant={variant}
      render={
        props.render ??
        ((domProps) => (
          <motion.button
            {...(domProps as HTMLMotionProps<"button">)}
            whileTap={
              reduceMotion || props.isDisabled ? undefined : { scale: 0.96 }
            }
            transition={{ duration: 0.14 }}
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        toggleButtonStyles({ variant, className }),
      )}
    />
  );
}
