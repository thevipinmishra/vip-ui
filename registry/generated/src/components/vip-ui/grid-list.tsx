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
          "grid gap-1 rounded-lg border border-border bg-card p-1.5 shadow-[var(--shadow-card)] outline-none",
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
          "flex min-h-12 cursor-pointer items-center gap-3 rounded-md px-3 text-sm outline-none hover:bg-muted data-[focused]:bg-muted data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-[-2px] data-[focus-visible]:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-50",
          className,
        ),
      )}
    />
  );
}
