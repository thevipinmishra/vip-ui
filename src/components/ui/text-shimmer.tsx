"use client";

import {
  type ComponentProps,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { loop } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface TextShimmerProps extends ComponentProps<"span"> {
  duration?: number;
  active?: boolean;
}

export function TextShimmer({
  duration = loop.sweep,
  active = true,
  children,
  className,
  ...props
}: TextShimmerProps) {
  const root = useRef<HTMLSpanElement>(null);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const node = root.current;
    if (node) setDirection(getComputedStyle(node).direction === "rtl" ? -1 : 1);
  }, []);

  const travel = 65 * direction;

  return (
    <span
      {...props}
      ref={root}
      data-slot="text-shimmer"
      className={cn(
        "relative inline-block max-w-full text-muted-foreground",
        className,
      )}
    >
      {children}
      {direction !== 0 && active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none overflow-clip [mask-image:linear-gradient(to_right,transparent_35%,black_50%,transparent_65%)] forced-colors:hidden motion-reduce:hidden motion-safe:animate-text-shimmer"
          style={
            {
              "--shimmer-from": `${-travel}%`,
              "--shimmer-to": `${travel}%`,
              "--text-shimmer-duration": `${duration / 0.75}s`,
            } as CSSProperties
          }
        >
          <span
            className="absolute inset-0 text-(--text-shimmer-highlight,var(--color-foreground)) motion-safe:animate-text-shimmer"
            style={
              {
                "--shimmer-from": `${travel}%`,
                "--shimmer-to": `${-travel}%`,
              } as CSSProperties
            }
          >
            {children}
          </span>
        </span>
      )}
    </span>
  );
}
