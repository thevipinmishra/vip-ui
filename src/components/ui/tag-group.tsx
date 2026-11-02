"use client";

import { CheckIcon, XIcon } from "@phosphor-icons/react";
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
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";
import { type Size, SizeProvider, useSize } from "./size";

type TagSize = Extract<Size, "xs" | "sm" | "md">;

const tagSizeStyles = {
  xs: {
    tag: "min-h-7 rounded-md ps-2 text-xs",
    label: "py-0.5",
    remove: "size-5 rounded-sm [&_svg]:size-3",
  },
  sm: {
    tag: "min-h-9 ps-2.5",
    label: "py-1",
    remove: "size-7 [&_svg]:size-3",
  },
  md: {
    tag: "min-h-11 ps-3",
    label: "py-1.5",
    remove: "size-9 [&_svg]:size-3.5",
  },
} satisfies Record<TagSize, Record<"tag" | "label" | "remove", string>>;

export function TagGroup({
  className,
  size: sizeProp,
  ...props
}: AriaTagGroupProps & { size?: TagSize }) {
  const size = useSize(sizeProp);
  return (
    <SizeProvider size={size}>
      <AriaTagGroup
        {...props}
        data-slot="tag-group"
        data-size={size}
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
      className={cn("text-sm font-medium", className)}
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
  ...props
}: TagProps & { size?: TagSize }) {
  const inherited = useSize(sizeProp);
  const size: TagSize =
    inherited === "xs" || inherited === "sm" ? inherited : "md";
  const styles = tagSizeStyles[size];
  return (
    <AriaTag
      {...props}
      data-slot="tag"
      data-size={size}
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tag flex max-w-full cursor-default items-center gap-1 rounded-lg bg-card pe-1 text-sm font-medium shadow-[var(--shadow-card)] ring-1 ring-border/80 data-[selection-mode]:not-data-disabled:cursor-pointer data-[href]:cursor-pointer outline-offset-4 outline-transparent transition-[color,background-color,box-shadow,scale,opacity,outline-color,outline-offset] duration-150 ease-out-quint starting:scale-90 starting:opacity-0 hover:bg-muted motion-safe:pressed:scale-[0.96] selected:bg-accent selected:text-accent-foreground selected:ring-primary/35 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 forced-colors:border",
          styles.tag,
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
              className="-me-1 grid grid-cols-[0fr] transition-[grid-template-columns] duration-350 ease-spring group-selected/tag:grid-cols-[1fr] motion-reduce:transition-none"
            >
              <span className="min-w-0 overflow-hidden">
                <CheckIcon
                  weight="bold"
                  className="me-1 size-3.5 scale-50 opacity-0 transition-[scale,opacity] duration-200 ease-out-quint group-selected/tag:scale-100 group-selected/tag:opacity-100"
                />
              </span>
            </span>
          )}
          <span
            className={cn(
              "min-w-0 truncate",
              styles.label,
              state.allowsRemoving ? "pe-1" : "pe-2",
            )}
          >
            {typeof children === "function" ? children(state) : children}
          </span>
          {state.allowsRemoving && (
            <AriaButton
              slot="remove"
              data-slot="tag-remove"
              className={cn(
                "grid shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-out-quint [&:hover]:bg-muted [&:hover]:text-foreground [&:active]:bg-muted [&:active]:text-foreground motion-safe:[&:active]:scale-[0.96] [&:focus-visible]:outline-2 [&:focus-visible]:outline-solid [&:focus-visible]:-outline-offset-2 [&:focus-visible]:outline-ring",
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
