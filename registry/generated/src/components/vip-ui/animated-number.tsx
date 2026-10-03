"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { type HTMLAttributes, useEffect, useMemo, useState } from "react";
import { cn } from "./utils";

export interface AnimatedNumberProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number;
  locale?: string;
  formatOptions?: Intl.NumberFormatOptions;
  variant?: "count" | "slide";
}

export function AnimatedNumber({
  value,
  locale = "en-US",
  formatOptions,
  variant = "count",
  className,
  ...props
}: AnimatedNumberProps) {
  const reducedMotion = useReducedMotion();
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(
        locale,
        formatOptions ?? { maximumFractionDigits: 0 },
      ),
    [locale, formatOptions],
  );

  return (
    <span
      {...props}
      data-slot="animated-number"
      data-variant={variant}
      className={cn("tabular-nums", className)}
    >
      {variant === "slide" ? (
        <SlidingNumber
          value={value}
          formatter={formatter}
          reducedMotion={reducedMotion}
        />
      ) : (
        <CountingNumber
          value={value}
          formatter={formatter}
          reducedMotion={reducedMotion}
        />
      )}
      <span className="sr-only">{formatter.format(value)}</span>
    </span>
  );
}

interface NumberDisplayProps {
  value: number;
  formatter: Intl.NumberFormat;
  reducedMotion: boolean | null;
}

function CountingNumber({
  value,
  formatter,
  reducedMotion,
}: NumberDisplayProps) {
  const number = useMotionValue(value);
  const [displayed, setDisplayed] = useState(value);

  useMotionValueEvent(number, "change", setDisplayed);

  useEffect(() => {
    if (reducedMotion) {
      number.set(value);
      return;
    }
    const controls = animate(number, value, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [number, reducedMotion, value]);

  return (
    <span aria-hidden="true">
      {formatter.format(reducedMotion ? value : displayed)}
    </span>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { y: "0%", opacity: 1 },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function SlidingDigit({
  digit,
  direction,
  animateOnMount,
}: {
  digit: string;
  direction: number;
  animateOnMount: boolean;
}) {
  return (
    <span className="-mx-[0.06em] inline-grid overflow-hidden px-[0.06em] align-baseline">
      <AnimatePresence initial={animateOnMount} custom={direction}>
        <motion.span
          key={digit}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SlidingNumber({
  value,
  formatter,
  reducedMotion,
}: NumberDisplayProps) {
  const [change, setChange] = useState({
    value,
    direction: 1,
    hasChanged: false,
  });
  if (value !== change.value) {
    setChange({
      value,
      direction: value > change.value ? 1 : -1,
      hasChanged: true,
    });
  }

  if (reducedMotion) {
    return <span aria-hidden="true">{formatter.format(value)}</span>;
  }

  const parts = formatter.formatToParts(value);
  let integerPlace = parts
    .filter((part) => part.type === "integer")
    .reduce((count, part) => count + Array.from(part.value).length, 0);
  let fractionPlace = 0;
  const otherCounts = new Map<string, number>();

  const segments = parts.flatMap((part) => {
    if (part.type === "integer") {
      return Array.from(part.value, (digit) => ({
        key: `integer-${--integerPlace}`,
        text: digit,
        isDigit: true,
      }));
    }
    if (part.type === "fraction") {
      return Array.from(part.value, (digit) => ({
        key: `fraction-${fractionPlace++}`,
        text: digit,
        isDigit: true,
      }));
    }
    if (part.type === "group") {
      return [
        { key: `group-${integerPlace}`, text: part.value, isDigit: false },
      ];
    }
    const occurrence = otherCounts.get(part.type) ?? 0;
    otherCounts.set(part.type, occurrence + 1);
    return [
      {
        key: `${part.type}-${occurrence}`,
        text: part.value,
        isDigit: false,
      },
    ];
  });

  return (
    <span
      aria-hidden="true"
      className="inline-flex whitespace-nowrap align-baseline"
    >
      {segments.map(({ key, text, isDigit }) =>
        isDigit ? (
          <SlidingDigit
            key={key}
            digit={text}
            direction={change.direction}
            animateOnMount={change.hasChanged}
          />
        ) : (
          <span key={key}>{text}</span>
        ),
      )}
    </span>
  );
}
