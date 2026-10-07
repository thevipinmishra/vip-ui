"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  composeRenderProps,
  Label,
  TagList,
  type TagProps,
} from "react-aria-components";
import { X } from "reicon-react";
import { cn } from "@/lib/utils";
import { PressButton } from "./press-button";

export function TagGroup({ className, ...props }: AriaTagGroupProps) {
  return (
    <AriaTagGroup
      {...props}
      data-slot="tag-group"
      className={cn("grid gap-2", className)}
    />
  );
}

export function TagGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="tag-group-label"
      className={cn("text-sm font-medium", className)}
    />
  );
}

export function TagListView<T extends object>({
  className,
  ...props
}: React.ComponentProps<typeof TagList<T>>) {
  return (
    <TagList
      {...props}
      data-slot="tag-list"
      className={composeRenderProps(className, (className) =>
        cn("flex flex-wrap gap-2.5", className),
      )}
    />
  );
}

export function Tag({ className, children, ...props }: TagProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaTag
      {...props}
      data-slot="tag"
      render={
        props.render ??
        ((domProps, { isPressed, isDisabled }) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={false}
            animate={{ scale: isPressed && !isDisabled ? 0.96 : 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 500, damping: 36 }
            }
          />
        ))
      }
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-11 cursor-pointer items-center gap-1 rounded-lg bg-card ps-3 pe-1 text-sm font-medium shadow-[var(--shadow-card)] ring-1 ring-border/80 hover:bg-muted selected:bg-accent selected:text-accent-foreground selected:ring-primary/35 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {(state) => (
        <>
          <span className={state.allowsRemoving ? "pe-1" : "pe-2"}>
            {typeof children === "function" ? children(state) : children}
          </span>
          {state.allowsRemoving && (
            <PressButton
              slot="remove"
              data-slot="tag-remove"
              aria-label={`Remove ${props.textValue ?? (typeof children === "string" ? children : "tag")}`}
              className="grid size-11 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X size={14} aria-hidden="true" />
            </PressButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
