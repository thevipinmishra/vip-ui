"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function CatalogCard({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
