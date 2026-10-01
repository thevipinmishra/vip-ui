"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function CatalogCard({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      {children}
    </motion.div>
  );
}
