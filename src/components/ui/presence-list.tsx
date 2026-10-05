"use client";

import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import { type ComponentProps, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={reducedMotion ? false : "position"}
      initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
      transition={{
        layout: { type: "spring", stiffness: 380, damping: 36 },
        opacity: { duration: reducedMotion ? 0 : 0.18 },
        y: { duration: reducedMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] },
        scale: { duration: reducedMotion ? 0 : 0.2 },
      }}
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
  return (
    <ul
      {...props}
      data-slot="presence-list"
      className={cn("relative grid gap-2", className)}
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
