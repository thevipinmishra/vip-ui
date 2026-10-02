"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

export interface TypingIndicatorProps
  extends Omit<HTMLAttributes<HTMLOutputElement>, "children"> {
  label?: string;
}

export function TypingIndicator({
  label = "Typing",
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <output
      {...props}
      data-slot="typing-indicator"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <Spinner variant="dots" size="sm" decorative />
      {label}
    </output>
  );
}
