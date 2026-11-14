"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { Link as AriaLink, type LinkProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { springLayout, springSnappyEasing } from "./motion";
import { cn } from "./utils";
import { buttonLabel, touchTarget } from "./button-styles";
import { ItemHighlight } from "./item-highlight";
import { type Size, SizeProvider, useSize } from "./size";

const paginationLinkStyles = tv({
  base: "relative isolate inline-flex max-w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap text-foreground tabular-nums outline-offset-4 outline-transparent transition-[color,background-color,box-shadow,scale,outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 motion-safe:pressed:scale-[0.96] disabled:cursor-default disabled:text-muted-foreground/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    size: {
      xs: `min-h-7 min-w-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5 ${touchTarget}`,
      sm: `min-h-9 min-w-9 rounded-md px-2.5 ${touchTarget}`,
      md: "min-h-11 min-w-11 px-3",
      lg: "min-h-12 min-w-12 px-3.5",
      xl: "min-h-14 min-w-14 rounded-xl px-4 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    isCurrent: {
      true: "cursor-default text-primary forced-colors:border",
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

const PaginationFrameContext =
  createContext<React.RefObject<HTMLElement | null> | null>(null);

const flipTiming = {
  duration: springLayout.duration * 1000,
  easing: springSnappyEasing.easing,
} satisfies KeyframeAnimationOptions;

export function Pagination({
  className,
  children,
  size: sizeProp,
  ...props
}: HTMLAttributes<HTMLElement> & { size?: Size }) {
  const size = useSize(sizeProp);
  const frame = useRef<HTMLElement | null>(null);
  return (
    <SizeProvider size={size}>
      <PaginationFrameContext.Provider value={frame}>
        <nav
          aria-label="Pagination"
          data-slot="pagination"
          data-size={size}
          className={cn(
            "group/pagination relative isolate flex min-w-0 justify-center-safe",
            className,
          )}
          {...props}
        >
          <ItemHighlight
            placement="under"
            items="[data-slot=pagination-link]"
          />
          {children}
        </nav>
      </PaginationFrameContext.Provider>
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

export interface PaginationLinkProps
  extends Omit<LinkProps, "className" | "children"> {
  isCurrent?: boolean;
  size?: Size;
  className?: string;
  children?: ReactNode;
}

export function PaginationLink({
  isCurrent = false,
  className,
  children,
  size: sizeProp,
  ...props
}: PaginationLinkProps) {
  const size = useSize(sizeProp) ?? "md";
  const frame = useContext(PaginationFrameContext);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!isCurrent) return;
    const indicator = indicatorRef.current;
    const link = indicator?.parentElement;
    if (!indicator || !link) return;
    const previous = frame?.current ?? null;
    if (frame) frame.current = link;
    if (!previous || previous === link || !previous.isConnected) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = link.getBoundingClientRect();
    const from = previous.getBoundingClientRect();
    const x = from.x - box.x;
    const y = from.y - box.y;
    if (!x && !y) return;
    indicator.animate(
      { transform: [`translate(${x}px, ${y}px)`, "translate(0px, 0px)"] },
      flipTiming,
    );
  }, [isCurrent, frame]);

  return (
    <AriaLink
      {...props}
      aria-current={isCurrent ? "page" : undefined}
      data-slot="pagination-link"
      data-size={size}
      className={paginationLinkStyles({ isCurrent, size, className })}
    >
      {isCurrent && (
        <span
          aria-hidden="true"
          ref={indicatorRef}
          data-slot="pagination-current"
          className="absolute inset-0 -z-10 rounded-[inherit] bg-card shadow-(--shadow-card) ring-1 ring-primary/25"
        />
      )}
      {buttonLabel(children)}
    </AriaLink>
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
