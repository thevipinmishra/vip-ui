"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { duration, easeOut, offset, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
  const ref = useRef<HTMLDivElement>(null);
  const width = useRef(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (isPresent) width.current = node.getBoundingClientRect().width;
    else node.style.width = `${width.current}px`;
  });

  return (
    <motion.div
      ref={ref}
      data-slot="layout-morph-content"
      className={
        isPresent ? "w-(--morph-width,100%)" : "absolute inset-s-0 top-0"
      }
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={
        reducedMotion
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
        reducedMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              y: -offset.sm,
              filter: "blur(2px)",
              transition: { duration: duration.fast, ease: easeOut },
            }
      }
      transition={transitionFor(reducedMotion, {
        duration: duration.slow,
        delay: duration.fast / 3,
        ease: easeOut,
      })}
    >
      {children}
    </motion.div>
  );
}

type Size = { width: number; height: number };

function sizeOf(node: HTMLElement): Size {
  const { width, height } = node.getBoundingClientRect();
  return { width, height };
}

export function LayoutMorph({
  contentKey,
  children,
  className,
  ...props
}: LayoutMorphProps) {
  const content = useRef<HTMLDivElement>(null);
  const settled = useRef<Size>({ width: 0, height: 0 });
  const morph = useRef<Animation | null>(null);
  const previousKey = useRef(contentKey);
  const reducedMotion = useReducedMotion() === true;

  useEffect(() => {
    const node = content.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      if (morph.current?.playState !== "running")
        settled.current = sizeOf(node);
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
      morph.current?.playState === "running" ? sizeOf(node) : settled.current;
    morph.current?.cancel();
    morph.current = null;
    node.style.overflow = "";
    node.style.removeProperty("--morph-width");
    const to = sizeOf(node);
    settled.current = to;
    const widthChanged = Math.abs(from.width - to.width) > 0.5;
    const heightChanged = Math.abs(from.height - to.height) > 0.5;
    if (reducedMotion || (!widthChanged && !heightChanged)) return;

    const keyframes: Keyframe[] = [{}, {}];
    if (heightChanged) {
      keyframes[0].height = `${from.height}px`;
      keyframes[1].height = `${to.height}px`;
    }
    if (widthChanged) {
      keyframes[0].width = `${from.width}px`;
      keyframes[1].width = `${to.width}px`;
      node.style.setProperty("--morph-width", `${Math.ceil(to.width)}px`);
    }
    const animation = node.animate(keyframes, {
      duration: duration.slow * 1000,
      easing: `cubic-bezier(${easeOut.join(", ")})`,
    });
    morph.current = animation;
    node.style.overflow = "hidden";
    animation.onfinish = () => {
      if (morph.current !== animation) return;
      morph.current = null;
      node.style.overflow = "";
      node.style.removeProperty("--morph-width");
      settled.current = sizeOf(node);
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
