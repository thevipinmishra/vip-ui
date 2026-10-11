"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentProps, useRef } from "react";
import { easeOut, transitionFor } from "./motion";
import { cn } from "./utils";

export interface TextRevealProps
  extends Omit<ComponentProps<"span">, "children"> {
  text: string;
  split?: "words" | "characters";
  trigger?: "mount" | "in-view";
  stagger?: number;
  delay?: number;
}

const hidden = { opacity: 0, y: "100%" };
const shown = { opacity: 1, y: "0%" };

function graphemes(text: string) {
  return Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    ({ segment }) => segment,
  );
}

export function TextReveal({
  text,
  split = "words",
  trigger = "in-view",
  stagger = 0.045,
  delay = 0,
  className,
  ...props
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const visible = reducedMotion || trigger === "mount" || inView;
  const words = Array.from(text.matchAll(/\s+|\S+/gu), (match) => ({
    value: match[0],
    offset: match.index,
  }));
  let order = 0;

  function unit(value: string, key: string) {
    const unitDelay = delay + order++ * stagger;
    return (
      <span
        key={key}
        className="-mx-[0.1em] -my-[0.2em] inline-block overflow-hidden px-[0.1em] py-[0.2em] align-bottom"
      >
        <motion.span
          className="inline-block"
          initial={hidden}
          animate={visible ? shown : hidden}
          transition={transitionFor(reducedMotion, {
            duration: 0.5,
            delay: unitDelay,
            ease: easeOut,
          })}
        >
          {value}
        </motion.span>
      </span>
    );
  }

  return (
    <span
      {...props}
      ref={ref}
      data-slot="text-reveal"
      className={cn("whitespace-pre-wrap [overflow-wrap:anywhere]", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(({ value, offset }) => {
          const key = `${text}-${offset}`;
          if (/^\s+$/u.test(value)) return <span key={key}>{value}</span>;
          if (split === "words") return unit(value, key);
          return (
            <span key={key} className="inline-block">
              {graphemes(value).map((character, index) =>
                unit(character, `${key}-${index}`),
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
}
