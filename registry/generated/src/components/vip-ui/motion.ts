export const duration = {
  fast: 0.15,
  base: 0.2,
  slow: 0.25,
  reveal: 0.45,
} as const;

export const offset = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export const maxStagger = 0.6;

export const easeOut = [0.23, 1, 0.32, 1] as const;

export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const easeSheet = [0.32, 0.72, 0, 1] as const;

export const springSnappy = {
  type: "spring",
  duration: 0.24,
  bounce: 0,
} as const;

export const springSnappyEasing = {
  duration: 0.25,
  easing:
    "linear(0, 0.0618, 0.1918, 0.3382, 0.476, 0.595, 0.6925, 0.7698, 0.8296, 0.875, 0.909, 0.9342, 0.9526, 0.9661, 0.9758, 0.9828, 0.9878, 0.9914, 0.994, 0.9958, 0.997, 0.9979, 0.9985, 0.999, 1)",
} as const;

export const springLayout = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const;

export const springPop = {
  type: "spring",
  visualDuration: 0.28,
  bounce: 0.12,
} as const;

export const loop = {
  spin: 0.8,
  pulse: 1.1,
  sweep: 1.6,
} as const;

export function transitionFor<T extends object>(
  reduceMotion: boolean | null,
  transition: T,
): T | { duration: 0 } {
  return reduceMotion ? { duration: 0 } : transition;
}
