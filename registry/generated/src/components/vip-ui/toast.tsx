"use client";

import {
  Button as AriaButton,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as AriaToastContent,
  UNSTABLE_ToastRegion as AriaToastRegion,
  composeRenderProps,
  Text,
  type ToastOptions,
  UNSTABLE_ToastQueue as ToastQueue,
} from "react-aria-components";
import { flushSync } from "react-dom";
import { CheckCircle, InfoCircle, Warning, X } from "reicon-react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";

const toastMotionStyles = `
@keyframes vip-toast-enter {
  from { opacity: 0; transform: translateY(12px); }
}
@keyframes vip-toast-exit {
  to { opacity: 0; transform: translateY(8px); }
}
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; }
  ::view-transition-group(.vip-toast) {
    animation-duration: 260ms;
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  ::view-transition-new(.vip-toast):only-child {
    animation: vip-toast-enter 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
  }
  ::view-transition-old(.vip-toast):only-child {
    animation: vip-toast-exit 180ms ease-in both;
  }
  @supports not (view-transition-name: none) {
    [data-slot="toast"] {
      animation: vip-toast-enter 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
    }
  }
}
`;

const toastIconStyles = tv({
  base: "grid size-9 shrink-0 place-items-center rounded-lg",
  variants: {
    variant: {
      info: "bg-accent text-accent-foreground",
      success: "bg-success-subtle text-success-foreground",
      warning: "bg-warning-subtle text-warning-foreground",
    },
  },
  defaultVariants: { variant: "info" },
});

export interface ToastMessage {
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning";
}

export const toastQueue = new ToastQueue<ToastMessage>({
  wrapUpdate(fn) {
    if (
      typeof document !== "undefined" &&
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(() => flushSync(fn));
    } else {
      fn();
    }
  },
});

export function showToast(message: ToastMessage, options?: ToastOptions) {
  const timeout =
    options?.timeout && options.timeout < 5000 ? 5000 : options?.timeout;
  return toastQueue.add(message, { ...options, timeout });
}

export function ToastViewport({
  className,
}: {
  className?: React.ComponentProps<typeof AriaToastRegion>["className"];
}) {
  return (
    <>
      <style>{toastMotionStyles}</style>
      <AriaToastRegion
        queue={toastQueue}
        data-slot="toast-viewport"
        aria-label="Notifications"
        className={composeRenderProps(className, (className) =>
          cn(
            "fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex max-h-[min(70dvh,32rem)] flex-col-reverse gap-2 overflow-y-auto overscroll-contain rounded-xl outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring sm:inset-x-auto sm:end-4 sm:w-96",
            className,
          ),
        )}
      >
        {({ toast }) => {
          const variant = toast.content.variant ?? "info";
          const Icon =
            variant === "success"
              ? CheckCircle
              : variant === "warning"
                ? Warning
                : InfoCircle;
          return (
            <Toast toast={toast}>
              <Icon
                size={18}
                aria-hidden="true"
                className={toastIconStyles({ variant })}
              />
              <ToastContent>
                <ToastTitle>{toast.content.title}</ToastTitle>
                {toast.content.description && (
                  <ToastDescription>
                    {toast.content.description}
                  </ToastDescription>
                )}
              </ToastContent>
              <ToastClose />
            </Toast>
          );
        }}
      </AriaToastRegion>
    </>
  );
}

export function Toast({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<typeof AriaToast>) {
  return (
    <AriaToast
      {...props}
      data-slot="toast"
      style={composeRenderProps(style, (style) => ({
        ...style,
        viewTransitionName: props.toast.key,
      }))}
      className={composeRenderProps(className, (className) =>
        cn(
          "flex shrink-0 items-start gap-3 rounded-xl bg-popover p-4 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring [view-transition-class:vip-toast] forced-colors:border",
          className,
        ),
      )}
    >
      {(renderProps) =>
        typeof children === "function" ? children(renderProps) : children
      }
    </AriaToast>
  );
}

export function ToastContent({
  className,
  ...props
}: React.ComponentProps<typeof AriaToastContent>) {
  return (
    <AriaToastContent
      {...props}
      data-slot="toast-content"
      className={cn("min-w-0 flex-1", className)}
    />
  );
}

export function ToastTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="title"
      data-slot="toast-title"
      className={cn("block text-sm font-semibold", className)}
    />
  );
}

export function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="toast-description"
      className={cn(
        "mt-1 block text-sm leading-5 text-muted-foreground",
        className,
      )}
    />
  );
}

export function ToastClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      {...props}
      slot="close"
      data-slot="toast-close"
      aria-label={props["aria-label"] ?? "Dismiss notification"}
      className={composeRenderProps(className, (className) =>
        cn(
          "-m-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-colors duration-150 hover:bg-muted hover:text-foreground data-[pressed]:bg-muted data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring motion-reduce:transition-none",
          className,
        ),
      )}
    >
      {children ?? <X size={16} aria-hidden="true" />}
    </AriaButton>
  );
}

export { AriaToastRegion as ToastRegion };
