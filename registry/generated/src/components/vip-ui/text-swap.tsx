"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ComponentProps, useEffect, useLayoutEffect, useRef } from "react";
import { duration, easeOut, offset, transitionFor } from "./motion";
import { cn } from "./utils";

export interface TextSwapProps
  extends Omit<ComponentProps<"span">, "children"> {
  value: string;
}

function widthOf(node: HTMLElement) {
  return node.getBoundingClientRect().width;
}

export function TextSwap({ value, className, ...props }: TextSwapProps) {
  const reduceMotion = useReducedMotion();
  const root = useRef<HTMLSpanElement>(null);
  const settled = useRef(0);
  const morph = useRef<Animation | null>(null);
  const previousValue = useRef(value);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      if (morph.current?.playState !== "running")
        settled.current = widthOf(node);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      morph.current?.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node || previousValue.current === value) return;
    previousValue.current = value;
    const running = morph.current?.playState === "running";
    const from = running ? widthOf(node) : settled.current;
    morph.current?.cancel();
    morph.current = null;
    node.style.removeProperty("--text-swap-width");
    const to = widthOf(node);
    settled.current = to;
    if (reduceMotion || !from || Math.abs(from - to) < 0.5) return;
    node.style.setProperty("--text-swap-width", `${Math.ceil(to)}px`);
    const animation = node.animate(
      [{ width: `${from}px` }, { width: `${to}px` }],
      {
        duration: duration.base * 1000,
        easing: `cubic-bezier(${easeOut.join(", ")})`,
      },
    );
    morph.current = animation;
    animation.onfinish = () => {
      if (morph.current !== animation) return;
      morph.current = null;
      node.style.removeProperty("--text-swap-width");
      settled.current = widthOf(node);
    };
  }, [reduceMotion, value]);

  return (
    <span
      {...props}
      ref={root}
      data-slot="text-swap"
      className={cn(
        "relative mx-[-0.1em] inline-grid min-w-0 max-w-[calc(100%+0.2em)] overflow-x-clip align-baseline",
        className,
      )}
    >
      <span className="sr-only">{value}</span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          aria-hidden="true"
          className="min-w-(--text-swap-width,0px) overflow-x-clip text-ellipsis px-[0.1em] wrap-anywhere"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: offset.sm, filter: "blur(2px)" }
          }
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transitionEnd: { filter: "none" },
          }}
          exit={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  y: -offset.sm,
                  filter: "blur(2px)",
                  transition: { duration: duration.fast, ease: easeOut },
                }
          }
          transition={transitionFor(reduceMotion, {
            duration: duration.base,
            delay: duration.fast / 3,
            ease: easeOut,
          })}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
