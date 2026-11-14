"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentProps, useMemo, useRef } from "react";
import { duration, easeOut, maxStagger, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

function tokenize(text: string, split: "words" | "characters") {
  return Array.from(text.matchAll(/\s+|\S+/gu), (match) => ({
    value: match[0],
    offset: match.index,
    units: /^\s+$/u.test(match[0])
      ? []
      : split === "words"
        ? [match[0]]
        : Array.from(segmenter.segment(match[0]), ({ segment }) => segment),
  }));
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
  const inView = useInView(ref, { once: true, amount: "some" });
  const reducedMotion = useReducedMotion();
  const visible = reducedMotion || trigger === "mount" || inView;
  const tokens = useMemo(() => tokenize(text, split), [text, split]);
  const total = tokens.reduce((count, token) => count + token.units.length, 0);
  const step = Math.min(stagger, maxStagger / Math.max(total - 1, 1));
  let order = 0;

  function unit(value: string, key: string) {
    const unitDelay = delay + order++ * step;
    return (
      <span
        key={key}
        className="mx-[-0.1em] my-[-0.2em] inline-block overflow-hidden px-[0.1em] py-[0.2em] align-bottom"
      >
        <motion.span
          className="inline-block"
          initial={hidden}
          animate={visible ? shown : hidden}
          transition={transitionFor(reducedMotion, {
            duration: duration.reveal,
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
      className={cn("whitespace-pre-wrap wrap-anywhere", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map(({ value, offset, units }) => {
          const key = `${text}-${offset}`;
          if (!units.length) return <span key={key}>{value}</span>;
          if (split === "words") return unit(value, key);
          return (
            <span key={key} className="inline-block">
              {units.map((character, index) =>
                unit(character, `${key}-${index}`),
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
}
