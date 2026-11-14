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

const GLYPH_INTERVAL = 0.05;

function graphemes(text: string) {
  return Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    ({ segment }) => segment,
  );
}

function matchCase(glyph: string, source: string | undefined) {
  if (!source) return glyph;
  if (source !== source.toUpperCase()) return glyph.toLowerCase();
  if (source !== source.toLowerCase()) return glyph.toUpperCase();
  return glyph;
}

function pick(alphabet: string[], index: number, tick: number) {
  const hash = Math.imul(index + 1, 2654435761) ^ Math.imul(tick + 1, 40503);
  return alphabet[(hash >>> 0) % alphabet.length];
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
  const source = useRef<string[]>([]);
  const progress = useMotionValue(1);
  const reducedMotion = useReducedMotion();
  const characters = useMemo(() => graphemes(value), [value]);
  const alphabet = useMemo(() => graphemes(glyphs || DEFAULT_GLYPHS), [glyphs]);

  useMotionValueEvent(progress, "change", (latest) => {
    const from = source.current;
    const length = Math.round(
      from.length + (characters.length - from.length) * latest,
    );
    const resolved = Math.floor(latest * characters.length);
    const tick = Math.floor((latest * duration) / GLYPH_INTERVAL);
    setDisplay(
      Array.from({ length }, (_, index) => {
        const target = characters[index];
        if (index < resolved || (target && target === from[index]))
          return target;
        const reference = target ?? from[index];
        if (/^\s$/u.test(reference)) return reference;
        return matchCase(pick(alphabet, index, tick), reference);
      }).join(""),
    );
  });

  useLayoutEffect(() => {
    if (previousValue.current === value) {
      progress.set(1);
      return;
    }
    source.current = graphemes(previousValue.current);
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
      className={cn("font-mono wrap-anywhere", className)}
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {reducedMotion || duration <= 0 || !value ? value : display}
      </span>
    </span>
  );
}
