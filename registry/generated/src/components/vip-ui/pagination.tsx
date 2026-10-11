"use client";

import type { ComponentProps, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";

const paginationLinkStyles = tv({
  base: "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium whitespace-nowrap text-foreground tabular-nums transition-[color,background-color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:not-aria-disabled:active:scale-[0.96] aria-disabled:cursor-default aria-disabled:text-muted-foreground/60 aria-disabled:hover:bg-transparent [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    isCurrent: {
      true: "bg-card text-primary shadow-[var(--shadow-card)] ring-1 ring-primary/25 hover:bg-card forced-colors:border",
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

export interface PaginationLinkProps extends ComponentProps<"a"> {
  href: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
}

export function PaginationLink({
  isCurrent = false,
  isDisabled = false,
  className,
  href,
  onClick,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      {...props}
      href={isDisabled ? undefined : href}
      aria-current={isCurrent ? "page" : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      onClick={isDisabled ? (event) => event.preventDefault() : onClick}
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
