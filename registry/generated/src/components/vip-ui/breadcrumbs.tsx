"use client";

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
import { ChevronRight } from "reicon-react";
import { cn } from "./utils";

export function Breadcrumbs<T extends object>({
  className,
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      data-slot="breadcrumbs"
      className={cn("flex flex-wrap items-center gap-2 text-sm", className)}
    />
  );
}

export function Breadcrumb({
  children,
  className,
  ...props
}: BreadcrumbProps &
  Omit<LinkProps, "children" | "className"> & { children: ReactNode }) {
  return (
    <AriaBreadcrumb
      {...props}
      data-slot="breadcrumb"
      className={composeRenderProps(className, (className) =>
        cn("flex items-center gap-2", className),
      )}
    >
      {({ isCurrent }) => (
        <>
          {isCurrent ? (
            <span aria-current="page" className="font-medium text-foreground">
              {children}
            </span>
          ) : (
            <Link
              {...props}
              data-slot="breadcrumb-link"
              className="rounded-sm text-muted-foreground hover:text-foreground hover:underline data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring"
            >
              {children}
            </Link>
          )}
          {!isCurrent && (
            <ChevronRight
              size={14}
              aria-hidden="true"
              className="text-muted-foreground"
            />
          )}
        </>
      )}
    </AriaBreadcrumb>
  );
}
