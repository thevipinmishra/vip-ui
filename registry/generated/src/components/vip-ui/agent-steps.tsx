"use client";

import {
  CheckIcon,
  StopCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { composeRenderProps } from "react-aria-components";
import { cn } from "./utils";
import { CollapsiblePanel } from "./collapsible-panel";
import { Disclosure, DisclosureHeader } from "./disclosure";
import { Spinner } from "./spinner";
import { TextShimmer } from "./text-shimmer";

export type AgentStepsStatus = "running" | "complete" | "stopped" | "error";
export type AgentStepStatus = "pending" | AgentStepsStatus;

const statusLabels: Record<AgentStepStatus, string> = {
  pending: "Not started",
  running: "In progress",
  complete: "Done",
  stopped: "Stopped",
  error: "Failed",
};

function StatusIcon({
  status,
  step = false,
}: {
  status: AgentStepStatus;
  step?: boolean;
}) {
  return (
    <span
      key={status}
      className="grid place-items-center transition-[opacity,scale] duration-200 ease-out-quint starting:scale-75 starting:opacity-0 motion-reduce:transition-none"
    >
      {status === "running" && step ? (
        <span className="size-2 rounded-full bg-current motion-safe:animate-caret forced-colors:bg-[CanvasText]" />
      ) : status === "running" ? (
        <Spinner size="xs" decorative />
      ) : status === "complete" ? (
        <CheckIcon size={14} weight="bold" />
      ) : status === "stopped" ? (
        <StopCircleIcon size={16} />
      ) : status === "error" ? (
        <WarningCircleIcon size={16} weight="fill" />
      ) : (
        <span className="size-2 rounded-full border-[1.5px] border-current opacity-60" />
      )}
    </span>
  );
}

export interface AgentStepsProps
  extends Omit<ComponentProps<typeof Disclosure>, "children" | "className"> {
  label: string;
  status: AgentStepsStatus;
  detail?: string;
  autoCollapse?: boolean;
  className?: ComponentProps<typeof Disclosure>["className"];
  children?: ReactNode;
}

export function AgentSteps({
  label,
  status,
  detail,
  autoCollapse = false,
  defaultExpanded,
  isExpanded,
  onExpandedChange,
  className,
  children,
  ...props
}: AgentStepsProps) {
  const [internalExpanded, setInternalExpanded] = useState(
    defaultExpanded ?? status === "running",
  );
  const expanded = isExpanded ?? internalExpanded;
  const previousStatusRef = useRef(status);

  useEffect(() => {
    const previous = previousStatusRef.current;
    previousStatusRef.current = status;
    if (!autoCollapse || isExpanded !== undefined || previous === status)
      return;
    setInternalExpanded(status === "running");
  }, [status, autoCollapse, isExpanded]);

  return (
    <Disclosure
      {...props}
      isExpanded={expanded}
      onExpandedChange={(next) => {
        if (isExpanded === undefined) setInternalExpanded(next);
        onExpandedChange?.(next);
      }}
      data-slot="agent-steps"
      data-status={status}
      className={composeRenderProps(className, (className) =>
        cn("rounded-none border-0 bg-transparent", className),
      )}
    >
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {`${label}, ${statusLabels[status]}`}
      </output>
      <DisclosureHeader
        data-slot="agent-steps-trigger"
        className="-ms-2 min-h-9 w-fit max-w-full justify-start gap-1.5 rounded-md px-2 py-1.5 font-normal text-muted-foreground hover:bg-transparent hover:text-foreground pointer-coarse:min-h-11 aria-expanded:rounded-md"
      >
        <span className="flex min-w-0 items-start gap-2">
          <span
            aria-hidden="true"
            className={cn(
              "grid h-6 w-4 shrink-0 place-items-center",
              status === "error" && "text-destructive",
            )}
          >
            <StatusIcon status={status} />
          </span>
          <span className="min-w-0 leading-6">
            <span className="font-medium text-foreground">{label}</span>
            {detail && (
              <span data-slot="agent-steps-detail" className="tabular-nums">
                {" · "}
                {detail}
              </span>
            )}
          </span>
        </span>
      </DisclosureHeader>
      <CollapsiblePanel data-slot="agent-steps-panel">
        <ol
          aria-label={label}
          className="mt-1 grid min-w-0 pb-1 text-sm leading-6"
        >
          {children}
        </ol>
      </CollapsiblePanel>
    </Disclosure>
  );
}

export interface AgentStepProps extends Omit<ComponentProps<"li">, "title"> {
  title: string;
  status?: AgentStepStatus;
  description?: ReactNode;
}

export function AgentStep({
  title,
  status = "complete",
  description,
  className,
  children,
  ...props
}: AgentStepProps) {
  return (
    <li
      {...props}
      data-slot="agent-step"
      data-status={status}
      aria-current={status === "running" ? "step" : undefined}
      className={cn(
        "group/step relative grid min-w-0 grid-cols-[1rem_minmax(0,1fr)] gap-x-2 pb-3 last:pb-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute start-2 top-5.5 -bottom-0.5 w-px -translate-x-1/2 bg-border group-last/step:hidden rtl:translate-x-1/2"
      />
      <span
        aria-hidden="true"
        className={cn(
          "grid h-6 place-items-center text-muted-foreground",
          status === "running" && "text-foreground",
          status === "error" && "text-destructive",
        )}
      >
        <StatusIcon status={status} step />
      </span>
      <div className="min-w-0">
        <p
          data-slot="agent-step-title"
          className={cn(
            "wrap-anywhere text-foreground",
            status === "pending" && "text-muted-foreground",
            status === "running" && "font-medium",
          )}
        >
          {status === "running" ? (
            <TextShimmer className="text-foreground/70">{title}</TextShimmer>
          ) : (
            title
          )}
          <span className="sr-only">, {statusLabels[status]}</span>
        </p>
        {description && (
          <p
            data-slot="agent-step-description"
            className={cn(
              "text-xs leading-5 text-muted-foreground wrap-anywhere",
              status === "error" && "text-destructive",
            )}
          >
            {description}
          </p>
        )}
        {children && (
          <div data-slot="agent-step-content" className="mt-2 min-w-0">
            {children}
          </div>
        )}
      </div>
    </li>
  );
}
