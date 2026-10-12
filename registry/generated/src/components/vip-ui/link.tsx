"use client";

import {
  Link as AriaLink,
  composeRenderProps,
  type LinkProps,
} from "react-aria-components";
import { cn } from "./utils";

export function Link({ className, ...props }: LinkProps) {
  return (
    <AriaLink
      {...props}
      data-slot="link"
      className={composeRenderProps(className, (className) =>
        cn(
          "cursor-pointer rounded-sm font-medium text-primary underline underline-offset-4 [overflow-wrap:anywhere] box-decoration-clone hover:text-primary/80 pressed:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    />
  );
}
