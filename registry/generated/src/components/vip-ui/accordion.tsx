"use client";

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
import { ChevronDown } from "reicon-react";
import { cn } from "./utils";
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
              "overflow-hidden rounded-lg bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70",
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
            "flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-3 text-start text-foreground outline-none data-[disabled]:cursor-default data-[disabled]:opacity-50 hover:bg-muted/60 data-[focus-visible]:outline-2 data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring",
            variant === "card" ? "px-4" : "px-0",
            className,
          ),
        )}
      >
        {children}
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
        className={
          variant === "card" ? "border-t border-border/70 px-4 py-3" : "pb-4"
        }
      >
        {children}
      </div>
    </CollapsiblePanel>
  );
}
