"use client";

import { LayoutGroup, motion, useReducedMotion } from "motion/react";
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
        tabIndex={props.tabIndex ?? (steps.length > 3 ? 0 : undefined)}
        className={cn(
          "flex w-full max-w-full overflow-x-auto px-1 py-1 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
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
              className="min-w-16 flex-1"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums",
                    active || completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-muted-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="stepper-current"
                      initial={false}
                      transition={transition}
                      className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/25"
                    />
                  )}
                  {completed ? <Check size={15} /> : index + 1}
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="relative h-0.5 min-w-5 flex-1 overflow-hidden rounded-full bg-border"
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
                    active || completed
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
