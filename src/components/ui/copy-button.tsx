"use client";

import { CheckIcon, CopyIcon, WarningIcon } from "@phosphor-icons/react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { composeRenderProps } from "react-aria-components";
import { duration, easeOut, springLayout } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { buttonLabel } from "./button-styles";

export type CopyButtonStatus = "idle" | "copied" | "error";

const statusCopy = {
  idle: { icon: <CopyIcon />, label: "Copy" },
  copied: { icon: <CheckIcon />, label: "Copied" },
  error: { icon: <WarningIcon />, label: "Retry" },
} as const;

const statusAnnouncement = {
  idle: "",
  copied: "Copied to clipboard",
  error: "Copy failed. Try again.",
} as const;

function resolveContent(
  children: CopyButtonProps["children"],
  status: CopyButtonStatus,
  iconOnly: boolean,
) {
  if (children == null) {
    const current = statusCopy[status];
    return {
      key: status,
      dataIcon: iconOnly ? undefined : "inline-start",
      node: (
        <>
          {current.icon}
          {!iconOnly && buttonLabel(current.label)}
        </>
      ),
    };
  }
  if (typeof children === "function") {
    return {
      key: status,
      dataIcon: undefined,
      node: buttonLabel(children(status)),
    };
  }
  return { key: "static", dataIcon: undefined, node: buttonLabel(children) };
}

function resolveLabel(children: CopyButtonProps["children"]) {
  const idle = typeof children === "function" ? children("idle") : children;
  return typeof idle === "string" ? idle : "Copy";
}

export interface CopyButtonProps
  extends Omit<ButtonProps, "children" | "onPress" | "type" | "value"> {
  value: string;
  children?: ReactNode | ((status: CopyButtonStatus) => ReactNode);
  "data-slot"?: string;
}

export function CopyButton({
  value,
  children,
  variant = "outline",
  iconOnly = false,
  "aria-label": ariaLabel,
  "data-slot": dataSlot = "copy-button",
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

  const motionButton: ButtonProps["render"] = (buttonProps) => {
    const {
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      onAnimationIteration: _onAnimationIteration,
      ...rest
    } = buttonProps;
    return (
      <motion.button
        {...(rest as HTMLMotionProps<"button">)}
        layout={!reduceMotion}
        transition={springLayout}
      />
    );
  };

  const label = ariaLabel ?? resolveLabel(children);
  const content = resolveContent(children, status, iconOnly);

  return (
    <>
      <Button
        {...props}
        type="button"
        data-slot={dataSlot}
        data-status={status}
        variant={variant}
        iconOnly={iconOnly}
        render={props.render ?? motionButton}
        className={composeRenderProps(className, (className) =>
          cn("relative", className),
        )}
        aria-label={label}
        onPress={() => void copy()}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={content.key}
            layout={reduceMotion ? false : "position"}
            data-icon={content.dataIcon}
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
            {content.node}
          </motion.span>
        </AnimatePresence>
      </Button>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {statusAnnouncement[status]}
      </output>
    </>
  );
}
