"use client";

import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "./disclosure";

export type ToolCallStatus = "running" | "complete" | "error";

export function ToolCall({
  className,
  ...props
}: Omit<ComponentProps<typeof Disclosure>, "className"> & {
  className?: string;
}) {
  return (
    <Disclosure
      {...props}
      data-slot="tool-call"
      className={cn("min-w-0 overflow-hidden rounded-xl", className)}
    />
  );
}

export interface ToolCallTriggerProps
  extends Omit<
    ComponentProps<typeof DisclosureHeader>,
    "children" | "className"
  > {
  name: string;
  status: ToolCallStatus;
  summary?: string;
  className?: string;
}

export function ToolCallTrigger({
  name,
  status,
  summary,
  className,
  ...props
}: ToolCallTriggerProps) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <DisclosureHeader
      {...props}
      data-slot="tool-call-trigger"
      className={cn(
        "min-h-14 rounded-xl px-4 py-3 hover:bg-muted/70 [&>span:first-child]:min-w-0 [&>span:first-child]:flex-1",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-primary",
            status === "complete" && "bg-success-subtle text-success",
            status === "error" && "bg-destructive/10 text-destructive",
          )}
        >
          {status === "running" ? (
            <motion.span
              className="size-2 rounded-full bg-current"
              initial={false}
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.2, repeat: Infinity }
              }
            />
          ) : status === "complete" ? (
            <CheckCircleIcon size={17} />
          ) : (
            <XCircleIcon size={17} />
          )}
        </span>
        <span className="min-w-0 text-start">
          <span className="block font-mono text-xs font-semibold text-foreground [overflow-wrap:anywhere]">
            {name}
          </span>
          {summary && (
            <span className="mt-0.5 block text-xs font-normal leading-5 text-muted-foreground">
              {summary}
            </span>
          )}
        </span>
        <span
          aria-live="polite"
          className="ms-auto shrink-0 text-xs font-normal text-muted-foreground"
        >
          {status === "running"
            ? "Running"
            : status === "complete"
              ? "Done"
              : "Failed"}
        </span>
      </span>
    </DisclosureHeader>
  );
}

export function ToolCallPanel({
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof DisclosurePanel>, "children"> & {
  children?: ReactNode;
}) {
  return (
    <DisclosurePanel
      {...props}
      data-slot="tool-call-panel"
      className={cn("border-t border-border/70", className)}
    >
      <div className="min-w-0 pt-3 text-sm leading-6 text-foreground [overflow-wrap:anywhere]">
        {children}
      </div>
    </DisclosurePanel>
  );
}
