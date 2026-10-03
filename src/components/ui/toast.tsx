"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
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
import { CheckCircle, InfoCircle, Warning, X } from "reicon-react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

const toastIconStyles = tv({
  base: "mt-0.5 shrink-0",
  variants: {
    variant: {
      info: "text-primary",
      success: "text-success",
      warning: "text-warning",
    },
  },
  defaultVariants: { variant: "info" },
});

export interface ToastMessage {
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning";
}

export const toastQueue = new ToastQueue<ToastMessage>({ maxVisibleToasts: 3 });

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
    <AriaToastRegion
      queue={toastQueue}
      data-slot="toast-viewport"
      aria-label="Notifications"
      className={composeRenderProps(className, (className) =>
        cn(
          "fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex flex-col gap-3 outline-none sm:inset-x-auto sm:end-4 sm:w-90",
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
                <ToastDescription>{toast.content.description}</ToastDescription>
              )}
            </ToastContent>
            <ToastClose />
          </Toast>
        );
      }}
    </AriaToastRegion>
  );
}

export function Toast({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaToast>) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaToast
      {...props}
      data-slot="toast"
      render={
        props.render ??
        ((domProps) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            initial={reduceMotion ? false : { opacity: 0, x: 12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: "spring",
              duration: reduceMotion ? 0 : 0.3,
              bounce: 0,
            }}
          />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "flex gap-3 rounded-xl bg-popover p-4 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none focus-visible:outline-2 focus-visible:outline-ring",
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
          "grid size-11 shrink-0 cursor-pointer place-items-center rounded-sm text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {children ?? <X size={16} aria-hidden="true" />}
    </AriaButton>
  );
}

export { AriaToastRegion as ToastRegion };
