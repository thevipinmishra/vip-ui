"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export interface TextScrambleProps
  extends Omit<ComponentProps<"span">, "children"> {
  value: string;
  duration?: number;
  glyphs?: string;
}

export function TextScramble({
  value,
  duration = 0.7,
  glyphs = DEFAULT_GLYPHS,
  className,
  ...props
}: TextScrambleProps) {
  const [display, setDisplay] = useState(value);
  const progress = useMotionValue(1);
  const reducedMotion = useReducedMotion();
  const characters = Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value),
    ({ segment }) => segment,
  );
  const alphabet = Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
      glyphs || DEFAULT_GLYPHS,
    ),
    ({ segment }) => segment,
  );

  useMotionValueEvent(progress, "change", (latest) => {
    const resolved = Math.floor(latest * characters.length);
    setDisplay(
      characters
        .map((character, index) =>
          index < resolved || /^\s$/u.test(character)
            ? character
            : alphabet[Math.floor(Math.random() * alphabet.length)],
        )
        .join(""),
    );
  });

  useEffect(() => {
    if (!value || reducedMotion || duration <= 0) {
      progress.set(1);
      return;
    }
    progress.set(0);
    const controls = animate(progress, 1, {
      duration,
      ease: "linear",
    });
    return () => controls.stop();
  }, [duration, progress, reducedMotion, value]);

  return (
    <span
      {...props}
      data-slot="text-scramble"
      className={cn("font-mono", className)}
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {reducedMotion || duration <= 0 || !value ? value : display}
      </span>
    </span>
  );
}
