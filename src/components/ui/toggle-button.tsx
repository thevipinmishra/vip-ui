"use client";

import { motion, useReducedMotion } from "motion/react";
import { useContext } from "react";
import {
  ToggleButton as AriaToggleButton,
  composeRenderProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { springLayout, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SingleToggleGroupContext } from "./toggle-button-group";

const toggleButtonStyles = tv({
  base: "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:pressed:scale-[0.96] disabled:cursor-default disabled:opacity-50 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:bg-muted pressed:bg-muted selected:border-primary/40 selected:bg-accent selected:text-accent-foreground",
      segmented:
        "border border-transparent bg-transparent px-3 text-muted-foreground shadow-none hover:bg-card/70 hover:text-foreground pressed:bg-card/70 selected:border-border selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] sm:min-h-9",
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
  children,
  variant = "default",
  ...props
}: ToggleButtonStyleProps) {
  const reduceMotion = useReducedMotion();
  const groupedSelection =
    useContext(SingleToggleGroupContext) && variant === "segmented";
  return (
    <AriaToggleButton
      {...props}
      data-slot="toggle-button"
      data-variant={variant}
      className={composeRenderProps(className, (className) =>
        toggleButtonStyles({
          variant,
          className: cn(
            groupedSelection &&
              "relative isolate selected:border-transparent selected:bg-transparent selected:shadow-none",
            className,
          ),
        }),
      )}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {groupedSelection && isSelected && (
            <motion.span
              layoutId="toggle-group-selection"
              initial={false}
              aria-hidden="true"
              transition={transitionFor(reduceMotion, springLayout)}
              className="pointer-events-none absolute inset-0 -z-10 rounded-md border border-border bg-card shadow-[var(--shadow-card)] forced-colors:border-[Highlight]"
            />
          )}
          {content}
        </>
      ))}
    </AriaToggleButton>
  );
}
