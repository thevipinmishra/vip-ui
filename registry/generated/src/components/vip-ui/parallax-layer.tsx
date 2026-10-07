"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type ComponentProps, type RefObject, useRef } from "react";
import { cn } from "./utils";

export interface ParallaxLayerProps extends ComponentProps<"div"> {
  distance?: number;
  containerRef?: RefObject<HTMLElement | null>;
}

export function ParallaxLayer({
  distance = 32,
  containerRef,
  children,
  className,
  ...props
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ["start end", "end start"],
  });
  const position = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(position, { stiffness: 180, damping: 30 });

  return (
    <div
      {...props}
      ref={ref}
      data-slot="parallax-layer"
      className={cn("relative", className)}
    >
      <motion.div style={{ y: reducedMotion ? 0 : y }}>{children}</motion.div>
    </div>
  );
}
