"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { easeInOut } from "./motion";

const spinnerStyles = tv({
  base: "relative inline-flex shrink-0 items-center justify-center align-middle text-current",
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-6",
      lg: "size-10",
      xl: "size-14",
    },
  },
  defaultVariants: { size: "md" },
});

type SpinnerProps = Omit<HTMLAttributes<HTMLOutputElement>, "children"> & {
  variant?: "orbit" | "ring" | "pulse" | "dots" | "bars" | "spark" | "segments";
  size?: NonNullable<VariantProps<typeof spinnerStyles>["size"]>;
  decorative?: boolean;
};

const ticks = [0, 45, 90, 135, 180, 225, 270, 315];

export function Spinner({
  variant = "orbit",
  size = "md",
  decorative = false,
  className,
  ...props
}: SpinnerProps) {
  const reducedMotion = useReducedMotion();
  const still = reducedMotion === true;

  return (
    <output
      {...props}
      aria-label={decorative ? undefined : (props["aria-label"] ?? "Loading")}
      aria-hidden={decorative ? true : undefined}
      data-slot="spinner"
      data-variant={variant}
      className={spinnerStyles({ size, className })}
    >
      {variant === "orbit" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="15"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
          <circle
            cx="20"
            cy="20"
            r="7.5"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1.5"
          />
          <motion.g
            animate={{ rotate: still ? 0 : 360 }}
            transition={
              still
                ? { duration: 0 }
                : { duration: 1.65, ease: "linear", repeat: Infinity }
            }
            style={{ transformOrigin: "50% 50%" }}
          >
            <circle cx="20" cy="20" r="15" fill="none" />
            <circle cx="20" cy="5" r="3" fill="currentColor" />
          </motion.g>
          <motion.g
            animate={{ rotate: still ? 0 : -360 }}
            transition={
              still
                ? { duration: 0 }
                : { duration: 1.2, ease: "linear", repeat: Infinity }
            }
            style={{ transformOrigin: "50% 50%" }}
          >
            <circle cx="20" cy="20" r="7.5" fill="none" />
            <circle
              cx="20"
              cy="12.5"
              r="2"
              fill="currentColor"
              fillOpacity="0.65"
            />
          </motion.g>
        </svg>
      )}
      {variant === "ring" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="15"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="3"
          />
          <motion.g
            animate={{ rotate: still ? 0 : 360 }}
            transition={
              still
                ? { duration: 0 }
                : { duration: 0.9, ease: "linear", repeat: Infinity }
            }
            style={{ transformOrigin: "50% 50%" }}
          >
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="30 95"
              transform="rotate(-90 20 20)"
            />
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke="currentColor"
              strokeOpacity="0.36"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 113"
              transform="rotate(-140 20 20)"
            />
          </motion.g>
        </svg>
      )}
      {variant === "pulse" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="1.6"
          />
          {[0, 1].map((index) => (
            <motion.circle
              key={index}
              cx="20"
              cy="20"
              r="12"
              stroke="currentColor"
              strokeWidth="1.6"
              style={{ transformOrigin: "50% 50%" }}
              animate={
                still
                  ? {
                      scale: index === 0 ? 1 : 0.65,
                      opacity: index === 0 ? 0.45 : 0.28,
                    }
                  : { scale: [0.55, 1.25], opacity: [0.65, 0] }
              }
              transition={
                still
                  ? { duration: 0 }
                  : {
                      duration: 1.7,
                      delay: -index * 0.85,
                      repeat: Infinity,
                      ease: easeInOut,
                    }
              }
            />
          ))}
          <circle cx="20" cy="20" r="3.5" fill="currentColor" />
        </svg>
      )}
      {variant === "dots" && (
        <span
          className="flex size-full items-center justify-center gap-[13%]"
          aria-hidden="true"
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="size-[20%] rounded-full bg-current"
              animate={
                still
                  ? { opacity: 1, scale: 1 }
                  : {
                      opacity: [0.38, 1, 0.38],
                      scale: [0.78, 1, 0.78],
                      y: [0, "-20%", 0],
                    }
              }
              transition={
                still
                  ? { duration: 0 }
                  : {
                      duration: 1.05,
                      delay: -index * 0.16,
                      repeat: Infinity,
                      ease: easeInOut,
                    }
              }
            />
          ))}
        </span>
      )}
      {variant === "bars" && (
        <span
          className="flex size-full items-center justify-center gap-[7%]"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.span
              key={index}
              className="h-[62%] w-[10%] rounded-full bg-current"
              animate={
                still
                  ? { scaleY: index === 2 ? 1 : 0.55, opacity: 1 }
                  : { scaleY: [0.4, 1, 0.4], opacity: [0.5, 1, 0.5] }
              }
              transition={
                still
                  ? { duration: 0 }
                  : {
                      duration: 1.1,
                      delay: -index * 0.13,
                      repeat: Infinity,
                      ease: easeInOut,
                    }
              }
            />
          ))}
        </span>
      )}
      {variant === "spark" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
        >
          <motion.path
            d="M20 7.5 22.7 17.3 32.5 20 22.7 22.7 20 32.5 17.3 22.7 7.5 20 17.3 17.3Z"
            fill="currentColor"
            style={{ transformOrigin: "50% 50%" }}
            animate={
              still
                ? { opacity: 1, scale: 1 }
                : { opacity: [0.68, 1, 0.68], scale: [0.91, 1.04, 0.91] }
            }
            transition={
              still
                ? { duration: 0 }
                : { duration: 1.9, repeat: Infinity, ease: easeInOut }
            }
          />
          <motion.circle
            cx="32.5"
            cy="7"
            r="1.6"
            fill="currentColor"
            animate={still ? { opacity: 0.65 } : { opacity: [0.25, 0.9, 0.25] }}
            transition={
              still
                ? { duration: 0 }
                : {
                    duration: 1.9,
                    delay: -0.7,
                    repeat: Infinity,
                    ease: easeInOut,
                  }
            }
          />
          <motion.circle
            cx="7.5"
            cy="33"
            r="1.2"
            fill="currentColor"
            animate={still ? { opacity: 0.65 } : { opacity: [0.2, 0.8, 0.2] }}
            transition={
              still
                ? { duration: 0 }
                : {
                    duration: 1.9,
                    delay: -1.3,
                    repeat: Infinity,
                    ease: easeInOut,
                  }
            }
          />
        </svg>
      )}
      {variant === "segments" && (
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
        >
          {ticks.map((angle, index) => (
            <motion.line
              key={angle}
              x1="20"
              y1="5"
              x2="20"
              y2="11"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 20 20)`}
              animate={
                still
                  ? { opacity: index === 0 ? 1 : 0.4 }
                  : { opacity: [0.2, 1, 0.2] }
              }
              transition={
                still
                  ? { duration: 0 }
                  : {
                      duration: 0.96,
                      delay: -index * 0.12,
                      repeat: Infinity,
                      ease: easeInOut,
                    }
              }
            />
          ))}
        </svg>
      )}
    </output>
  );
}
