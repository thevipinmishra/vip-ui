"use client";

import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  composeRenderProps,
  type GridListItemProps,
  type GridListProps,
} from "react-aria-components";
import { cn } from "./utils";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";

export function GridList<T extends object>({
  className,
  render,
  ...props
}: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      data-slot="grid-list"
      render={withItemHighlight(render, { ring: true })}
      className={composeRenderProps(className, (className) =>
        cn(
          "grid min-w-0 gap-1 rounded-lg border border-border bg-card p-1.5 shadow-(--shadow-card) outline-none empty:min-h-24 empty:place-items-center empty:text-sm empty:text-muted-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
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
          "flex min-h-12 min-w-0 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground outline-none wrap-anywhere transition-colors duration-150 ease-out-quint selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 forced-colors:border-2 forced-colors:border-[Canvas] forced-colors:selected:border-[Highlight]",
          itemHighlightRing,
          className,
        ),
      )}
    />
  );
}
