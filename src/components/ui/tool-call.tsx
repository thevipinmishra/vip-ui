"use client";

import { CheckIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useState } from "react";
import { composeRenderProps } from "react-aria-components";
import { duration, easeOut, springPop } from "@/lib/motion";
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

function ToolCallIcon({ status }: { status: ToolCallStatus }) {
  const reduceMotion = useReducedMotion() === true;
  return (
    <span
      aria-hidden="true"
      data-slot="tool-call-icon"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-primary transition-colors duration-200 ease-out-quint [&>*]:col-start-1 [&>*]:row-start-1",
        status === "complete" && "bg-success-subtle text-success",
        status === "error" && "bg-destructive/10 text-destructive",
      )}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={status}
          className="grid place-items-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : {
                  opacity: 0,
                  scale: 0.6,
                  transition: { duration: duration.fast, ease: easeOut },
                }
          }
          transition={reduceMotion ? { duration: 0 } : springPop}
        >
          {status === "running" ? (
            <span className="size-2 rounded-full bg-current [animation-duration:1.1s] motion-safe:animate-pulse forced-colors:bg-[CanvasText]" />
          ) : status === "complete" ? (
            <CheckIcon size={16} weight="bold" />
          ) : (
            <XIcon size={16} weight="bold" />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
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
        data-status={status}
        className={cn(
          "min-h-12 items-start rounded-xl px-3 py-2.5 hover:bg-muted/70 aria-expanded:rounded-b-none focus-visible:-outline-offset-2 [&>span:first-child]:min-w-0 [&>span:first-child]:flex-1 [&>span:last-child]:mt-2",
          className,
        )}
      >
        <span className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3">
          <ToolCallIcon status={status} />
          <span className="flex min-w-0 flex-wrap items-baseline gap-x-3 py-1.5">
            <span
              data-slot="tool-call-name"
              className="min-w-0 flex-[1_1_8rem] text-start font-mono text-xs font-semibold leading-5 text-foreground [overflow-wrap:anywhere]"
            >
              {name}
            </span>
            <span
              data-slot="tool-call-status"
              className="inline-grid text-xs font-normal leading-5 text-muted-foreground [&>*]:col-start-1 [&>*]:row-start-1"
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={status}
                  className="text-end whitespace-nowrap"
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { opacity: 0, y: -4 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: duration.base, ease: easeOut }
                  }
                >
                  {statusLabels[status]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
          {summary && (
            <span
              data-slot="tool-call-summary"
              className="col-start-2 -mt-1 text-start text-xs font-normal leading-5 text-muted-foreground [overflow-wrap:anywhere]"
            >
              {summary}
            </span>
          )}
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
      className={composeRenderProps(className, (className) =>
        cn("text-sm leading-6 text-foreground", className),
      )}
    >
      <div className="grid min-w-0 gap-3 border-t border-border/70 px-3 pt-2.5 pb-3 [overflow-wrap:anywhere]">
        {children}
      </div>
    </CollapsiblePanel>
  );
}

export function ToolCallSection({
  label,
  className,
  children,
  ...props
}: ComponentProps<"section"> & { label: string }) {
  return (
    <section
      {...props}
      data-slot="tool-call-section"
      className={cn("grid min-w-0 gap-1", className)}
    >
      <h4 className="text-xs font-medium text-muted-foreground">{label}</h4>
      {children}
    </section>
  );
}

export function ToolCallCode({ className, ...props }: ComponentProps<"pre">) {
  return (
    <pre
      {...props}
      data-slot="tool-call-code"
      className={cn(
        "max-h-60 min-w-0 overflow-auto rounded-md bg-muted/60 p-3 font-mono text-xs leading-5 whitespace-pre",
        className,
      )}
    />
  );
}
