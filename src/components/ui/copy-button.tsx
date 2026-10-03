"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Warning } from "reicon-react";
import { Button, type ButtonProps } from "./button";

export interface CopyButtonProps
  extends Omit<ButtonProps, "children" | "onPress" | "type"> {
  value: string;
  label?: string;
  text?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  text = "Copy",
  variant = "outline",
  size = "default",
  ...props
}: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timeout = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <>
      <Button
        {...props}
        type="button"
        data-slot="copy-button"
        variant={variant}
        size={size}
        aria-label={
          state === "copied"
            ? "Copied to clipboard"
            : state === "failed"
              ? "Copy failed. Try again"
              : label
        }
        onPress={() => void copy()}
      >
        {state === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : state === "failed" ? (
          <Warning size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === "copied" ? "Copied" : state === "failed" ? "Retry" : text}
      </Button>
      <output className="sr-only" aria-live="polite">
        {state === "copied"
          ? "Copied to clipboard"
          : state === "failed"
            ? "Copy failed. Try again."
            : ""}
      </output>
    </>
  );
}
