"use client";

import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ComponentProps, type RefObject, useRef } from "react";
import { cn } from "./utils";

export interface ScrollHighlightProps
  extends Omit<ComponentProps<"span">, "children"> {
  text: string;
  containerRef?: RefObject<HTMLElement | null>;
}

function HighlightWord({
  word,
  index,
  count,
  progress,
  reducedMotion,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = (index / count) * 0.85;
  const underline = useTransform(
    progress,
    [start, Math.min(1, start + Math.max(0.12, 0.85 / count))],
    [0, 1],
  );
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.22em] origin-left rounded-full bg-primary/30 forced-colors:bg-[Highlight]"
        style={{ scaleX: reducedMotion ? 1 : underline }}
      />
      <span className="relative">{word}</span>
    </span>
  );
}

export function ScrollHighlight({
  text,
  containerRef,
  className,
  ...props
}: ScrollHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: containerRef
      ? ["start end", "end start"]
      : ["start 85%", "end 35%"],
  });
  const reducedMotion = useReducedMotion() === true;
  const parts = Array.from(text.matchAll(/\s+|\S+/gu), (match) => ({
    value: match[0],
    offset: match.index,
  }));
  const count = parts.filter(({ value }) => !/^\s+$/u.test(value)).length;
  let index = 0;

  return (
    <span
      {...props}
      ref={ref}
      data-slot="scroll-highlight"
      className={cn("whitespace-pre-wrap", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map(({ value, offset }) =>
          /^\s+$/u.test(value) ? (
            <span key={offset}>{value}</span>
          ) : (
            <HighlightWord
              key={offset}
              word={value}
              index={index++}
              count={count}
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ),
        )}
      </span>
    </span>
  );
}
