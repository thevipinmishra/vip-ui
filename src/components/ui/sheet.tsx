"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { X } from "reicon-react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps as StyledButtonProps } from "./button";

type Axis = "x" | "y";
type Position = SheetRenderProps["position"];
type SwipeDirection = SheetRenderProps["swipeDirection"];

// React hoists and de-duplicates this, so the file needs no global CSS.
const keyframes = "@keyframes vip-sheet-backdrop{from{opacity:0}to{opacity:1}}";

const sheetSurfaceStyles = tv({
  base: "flex max-h-[var(--visual-viewport-height,100dvh)] min-w-0 max-w-full flex-col bg-card text-card-foreground shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70",
  variants: {
    position: {
      bottom:
        "h-[calc(var(--visual-viewport-height,100dvh)*0.85)] w-full max-w-2xl overflow-clip rounded-t-xl",
      top: "max-h-[min(26rem,var(--visual-viewport-height,100dvh))] w-full max-w-2xl overflow-clip rounded-b-xl",
      left: "h-[var(--visual-viewport-height,100dvh)] w-[min(26rem,100vw)] max-w-[var(--visual-viewport-width,100vw)] rounded-r-xl",
      right:
        "h-[var(--visual-viewport-height,100dvh)] w-[min(26rem,100vw)] max-w-[var(--visual-viewport-width,100vw)] rounded-l-xl",
      center:
        "max-h-[calc(var(--visual-viewport-height,100dvh)-2rem)] w-[calc(100%-2rem)] max-w-md overflow-clip rounded-xl",
    },
  },
  defaultVariants: { position: "bottom" },
});

interface SheetFrameState {
  position: Position;
  axis: Axis;
  before: boolean;
  after: boolean;
  hasSnapPoints: boolean;
  preventDismissal: boolean;
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

// Resolves the scroll offset of every snap marker React Aria renders: the exit
// and entered markers on the scroller, and one detent per snap point.
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
  // Ordered from least to most revealed.
  const open = positions
    .filter((position) => !exits.includes(position))
    .sort(
      (a, b) =>
        Math.min(...exits.map((exit) => Math.abs(a - exit)), Infinity) -
        Math.min(...exits.map((exit) => Math.abs(b - exit)), Infinity),
    );
  if (!exits.length && sheet.before && !sheet.after) open.reverse();
  const full = open[open.length - 1];
  // React Aria's exit stops are a viewport away, but the sheet is already
  // hidden once it has moved its own size. Gestures settle against that.
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

function scrollToStop(
  scroller: HTMLElement,
  axis: Axis,
  target: number,
  reduceMotion: boolean | null,
) {
  if (Math.abs(getScroll(scroller, axis) - target) < 1)
    return resumeSnap(scroller);
  suspendSnap(scroller);
  const behavior = reduceMotion ? "instant" : "smooth";
  scroller.scrollTo(
    axis === "y" ? { top: target, behavior } : { left: target, behavior },
  );
  resumeSnap(scroller, true);
}

// Mandatory snapping retargets drags and programmatic scrolls, so it's off
// while they run. There's one override per scroller: a new drag or settle
// takes over a pending restore rather than having it re-enable snapping
// underneath, and keeps the original value to restore.
const snapOverrides = new WeakMap<
  HTMLElement,
  { snapType: string; cancel: () => void }
>();

function suspendSnap(scroller: HTMLElement) {
  const override = snapOverrides.get(scroller);
  override?.cancel();
  snapOverrides.set(scroller, {
    snapType: override?.snapType ?? scroller.style.scrollSnapType,
    cancel: () => {},
  });
  scroller.style.scrollSnapType = "none";
}

function resumeSnap(scroller: HTMLElement, afterScroll = false) {
  const override = snapOverrides.get(scroller);
  if (!override) return;
  const restore = () => {
    override.cancel();
    snapOverrides.delete(scroller);
    scroller.style.scrollSnapType = override.snapType;
  };
  if (!afterScroll) return restore();
  const timeout = window.setTimeout(restore, 1000);
  scroller.addEventListener("scrollend", restore, { once: true });
  override.cancel = () => {
    window.clearTimeout(timeout);
    scroller.removeEventListener("scrollend", restore);
  };
}

function visiblePercent(content: Element, axis: Axis) {
  const rect = content.getBoundingClientRect();
  const size = axis === "y" ? window.innerHeight : window.innerWidth;
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
  /** Classes for the sheet surface. */
  className?: AriaSheetProps["className"];
  position?: SheetOverlayProps["position"];
  swipeDirection?: SheetOverlayProps["swipeDirection"];
  /** Visible amount at each stop: numbers are pixels, `%` is relative to the sheet. Opens at the first. */
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
  swipeDirection,
  snapPoints,
  preventDismissal = false,
  isOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: SheetProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <style href="vip-sheet-keyframes" precedence="default">
        {keyframes}
      </style>
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
          className="pointer-events-none bg-black/45 backdrop-blur-[2px] dark:bg-black/55 motion-reduce:backdrop-blur-none"
        />
        <AriaSheet
          ref={surfaceRef}
          data-slot="sheet"
          className={composeRenderProps(className, (className, render) =>
            sheetSurfaceStyles({ position: render.position, className }),
          )}
        >
          {({ position, swipeDirection, isEntering }) => (
            <SheetFrame
              {...props}
              surfaceRef={surfaceRef}
              position={position}
              swipeDirection={swipeDirection}
              isEntering={isEntering}
              hasSnapPoints={!!snapPoints?.length}
              preventDismissal={preventDismissal}
            >
              {children}
            </SheetFrame>
          )}
        </AriaSheet>
      </SheetOverlay>
    </>
  );
}

function SheetFrame({
  children,
  surfaceRef,
  position,
  swipeDirection,
  isEntering,
  hasSnapPoints,
  preventDismissal,
  ...props
}: Omit<
  SheetProps,
  | "className"
  | "position"
  | "swipeDirection"
  | "snapPoints"
  | "preventDismissal"
  | "isOpen"
  | "defaultOpen"
  | "onOpenChange"
> & {
  surfaceRef: RefObject<HTMLDivElement | null>;
  position: Position;
  swipeDirection: SwipeDirection;
  isEntering: boolean;
  hasSnapPoints: boolean;
  preventDismissal: boolean;
}) {
  const state = useContext(OverlayTriggerStateContext);
  const [visible, setVisible] = useState(0);
  const { axis, before, after } = getSwipe(swipeDirection);

  // React Aria unlocks page scroll as soon as the sheet starts closing, but the
  // page-sized overlay stays until the exit scroll ends, so the returning
  // scrollbar makes it overflow. The lock is ref-counted: hold it until unmount,
  // with the same options SheetOverlay uses.
  usePreventScroll({ UNSTABLE_overrideFocus: true });

  useEffect(() => {
    const surface = surfaceRef.current;
    const scroller = surface && getScroller(surface);
    const content = surface?.querySelector("[data-sheet-content]");
    if (!scroller || !content || isEntering) return;
    const update = () => setVisible(visiblePercent(content, axis));
    update();
    scroller.addEventListener("scrollend", update);
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scrollend", update);
      window.removeEventListener("resize", update);
    };
  }, [surfaceRef, axis, isEntering]);

  useEffect(() => {
    const content = surfaceRef.current?.querySelector("[data-sheet-content]");
    if (!content || preventDismissal) return;
    const onKeyDown = (event: Event) => {
      if ((event as KeyboardEvent).key !== "Escape") return;
      // Some child controls stop propagation without handling Escape.
      // Close once dispatch finishes unless something consumed it.
      window.setTimeout(() => {
        if (!event.defaultPrevented) state?.close();
      });
    };
    content.addEventListener("keydown", onKeyDown, true);
    return () => content.removeEventListener("keydown", onKeyDown, true);
  }, [surfaceRef, preventDismissal, state]);

  return (
    <SheetContent
      {...props}
      data-slot="sheet-content"
      className="flex min-h-0 flex-1 flex-col outline-none focus-visible:outline-2 focus-visible:outline-ring"
    >
      <SheetFrameContext.Provider
        value={{
          position,
          axis,
          before,
          after,
          hasSnapPoints,
          preventDismissal,
          visible,
          close: () => state?.close(),
        }}
      >
        {children}
        {hasSnapPoints && (
          <output className="sr-only">Sheet height {visible} percent</output>
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
    // Dismiss the way a touch swipe does: keep scrolling out to React Aria's
    // exit stop and let its observer close the sheet once it's out of view.
    // Closing from here would re-enable snapping and snap it back open first.
    const exit = hidden.indexOf(target);
    scrollToStop(
      scroller,
      sheet.axis,
      exit === -1 ? target : exits[exit],
      reduceMotion,
    );
  };

  // Touch and trackpad swipes scroll the sheet natively. A mouse can't drag a
  // scroll container, so translate handle drags into scrolling.
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
      // Dragging fully out of view closes the sheet before release.
      if (!dragged.current || !scroller.isConnected) return;
      // Holding still before release cancels the fling.
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
    // Scrolling forward moves the sheet up or left.
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
    const { positions, exits, full } = getStops(scroller, sheet);
    const current = getScroll(scroller, sheet.axis);
    let target: number | undefined;
    if (event.key === "Home") target = full;
    else if (event.key === "End") target = exits[0];
    else
      target = positions[positions.indexOf(nearest(positions, current)) + step];
    if (target === undefined) return;
    if (exits.includes(target)) sheet.close();
    else scrollToStop(scroller, sheet.axis, target, reduceMotion);
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
    scrollToStop(
      scroller,
      sheet.axis,
      open[index === open.length - 1 ? 0 : index + 1],
      reduceMotion,
    );
  };

  return (
    <AriaButton
      {...props}
      data-slot="sheet-handle"
      aria-label={
        props["aria-label"] ??
        (sheet.hasSnapPoints
          ? `Resize sheet, ${sheet.visible} percent visible. Use arrow keys, Home, or End.`
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
          "flex shrink-0 cursor-grab select-none items-center justify-center active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-ring",
          side
            ? `absolute top-1/2 z-10 h-20 w-11 -translate-y-1/2 rounded-full border border-border bg-card shadow-[var(--shadow-float)] ${sheet.position === "left" ? "-right-5" : "-left-5"}`
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
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
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
  return (
    <div
      {...props}
      data-slot="sheet-header"
      className={cn("shrink-0 px-6 pt-4", className)}
    />
  );
}

export function SheetTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      slot="title"
      data-slot="sheet-title"
      className={cn("text-xl font-semibold tracking-[-0.04em]", className)}
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
        "mt-2 block text-sm leading-6 text-muted-foreground",
        className,
      )}
    />
  );
}

export function SheetBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="sheet-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5",
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
        "flex shrink-0 justify-end gap-2 border-t border-border px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        className,
      )}
    />
  );
}

export function SheetClose({
  children,
  variant = "ghost",
  size,
  ...props
}: StyledButtonProps) {
  return (
    <Button
      {...props}
      slot="close"
      data-slot="sheet-close"
      variant={variant}
      size={size ?? (children ? "default" : "icon")}
      aria-label={props["aria-label"] ?? (children ? undefined : "Close sheet")}
    >
      {children ?? <X size={17} aria-hidden="true" />}
    </Button>
  );
}
