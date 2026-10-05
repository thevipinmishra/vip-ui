"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { type ComponentProps, useId } from "react";
import { Check } from "reicon-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps extends Omit<ComponentProps<"ol">, "children"> {
  steps: readonly Step[];
  currentStep: number;
}

export function Stepper({
  steps,
  currentStep,
  className,
  ...props
}: StepperProps) {
  const groupId = useId();
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, duration: 0.28, bounce: 0 };

  return (
    <LayoutGroup id={groupId}>
      <ol
        {...props}
        data-slot="stepper"
        tabIndex={props.tabIndex ?? (steps.length > 0 ? 0 : undefined)}
        className={cn(
          "flex w-full max-w-full overflow-x-auto rounded-xl px-1 py-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          className,
        )}
      >
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;
          return (
            <li
              key={`${index}-${step.label}`}
              data-slot="stepper-step"
              data-state={
                active ? "current" : completed ? "complete" : "upcoming"
              }
              aria-current={active ? "step" : undefined}
              className="min-w-28 flex-1"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative grid size-9 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums",
                    active
                      ? "border-primary bg-accent text-primary"
                      : completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-muted-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="stepper-current"
                      initial={false}
                      transition={transition}
                      className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/35"
                    />
                  )}
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={completed ? "complete" : "number"}
                      className="col-start-1 row-start-1 grid place-items-center"
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 0.9 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.16,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    >
                      {completed ? <Check size={15} /> : index + 1}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="relative h-0.5 min-w-6 flex-1 overflow-hidden rounded-full bg-border"
                  >
                    <motion.span
                      className="absolute inset-0 origin-left rounded-full bg-primary"
                      initial={false}
                      animate={{ scaleX: completed ? 1 : 0 }}
                      transition={transition}
                    />
                  </span>
                )}
              </div>
              <div className="min-w-0 pr-3 pt-3">
                <span
                  className={cn(
                    "block text-sm font-medium leading-5",
                    active
                      ? "text-primary"
                      : completed
                        ? "text-foreground"
                        : "text-muted-foreground",
                  )}
                >
                  {completed && <span className="sr-only">Completed: </span>}
                  {step.label}
                </span>
                {step.description && (
                  <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </LayoutGroup>
  );
}
