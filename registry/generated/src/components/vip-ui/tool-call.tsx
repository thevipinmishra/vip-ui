"use client";

import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useState } from "react";
import { composeRenderProps } from "react-aria-components";
import { duration, easeOut, springPop } from "./motion";
import { cn } from "./utils";
import { CollapsiblePanel } from "./collapsible-panel";
import { Disclosure, DisclosureHeader } from "./disclosure";
import { Spinner } from "./spinner";

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
        "grid h-5 w-4 shrink-0 place-items-center text-muted-foreground *:col-start-1 *:row-start-1",
        status === "complete" && "text-success",
        status === "error" && "text-destructive",
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
            <Spinner size="xs" decorative />
          ) : status === "complete" ? (
            <CheckCircleIcon size={16} weight="fill" />
          ) : (
            <XCircleIcon size={16} weight="fill" />
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
          "items-start rounded-xl px-3 py-3 hover:bg-muted/70 [&>span:first-child]:min-w-0 [&>span:first-child]:flex-1 [&>span:last-child]:mt-0.5",
          className,
        )}
      >
        <span className="flex min-w-0 items-start gap-2.5">
          <ToolCallIcon status={status} />
          <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
            <span className="flex min-w-0 flex-[1_1_5rem] flex-wrap items-baseline gap-x-2">
              <span
                data-slot="tool-call-name"
                className="min-w-0 text-start font-mono text-xs font-medium leading-5 text-foreground wrap-anywhere"
              >
                {name}
              </span>
              {summary && (
                <span
                  data-slot="tool-call-summary"
                  className="min-w-0 flex-[1_1_8rem] text-start text-xs font-normal leading-5 text-muted-foreground wrap-anywhere"
                >
                  {summary}
                </span>
              )}
            </span>
            <span
              data-slot="tool-call-status"
              className="ms-auto inline-grid text-xs font-normal leading-5 text-muted-foreground *:col-start-1 *:row-start-1"
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
      <div className="grid min-w-0 gap-3 border-t border-border/70 px-3 pt-3 pb-3 wrap-anywhere">
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
        "max-h-60 min-w-0 overflow-auto rounded-lg bg-muted/60 px-3 py-2 font-mono text-xs leading-5 whitespace-pre",
        className,
      )}
    />
  );
}
