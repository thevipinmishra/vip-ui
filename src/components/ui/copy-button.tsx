"use client";

import { CheckIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { composeRenderProps } from "react-aria-components";
import { duration, easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { buttonLabel } from "./button-styles";

export type CopyButtonStatus = "idle" | "copied" | "error";

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
  iconOnly = false,
  "aria-label": ariaLabel,
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
      result = "error";
    }

    if (id !== requestId.current) return;
    setStatus(result);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2000);
  }

  const content = typeof children === "function" ? children(status) : children;
  const idleContent =
    typeof children === "function" ? children("idle") : children;
  const label =
    ariaLabel ?? (typeof idleContent === "string" ? idleContent : "Copy");
  const defaultContent = (
    <>
      {status === "copied" ? (
        <CheckIcon />
      ) : status === "error" ? (
        <WarningIcon />
      ) : (
        <CopyIcon />
      )}
      {!iconOnly &&
        buttonLabel(
          status === "copied"
            ? "Copied"
            : status === "error"
              ? "Retry"
              : "Copy",
        )}
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
        iconOnly={iconOnly}
        layout
        className={composeRenderProps(className, (className) =>
          cn("relative", className),
        )}
        aria-label={label}
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
            className="inline-flex min-w-0 max-w-full items-center justify-center gap-[inherit] whitespace-nowrap"
          >
            {children == null ? defaultContent : buttonLabel(content)}
          </motion.span>
        </AnimatePresence>
      </Button>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Copy failed. Try again."
            : ""}
      </output>
    </>
  );
}
