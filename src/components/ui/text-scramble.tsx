"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  type ComponentProps,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function graphemes(text: string) {
  return Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    ({ segment }) => segment,
  );
}

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
  const previousValue = useRef(value);
  const progress = useMotionValue(1);
  const reducedMotion = useReducedMotion();
  const characters = useMemo(() => graphemes(value), [value]);
  const alphabet = useMemo(() => graphemes(glyphs || DEFAULT_GLYPHS), [glyphs]);

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

  useLayoutEffect(() => {
    if (previousValue.current === value) {
      progress.set(1);
      return;
    }
    previousValue.current = value;
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
