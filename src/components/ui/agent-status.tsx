"use client";

import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { easeInOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type AgentStatusState = "thinking" | "working" | "complete" | "error";

export interface AgentStatusProps
  extends Omit<ComponentProps<"output">, "children"> {
  label: string;
  state: AgentStatusState;
  detail?: string;
}

const stateLabels: Record<AgentStatusState, string> = {
  thinking: "Thinking",
  working: "Working",
  complete: "Done",
  error: "Failed",
};

export function AgentStatus({
  label,
  state,
  detail,
  className,
  ...props
}: AgentStatusProps) {
  const reduceMotion = useReducedMotion() === true;
  const active = state === "thinking" || state === "working";

  return (
    <output
      {...props}
      data-slot="agent-status"
      data-state={state}
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-primary",
          state === "complete" && "bg-success-subtle text-success",
          state === "error" && "bg-destructive/10 text-destructive",
        )}
      >
        {active ? (
          <span className="flex items-center gap-0.5">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="size-1 rounded-full bg-current forced-colors:bg-[CanvasText]"
                initial={false}
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 1.1,
                        delay: index * 0.13,
                        repeat: Infinity,
                        ease: easeInOut,
                      }
                }
              />
            ))}
          </span>
        ) : state === "complete" ? (
          <CheckCircleIcon size={17} />
        ) : (
          <XCircleIcon size={17} />
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="flex min-h-8 min-w-0 flex-[1_1_10rem] flex-col justify-center">
          <span className="font-medium text-foreground [overflow-wrap:anywhere]">
            {label}
          </span>
          {detail && (
            <span className="mt-0.5 text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
              {detail}
            </span>
          )}
        </span>
        <span className="text-xs text-muted-foreground">
          {stateLabels[state]}
        </span>
      </span>
    </output>
  );
}
