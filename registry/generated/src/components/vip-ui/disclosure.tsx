"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { type ComponentProps, type ReactNode, useContext, useId } from "react";
import {
  Disclosure as AriaDisclosure,
  Button,
  type ButtonProps,
  composeRenderProps,
  type DisclosureProps,
  DisclosureStateContext,
  Heading,
} from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { CollapsibleIdsContext, CollapsiblePanel } from "./collapsible-panel";

export function Disclosure({
  className,
  children,
  ...props
}: DisclosureProps & React.RefAttributes<HTMLDivElement>) {
  const id = useId();
  return (
    <CollapsibleIdsContext.Provider
      value={{ triggerId: `${id}-trigger`, panelId: `${id}-panel` }}
    >
      <AriaDisclosure
        data-slot="disclosure"
        {...props}
        className={composeRenderProps(className, (className) =>
          cn(
            "min-w-0 rounded-lg border border-border bg-card text-card-foreground",
            className,
          ),
        )}
      >
        {children}
      </AriaDisclosure>
    </CollapsibleIdsContext.Provider>
  );
}

export function DisclosureHeader({
  children,
  className,
  ...props
}: Omit<ButtonProps, "children"> & { children: ReactNode }) {
  const isExpanded = useContext(DisclosureStateContext)?.isExpanded;
  const ids = useContext(CollapsibleIdsContext);
  const reduceMotion = useReducedMotion();
  return (
    <Heading className="m-0 text-sm font-semibold">
      <Button
        data-slot="disclosure-header"
        {...props}
        slot="trigger"
        id={ids?.triggerId}
        aria-controls={ids?.panelId}
        className={composeRenderProps(className, (className) =>
          cn(
            "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-start transition-[background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            className,
          ),
        )}
      >
        <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
        <motion.span
          className="shrink-0 text-muted-foreground"
          aria-hidden="true"
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : duration.base,
            ease: easeOut,
          }}
        >
          <CaretDownIcon size={16} />
        </motion.span>
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
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    >
      <div className="px-4 pb-4 [overflow-wrap:anywhere]">{children}</div>
    </CollapsiblePanel>
  );
}
