"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import {
  Button,
  type ButtonProps,
  composeRenderProps,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  type DisclosureProps,
  Heading,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  CollapsiblePanel,
  collapsibleChevronStyles,
} from "./collapsible-panel";

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
            "grid min-w-0",
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
  const variant = useContext(AccordionVariantContext);
  return (
    <Disclosure
      {...props}
      data-slot="accordion-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-0",
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
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<ButtonProps, "children"> & { children: ReactNode }) {
  const variant = useContext(AccordionVariantContext);
  return (
    <Heading className="m-0 text-sm font-medium">
      <Button
        {...props}
        data-slot="accordion-trigger"
        slot="trigger"
        className={composeRenderProps(className, (className) =>
          cn(
            "group/trigger flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-3 text-start text-foreground transition-[background-color,outline-color,outline-offset] duration-150 ease-out-quint disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-ring",
            variant === "card"
              ? "rounded-lg px-4 hover:bg-muted/60 focus-visible:-outline-offset-2 aria-expanded:rounded-b-none"
              : "rounded-sm px-0 decoration-muted-foreground/60 underline-offset-4 outline-offset-4 outline-transparent hover:underline focus-visible:outline-offset-2 motion-reduce:outline-offset-2",
            className,
          ),
        )}
      >
        <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
        <span aria-hidden="true" className={collapsibleChevronStyles}>
          <CaretDownIcon size={16} />
        </span>
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
      className={composeRenderProps(className, (className) =>
        cn("text-sm leading-6 text-muted-foreground", className),
      )}
    >
      <div
        className={cn(
          "[overflow-wrap:anywhere]",
          variant === "card" ? "border-t border-border/70 px-4 py-3" : "pb-3",
        )}
      >
        {children}
      </div>
    </CollapsiblePanel>
  );
}
