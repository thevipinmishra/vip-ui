"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "reicon-react";

const MotionLink = motion.create(Link);

/** Text link whose arrow nudges on pointer hover and keyboard focus. */
export function DocsArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionLink
      href={href}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "active"}
      whileFocus={reduceMotion ? undefined : "active"}
      whileTap={reduceMotion ? undefined : { opacity: 0.85 }}
      className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="inline-flex"
        variants={{ rest: { x: 0 }, active: { x: 3 } }}
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
      >
        <ArrowRight size={15} />
      </motion.span>
    </MotionLink>
  );
}
