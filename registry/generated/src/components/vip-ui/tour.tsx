"use client";

import { useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  createContext,
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FocusScope } from "react-aria";
import type { Placement } from "react-aria-components";
import { createPortal } from "react-dom";
import { springSnappyEasing } from "./motion";
import { cn } from "./utils";
import { Button } from "./button";
import { LayoutMorph } from "./layout-morph";
import { Popover, PopoverArrow } from "./popover";

export interface TourStep {
  id: string;
  title: string;
  description: ReactNode;
  placement?: Placement;
}

export interface TourProps {
  steps: readonly TourStep[];
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  spotlight?: boolean;
  children: ReactNode;
}

export interface TourState {
  isOpen: boolean;
  step: number;
  count: number;
  start: (step?: number) => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
}

interface TourContextValue extends TourState {
  register: (id: string, element: Element | null) => void;
}

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
}

interface Blocker {
  edge: "top" | "bottom" | "left" | "right";
  style: CSSProperties;
}

const TourContext = createContext<TourContextValue | null>(null);

const glideDuration = 350;
const holdDuration = 180;

let warned = false;

function warnNoTargets() {
  if (process.env.NODE_ENV === "production" || warned) return;
  warned = true;
  console.warn(
    "Tour: no step has a mounted TourTarget, so the tour did not open.",
  );
}

function measure(element: Element): SpotlightRect {
  const rect = element.getBoundingClientRect();
  const root = document.documentElement;
  return {
    top: rect.top - 6,
    left: rect.left - 6,
    width: rect.width + 12,
    height: rect.height + 12,
    viewportWidth: root.clientWidth,
    viewportHeight: root.clientHeight,
  };
}

function cutout(rect: SpotlightRect) {
  const left = Math.max(0, rect.left);
  const top = Math.max(0, rect.top);
  const right = Math.min(rect.viewportWidth, rect.left + rect.width);
  const bottom = Math.min(rect.viewportHeight, rect.top + rect.height);
  if (right <= left || bottom <= top) return null;
  return { top, left, right, bottom };
}

function blockersFor(hole: {
  top: number;
  left: number;
  right: number;
  bottom: number;
}): Blocker[] {
  const height = hole.bottom - hole.top;
  return [
    { edge: "top", style: { top: 0, left: 0, right: 0, height: hole.top } },
    {
      edge: "bottom",
      style: { top: hole.bottom, left: 0, right: 0, bottom: 0 },
    },
    {
      edge: "left",
      style: { top: hole.top, left: 0, width: hole.left, height },
    },
    {
      edge: "right",
      style: { top: hole.top, left: hole.right, right: 0, height },
    },
  ];
}

export function Tour({
  steps,
  isOpen,
  defaultOpen = false,
  onOpenChange,
  step,
  defaultStep = 0,
  onStepChange,
  onComplete,
  onSkip,
  spotlight = true,
  children,
}: TourProps) {
  const baseId = useId();
  const reduceMotion = useReducedMotion() === true;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalStep, setInternalStep] = useState(defaultStep);
  const [targets, setTargets] = useState<Record<string, Element | null>>({});
  const [rect, setRect] = useState<SpotlightRect | null>(null);
  const [holdSpotlight, setHoldSpotlight] = useState(false);
  const [moving, setMoving] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  const open = isOpen ?? internalOpen;
  const count = steps.length;
  const current =
    count === 0 ? 0 : Math.min(Math.max(step ?? internalStep, 0), count - 1);
  const activeStep = steps[current];

  const popoverRef = useRef<HTMLElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<Element | null>(null);
  const wasOpen = useRef(false);
  const focusedStep = useRef<number | null>(null);
  const glide = useRef<Animation | null>(null);
  const [glideFrom, setGlideFrom] = useState<DOMRect | null>(null);

  const register = useCallback((id: string, element: Element | null) => {
    setTargets((known) =>
      known[id] === element ? known : { ...known, [id]: element },
    );
  }, []);

  const setOpen = useCallback(
    (value: boolean) => {
      if (isOpen === undefined) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isOpen, onOpenChange],
  );

  const setStep = useCallback(
    (value: number) => {
      if (step === undefined) setInternalStep(value);
      onStepChange?.(value);
    },
    [step, onStepChange],
  );

  const hasTarget = useCallback(
    (index: number) => {
      const id = steps[index]?.id;
      return id !== undefined && targets[id] != null;
    },
    [steps, targets],
  );

  const findStep = useCallback(
    (from: number, direction: 1 | -1) => {
      for (
        let index = from;
        index >= 0 && index < steps.length;
        index += direction
      ) {
        if (hasTarget(index)) return index;
      }
      return -1;
    },
    [hasTarget, steps.length],
  );

  const isLast = findStep(current + 1, 1) < 0;
  const canGoBack = findStep(current - 1, -1) >= 0;

  const finish = useCallback(
    (reason: "complete" | "skip" | "stop") => {
      if (reason === "complete") onComplete?.();
      if (reason === "skip") onSkip?.();
      setOpen(false);
    },
    [onComplete, onSkip, setOpen],
  );

  const start = useCallback(
    (at?: number) => {
      if (count === 0) return;
      const requested = Math.min(Math.max(at ?? 0, 0), count - 1);
      const forward = findStep(requested, 1);
      const first = forward >= 0 ? forward : findStep(0, 1);
      if (first < 0) {
        warnNoTargets();
        return;
      }
      if (typeof document !== "undefined")
        openerRef.current = document.activeElement;
      const id = steps[first]?.id ?? "";
      targets[id]?.scrollIntoView({
        block: "center",
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setGlideFrom(null);
      setStep(first);
      setOpen(true);
    },
    [count, findStep, reduceMotion, setOpen, setStep, steps, targets],
  );

  const stop = useCallback(() => finish("stop"), [finish]);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const index = findStep(current + direction, direction);
      if (index < 0) {
        if (direction === 1) finish("complete");
        return;
      }
      setGlideFrom(popoverRef.current?.getBoundingClientRect() ?? null);
      setStep(index);
    },
    [current, findStep, finish, setStep],
  );

  const next = useCallback(() => advance(1), [advance]);
  const previous = useCallback(() => advance(-1), [advance]);

  const value = useMemo<TourContextValue>(
    () => ({
      isOpen: open,
      step: current,
      count,
      start,
      stop,
      next,
      previous,
      register,
    }),
    [count, current, next, open, previous, register, start, stop],
  );

  const target = activeStep ? (targets[activeStep.id] ?? null) : null;
  const suffix = activeStep?.id ?? "none";
  const titleId = `${baseId}-${suffix}-title`;
  const descriptionId = `${baseId}-${suffix}-description`;
  const showSpotlight = (open || holdSpotlight) && spotlight;

  useEffect(() => {
    setPortal(document.body);
  }, []);

  useEffect(() => {
    if (open) {
      setHoldSpotlight(true);
      return;
    }
    if (!holdSpotlight) return;
    const timer = window.setTimeout(
      () => setHoldSpotlight(false),
      holdDuration,
    );
    return () => window.clearTimeout(timer);
  }, [open, holdSpotlight]);

  useLayoutEffect(() => {
    if (!open || !target) return;
    const update = () => setRect(measure(target));
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    const observer = new ResizeObserver(schedule);
    observer.observe(target);
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [open, target]);

  useLayoutEffect(() => {
    if (!open || !target) return;
    const previous = target.getAttribute("aria-describedby");
    target.setAttribute("aria-describedby", descriptionId);
    return () => {
      if (previous === null) target.removeAttribute("aria-describedby");
      else target.setAttribute("aria-describedby", previous);
    };
  }, [open, target, descriptionId]);

  useLayoutEffect(() => {
    if (open && focusedStep.current !== current) {
      focusedStep.current = current;
      nextRef.current?.focus({ preventScroll: true });
    } else if (!open) {
      focusedStep.current = null;
      if (wasOpen.current) {
        const active = document.activeElement;
        const inside =
          active instanceof Node &&
          (panelRef.current?.contains(active) ?? false);
        const opener = openerRef.current;
        if (
          (active === null || active === document.body || inside) &&
          opener instanceof HTMLElement &&
          opener.isConnected
        ) {
          opener.focus({ preventScroll: true });
        }
      }
    }
    wasOpen.current = open;
  }, [open, current]);

  useLayoutEffect(() => {
    if (!open || !glideFrom) return;
    const node = popoverRef.current;
    const from = glideFrom;
    setGlideFrom(null);
    if (!node) return;
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    if (reduceMotion || (Math.abs(dx) < 1 && Math.abs(dy) < 1)) return;
    glide.current?.cancel();
    const animation = node.animate(
      [{ translate: `${dx}px ${dy}px` }, { translate: "0px 0px" }],
      { duration: glideDuration, easing: springSnappyEasing.easing },
    );
    glide.current = animation;
    setMoving(true);
    animation.onfinish = () => {
      if (glide.current !== animation) return;
      glide.current = null;
      setMoving(false);
    };
  }, [glideFrom, open, reduceMotion]);

  useEffect(() => {
    return () => {
      glide.current?.cancel();
      glide.current = null;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      event.stopPropagation();
      finish("skip");
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [finish, open]);

  const hole = rect ? cutout(rect) : null;
  const blockers = hole
    ? blockersFor(hole)
    : [{ edge: "top" as const, style: { inset: 0 } }];

  const holdOutsideClick = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <TourContext.Provider value={value}>
      {children}
      {activeStep && (
        <Popover
          ref={popoverRef}
          triggerRef={{ current: target }}
          isOpen={open}
          isNonModal
          placement={activeStep.placement ?? "bottom"}
          offset={12}
          data-slot="tour-popover"
          data-moving={moving || undefined}
          className="w-80"
        >
          <PopoverArrow />
          <div
            role="dialog"
            tabIndex={-1}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            data-slot="tour-dialog"
            className="outline-none"
          >
            <FocusScope contain restoreFocus={false}>
              <div ref={panelRef} data-slot="tour-panel" className="grid gap-4">
                <LayoutMorph contentKey={activeStep.id}>
                  <div data-slot="tour-body" className="grid gap-1.5">
                    <h2
                      id={titleId}
                      data-slot="tour-title"
                      className="text-sm font-semibold leading-5 tracking-[-0.01em] wrap-anywhere"
                    >
                      {activeStep.title}
                    </h2>
                    <div
                      id={descriptionId}
                      data-slot="tour-description"
                      className="text-sm leading-5 text-muted-foreground wrap-anywhere"
                    >
                      {activeStep.description}
                    </div>
                  </div>
                </LayoutMorph>
                <div
                  data-slot="tour-footer"
                  className="flex flex-wrap items-center justify-between gap-2"
                >
                  <span
                    data-slot="tour-count"
                    dir="ltr"
                    className="text-xs text-muted-foreground tabular-nums"
                  >
                    {current + 1} of {count}
                  </span>
                  <div className="flex flex-wrap items-center justify-end gap-1">
                    <Button
                      data-slot="tour-skip"
                      variant="minimal"
                      size="sm"
                      onPress={() => finish("skip")}
                    >
                      Skip tour
                    </Button>
                    <Button
                      data-slot="tour-back"
                      variant="ghost"
                      size="sm"
                      isDisabled={!canGoBack}
                      onPress={previous}
                    >
                      Back
                    </Button>
                    <Button
                      ref={nextRef}
                      data-slot="tour-next"
                      size="sm"
                      onPress={next}
                    >
                      {isLast ? "Done" : "Next"}
                    </Button>
                  </div>
                </div>
              </div>
            </FocusScope>
          </div>
        </Popover>
      )}
      {portal &&
        createPortal(
          <>
            {showSpotlight && rect && (
              <div
                data-slot="tour-spotlight"
                data-state={open ? "open" : "closed"}
                aria-hidden="true"
                className={cn(
                  "pointer-events-none fixed z-50 rounded-lg opacity-0 starting:opacity-0",
                  "transition-opacity duration-200 ease-out-quint data-[state=open]:opacity-100",
                  "motion-safe:transition-[top,left,width,height,opacity] motion-safe:duration-350 motion-safe:ease-spring",
                  "motion-reduce:transition-opacity forced-colors:outline-2 forced-colors:outline-offset-2 forced-colors:outline-[CanvasText]",
                )}
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                  boxShadow:
                    "0 0 0 2px var(--color-ring), 0 0 0 9999px color-mix(in oklab, var(--foreground) 35%, transparent)",
                }}
              />
            )}
            {open &&
              spotlight &&
              blockers.map((blocker) => (
                <div
                  key={blocker.edge}
                  data-slot="tour-blocker"
                  data-edge={blocker.edge}
                  aria-hidden="true"
                  className="fixed z-50 cursor-default"
                  style={blocker.style}
                  onPointerDown={holdOutsideClick}
                  onClick={holdOutsideClick}
                />
              ))}
          </>,
          portal,
        )}
    </TourContext.Provider>
  );
}

export function TourTarget({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const tour = useContext(TourContext);
  const register = tour?.register;
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!register) return;
    const node = ref.current;
    if (!node) return;
    register(id, node.firstElementChild);
    const observer = new MutationObserver(() =>
      register(id, node.firstElementChild),
    );
    observer.observe(node, { childList: true });
    return () => {
      observer.disconnect();
      register(id, null);
    };
  }, [register, id]);

  return (
    <div ref={ref} data-slot="tour-target" className="contents">
      {children}
    </div>
  );
}

export function useTour(): TourState {
  const tour = useContext(TourContext);
  if (!tour) throw new Error("useTour must be used inside a Tour.");
  return tour;
}
