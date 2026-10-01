import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";

const paginationLinkStyles = tv({
  base: "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg px-3 text-sm font-medium text-foreground hover:bg-muted data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring motion-safe:transition-[background-color,color,box-shadow,scale] motion-safe:duration-150 motion-safe:active:scale-[0.96]",
  variants: {
    isCurrent: {
      true: "bg-card text-primary shadow-[var(--shadow-card)] ring-1 ring-primary/25 hover:bg-card",
    },
  },
});

export function Pagination({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}

export function PaginationList({
  className,
  ...props
}: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      data-slot="pagination-list"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("flex", className)}
      {...props}
    />
  );
}

export interface PaginationLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isCurrent?: boolean;
}

export function PaginationLink({
  isCurrent = false,
  className,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      {...props}
      aria-current={isCurrent ? "page" : undefined}
      data-slot="pagination-link"
      className={paginationLinkStyles({ isCurrent, className })}
    />
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex min-h-11 min-w-8 items-center justify-center text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}
