"use client";

import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils";

export interface PresenceListProps<T>
  extends Omit<ComponentProps<"ul">, "children"> {
  items: readonly T[];
  getKey: (item: T) => string | number;
  children: (item: T) => ReactNode;
}

function PresenceListRow({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const isPresent = useIsPresent();
  return (
    <motion.li
      data-slot="presence-list-item"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={reducedMotion ? false : "position"}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.li>
  );
}

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
      className={cn("grid gap-2", className)}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <PresenceListRow key={getKey(item)} reducedMotion={reducedMotion}>
            {children(item)}
          </PresenceListRow>
        ))}
      </AnimatePresence>
    </ul>
  );
}
