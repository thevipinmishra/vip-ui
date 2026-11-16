"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { duration, easeOut, springSnappy, transitionFor } from "./motion";
import { cn } from "./utils";

export interface AnimatedNumberProps
  extends Omit<ComponentProps<"span">, "children"> {
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
      className={cn("min-w-fit tabular-nums wrap-anywhere", className)}
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
  const text = useTransform(number, (latest) => formatter.format(latest));

  useEffect(() => {
    if (reducedMotion) {
      number.set(value);
      return;
    }
    const controls = animate(number, value, {
      duration: duration.reveal,
      ease: easeOut,
    });
    return () => controls.stop();
  }, [number, reducedMotion, value]);

  return <motion.span aria-hidden="true">{text}</motion.span>;
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
  reducedMotion,
}: {
  digit: string;
  direction: number;
  reducedMotion: boolean | null;
}) {
  return (
    <span
      data-slot="animated-number-digit"
      className="mx-[-0.06em] my-[-0.15em] inline-grid overflow-hidden px-[0.06em] py-[0.15em] align-baseline mask-[linear-gradient(to_bottom,transparent,black_0.15em,black_calc(100%-0.15em),transparent)]"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.span
          key={digit}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transitionFor(reducedMotion, springSnappy)}
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
  });
  if (value !== change.value) {
    setChange({
      value,
      direction: value > change.value ? 1 : -1,
    });
  }

  const parts = formatter.formatToParts(value);
  const integerLength = parts.reduce(
    (count, part) =>
      part.type === "integer" ? count + Array.from(part.value).length : count,
    0,
  );
  const otherCounts = new Map<string, number>();

  const segments = parts.flatMap((part, partIndex) => {
    if (part.type === "integer") {
      return Array.from(part.value, (digit, index) => ({
        key: `integer-${integerLength - 1 - index}`,
        text: digit,
        isDigit: true,
      }));
    }
    if (part.type === "fraction") {
      const offset = parts
        .slice(0, partIndex)
        .reduce(
          (count, previous) =>
            previous.type === "fraction"
              ? count + Array.from(previous.value).length
              : count,
          0,
        );
      return Array.from(part.value, (digit, index) => ({
        key: `fraction-${offset + index}`,
        text: digit,
        isDigit: true,
      }));
    }
    if (part.type === "group") {
      const remaining = parts
        .slice(partIndex + 1)
        .reduce(
          (count, next) =>
            next.type === "integer"
              ? count + Array.from(next.value).length
              : count,
          0,
        );
      return [{ key: `group-${remaining}`, text: part.value, isDigit: false }];
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
      className="inline-flex max-w-full flex-wrap align-baseline"
    >
      <AnimatePresence initial={false}>
        {segments.map(({ key, text, isDigit }) => (
          <SlidingSlot key={key} reducedMotion={reducedMotion}>
            {isDigit ? (
              <SlidingDigit
                digit={text}
                direction={change.direction}
                reducedMotion={reducedMotion}
              />
            ) : (
              text
            )}
          </SlidingSlot>
        ))}
      </AnimatePresence>
    </span>
  );
}

function SlidingSlot({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.span
      className="inline-flex justify-end overflow-x-clip"
      // A formatted number grows and shrinks as digits are added or removed;
      // the slot width is the property that carries that motion.
      // react-doctor-disable-next-line react-doctor/no-layout-property-animation
      initial={{ width: 0, opacity: 0 }}
      // react-doctor-disable-next-line react-doctor/no-layout-property-animation
      animate={{ width: "auto", opacity: 1 }}
      // react-doctor-disable-next-line react-doctor/no-layout-property-animation
      exit={{ width: 0, opacity: 0 }}
      transition={transitionFor(reducedMotion, springSnappy)}
    >
      {children}
    </motion.span>
  );
}
