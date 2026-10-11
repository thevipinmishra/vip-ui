"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useId,
} from "react";
import {
  Button,
  type ButtonProps,
  composeRenderProps,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  type DisclosureProps,
  DisclosureStateContext,
  Heading,
} from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CollapsibleIdsContext, CollapsiblePanel } from "./collapsible-panel";

export type AccordionVariant = "card" | "divided";

const AccordionVariantContext = createContext<AccordionVariant>("card");

export function Accordion({
  variant = "card",
  className,
  ...props
}: DisclosureGroupProps &
  React.RefAttributes<HTMLDivElement> & { variant?: AccordionVariant }) {
  return (
    <AccordionVariantContext.Provider value={variant}>
      <DisclosureGroup
        {...props}
        data-slot="accordion"
        data-variant={variant}
        className={composeRenderProps(className, (className) =>
          cn(
            "grid",
            variant === "divided" ? "divide-y divide-border/70" : "gap-2",
            className,
          ),
        )}
      />
    </AccordionVariantContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<DisclosureProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  title?: string;
  children: ReactNode;
}

export function AccordionItem({
  title,
  children,
  className,
  ...props
}: AccordionItemProps) {
  const id = useId();
  const variant = useContext(AccordionVariantContext);
  return (
    <CollapsibleIdsContext.Provider
      value={{ triggerId: `${id}-trigger`, panelId: `${id}-panel` }}
    >
      <Disclosure
        {...props}
        data-slot="accordion-item"
        className={composeRenderProps(className, (className) =>
          cn(
            variant === "card" &&
              "overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 forced-colors:border",
            className,
          ),
        )}
      >
        {title ? (
          <>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </>
        ) : (
          children
        )}
      </Disclosure>
    </CollapsibleIdsContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<ButtonProps, "children"> & { children: ReactNode }) {
  const isExpanded = useContext(DisclosureStateContext)?.isExpanded;
  const ids = useContext(CollapsibleIdsContext);
  const variant = useContext(AccordionVariantContext);
  const reduceMotion = useReducedMotion();
  return (
    <Heading className="m-0 text-sm font-medium">
      <Button
        {...props}
        data-slot="accordion-trigger"
        slot="trigger"
        id={ids?.triggerId}
        aria-controls={ids?.panelId}
        className={composeRenderProps(className, (className) =>
          cn(
            "flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-3 text-start text-foreground outline-none transition-[background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
            variant === "card"
              ? "px-4 hover:bg-muted/60"
              : "px-0 decoration-muted-foreground/60 underline-offset-4 hover:underline",
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

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof CollapsiblePanel>) {
  const variant = useContext(AccordionVariantContext);
  return (
    <CollapsiblePanel
      {...props}
      data-slot="accordion-content"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
    >
      <div
        className={cn(
          "[overflow-wrap:anywhere]",
          variant === "card" ? "border-t border-border/70 px-4 py-3" : "pb-4",
        )}
      >
        {children}
      </div>
    </CollapsiblePanel>
  );
}
