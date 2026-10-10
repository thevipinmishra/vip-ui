"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { duration, easeOut } from "./motion";
import { cn } from "./utils";

export interface LayoutMorphProps
  extends Omit<
    HTMLMotionProps<"div">,
    "ref" | "children" | "animate" | "transition"
  > {
  contentKey: string | number;
  children: ReactNode;
}

function MorphContent({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      data-slot="layout-morph-content"
      className={cn("w-full", !isPresent && "absolute inset-x-0 top-0")}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reducedMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              y: -6,
              transition: { duration: duration.fast, ease: easeOut },
            }
      }
      transition={{
        duration: reducedMotion ? 0 : duration.base,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

export function LayoutMorph({
  contentKey,
  children,
  className,
  ...props
}: LayoutMorphProps) {
  const content = useRef<HTMLDivElement>(null);
  const settledHeight = useRef(0);
  const morph = useRef<Animation | null>(null);
  const previousKey = useRef(contentKey);
  const reducedMotion = useReducedMotion() === true;

  useEffect(() => {
    const node = content.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      if (morph.current?.playState !== "running")
        settledHeight.current = node.offsetHeight;
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      morph.current?.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    const node = content.current;
    if (!node || previousKey.current === contentKey) return;
    previousKey.current = contentKey;
    const from =
      morph.current?.playState === "running"
        ? node.offsetHeight
        : settledHeight.current;
    morph.current?.cancel();
    morph.current = null;
    node.style.overflow = "";
    const to = node.offsetHeight;
    settledHeight.current = to;
    if (reducedMotion || from === to) return;

    const animation = node.animate(
      { height: [`${from}px`, `${to}px`] },
      { duration: 300, easing: `cubic-bezier(${easeOut.join(", ")})` },
    );
    morph.current = animation;
    node.style.overflow = "hidden";
    animation.onfinish = () => {
      if (morph.current !== animation) return;
      morph.current = null;
      node.style.overflow = "";
      settledHeight.current = node.offsetHeight;
    };
  }, [contentKey, reducedMotion]);

  return (
    <motion.div {...props} data-slot="layout-morph" className={cn(className)}>
      <div ref={content} className="relative">
        <AnimatePresence initial={false}>
          <MorphContent key={contentKey} reducedMotion={reducedMotion}>
            {children}
          </MorphContent>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
