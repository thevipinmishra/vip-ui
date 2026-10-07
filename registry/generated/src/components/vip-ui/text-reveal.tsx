"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentProps, useRef } from "react";
import { cn } from "./utils";

export interface TextRevealProps
  extends Omit<ComponentProps<"span">, "children"> {
  text: string;
  split?: "words" | "characters";
  trigger?: "mount" | "in-view";
  stagger?: number;
}

export function TextReveal({
  text,
  split = "words",
  trigger = "in-view",
  stagger = 0.045,
  className,
  ...props
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const parts =
    split === "words"
      ? Array.from(text.matchAll(/\s+|\S+/gu), (match) => ({
          value: match[0],
          offset: match.index,
        }))
      : Array.from(
          new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
            text,
          ),
          ({ segment, index }) => ({ value: segment, offset: index }),
        );
  let order = 0;

  return (
    <span
      {...props}
      ref={ref}
      data-slot="text-reveal"
      className={cn("whitespace-pre-wrap", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map(({ value, offset }) => {
          if (/^\s+$/u.test(value))
            return <span key={`${text}-${offset}`}>{value}</span>;
          const delay = order++ * stagger;
          return (
            <span
              key={`${text}-${offset}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: "100%" }}
                animate={
                  reducedMotion || trigger === "mount" || inView
                    ? { opacity: 1, y: "0%" }
                    : { opacity: 0, y: "100%" }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {value}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
