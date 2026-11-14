"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import {
  Disclosure as AriaDisclosure,
  Button,
  type ButtonProps,
  composeRenderProps,
  type DisclosureProps,
  Heading,
} from "react-aria-components";
import { cn } from "./utils";
import {
  CollapsiblePanel,
  collapsibleChevronStyles,
} from "./collapsible-panel";

export function Disclosure({
  className,
  ...props
}: DisclosureProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaDisclosure
      data-slot="disclosure"
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-0 rounded-lg border border-border bg-card text-card-foreground",
          className,
        ),
      )}
    />
  );
}

export function DisclosureHeader({
  children,
  className,
  ...props
}: Omit<ButtonProps, "children"> & { children: ReactNode }) {
  return (
    <Heading className="m-0 min-w-0 flex-1 text-sm font-semibold">
      <Button
        data-slot="disclosure-header"
        {...props}
        slot="trigger"
        className={composeRenderProps(className, (className) =>
          cn(
            "group/trigger flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-start outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint hover:bg-muted disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring aria-expanded:rounded-b-none",
            className,
          ),
        )}
      >
        <span className="min-w-0 wrap-anywhere">{children}</span>
        <span aria-hidden="true" className={collapsibleChevronStyles}>
          <CaretDownIcon size={16} />
        </span>
      </Button>
    </Heading>
  );
}

export function DisclosurePanel({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsiblePanel>) {
  return (
    <CollapsiblePanel
      data-slot="disclosure-panel"
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("text-sm leading-6 text-muted-foreground", className),
      )}
    >
      <div className="px-4 pb-3 wrap-anywhere">{children}</div>
    </CollapsiblePanel>
  );
}
