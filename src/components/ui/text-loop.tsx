"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TextSwap, type TextSwapProps } from "./text-swap";

export interface TextLoopProps extends Omit<TextSwapProps, "value"> {
  values: readonly string[];
  interval?: number;
  active?: boolean;
}

export function TextLoop({
  values,
  interval = 2.5,
  active = true,
  ...props
}: TextLoopProps) {
  const root = useRef<HTMLSpanElement>(null);
  const inView = useInView(root);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [documentVisible, setDocumentVisible] = useState(true);
  const running =
    active && inView && documentVisible && !reduceMotion && values.length > 1;

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((index + 1) % values.length),
      interval * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [running, interval, index, values.length]);

  const value = reduceMotion ? values[0] : values[index % values.length];

  return (
    <span ref={root} data-slot="text-loop">
      <TextSwap {...props} value={value ?? ""} />
    </span>
  );
}
