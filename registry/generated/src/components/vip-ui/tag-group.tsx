"use client";

import { XIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  type TagGroupProps as AriaTagGroupProps,
  composeRenderProps,
  Label,
  TagList,
  type TagProps,
} from "react-aria-components";
import { cn } from "./utils";

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
  return (
    <AriaTag
      {...props}
      data-slot="tag"
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-11 max-w-full cursor-default items-center gap-1 rounded-lg bg-card ps-3 pe-1 text-sm font-medium shadow-[var(--shadow-card)] ring-1 ring-border/80 data-[selection-mode]:not-data-disabled:cursor-pointer transition-[color,background-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted motion-safe:pressed:scale-[0.96] selected:bg-accent selected:text-accent-foreground selected:ring-primary/35 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring forced-colors:border",
          className,
        ),
      )}
    >
      {(state) => (
        <>
          <span
            className={cn(
              "min-w-0 py-1.5 [overflow-wrap:anywhere]",
              state.allowsRemoving ? "pe-1" : "pe-2",
            )}
          >
            {typeof children === "function" ? children(state) : children}
          </span>
          {state.allowsRemoving && (
            <AriaButton
              slot="remove"
              data-slot="tag-remove"
              aria-label={`Remove ${props.textValue ?? (typeof children === "string" ? children : "tag")}`}
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-card hover:text-foreground motion-safe:pressed:scale-[0.96] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            >
              <XIcon size={14} weight="bold" aria-hidden="true" />
            </AriaButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
