"use client";

import { XIcon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  composeRenderProps,
  Label,
  TagList,
  type TagProps,
  Text,
} from "react-aria-components";
import { springLayout } from "./motion";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
} from "./field-styles";
import { type Size, SizeProvider, useSize } from "./size";

type TagSize = Extract<Size, "xs" | "sm" | "md">;

const tagSizeStyles = {
  xs: {
    tag: "min-h-7 rounded-md ps-2 text-xs",
    end: "pe-2",
    label: "py-0.5",
    remove: "size-5 rounded-[calc(var(--radius-md)-0.25rem)] [&_svg]:size-3",
  },
  sm: {
    tag: "min-h-9 ps-2.5",
    end: "pe-2.5",
    label: "py-1",
    remove: "size-7 rounded-[calc(var(--radius-lg)-0.25rem)] [&_svg]:size-3.5",
  },
  md: {
    tag: "min-h-11 ps-3",
    end: "pe-3",
    label: "py-1.5",
    remove: "size-9 rounded-[calc(var(--radius-lg)-0.25rem)] [&_svg]:size-4",
  },
} satisfies Record<TagSize, Record<"tag" | "end" | "label" | "remove", string>>;

export function TagGroup({
  className,
  size: sizeProp,
  ...props
}: AriaTagGroupProps & { size?: TagSize }) {
  const size = useSize(sizeProp);
  const [settled, setSettled] = useState(false);
  useEffect(() => setSettled(true), []);
  return (
    <SizeProvider size={size}>
      <AriaTagGroup
        {...props}
        data-slot="tag-group"
        data-size={size}
        data-settled={settled || undefined}
        className={cn("group/tag-group grid min-w-0 gap-2", className)}
      />
    </SizeProvider>
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
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function TagGroupDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="tag-group-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function TagGroupError({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="errorMessage"
      data-slot="tag-group-error"
      className={cn(fieldErrorStyles, className)}
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
        cn(
          "flex min-w-0 flex-wrap gap-2 group-data-[size=xs]/tag-group:gap-1.5 empty:text-sm empty:text-muted-foreground",
          className,
        ),
      )}
    />
  );
}

export function Tag({
  className,
  children,
  size: sizeProp,
  render,
  ...props
}: TagProps & { size?: TagSize }) {
  const reduceMotion = useReducedMotion();
  const inherited = useSize(sizeProp);
  const size: TagSize =
    inherited === "xs" || inherited === "sm" ? inherited : "md";
  const styles = tagSizeStyles[size];
  const motionTag: TagProps["render"] = (tagProps) => {
    const {
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      onAnimationIteration: _onAnimationIteration,
      ...rest
    } = tagProps;
    return (
      <motion.div
        {...(rest as HTMLMotionProps<"div">)}
        layout={reduceMotion ? false : "position"}
        transition={{ layout: springLayout }}
      />
    );
  };
  return (
    <AriaTag
      {...props}
      render={render ?? motionTag}
      data-slot="tag"
      data-size={size}
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className, state) =>
        cn(
          "group/tag flex max-w-full cursor-default items-center rounded-lg bg-card text-sm font-medium shadow-(--shadow-card) ring-1 ring-border/80 data-selection-mode:not-data-disabled:cursor-pointer data-href:cursor-pointer outline-offset-4 outline-transparent transition-[color,background-color,box-shadow,scale,opacity,outline-color,outline-offset] duration-150 ease-out-quint group-data-settled/tag-group:starting:scale-90 group-data-settled/tag-group:starting:opacity-0 hover:bg-muted motion-safe:pressed:scale-[0.96] selected:bg-accent selected:text-accent-foreground selected:ring-primary/35 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 forced-colors:border",
          styles.tag,
          state.allowsRemoving ? "pe-1" : styles.end,
          className,
        ),
      )}
    >
      {(state) => (
        <>
          {state.selectionMode !== "none" && (
            <span
              aria-hidden="true"
              data-slot="tag-check"
              className="grid shrink-0 grid-cols-[0fr] transition-[grid-template-columns] duration-350 ease-spring group-selected/tag:grid-cols-[1fr] motion-reduce:transition-none"
            >
              <span className="min-w-0 overflow-hidden">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "me-1.5",
                    size === "xs" ? "size-3" : "size-3.5",
                  )}
                >
                  <path
                    d="M2.75 8 6.25 11.5 13.25 4.5"
                    pathLength={1}
                    className="[stroke-dasharray:1_2] [stroke-dashoffset:1.01] transition-[stroke-dashoffset] duration-150 ease-out-quint group-selected/tag:[stroke-dashoffset:0] group-selected/tag:delay-75 group-selected/tag:duration-300 motion-reduce:transition-none"
                  />
                </svg>
              </span>
            </span>
          )}
          <span className={cn("min-w-0 truncate", styles.label)}>
            {typeof children === "function" ? children(state) : children}
          </span>
          {state.allowsRemoving && (
            <AriaButton
              slot="remove"
              data-slot="tag-remove"
              className={cn(
                "ms-1 grid shrink-0 cursor-pointer place-items-center text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-out-quint hover:bg-foreground/8 hover:text-foreground pressed:bg-foreground/12 pressed:text-foreground motion-safe:pressed:scale-[0.92] focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring",
                styles.remove,
              )}
            >
              <XIcon weight="bold" aria-hidden="true" />
            </AriaButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
