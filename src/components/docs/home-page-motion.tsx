"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function HomeReveal({
  children,
  className,
  delay = 0,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -64px 0px",
  });
  const reduceMotion = useReducedMotion();
  const [belowFold, setBelowFold] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (
      ref.current &&
      ref.current.getBoundingClientRect().top >= window.innerHeight
    ) {
      setBelowFold(true);
    }
  }, []);

  const waiting = belowFold && !inView && !focused && !reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: waiting ? 0 : 1,
        x: waiting ? x : 0,
        y: waiting ? 16 : 0,
      }}
      transition={
        waiting || focused || reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }
      }
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </motion.div>
  );
}
