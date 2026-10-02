"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function CatalogCard({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
