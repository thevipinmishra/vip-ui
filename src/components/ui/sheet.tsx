"use client";

import { XIcon } from "@phosphor-icons/react";
import { animate, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import { usePreventScroll } from "react-aria/usePreventScroll";
import {
  Button as AriaButton,
  Sheet as AriaSheet,
  type SheetProps as AriaSheetProps,
  SheetTrigger as AriaSheetTrigger,
  type ButtonProps,
  composeRenderProps,
  Heading,
  type HeadingProps,
  OverlayTriggerStateContext,
  SheetBackdrop,
  SheetContent,
  type SheetContentProps,
  SheetOverlay,
  type SheetOverlayProps,
  type SheetRenderProps,
  type SheetTriggerProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { duration, easeOut, easeSheet } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps as StyledButtonProps } from "./button";
import { SizeProvider } from "./size";

type Axis = "x" | "y";
type Position = SheetRenderProps["position"];
type SwipeDirection = SheetRenderProps["swipeDirection"];

const sheetDuration = { enter: 0.32, exit: 0.24, settle: 0.3 } as const;

const scrollEdgeClasses =
  "supports-[animation-timeline:scroll()]:[animation-name:vip-edge-start,vip-edge-end] supports-[animation-timeline:scroll()]:[animation-timing-function:linear] supports-[animation-timeline:scroll()]:[animation-fill-mode:both] supports-[animation-timeline:scroll()]:[animation-timeline:scroll(self),scroll(self)] supports-[animation-timeline:scroll()]:[animation-range:0px_1rem,calc(100%_-_1rem)_100%]";

const sheetFallbackClasses =
  "supports-[not_(animation-timeline:view())]:transition-[transform] supports-[not_(animation-timeline:view())]:duration-320 supports-[not_(animation-timeline:view())]:ease-[cubic-bezier(0.32,0.72,0,1)] supports-[not_(animation-timeline:view())]:data-[has-descendants]:[transform:translate(var(--sheet-stack-x,0px),var(--sheet-stack-y,0px))_scale(var(--sheet-stack-scale,0.94))] motion-reduce:transition-none";

const sheetSurfaceStyles = tv({
  base: [
    "flex max-h-[var(--visual-viewport-height,100dvh)] min-w-0 max-w-full flex-col overflow-clip bg-card text-card-foreground [overflow-wrap:anywhere] shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70 data-[has-descendants]:rounded-xl",
    sheetFallbackClasses,
  ],
  variants: {
    position: {
      bottom:
        "max-h-[calc(var(--visual-viewport-height,100dvh)-2.5rem)] w-full max-w-(--sheet-edge-size) origin-top rounded-t-xl [--sheet-stack-y:-0.5rem]",
      top: "max-h-[min(26rem,calc(var(--visual-viewport-height,100dvh)-3.5rem))] w-full max-w-(--sheet-edge-size) origin-bottom rounded-b-xl [--sheet-stack-y:0.5rem]",
      left: "h-[var(--visual-viewport-height,100dvh)] w-(--sheet-side-size) max-w-[var(--visual-viewport-width,100vw)] origin-right rounded-r-xl [--sheet-stack-scale:0.96] [--sheet-stack-x:0.75rem]",
      right:
        "h-[var(--visual-viewport-height,100dvh)] w-(--sheet-side-size) max-w-[var(--visual-viewport-width,100vw)] origin-left rounded-l-xl [--sheet-stack-scale:0.96] [--sheet-stack-x:-0.75rem]",
      center:
        "max-h-[calc(var(--visual-viewport-height,100dvh)-2rem)] w-[calc(100%-2rem)] max-w-(--sheet-center-size) rounded-xl",
    },
    size: {
      sm: "[--sheet-center-size:24rem] [--sheet-edge-size:28rem] [--sheet-side-size:min(20rem,calc(100vw-3.5rem))]",
      md: "[--sheet-center-size:28rem] [--sheet-edge-size:42rem] [--sheet-side-size:min(26rem,calc(100vw-3.5rem))]",
      lg: "[--sheet-center-size:36rem] [--sheet-edge-size:56rem] [--sheet-side-size:min(36rem,calc(100vw-3.5rem))]",
      xl: "[--sheet-center-size:48rem] [--sheet-edge-size:72rem] [--sheet-side-size:min(48rem,calc(100vw-3.5rem))]",
      full: "rounded-none [--sheet-center-size:100%] [--sheet-edge-size:100%] [--sheet-side-size:100vw]",
    },
    inset: { true: "m-2 rounded-xl", false: "" },
  },
  compoundVariants: [
    {
      size: "full",
      position: ["top", "bottom", "center"],
      class:
        "h-[var(--visual-viewport-height,100dvh)] max-h-[var(--visual-viewport-height,100dvh)]",
    },
    { size: "full", position: "center", class: "w-full" },
    {
      inset: true,
      position: ["top", "bottom"],
      class: "w-[calc(100%-1rem)]",
    },
    {
      inset: true,
      position: ["left", "right"],
      class:
        "h-[calc(var(--visual-viewport-height,100dvh)-1rem)] max-w-[calc(var(--visual-viewport-width,100vw)-1rem)]",
    },
    {
      inset: true,
      size: "full",
      position: ["top", "bottom", "center"],
      class:
        "h-[calc(var(--visual-viewport-height,100dvh)-1rem)] max-h-[calc(var(--visual-viewport-height,100dvh)-1rem)]",
    },
    {
      inset: true,
      size: "full",
      position: "center",
      class: "w-[calc(100%-1rem)]",
    },
  ],
  defaultVariants: { position: "bottom", size: "md", inset: false },
});

export type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

interface SheetFrameState {
  position: Position;
  size: SheetSize;
  axis: Axis;
  before: boolean;
  after: boolean;
  hasSnapPoints: boolean;
  preventDismissal: boolean;
  isExpanded: boolean;
  visible: number;
  close: () => void;
}

const SheetFrameContext = createContext<SheetFrameState | null>(null);

function getSwipe(direction: SwipeDirection) {
  const axis: Axis =
    direction === "top" || direction === "bottom" || direction === "vertical"
      ? "y"
      : "x";
  return {
    axis,
    before:
      direction === "top" ||
      direction === "left" ||
      direction === "vertical" ||
      direction === "horizontal",
    after:
      direction === "bottom" ||
      direction === "right" ||
      direction === "vertical" ||
      direction === "horizontal",
  };
}

function getScroller(element: Element) {
  return element.closest<HTMLElement>("[data-sheet-scroll]");
}

function getScroll(scroller: HTMLElement, axis: Axis) {
  return axis === "y" ? scroller.scrollTop : scroller.scrollLeft;
}

function getSnapPositions(scroller: HTMLElement, axis: Axis) {
  const y = axis === "y";
  const box = scroller.getBoundingClientRect();
  const scroll = getScroll(scroller, axis);
  const size = y ? scroller.clientHeight : scroller.clientWidth;
  const max = (y ? scroller.scrollHeight : scroller.scrollWidth) - size;
  const positions: number[] = [];
  for (const marker of [
    ...scroller.children,
    ...scroller.querySelectorAll("[data-sheet-detent]"),
  ]) {
    const style = getComputedStyle(marker);
    const [block, inline = block] = style.scrollSnapAlign.split(" ");
    const align = y ? block : inline;
    if (align !== "start" && align !== "end") continue;
    const rect = marker.getBoundingClientRect();
    const position =
      align === "start"
        ? (y ? rect.top - box.top : rect.left - box.left) +
          scroll -
          (Number.parseFloat(
            y ? style.scrollMarginTop : style.scrollMarginLeft,
          ) || 0)
        : (y ? rect.bottom - box.top : rect.right - box.left) +
          scroll +
          (Number.parseFloat(
            y ? style.scrollMarginBottom : style.scrollMarginRight,
          ) || 0) -
          size;
    const clamped = Math.round(Math.min(max, Math.max(0, position)));
    if (positions.every((existing) => Math.abs(existing - clamped) > 2))
      positions.push(clamped);
  }
  return positions.sort((a, b) => a - b);
}

function nearest(positions: number[], value: number) {
  return positions.reduce((a, b) =>
    Math.abs(a - value) <= Math.abs(b - value) ? a : b,
  );
}

function getStops(scroller: HTMLElement, sheet: SheetFrameState) {
  const positions = getSnapPositions(scroller, sheet.axis);
  const exits = sheet.preventDismissal
    ? []
    : [
        ...(sheet.after ? [positions[0]] : []),
        ...(sheet.before ? [positions[positions.length - 1]] : []),
      ];
  const open = positions
    .filter((position) => !exits.includes(position))
    .sort(
      (a, b) =>
        Math.min(...exits.map((exit) => Math.abs(a - exit)), Infinity) -
        Math.min(...exits.map((exit) => Math.abs(b - exit)), Infinity),
    );
  if (!exits.length && sheet.before && !sheet.after) open.reverse();
  const full = open[open.length - 1];
  const content = scroller.querySelector<HTMLElement>("[data-sheet-content]");
  const size = content
    ? sheet.axis === "y"
      ? content.offsetHeight
      : content.offsetWidth
    : 0;
  const hidden = exits.map((exit) =>
    exit < full ? Math.max(exit, full - size) : Math.min(exit, full + size),
  );
  return { positions, exits, hidden, open, full };
}

function setScroll(scroller: HTMLElement, axis: Axis, value: number) {
  if (axis === "y") scroller.scrollTop = value;
  else scroller.scrollLeft = value;
}

function suspendSnap(scroller: HTMLElement) {
  scroller.setAttribute("data-sheet-unsnapped", "");
}

function resumeSnap(scroller: HTMLElement) {
  scroller.removeAttribute("data-sheet-unsnapped");
}

function viewportSize(content: Element, axis: Axis) {
  const stage = content.closest('[data-slot="sheet"]')?.parentElement;
  if (axis === "y") return stage?.clientHeight || window.innerHeight;
  return stage?.clientWidth || window.innerWidth;
}

function isOffscreen(content: Element) {
  const rect = content.getBoundingClientRect();
  return (
    rect.right <= 0.5 ||
    rect.bottom <= 0.5 ||
    rect.left >= viewportSize(content, "x") - 0.5 ||
    rect.top >= viewportSize(content, "y") - 0.5
  );
}

function visibleRange(scroller: HTMLElement, axis: Axis) {
  const content = scroller.querySelector("[data-sheet-content]");
  if (!content) return [-Infinity, Infinity];
  const rect = content.getBoundingClientRect();
  const size = viewportSize(content, axis);
  const scroll = getScroll(scroller, axis);
  const margin = 48;
  return [
    scroll + (axis === "y" ? rect.top : rect.left) - size - margin,
    scroll + (axis === "y" ? rect.bottom : rect.right) + margin,
  ];
}

const tweens = new WeakMap<HTMLElement, () => void>();

function stopTween(scroller: HTMLElement) {
  tweens.get(scroller)?.();
}

function stopNativeScrollEnd(event: Event) {
  event.stopImmediatePropagation();
}

function tweenScroll(
  scroller: HTMLElement,
  axis: Axis,
  target: number,
  duration: number,
) {
  stopTween(scroller);
  const [min, max] = visibleRange(scroller, axis);
  const clamp = (value: number) => Math.min(max, Math.max(min, value));
  const from = clamp(getScroll(scroller, axis));
  const to = clamp(target);
  let controls: ReturnType<typeof animate> | undefined;
  let frame = 0;
  const stop = () => {
    controls?.stop();
    cancelAnimationFrame(frame);
    tweens.delete(scroller);
    scroller.removeEventListener("scrollend", stopNativeScrollEnd, true);
    resumeSnap(scroller);
  };
  const finish = () => {
    stop();
    if (!scroller.isConnected) return;
    setScroll(scroller, axis, target);
    scroller.dispatchEvent(new Event("scrollend"));
  };
  tweens.set(scroller, stop);
  scroller.addEventListener("scrollend", stopNativeScrollEnd, true);
  if (Math.abs(target - getScroll(scroller, axis)) < 1) {
    frame = requestAnimationFrame(finish);
    return;
  }
  suspendSnap(scroller);
  setScroll(scroller, axis, from);
  if (!duration || Math.abs(to - from) < 1) {
    frame = requestAnimationFrame(finish);
    return;
  }
  const short = Math.sign(to - from);
  let expected = getScroll(scroller, axis);
  frame = requestAnimationFrame(() => {
    controls = animate(from, to, {
      duration,
      ease: easeSheet,
      onUpdate: (value) => {
        if (
          !scroller.isConnected ||
          Math.abs(getScroll(scroller, axis) - expected) > 2
        )
          return stop();
        setScroll(
          scroller,
          axis,
          Math.abs(to - value) < 1 ? to - short : value,
        );
        expected = getScroll(scroller, axis);
      },
      onComplete: finish,
    });
  });
}

function visiblePercent(content: Element, axis: Axis) {
  const rect = content.getBoundingClientRect();
  const size = viewportSize(content, axis);
  const start = axis === "y" ? rect.top : rect.left;
  const end = axis === "y" ? rect.bottom : rect.right;
  return Math.round(
    (Math.max(0, Math.min(size, end) - Math.max(0, start)) / size) * 100,
  );
}

export function SheetTrigger(props: SheetTriggerProps) {
  return <AriaSheetTrigger {...props} />;
}

export interface SheetProps
  extends Omit<SheetContentProps, "children" | "className" | "style"> {
  ref?: React.Ref<HTMLDivElement>;
  children: ReactNode;
  className?: AriaSheetProps["className"];
  position?: SheetOverlayProps["position"];
  size?: SheetSize;
  inset?: boolean;
  swipeDirection?: SheetOverlayProps["swipeDirection"];
  snapPoints?: SheetOverlayProps["snapPoints"];
  preventDismissal?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Sheet({
  children,
  className,
  position = "bottom",
  size = "md",
  inset = false,
  swipeDirection,
  snapPoints,
  preventDismissal = false,
  isOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: SheetProps) {
  return (
    <SheetOverlay
      data-slot="sheet-overlay"
      className="z-50"
      position={position}
      swipeDirection={swipeDirection}
      snapPoints={snapPoints}
      preventDismissal={preventDismissal}
      isOpen={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <SheetBackdrop
        data-slot="sheet-backdrop"
        swipeAnimation="vip-sheet-backdrop"
        className={({ stackIndex }) =>
          stackIndex > 0
            ? "pointer-events-none bg-black/25 dark:bg-black/35"
            : "pointer-events-none bg-black/45 backdrop-blur-[2px] dark:bg-black/55 motion-reduce:backdrop-blur-none"
        }
      />
      <AriaSheet
        data-slot="sheet"
        data-size={size}
        stackAnimation="vip-sheet-stack"
        className={composeRenderProps(className, (className, render) =>
          sheetSurfaceStyles({
            position: render.position,
            size,
            inset,
            className,
          }),
        )}
      >
        {({ position, swipeDirection, isEntering, isExpanded }) => (
          <SheetFrame
            {...props}
            position={position}
            size={size}
            swipeDirection={swipeDirection}
            isEntering={isEntering}
            isExpanded={isExpanded}
            hasSnapPoints={!!snapPoints?.length}
            preventDismissal={preventDismissal}
          >
            <SizeProvider size={undefined}>{children}</SizeProvider>
          </SheetFrame>
        )}
      </AriaSheet>
    </SheetOverlay>
  );
}

function SheetFrame({
  children,
  ref,
  position,
  size,
  swipeDirection,
  isEntering,
  isExpanded,
  hasSnapPoints,
  preventDismissal,
  ...props
}: Omit<
  SheetProps,
  | "className"
  | "position"
  | "size"
  | "inset"
  | "swipeDirection"
  | "snapPoints"
  | "preventDismissal"
  | "isOpen"
  | "defaultOpen"
  | "onOpenChange"
> & {
  position: Position;
  size: SheetSize;
  swipeDirection: SwipeDirection;
  isEntering: boolean;
  isExpanded: boolean;
  hasSnapPoints: boolean;
  preventDismissal: boolean;
}) {
  const state = useContext(OverlayTriggerStateContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);
  const { axis, before, after } = getSwipe(swipeDirection);
  const closeRef = useRef(() => state?.close());

  usePreventScroll({ UNSTABLE_overrideFocus: true });

  useLayoutEffect(() => {
    closeRef.current = () => state?.close();
  });

  useLayoutEffect(() => {
    const content = contentRef.current;
    const scroller = content && getScroller(content);
    const overlay = scroller?.closest<HTMLElement>(
      '[data-slot="sheet-overlay"]',
    );
    if (!content || !scroller || !overlay) return;
    const isExiting = () => overlay.hasAttribute("data-exiting");
    const scrollTo = scroller.scrollTo;
    scroller.scrollTo = ((...args: [ScrollToOptions?] | [number, number]) => {
      const [options] = args;
      const target =
        typeof options === "object" && options.behavior === "smooth"
          ? axis === "y"
            ? options.top
            : options.left
          : undefined;
      if (target === undefined) return Reflect.apply(scrollTo, scroller, args);
      tweenScroll(
        scroller,
        axis,
        target,
        isExiting() ? sheetDuration.exit : sheetDuration.enter,
      );
    }) as HTMLElement["scrollTo"];
    let shown = false;
    const settle = () => {
      if (!isOffscreen(content)) shown = true;
      else if (isExiting())
        overlay.dispatchEvent(new CustomEvent("react-aria-sheet-close"));
      else if (shown) closeRef.current();
    };
    scroller.addEventListener("scrollend", settle);
    return () => {
      stopTween(scroller);
      Reflect.deleteProperty(scroller, "scrollTo");
      scroller.removeEventListener("scrollend", settle);
    };
  }, [axis]);

  useEffect(() => {
    const content = contentRef.current;
    const scroller = content && getScroller(content);
    if (!scroller || !content || isEntering) return;
    const update = () => setVisible(visiblePercent(content, axis));
    update();
    scroller.addEventListener("scrollend", update);
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scrollend", update);
      window.removeEventListener("resize", update);
    };
  }, [axis, isEntering]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || preventDismissal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      window.setTimeout(() => {
        if (!event.defaultPrevented) state?.close();
      });
    };
    content.addEventListener("keydown", onKeyDown, true);
    return () => content.removeEventListener("keydown", onKeyDown, true);
  }, [preventDismissal, state]);

  return (
    <SheetContent
      {...props}
      ref={mergeRefs(contentRef, ref)}
      data-slot="sheet-content"
      className="flex min-h-0 flex-1 flex-col outline-none"
    >
      <SheetFrameContext.Provider
        value={{
          position,
          size,
          axis,
          before,
          after,
          hasSnapPoints,
          preventDismissal,
          isExpanded,
          visible,
          close: () => state?.close(),
        }}
      >
        {children}
        {hasSnapPoints && (
          <output className="sr-only">
            Sheet {axis === "y" ? "height" : "width"} {visible} percent of
            screen
          </output>
        )}
      </SheetFrameContext.Provider>
    </SheetContent>
  );
}

export function SheetHandle({ className, ...props }: ButtonProps) {
  const sheet = useContext(SheetFrameContext);
  const reduceMotion = useReducedMotion();
  const dragged = useRef(false);
  if (!sheet) throw new Error("SheetHandle must be inside <Sheet>.");
  const side = sheet.position === "left" || sheet.position === "right";

  const settle = (scroller: HTMLElement, velocity: number) => {
    const { exits, hidden, open, full } = getStops(scroller, sheet);
    const current = getScroll(scroller, sheet.axis);
    let target: number;
    if (!sheet.hasSnapPoints && hidden.length) {
      const exit = nearest(hidden, current);
      const distance = Math.abs(exit - full);
      const toward = Math.sign(exit - full);
      const displacement = (current - full) * toward;
      const speed = velocity * toward;
      const projected = displacement + speed * 0.18;
      target =
        displacement >= distance * 0.35 ||
        (displacement >= 20 && speed > 650 && projected >= distance * 0.35)
          ? exit
          : full;
    } else {
      const stops = [...open, ...hidden].sort((a, b) => a - b);
      target = nearest(stops, current + velocity * 0.18);
      if (Math.abs(velocity) > 650) {
        const next =
          velocity > 0
            ? stops.find((stop) => stop > current + 1)
            : [...stops].reverse().find((stop) => stop < current - 1);
        if (next !== undefined) target = next;
      }
    }
    const exit = hidden.indexOf(target);
    tweenScroll(
      scroller,
      sheet.axis,
      exit === -1 ? target : exits[exit],
      reduceMotion
        ? 0
        : exit === -1
          ? sheetDuration.settle
          : sheetDuration.exit,
    );
  };

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    dragged.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const scroller = getScroller(event.currentTarget);
    if (!scroller) return;
    const y = sheet.axis === "y";
    const origin = y ? event.clientY : event.clientX;
    const start = getScroll(scroller, sheet.axis);
    let samples = [{ time: event.timeStamp, scroll: start }];
    const move = (moveEvent: PointerEvent) => {
      const delta = (y ? moveEvent.clientY : moveEvent.clientX) - origin;
      if (!dragged.current) {
        if (Math.abs(delta) < 5) return;
        dragged.current = true;
        stopTween(scroller);
        suspendSnap(scroller);
      }
      scroller.scrollTo(y ? { top: start - delta } : { left: start - delta });
      samples = [
        ...samples.filter((sample) => moveEvent.timeStamp - sample.time < 100),
        { time: moveEvent.timeStamp, scroll: getScroll(scroller, sheet.axis) },
      ];
    };
    const end = (endEvent: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      if (!dragged.current || !scroller.isConnected) return;
      const recent = [
        ...samples.filter((sample) => endEvent.timeStamp - sample.time < 100),
        {
          time: endEvent.timeStamp,
          scroll: getScroll(scroller, sheet.axis),
        },
      ];
      const first = recent[0];
      const last = recent[recent.length - 1];
      const velocity =
        last.time > first.time
          ? ((last.scroll - first.scroll) / (last.time - first.time)) * 1000
          : 0;
      settle(scroller, velocity);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  const onHandleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") dragged.current = false;
    const y = sheet.axis === "y";
    const step =
      event.key === (y ? "ArrowUp" : "ArrowLeft")
        ? 1
        : event.key === (y ? "ArrowDown" : "ArrowRight")
          ? -1
          : 0;
    if (!step && event.key !== "Home" && event.key !== "End") return;
    const scroller = getScroller(event.currentTarget);
    if (!scroller) return;
    event.preventDefault();
    const { positions, exits, open, full } = getStops(scroller, sheet);
    const current = getScroll(scroller, sheet.axis);
    let target: number | undefined;
    if (event.key === "Home") target = full;
    else if (event.key === "End") target = exits[0] ?? open[0];
    else
      target = positions[positions.indexOf(nearest(positions, current)) + step];
    if (target === undefined) return;
    if (exits.includes(target)) sheet.close();
    else
      tweenScroll(
        scroller,
        sheet.axis,
        target,
        reduceMotion ? 0 : sheetDuration.settle,
      );
  };

  const onHandlePress = (element: Element) => {
    if (dragged.current) return;
    const scroller = getScroller(element);
    if (!scroller) return;
    const { open } = getStops(scroller, sheet);
    if (!sheet.hasSnapPoints || open.length < 2) {
      if (!sheet.preventDismissal) sheet.close();
      return;
    }
    const index = open.indexOf(nearest(open, getScroll(scroller, sheet.axis)));
    tweenScroll(
      scroller,
      sheet.axis,
      open[index === open.length - 1 ? 0 : index + 1],
      reduceMotion ? 0 : sheetDuration.settle,
    );
  };

  return (
    <AriaButton
      {...props}
      data-slot="sheet-handle"
      aria-label={
        props["aria-label"] ??
        (sheet.hasSnapPoints
          ? `Resize sheet, ${sheet.visible} percent of screen ${sheet.axis === "y" ? "height" : "width"}. Use arrow keys, Home, or End.`
          : `Dismiss ${sheet.position} sheet or drag ${sheet.position === "top" ? "up" : sheet.position === "left" || sheet.position === "right" ? sheet.position : "down"} to close`)
      }
      onPointerDown={(event) => {
        props.onPointerDown?.(event);
        if (!event.isDefaultPrevented()) startDrag(event);
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (!event.isDefaultPrevented()) onHandleKeyDown(event);
      }}
      onPress={(event) => {
        props.onPress?.(event);
        onHandlePress(event.target);
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "flex shrink-0 cursor-grab select-none items-center justify-center rounded-md active:cursor-grabbing focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
          side
            ? `absolute inset-y-0 z-10 my-auto h-16 w-6 ${sheet.position === "left" ? "right-0" : "left-0"}`
            : "mx-auto min-h-11 min-w-16",
          className,
        ),
      )}
    >
      {composeRenderProps(
        props.children,
        (content, { isHovered, isPressed }) =>
          content ?? (
            <motion.span
              aria-hidden="true"
              data-slot="sheet-handle-grip"
              className={cn(
                "rounded-full bg-muted-foreground/60",
                side ? "h-9 w-1" : "h-1 w-9",
              )}
              initial={false}
              animate={
                side
                  ? { scaleY: isPressed ? 0.78 : isHovered ? 1.16 : 1 }
                  : { scaleX: isPressed ? 0.78 : isHovered ? 1.16 : 1 }
              }
              transition={{
                duration: reduceMotion ? 0 : duration.fast,
                ease: easeOut,
              }}
            />
          ),
      )}
    </AriaButton>
  );
}

export function SheetHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const sheet = useContext(SheetFrameContext);
  return (
    <div
      {...props}
      data-slot="sheet-header"
      className={cn(
        "grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-start px-5 pt-4 pb-3",
        "*:data-[slot=sheet-close]:col-start-2 *:data-[slot=sheet-close]:row-start-1 *:data-[slot=sheet-close]:-my-1 *:data-[slot=sheet-close]:ms-4 *:data-[slot=sheet-close]:-me-2 *:data-[slot=sheet-description]:col-span-full",
        (sheet?.position === "top" ||
          sheet?.position === "left" ||
          sheet?.position === "right" ||
          sheet?.size === "full") &&
          "pt-[max(1rem,env(safe-area-inset-top))]",
        className,
      )}
    />
  );
}

export function SheetTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      slot="title"
      data-slot="sheet-title"
      className={cn(
        "min-w-0 text-xl font-semibold tracking-[-0.04em] [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function SheetDescription({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="sheet-description"
      className={cn(
        "mt-2 block text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function SheetBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const sheet = useContext(SheetFrameContext);
  return (
    <div
      {...props}
      data-slot="sheet-body"
      data-scroll-edges=""
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain border-y border-transparent px-5 py-2",
        scrollEdgeClasses,
        sheet?.hasSnapPoints && !sheet.isExpanded && "overflow-y-hidden",
        className,
      )}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="sheet-footer"
      className={cn(
        "flex shrink-0 flex-col gap-2 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:flex-wrap sm:justify-end",
        className,
      )}
    />
  );
}

export function SheetClose({
  children,
  variant = "ghost",
  size,
  iconOnly,
  ...props
}: StyledButtonProps) {
  const isIconOnly = iconOnly ?? !children;
  return (
    <Button
      {...props}
      slot="close"
      data-slot="sheet-close"
      variant={variant}
      size={size ?? (isIconOnly ? "sm" : "md")}
      iconOnly={isIconOnly}
      aria-label={props["aria-label"] ?? (children ? undefined : "Close sheet")}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </Button>
  );
}
