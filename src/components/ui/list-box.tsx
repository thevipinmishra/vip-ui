"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  composeRenderProps,
  type ListBoxItemProps,
  type ListBoxProps,
} from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ListBox<T extends object>({
  className,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      data-slot="list-box"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid max-h-72 w-full gap-1 overflow-y-auto rounded-lg border border-border bg-card p-1.5 shadow-[var(--shadow-card)] outline-none",
          className,
        ),
      )}
    />
  );
}

export function ListBoxItem({
  className,
  children,
  ...props
}: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      data-slot="list-box-item"
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-3 text-sm text-foreground outline-none hover:bg-muted focus:bg-muted selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {content}
          <SelectionMark isSelected={isSelected} />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export function SelectionMark({
  isSelected,
  className,
}: {
  isSelected: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("ms-auto shrink-0", className)}
      initial={false}
      animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.85 }}
      transition={{ duration: reduceMotion ? 0 : duration.fast, ease: easeOut }}
    >
      <CheckIcon size={16} weight="bold" />
    </motion.span>
  );
}
