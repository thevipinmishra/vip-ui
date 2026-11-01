import type { Transition } from "motion/react";

export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.25,
  reveal: 0.45,
} as const;

export const maxStagger = 0.6;

export const easeOut = [0.23, 1, 0.32, 1] as const;

export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const easeSheet = [0.32, 0.72, 0, 1] as const;

export const springSnappy = {
  type: "spring",
  duration: 0.24,
  bounce: 0,
} as const satisfies Transition;

export const springLayout = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const satisfies Transition;

export const springPop = {
  type: "spring",
  visualDuration: 0.28,
  bounce: 0.12,
} as const satisfies Transition;

export const loop = {
  spin: 0.8,
  pulse: 1.1,
  sweep: 1.6,
} as const;

export function transitionFor(
  reduceMotion: boolean | null,
  transition: Transition,
): Transition {
  return reduceMotion ? { duration: 0 } : transition;
}
