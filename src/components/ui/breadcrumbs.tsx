"use client";

import { CaretRightIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  composeRenderProps,
  Link,
  type LinkProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function Breadcrumbs<T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      data-slot="breadcrumbs"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-2 text-sm",
        className,
      )}
    />
  );
}

export function Breadcrumb({
  id,
  style,
  children,
  className,
  ...linkProps
}: BreadcrumbProps &
  Omit<LinkProps, "children" | "className"> & { children: ReactNode }) {
  return (
    <AriaBreadcrumb
      id={id}
      style={style}
      data-slot="breadcrumb"
      className={composeRenderProps(className, (className) =>
        cn("flex min-w-0 items-center gap-2", className),
      )}
    >
      {({ isCurrent }) => (
        <>
          {isCurrent ? (
            <span
              aria-current="page"
              className="min-w-0 font-medium text-foreground [overflow-wrap:anywhere]"
            >
              {children}
            </span>
          ) : (
            <Link
              {...linkProps}
              data-slot="breadcrumb-link"
              className="min-w-0 rounded-sm text-muted-foreground underline-offset-4 [overflow-wrap:anywhere] transition-[color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-60"
            >
              {children}
            </Link>
          )}
          {!isCurrent && (
            <CaretRightIcon
              size={14}
              aria-hidden="true"
              className="shrink-0 text-muted-foreground rtl:rotate-180"
            />
          )}
        </>
      )}
    </AriaBreadcrumb>
  );
}
