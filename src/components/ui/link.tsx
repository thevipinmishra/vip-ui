"use client";

import {
  Link as AriaLink,
  composeRenderProps,
  type LinkProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function Link({ className, ...props }: LinkProps) {
  return (
    <AriaLink
      {...props}
      data-slot="link"
      className={composeRenderProps(className, (className) =>
        cn(
          "cursor-pointer rounded-sm font-medium text-primary underline underline-offset-4 [overflow-wrap:anywhere] box-decoration-clone transition-[color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-primary/80 focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    />
  );
}
