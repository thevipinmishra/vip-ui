"use client";

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import { cn } from "@/lib/utils";

export type ResponseStatus = "streaming" | "complete" | "stopped" | "error";

interface ResponseContextValue {
  status: ResponseStatus;
}

const ResponseContext = createContext<ResponseContextValue | null>(null);

function useResponseContext() {
  const context = useContext(ResponseContext);
  if (!context)
    throw new Error(
      "Response parts must render inside a Response. Use the parts as the children of Response.",
    );
  return context;
}

const announcements: Record<ResponseStatus, string> = {
  streaming: "",
  complete: "Response complete",
  stopped: "Response stopped",
  error: "Response failed",
};

export interface ResponseProps
  extends Omit<ComponentProps<"article">, "children"> {
  status: ResponseStatus;
  children?: ReactNode;
}

export function Response({
  status,
  children,
  className,
  ...props
}: ResponseProps) {
  return (
    <ResponseContext value={{ status }}>
      <article
        {...props}
        data-slot="response"
        data-status={status}
        className={cn(
          "flex min-w-0 flex-col gap-2 transition-[opacity,translate] duration-200 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-1",
          className,
        )}
      >
        <output className="sr-only" aria-live="polite" aria-atomic="true">
          {announcements[status]}
        </output>
        {children}
      </article>
    </ResponseContext>
  );
}

export interface ResponseContentProps extends ComponentProps<"div"> {
  caret?: boolean;
}

export function ResponseContent({
  caret = true,
  className,
  children,
  ...props
}: ResponseContentProps) {
  const { status } = useResponseContext();
  const streaming = status === "streaming";
  return (
    <div
      {...props}
      data-slot="response-content"
      aria-busy={streaming || undefined}
      className={cn(
        "min-h-6 min-w-0 text-sm leading-6 [overflow-wrap:anywhere]",
        className,
      )}
    >
      {children}
      {streaming && caret && (
        <span
          aria-hidden="true"
          data-slot="response-caret"
          className="ms-1 inline-block h-[1.05em] w-[0.45em] translate-y-[0.15em] rounded-[2px] bg-foreground/70 motion-safe:animate-caret forced-colors:bg-[CanvasText]"
        />
      )}
    </div>
  );
}

export function ResponseActions({
  className,
  ...props
}: ComponentProps<"div">) {
  const { status } = useResponseContext();
  return (
    <div
      {...props}
      key={status}
      data-slot="response-actions"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-1 transition-[opacity,translate] duration-200 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-0.5",
        className,
      )}
    />
  );
}

export function ResponseFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="response-footer"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
        className,
      )}
    />
  );
}

export interface ResponseNoticeProps
  extends Omit<ComponentProps<"p">, "children"> {
  children?: ReactNode;
}

export function ResponseNotice({
  children,
  className,
  ...props
}: ResponseNoticeProps) {
  const { status } = useResponseContext();
  if (status === "streaming" || status === "complete") return null;
  return (
    <p
      {...props}
      key={status}
      data-slot="response-notice"
      className={cn(
        "text-xs text-muted-foreground transition-[opacity,translate] duration-200 ease-out-quint starting:opacity-0 motion-safe:starting:translate-y-0.5",
        className,
      )}
    >
      {children ?? (status === "stopped" ? "Stopped" : "Something went wrong.")}
    </p>
  );
}
