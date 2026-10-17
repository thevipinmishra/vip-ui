"use client";

import type { ComponentProps, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { buttonLabel, touchTarget } from "./button-styles";
import { type Size, SizeProvider, useSize } from "./size";

const paginationLinkStyles = tv({
  base: "inline-flex max-w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap text-foreground tabular-nums outline-offset-4 outline-transparent transition-[color,background-color,box-shadow,scale,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 motion-safe:not-aria-disabled:active:scale-[0.96] aria-disabled:cursor-default aria-disabled:text-muted-foreground/60 aria-disabled:hover:bg-transparent [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    size: {
      xs: `min-h-7 min-w-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `min-h-9 min-w-9 rounded-md px-2.5 ${touchTarget}`,
      md: "min-h-11 min-w-11 px-3",
      lg: "min-h-12 min-w-12 px-3.5",
      xl: "min-h-14 min-w-14 rounded-xl px-4 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    isCurrent: {
      true: "bg-card text-primary shadow-[var(--shadow-card)] ring-1 ring-primary/25 hover:bg-card forced-colors:border",
    },
  },
  defaultVariants: { size: "md" },
});

const ellipsisSizeStyles = {
  xs: "min-h-7 min-w-5 text-xs",
  sm: "min-h-9 min-w-6",
  md: "min-h-11 min-w-8",
  lg: "min-h-12 min-w-8",
  xl: "min-h-14 min-w-9 text-base",
} satisfies Record<Size, string>;

export function Pagination({
  className,
  size: sizeProp,
  ...props
}: HTMLAttributes<HTMLElement> & { size?: Size }) {
  const size = useSize(sizeProp);
  return (
    <SizeProvider size={size}>
      <nav
        aria-label="Pagination"
        data-slot="pagination"
        data-size={size}
        className={cn(
          "group/pagination flex min-w-0 justify-center-safe",
          className,
        )}
        {...props}
      />
    </SizeProvider>
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
        "flex min-w-0 flex-wrap items-center justify-center-safe gap-2 group-data-[size=sm]/pagination:gap-1.5 group-data-[size=xs]/pagination:gap-1",
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
      className={cn("flex min-w-0", className)}
      {...props}
    />
  );
}

export interface PaginationLinkProps extends ComponentProps<"a"> {
  href: string;
  isCurrent?: boolean;
  isDisabled?: boolean;
  size?: Size;
}

export function PaginationLink({
  isCurrent = false,
  isDisabled = false,
  className,
  href,
  onClick,
  children,
  size: sizeProp,
  ...props
}: PaginationLinkProps) {
  const size = useSize(sizeProp) ?? "md";
  return (
    <a
      {...props}
      href={isDisabled ? undefined : href}
      role={isDisabled ? "link" : undefined}
      aria-current={isCurrent ? "page" : undefined}
      aria-disabled={isDisabled || undefined}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      onClick={isDisabled ? (event) => event.preventDefault() : onClick}
      data-slot="pagination-link"
      data-size={size}
      className={paginationLinkStyles({ isCurrent, size, className })}
    >
      {buttonLabel(children)}
    </a>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const size = useSize() ?? "md";
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex items-center justify-center text-muted-foreground",
        ellipsisSizeStyles[size],
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">…</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}
