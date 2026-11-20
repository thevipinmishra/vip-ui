"use client";

import { motion, useReducedMotion } from "motion/react";
import { useContext } from "react";
import {
  ToggleButton as AriaToggleButton,
  composeRenderProps,
  type ToggleButtonProps,
  ToggleGroupStateContext,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { springLayout, transitionFor } from "./motion";
import { cn } from "./utils";
import { buttonLabel, touchTarget } from "./button-styles";
import { GroupFrameContext, type Size, useSize } from "./size";

const toggleButtonStyles = tv({
  base: "inline-flex min-h-10 max-w-full shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 outline-offset-4 outline-transparent transition-[color,background-color,border-color,box-shadow,scale,outline-color,outline-offset] duration-150 ease-out-quint motion-safe:pressed:scale-[0.96] disabled:cursor-default disabled:opacity-50 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default:
        "border border-border bg-card text-foreground shadow-(--shadow-card) hover:bg-muted pressed:bg-muted selected:border-primary/40 selected:bg-accent selected:text-accent-foreground",
      segmented:
        "border border-transparent bg-transparent px-3 text-muted-foreground shadow-none hover:bg-card/70 in-data-[item-highlight=under]:not-selected:hover:bg-transparent hover:text-foreground pressed:bg-card/70 selected:border-border selected:bg-card selected:text-foreground selected:shadow-(--shadow-card)",
      ghost:
        "border border-transparent bg-transparent text-foreground hover:bg-muted in-data-[item-highlight=under]:not-selected:hover:bg-transparent pressed:bg-muted selected:bg-accent selected:text-accent-foreground",
    },
    size: {
      xs: `min-h-7 gap-1.5 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `min-h-8 px-3 ${touchTarget}`,
      md: `min-h-10 px-4 ${touchTarget}`,
      lg: "min-h-12 rounded-lg px-5 text-base [&_svg:not([class*='size-'])]:size-5",
      xl: "min-h-14 gap-2.5 rounded-xl px-6 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    framed: {
      true: "",
    },
    iconOnly: {
      true: "w-10 px-0 [&_svg:not([class*='size-'])]:size-4.5",
    },
  },
  compoundVariants: [
    {
      variant: ["default", "ghost"],
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-3 has-[>[data-icon=inline-end]]:pr-3",
    },
    {
      variant: "segmented",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-2.5 has-[>[data-icon=inline-end]]:pr-2.5",
    },
    {
      size: "xs",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-1.5 has-[>[data-icon=inline-end]]:pr-1.5",
    },
    {
      size: "sm",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-2.5 has-[>[data-icon=inline-end]]:pr-2.5",
    },
    {
      size: "md",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-3 has-[>[data-icon=inline-end]]:pr-3",
    },
    {
      size: "lg",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-4 has-[>[data-icon=inline-end]]:pr-4",
    },
    {
      size: "xl",
      iconOnly: false,
      class:
        "has-[>[data-icon=inline-start]]:pl-5 has-[>[data-icon=inline-end]]:pr-5",
    },
    {
      size: "xs",
      iconOnly: true,
      class: "w-7 [&_svg:not([class*='size-'])]:size-3.5",
    },
    {
      size: "sm",
      iconOnly: true,
      class: "w-8 [&_svg:not([class*='size-'])]:size-4",
    },
    {
      size: "lg",
      iconOnly: true,
      class: "w-12 [&_svg:not([class*='size-'])]:size-5",
    },
    {
      size: "xl",
      iconOnly: true,
      class: "w-14 [&_svg:not([class*='size-'])]:size-6",
    },
    { framed: true, size: "xs", class: "min-h-6" },
    {
      framed: true,
      iconOnly: false,
      size: "sm",
      class:
        "px-2.5 has-[>[data-icon=inline-start]]:pl-2 has-[>[data-icon=inline-end]]:pr-2",
    },
    { framed: true, size: "sm", class: "min-h-7" },
    {
      framed: true,
      iconOnly: false,
      size: "md",
      class:
        "px-3 has-[>[data-icon=inline-start]]:pl-2.5 has-[>[data-icon=inline-end]]:pr-2.5",
    },
    { framed: true, size: "md", class: "min-h-8" },
    {
      framed: true,
      iconOnly: false,
      size: "lg",
      class:
        "px-4 has-[>[data-icon=inline-start]]:pl-3 has-[>[data-icon=inline-end]]:pr-3",
    },
    { framed: true, size: "lg", class: "min-h-10" },
    {
      framed: true,
      iconOnly: false,
      size: "xl",
      class:
        "px-5 has-[>[data-icon=inline-start]]:pl-4 has-[>[data-icon=inline-end]]:pr-4",
    },
    { framed: true, size: "xl", class: "min-h-12" },
    { framed: true, iconOnly: true, size: "xs", class: "w-6" },
    { framed: true, iconOnly: true, size: "sm", class: "w-7" },
    {
      framed: true,
      iconOnly: true,
      size: "md",
      class: "w-8 [&_svg:not([class*='size-'])]:size-4",
    },
    { framed: true, iconOnly: true, size: "lg", class: "w-10" },
    {
      framed: true,
      iconOnly: true,
      size: "xl",
      class: "w-12 [&_svg:not([class*='size-'])]:size-5",
    },
  ],
  defaultVariants: { variant: "default", size: "md" },
});

export interface ToggleButtonStyleProps extends ToggleButtonProps {
  variant?: NonNullable<VariantProps<typeof toggleButtonStyles>["variant"]>;
  size?: Size;
  iconOnly?: boolean;
}

export function ToggleButton({
  className,
  children,
  variant = "default",
  size: sizeProp,
  iconOnly = false,
  ...props
}: ToggleButtonStyleProps) {
  const reduceMotion = useReducedMotion();
  const size = useSize(sizeProp);
  const groupState = useContext(ToggleGroupStateContext);
  const framed = useContext(GroupFrameContext);
  const inGroup = groupState != null && framed;
  const groupedSelection =
    groupState?.selectionMode === "single" && variant === "segmented";
  return (
    <AriaToggleButton
      data-slot="toggle-button"
      {...props}
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      className={composeRenderProps(className, (className) =>
        toggleButtonStyles({
          variant,
          size: size ?? "md",
          framed: inGroup,
          iconOnly,
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
              className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] border border-border bg-card shadow-(--shadow-card) forced-colors:border-[Highlight]"
            />
          )}
          {buttonLabel(content)}
        </>
      ))}
    </AriaToggleButton>
  );
}
