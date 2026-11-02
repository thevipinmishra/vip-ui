"use client";

import {
  DatabaseIcon,
  type Icon,
  PaletteIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  easeOut,
  springLayout,
  springPop,
  springSnappy,
  transitionFor,
} from "@/lib/motion";

const MotionLink = motion.create(Link);

const steps: { label: string; href: string; icon: Icon }[] = [
  { label: "Install", href: "#installation", icon: TerminalWindowIcon },
  { label: "Your data", href: "#usage", icon: DatabaseIcon },
  { label: "Make it yours", href: "#theming", icon: PaletteIcon },
];

export function ChartNextSteps() {
  const reduceMotion = useReducedMotion();

  const list = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.08,
        staggerChildren: reduceMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
      scale: reduceMotion ? 1 : 0.97,
      filter: reduceMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: transitionFor(reduceMotion, {
        type: "spring",
        duration: 0.6,
        bounce: 0.08,
      }),
    },
  };

  const dot = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: 1,
      scale: 1,
      transition: transitionFor(reduceMotion, {
        ...springPop,
        delay: 0.16,
      }),
    },
  };

  const pill = {
    rest: { opacity: 0, scale: 0.94 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: transitionFor(reduceMotion, {
        duration: 0.22,
        ease: easeOut,
      }),
    },
  };

  const halo = {
    rest: { opacity: 0, scale: 0.5 },
    hover: {
      opacity: 1,
      scale: 1,
      transition: transitionFor(reduceMotion, springLayout),
    },
  };

  const icon = {
    rest: { y: 0, rotate: 0, scale: 1 },
    hover: {
      y: reduceMotion ? 0 : -1.5,
      rotate: reduceMotion ? 0 : -8,
      scale: reduceMotion ? 1 : 1.08,
      transition: transitionFor(reduceMotion, springPop),
    },
  };

  const label = {
    rest: { x: 0 },
    hover: {
      x: reduceMotion ? 0 : 2,
      transition: transitionFor(reduceMotion, springSnappy),
    },
  };

  const underline = {
    rest: { opacity: 0, scaleX: 0 },
    hover: {
      opacity: 1,
      scaleX: 1,
      transition: transitionFor(reduceMotion, {
        duration: 0.24,
        ease: easeOut,
      }),
    },
  };

  return (
    <section
      id="next-steps"
      aria-labelledby="next-steps-title"
      className="pb-14"
    >
      <h2 id="next-steps-title" className="sr-only">
        From gallery to app
      </h2>
      <motion.ol
        variants={list}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? "show" : undefined}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
      >
        {steps.map((step, index) => (
          <motion.li
            key={step.href}
            variants={item}
            className="flex items-center"
          >
            <MotionLink
              href={step.href}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
              className="relative isolate flex items-center gap-2.5 rounded-full py-1.5 pe-3 ps-1.5 text-[13px] font-medium text-muted-foreground outline-none transition-colors duration-200 ease-out-quint hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <motion.span
                aria-hidden="true"
                variants={pill}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-muted/60"
              />
              <span className="relative grid size-8 place-items-center">
                <motion.span
                  aria-hidden="true"
                  variants={halo}
                  className="absolute inset-0 rounded-full bg-card shadow-[var(--shadow-card)] ring-1 ring-border/60"
                />
                <motion.span variants={icon} className="relative">
                  <step.icon size={15} aria-hidden="true" />
                </motion.span>
              </span>
              <motion.span variants={label} className="relative">
                {step.label}
                <motion.span
                  aria-hidden="true"
                  variants={underline}
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-foreground/20"
                />
              </motion.span>
            </MotionLink>
            {index < steps.length - 1 && (
              <motion.span
                aria-hidden="true"
                variants={dot}
                className="mx-1 hidden size-1 rounded-full bg-border sm:mx-2 sm:block"
              />
            )}
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
