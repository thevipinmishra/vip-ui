"use client";

import { CheckIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { composeRenderProps } from "react-aria-components";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";

export type CopyButtonStatus = "idle" | "copied" | "failed";

export interface CopyButtonProps
  extends Omit<
    ButtonProps,
    "children" | "onPress" | "type" | "value" | "layout"
  > {
  value: string;
  children?: ReactNode | ((status: CopyButtonStatus) => ReactNode);
}

export function CopyButton({
  value,
  children,
  variant = "outline",
  size = "default",
  "aria-label": ariaLabel = "Copy",
  className,
  ...props
}: CopyButtonProps) {
  const [status, setStatus] = useState<CopyButtonStatus>("idle");
  const resetTimer = useRef<number | null>(null);
  const requestId = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      requestId.current++;
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copy() {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    const id = ++requestId.current;
    setStatus("idle");

    let result: CopyButtonStatus;
    try {
      await navigator.clipboard.writeText(value);
      result = "copied";
    } catch {
      result = "failed";
    }

    if (id !== requestId.current) return;
    setStatus(result);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  const content = typeof children === "function" ? children(status) : children;
  const defaultContent = (
    <>
      {status === "copied" ? (
        <CheckIcon size={16} />
      ) : status === "failed" ? (
        <WarningIcon size={16} />
      ) : (
        <CopyIcon size={16} />
      )}
      {size !== "icon" &&
        (status === "copied"
          ? "Copied"
          : status === "failed"
            ? "Retry"
            : "Copy")}
    </>
  );

  return (
    <>
      <Button
        {...props}
        type="button"
        data-slot="copy-button"
        data-status={status}
        variant={variant}
        size={size}
        layout
        className={composeRenderProps(className, (className) =>
          cn("relative", className),
        )}
        aria-label={ariaLabel}
        onPress={() => void copy()}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={
              typeof children === "function" || children == null
                ? status
                : "static"
            }
            layout={reduceMotion ? false : "position"}
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : duration.fast,
              ease: easeOut,
            }}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {children == null ? defaultContent : content}
          </motion.span>
        </AnimatePresence>
      </Button>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {status === "copied"
          ? "Copied to clipboard"
          : status === "failed"
            ? "Copy failed. Try again."
            : ""}
      </output>
    </>
  );
}
