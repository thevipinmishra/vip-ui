"use client";

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
import { ChevronDown } from "reicon-react";
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
        {...props}
        data-slot="disclosure"
        className={composeRenderProps(className, (className) =>
          cn("rounded-lg border border-border bg-card", className),
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
        {...props}
        data-slot="disclosure-header"
        slot="trigger"
        id={ids?.triggerId}
        aria-controls={ids?.panelId}
        className={composeRenderProps(className, (className) =>
          cn(
            "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-4 text-start data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring hover:bg-muted",
            className,
          ),
        )}
      >
        <span>{children}</span>
        <motion.span
          className="shrink-0 text-muted-foreground"
          aria-hidden="true"
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{
            type: "tween",
            duration: reduceMotion ? 0 : 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <ChevronDown size={16} />
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
      {...props}
      data-slot="disclosure-panel"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    >
      <div className="px-4 pb-4">{children}</div>
    </CollapsiblePanel>
  );
}
