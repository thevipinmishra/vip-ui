import type { Transition } from "motion/react";

export const easeOut = [0.23, 1, 0.32, 1] as const;

export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const easeOutClass = "ease-[cubic-bezier(0.23,1,0.32,1)]";

export const duration = {
  fast: 0.14,
  base: 0.2,
  slow: 0.28,
} as const;

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

export function transitionFor(
  reduceMotion: boolean | null,
  transition: Transition,
): Transition {
  return reduceMotion ? { duration: 0 } : transition;
}

export function edgeOffset(placement: string | null, distance: number) {
  switch (placement) {
    case "top":
      return { x: 0, y: distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: -distance };
  }
}
