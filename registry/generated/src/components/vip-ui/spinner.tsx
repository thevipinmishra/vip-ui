"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { easeInOut, transitionFor } from "./motion";

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

type SpinnerProps = Omit<ComponentProps<"output">, "children"> & {
  variant?: "ring" | "dots" | "segments";
  size?: NonNullable<VariantProps<typeof spinnerStyles>["size"]>;
  decorative?: boolean;
};

const ticks = [0, 45, 90, 135, 180, 225, 270, 315];

export function Spinner({
  variant = "ring",
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
      {variant === "ring" && (
        <motion.svg
          viewBox="0 0 40 40"
          fill="none"
          className="size-full"
          aria-hidden="true"
          animate={{
            transform: still
              ? "rotate(0deg)"
              : ["rotate(0deg)", "rotate(360deg)"],
          }}
          transition={transitionFor(reducedMotion, {
            duration: 0.8,
            ease: "linear",
            repeat: Infinity,
          })}
        >
          <circle
            cx="20"
            cy="20"
            r="15"
            stroke="currentColor"
            strokeOpacity="0.18"
            strokeWidth="4"
          />
          <circle
            cx="20"
            cy="20"
            r="15"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="28 95"
            transform="rotate(-90 20 20)"
          />
        </motion.svg>
      )}
      {variant === "dots" && (
        <span
          className="flex size-full items-center justify-center gap-[13%]"
          aria-hidden="true"
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="size-[20%] rounded-full bg-current forced-colors:bg-[CanvasText]"
              animate={
                still
                  ? { opacity: 1, transform: "translateY(0%) scale(1)" }
                  : {
                      opacity: [0.38, 1, 0.38],
                      transform: [
                        "translateY(0%) scale(0.78)",
                        "translateY(-20%) scale(1)",
                        "translateY(0%) scale(0.78)",
                      ],
                    }
              }
              transition={transitionFor(reducedMotion, {
                duration: 1.05,
                delay: -index * 0.16,
                repeat: Infinity,
                ease: easeInOut,
              })}
            />
          ))}
        </span>
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
              transition={transitionFor(reducedMotion, {
                duration: 0.96,
                delay: -index * 0.12,
                repeat: Infinity,
                ease: easeInOut,
              })}
            />
          ))}
        </svg>
      )}
    </output>
  );
}
