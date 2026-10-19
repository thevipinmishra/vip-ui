"use client";

import {
  BrainIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { composeRenderProps } from "react-aria-components";
import { cn } from "@/lib/utils";
import { CollapsiblePanel } from "./collapsible-panel";
import { Disclosure, DisclosureHeader } from "./disclosure";

export type ReasoningStatus = "thinking" | "complete" | "error";

interface ReasoningContextValue {
  status: ReasoningStatus;
  label: string;
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

function useReasoningContext() {
  const context = useContext(ReasoningContext);
  if (!context)
    throw new Error(
      "Reasoning parts must render inside a Reasoning. Use the parts as the children of Reasoning.",
    );
  return context;
}

export interface ReasoningProps
  extends Omit<ComponentProps<typeof Disclosure>, "children" | "className"> {
  status: ReasoningStatus;
  duration?: number;
  autoCollapse?: boolean;
  className?: ComponentProps<typeof Disclosure>["className"];
  children?: ReactNode;
}

export function Reasoning({
  status,
  duration,
  autoCollapse = false,
  defaultExpanded,
  isExpanded,
  onExpandedChange,
  className,
  children,
  ...props
}: ReasoningProps) {
  const [elapsed, setElapsed] = useState(0);
  const [internalExpanded, setInternalExpanded] = useState(
    defaultExpanded ?? status === "thinking",
  );
  const expanded = isExpanded ?? internalExpanded;

  useEffect(() => {
    if (status !== "thinking" || duration !== undefined) return;
    setElapsed(0);
    const startedAt = Date.now();
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [status, duration]);

  const previousStatusRef = useRef(status);

  useEffect(() => {
    const previous = previousStatusRef.current;
    previousStatusRef.current = status;
    if (!autoCollapse || isExpanded !== undefined || previous === status)
      return;
    setInternalExpanded(status === "thinking");
  }, [status, autoCollapse, isExpanded]);

  const seconds = duration ?? elapsed;
  const label =
    status === "thinking"
      ? seconds > 0
        ? `Thinking for ${seconds}s`
        : "Thinking"
      : status === "complete"
        ? seconds > 0
          ? `Thought for ${seconds}s`
          : "Thought"
        : "Reasoning failed";

  return (
    <ReasoningContext value={{ status, label }}>
      <Disclosure
        {...props}
        isExpanded={expanded}
        onExpandedChange={(next) => {
          if (isExpanded === undefined) setInternalExpanded(next);
          onExpandedChange?.(next);
        }}
        data-slot="reasoning"
        data-status={status}
        className={composeRenderProps(className, (className) => cn(className))}
      >
        <output className="sr-only" aria-live="polite" aria-atomic="true">
          {status === "error"
            ? "Reasoning failed"
            : status === "complete"
              ? label
              : ""}
        </output>
        {children ?? (
          <>
            <ReasoningTrigger />
            <ReasoningPanel />
          </>
        )}
      </Disclosure>
    </ReasoningContext>
  );
}

export interface ReasoningTriggerProps
  extends Omit<ComponentProps<typeof DisclosureHeader>, "children"> {
  className?: string;
}

export function ReasoningTrigger({
  className,
  ...props
}: ReasoningTriggerProps) {
  const { status, label } = useReasoningContext();
  const accessibleLabel =
    props["aria-label"] ??
    (status === "thinking"
      ? "Reasoning, in progress"
      : status === "complete"
        ? "Reasoning, complete"
        : "Reasoning, failed");
  return (
    <DisclosureHeader
      {...props}
      aria-label={accessibleLabel}
      data-slot="reasoning-trigger"
      className={cn("text-muted-foreground", className)}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className="grid shrink-0 place-items-center [&>*]:col-start-1 [&>*]:row-start-1"
        >
          <BrainIcon
            size={16}
            data-slot="reasoning-icon"
            data-active={status === "thinking" || undefined}
            className={cn(
              "transition-[opacity,scale] duration-150 ease-out-quint data-active:opacity-100 motion-reduce:transition-none not-data-active:scale-75 not-data-active:opacity-0",
              status === "thinking" && "motion-safe:animate-pulse",
            )}
          />
          <CheckCircleIcon
            size={16}
            data-slot="reasoning-icon"
            data-active={status === "complete" || undefined}
            className="transition-[opacity,scale] duration-150 ease-out-quint data-active:opacity-100 motion-reduce:transition-none not-data-active:scale-75 not-data-active:opacity-0"
          />
          <WarningCircleIcon
            size={16}
            data-slot="reasoning-icon"
            data-active={status === "error" || undefined}
            className="text-destructive transition-[opacity,scale] duration-150 ease-out-quint data-active:opacity-100 motion-reduce:transition-none not-data-active:scale-75 not-data-active:opacity-0"
          />
        </span>
        <span aria-hidden="true" className="min-w-0 font-normal tabular-nums">
          {label}
        </span>
      </span>
    </DisclosureHeader>
  );
}

export interface ReasoningPanelProps
  extends Omit<ComponentProps<typeof CollapsiblePanel>, "children"> {
  scrollable?: boolean;
  autoScroll?: boolean;
  children?: ReactNode;
}

export function ReasoningPanel({
  className,
  children,
  scrollable = false,
  autoScroll = true,
  ...props
}: ReasoningPanelProps) {
  const { status } = useReasoningContext();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const thinking = status === "thinking";
  const thinkingRef = useRef(thinking);
  thinkingRef.current = thinking;

  useEffect(() => {
    const element = contentRef.current;
    if (!element || !scrollable || !autoScroll) return;
    const observer = new ResizeObserver(() => {
      if (thinkingRef.current) element.scrollTop = element.scrollHeight;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [scrollable, autoScroll]);

  return (
    <CollapsiblePanel
      {...props}
      data-slot="reasoning-panel"
      className={composeRenderProps(className, (className) =>
        cn("text-sm leading-6 text-muted-foreground", className),
      )}
    >
      <div
        ref={contentRef}
        data-slot="reasoning-content"
        tabIndex={scrollable ? 0 : undefined}
        className={cn(
          "px-4 pb-3 [overflow-wrap:anywhere] outline-none",
          scrollable &&
            "max-h-64 overflow-y-auto overscroll-contain rounded-b-lg focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring focus-visible:-outline-offset-2",
        )}
      >
        {children}
      </div>
    </CollapsiblePanel>
  );
}
