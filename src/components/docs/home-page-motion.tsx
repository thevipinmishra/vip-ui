"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

export function HomeScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary motion-reduce:hidden"
      style={{ scaleX: progress }}
    />
  );
}

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

  // Server-rendered content stays visible until JS can confirm it is offscreen.
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

export function HomeExampleFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ y: reduceMotion ? 0 : 16 }}
      whileInView={reduceMotion ? undefined : { y: 4 }}
      whileHover={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 30 }
      }
    >
      {children}
    </motion.div>
  );
}
