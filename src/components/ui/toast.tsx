"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
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

const MotionToast = motion.create(AriaToast);
const MotionToastClose = motion.create(AriaButton);

/**
 * Motion owns these handlers, so React Aria's DOM versions cannot be spread
 * into a motion component.
 */
type MotionHandlers =
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onHoverStart"
  | "onHoverEnd";

type ToastSurfaceProps = Omit<
  React.ComponentProps<typeof AriaToast>,
  MotionHandlers | "style"
>;
type ToastCloseProps = Omit<
  React.ComponentProps<typeof AriaButton>,
  MotionHandlers | "style"
>;

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

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * React Aria removes a toast as soon as it closes, which leaves no room for an
 * exit animation. This queue holds the removal until the toast reports that
 * its Motion exit finished.
 */
class AnimatedToastQueue extends ToastQueue<ToastMessage> {
  private closing = new Set<string>();
  private exitListeners = new Set<() => void>();

  isClosing(key: string) {
    return this.closing.has(key);
  }

  subscribeToExit = (listener: () => void) => {
    this.exitListeners.add(listener);
    return () => {
      this.exitListeners.delete(listener);
    };
  };

  close(key: string) {
    if (this.closing.has(key) || prefersReducedMotion()) {
      super.close(key);
      return;
    }
    this.closing.add(key);
    for (const listener of this.exitListeners) listener();
  }

  finishClose(key: string) {
    if (!this.closing.delete(key)) return;
    super.close(key);
  }

  /** Resolve deferred closes when a viewport unmounts before they finish. */
  finishAll() {
    for (const key of [...this.closing]) this.finishClose(key);
  }
}

export const toastQueue = new AnimatedToastQueue();

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
  useEffect(() => () => toastQueue.finishAll(), []);

  return (
    <AriaToastRegion
      queue={toastQueue}
      data-slot="toast-viewport"
      aria-label="Notifications"
      className={composeRenderProps(className, (className) =>
        cn(
          "fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex max-h-[min(70dvh,32rem)] flex-col-reverse gap-2 overflow-y-auto overscroll-contain rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-ring sm:inset-x-auto sm:end-4 sm:w-96",
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

export function Toast({ className, children, ...props }: ToastSurfaceProps) {
  const reduceMotion = useReducedMotion();
  const key = props.toast.key;
  const isClosing = useSyncExternalStore(
    toastQueue.subscribeToExit,
    () => toastQueue.isClosing(key),
    () => false,
  );

  return (
    <MotionToast
      {...props}
      data-slot="toast"
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={
        isClosing
          ? { opacity: 0, y: reduceMotion ? 0 : 8 }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: reduceMotion ? 0 : isClosing ? 0.18 : 0.24,
        ease: [0.23, 1, 0.32, 1],
      }}
      onAnimationComplete={() => {
        if (isClosing) toastQueue.finishClose(key);
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "flex shrink-0 items-start gap-3 rounded-xl bg-popover p-4 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none focus-visible:outline-2 focus-visible:outline-ring forced-colors:border",
          className,
        ),
      )}
    >
      {(renderProps) =>
        typeof children === "function" ? children(renderProps) : children
      }
    </MotionToast>
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

export function ToastClose({ className, children, ...props }: ToastCloseProps) {
  const reduceMotion = useReducedMotion();
  return (
    <MotionToastClose
      {...props}
      whileHover={
        reduceMotion || props.isDisabled ? undefined : { scale: 1.06 }
      }
      whileTap={reduceMotion || props.isDisabled ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 36 }}
      slot="close"
      data-slot="toast-close"
      aria-label={props["aria-label"] ?? "Dismiss notification"}
      className={composeRenderProps(className, (className) =>
        cn(
          "-m-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none hover:bg-muted hover:text-foreground pressed:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {children ?? <X size={16} aria-hidden="true" />}
    </MotionToastClose>
  );
}

export { AriaToastRegion as ToastRegion };
