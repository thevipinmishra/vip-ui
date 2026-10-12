"use client";

import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useState } from "react";
import { easeInOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "./collapsible-panel";
import { Disclosure, DisclosureHeader } from "./disclosure";

export type ToolCallStatus = "running" | "complete" | "error";

const statusLabels: Record<ToolCallStatus, string> = {
  running: "Running",
  complete: "Done",
  error: "Failed",
};

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
      className={cn("min-w-0 overflow-clip rounded-xl", className)}
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
  const [announcement, setAnnouncement] = useState({ status, text: "" });
  if (announcement.status !== status) {
    setAnnouncement({ status, text: `${name}: ${statusLabels[status]}` });
  }

  return (
    <>
      <DisclosureHeader
        {...props}
        data-slot="tool-call-trigger"
        className={cn(
          "min-h-14 items-start rounded-xl px-4 py-3 hover:bg-muted/70 pressed:bg-muted/70 aria-expanded:rounded-es-none aria-expanded:rounded-ee-none focus-visible:-outline-offset-2 [&>span:first-child]:min-w-0 [&>span:first-child]:flex-1 [&>span:last-child]:mbs-2",
          className,
        )}
      >
        <span className="flex min-w-0 items-start gap-3">
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
                className="size-2 rounded-full bg-current forced-colors:bg-[CanvasText]"
                initial={false}
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 1.2, repeat: Infinity, ease: easeInOut }
                }
              />
            ) : status === "complete" ? (
              <CheckCircleIcon size={17} />
            ) : (
              <XCircleIcon size={17} />
            )}
          </span>
          <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="flex min-h-8 min-w-0 flex-[1_1_8rem] flex-col justify-center text-start">
              <span className="font-mono text-xs font-semibold leading-5 text-foreground [overflow-wrap:anywhere]">
                {name}
              </span>
              {summary && (
                <span className="mbs-0.5 text-xs font-normal leading-5 text-muted-foreground [overflow-wrap:anywhere]">
                  {summary}
                </span>
              )}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {statusLabels[status]}
            </span>
          </span>
        </span>
      </DisclosureHeader>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement.text}
      </output>
    </>
  );
}

export function ToolCallPanel({
  children,
  className,
  ...props
}: ComponentProps<typeof CollapsiblePanel>) {
  return (
    <CollapsiblePanel
      data-slot="tool-call-panel"
      {...props}
      className={cn("text-sm leading-6 text-foreground", className)}
    >
      <div className="min-w-0 border-bs border-border/70 px-4 pbs-3 pbe-4 [overflow-wrap:anywhere]">
        {children}
      </div>
    </CollapsiblePanel>
  );
}
