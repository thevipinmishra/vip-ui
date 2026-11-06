"use client";

import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import {
  type ComponentProps,
  forwardRef,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import {
  duration,
  easeOut,
  offset,
  springLayout,
  transitionFor,
} from "./motion";
import { cn } from "./utils";

export interface PresenceListProps<T>
  extends Omit<ComponentProps<"ul">, "children"> {
  items: readonly T[];
  getKey: (item: T) => string | number;
  children: (item: T) => ReactNode;
}

const PresenceListRow = forwardRef<
  HTMLLIElement,
  { children: ReactNode; reducedMotion: boolean }
>(function PresenceListRow({ children, reducedMotion }, ref) {
  const isPresent = useIsPresent();
  return (
    <motion.li
      ref={ref}
      data-slot="presence-list-item"
      className="min-w-0"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={reducedMotion ? false : "position"}
      initial={
        reducedMotion ? false : { opacity: 0, y: offset.sm, scale: 0.98 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -offset.sm, scale: 0.98 }
      }
      transition={transitionFor(reducedMotion, {
        duration: duration.base,
        ease: easeOut,
        layout: springLayout,
      })}
    >
      {children}
    </motion.li>
  );
});

export function PresenceList<T>({
  items,
  getKey,
  children,
  className,
  ...props
}: PresenceListProps<T>) {
  const reducedMotion = useReducedMotion() === true;
  const list = useRef<HTMLUListElement>(null);
  const settled = useRef(0);
  const morph = useRef<Animation | null>(null);
  const keys = JSON.stringify(items.map(getKey));
  const previousKeys = useRef(keys);

  useEffect(() => {
    const node = list.current;
    if (!node) return;
    const observer = new ResizeObserver(() => {
      if (morph.current?.playState !== "running")
        settled.current = node.getBoundingClientRect().height;
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      morph.current?.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    const node = list.current;
    if (!node || previousKeys.current === keys) return;
    previousKeys.current = keys;
    const running = morph.current?.playState === "running";
    const from = running
      ? node.getBoundingClientRect().height
      : settled.current;
    morph.current?.cancel();
    morph.current = null;
    const to = node.getBoundingClientRect().height;
    settled.current = to;
    if (reducedMotion || !from || Math.abs(from - to) < 0.5) return;
    const animation = node.animate(
      [{ height: `${from}px` }, { height: `${to}px` }],
      {
        duration: springLayout.duration * 1000,
        easing: `cubic-bezier(${easeOut.join(", ")})`,
      },
    );
    morph.current = animation;
    animation.onfinish = () => {
      if (morph.current !== animation) return;
      morph.current = null;
      settled.current = node.getBoundingClientRect().height;
    };
  }, [keys, reducedMotion]);

  return (
    <ul
      {...props}
      ref={list}
      data-slot="presence-list"
      className={cn("relative grid content-start gap-2", className)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => (
          <PresenceListRow key={getKey(item)} reducedMotion={reducedMotion}>
            {children(item)}
          </PresenceListRow>
        ))}
      </AnimatePresence>
    </ul>
  );
}
