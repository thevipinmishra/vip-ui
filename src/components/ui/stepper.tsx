"use client";

import { CheckIcon } from "@phosphor-icons/react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { duration, easeOut, springLayout, transitionFor } from "@/lib/motion";
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
  ref,
  ...props
}: StepperProps) {
  const groupId = useId();
  const reduceMotion = useReducedMotion();
  const transition = transitionFor(reduceMotion, springLayout);
  const listRef = useRef<HTMLOListElement | null>(null);
  const hasScrolled = useRef(false);
  const [scrollable, setScrollable] = useState(false);

  const setRef = useCallback(
    (element: HTMLOListElement | null) => {
      listRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    },
    [ref],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list || steps.length === 0) return;
    const observer = new ResizeObserver(() =>
      setScrollable(list.scrollWidth > list.clientWidth),
    );
    observer.observe(list);
    for (const child of list.children) observer.observe(child);
    return () => observer.disconnect();
  }, [steps]);

  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[Math.min(currentStep, steps.length - 1)];
    if (!list || !item) return;
    const style = getComputedStyle(list);
    const bounds = list.getBoundingClientRect();
    const rect = item.getBoundingClientRect();
    const start = bounds.left + Number.parseFloat(style.paddingLeft);
    const end = bounds.right - Number.parseFloat(style.paddingRight);
    const offset =
      rect.left < start
        ? rect.left - start
        : rect.right > end
          ? rect.right - end
          : 0;
    const smooth =
      hasScrolled.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    hasScrolled.current = true;
    if (offset)
      list.scrollBy({ left: offset, behavior: smooth ? "smooth" : "auto" });
  }, [currentStep, steps.length]);

  return (
    <LayoutGroup id={groupId}>
      <ol
        {...props}
        ref={setRef}
        data-slot="stepper"
        tabIndex={props.tabIndex ?? (scrollable ? 0 : undefined)}
        className={cn(
          "flex w-full max-w-full overflow-x-auto rounded-xl p-1.5 outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring",
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
              className="min-w-24 flex-1"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative isolate grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold tabular-nums transition-[color,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    active
                      ? "border-primary bg-card text-primary"
                      : completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="stepper-current"
                      initial={false}
                      transition={transition}
                      className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-primary/15 forced-colors:border-2 forced-colors:border-[Highlight]"
                    />
                  )}
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={completed ? "complete" : "number"}
                      className="relative z-10 col-start-1 row-start-1 grid place-items-center"
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 0.9 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                      transition={{
                        duration: reduceMotion ? 0 : duration.fast,
                        ease: easeOut,
                      }}
                    >
                      {completed ? (
                        <CheckIcon size={14} weight="bold" />
                      ) : (
                        index + 1
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="relative h-0.5 min-w-6 flex-1 overflow-hidden rounded-full bg-border forced-colors:bg-[GrayText]"
                  >
                    <motion.span
                      className="absolute inset-0 origin-left rounded-full bg-primary forced-colors:bg-[Highlight] rtl:origin-right"
                      initial={false}
                      animate={{ scaleX: completed ? 1 : 0 }}
                      transition={transition}
                    />
                  </span>
                )}
              </div>
              <div className="min-w-0 pe-3 pt-2.5">
                <span
                  className={cn(
                    "block text-sm font-medium leading-5 transition-[color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [overflow-wrap:anywhere]",
                    active || completed
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {completed && <span className="sr-only">Completed: </span>}
                  {step.label}
                </span>
                {step.description && (
                  <span className="mt-0.5 block text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
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
