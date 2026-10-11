"use client";

import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  composeRenderProps,
  type GridListItemProps,
  type GridListProps,
} from "react-aria-components";
import { cn } from "./utils";

export function GridList<T extends object>({
  className,
  ...props
}: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      data-slot="grid-list"
      className={composeRenderProps(className, (className) =>
        cn(
          "grid min-w-0 gap-1 rounded-lg border border-border bg-card p-1.5 shadow-[var(--shadow-card)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        ),
      )}
    />
  );
}

export function GridListItem({ className, ...props }: GridListItemProps) {
  return (
    <AriaGridListItem
      {...props}
      data-slot="grid-list-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-12 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground outline-none [overflow-wrap:anywhere] hover:bg-muted focus:bg-muted selected:bg-accent selected:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:selected:border-[Highlight]",
          className,
        ),
      )}
    />
  );
}
