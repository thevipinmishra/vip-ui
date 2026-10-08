"use client";

import {
  animate,
  type HTMLMotionProps,
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  type ButtonProps,
  composeRenderProps,
  type DialogProps,
  type DialogTriggerProps,
  Heading,
  type HeadingProps,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { X } from "reicon-react";
import { tv } from "tailwind-variants";
import { cn } from "./utils";
import { Button, type ButtonProps as StyledButtonProps } from "./button";

type Placement = "bottom" | "top" | "left" | "right";

const drawerSurfaceStyles = tv({
  base: "absolute flex max-h-[var(--visual-viewport-height,100dvh)] min-w-0 max-w-full flex-col bg-card text-card-foreground shadow-[var(--shadow-float)] outline-none ring-1 ring-border/70",
  variants: {
    placement: {
      bottom:
        "inset-x-0 mx-auto bottom-0 w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-t-xl",
      top: "inset-x-0 mx-auto top-0 max-h-[min(26rem,var(--visual-viewport-height,100dvh))] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-b-xl",
      left: "top-0 left-0 h-[var(--visual-viewport-height,100dvh)] w-[min(26rem,100vw)] max-w-[var(--visual-viewport-width,100vw)] rounded-r-xl",
      right:
        "top-0 right-0 h-[var(--visual-viewport-height,100dvh)] w-[min(26rem,100vw)] max-w-[var(--visual-viewport-width,100vw)] rounded-l-xl",
    },
  },
  defaultVariants: { placement: "bottom" },
});

interface DrawerState {
  open: boolean;
  present: boolean;
  close: () => void;
  exitComplete: () => void;
}

const DrawerContext = createContext<DrawerState | null>(null);
const DrawerContentContext = createContext<{
  placement: Placement;
  point: number;
  startDrag: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onHandleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onHandlePress: () => void;
} | null>(null);

function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("Drawer parts must be inside <Drawer>.");
  return context;
}

export function Drawer({
  defaultOpen,
  isOpen,
  onOpenChange,
  ...props
}: DialogTriggerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const open = isOpen ?? internalOpen;
  const [present, setPresent] = useState(open);

  useEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  const changeOpen = (next: boolean) => {
    if (isOpen === undefined) setInternalOpen(next);
    if (next) setPresent(true);
    onOpenChange?.(next);
  };
  const exitComplete = useCallback(() => {
    if (!open) setPresent(false);
  }, [open]);

  return (
    <DrawerContext.Provider
      value={{
        open,
        present,
        close: () => changeOpen(false),
        exitComplete,
      }}
    >
      <AriaDialogTrigger {...props} isOpen={open} onOpenChange={changeOpen} />
    </DrawerContext.Provider>
  );
}

export function DrawerTrigger(props: StyledButtonProps) {
  return <Button {...props} data-slot="drawer-trigger" />;
}

export interface DrawerContentProps
  extends Omit<DialogProps, "children" | "className"> {
  ref?: React.Ref<HTMLElement>;
  children: ReactNode;
  /** Classes for the drawer surface. */
  className?: React.ComponentProps<typeof Modal>["className"];
  placement?: Placement;
  /** Bottom drawers only. Fractions of the visible viewport, between 0 and 1. */
  snapPoints?: number[];
  defaultSnapPoint?: number;
  snapPoint?: number;
  onSnapPointChange?: (point: number) => void;
  overlayProps?: Omit<
    ModalOverlayProps,
    "children" | "isOpen" | "onOpenChange" | "isExiting" | "render"
  >;
}

const DEFAULT_SNAPS = [0.85];
const spring = { type: "spring" as const, stiffness: 380, damping: 38 };

export function DrawerContent({
  children,
  className,
  placement = "bottom",
  snapPoints = DEFAULT_SNAPS,
  defaultSnapPoint,
  snapPoint,
  onSnapPointChange,
  overlayProps,
  ...props
}: DrawerContentProps) {
  const { open, present, close, exitComplete } = useDrawer();
  const reduceMotion = useReducedMotion();
  const dragControls = useDragControls();
  const wasOpen = useRef(false);
  const dragged = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [surfaceSize, setSurfaceSize] = useState({ height: 0, width: 0 });
  const [viewport, setViewport] = useState({ height: 0, width: 0 });
  const points = useMemo(() => {
    const valid = snapPoints.filter(
      (point) => Number.isFinite(point) && point > 0 && point <= 1,
    );
    return valid.length
      ? [...new Set(valid)].sort((a, b) => a - b)
      : DEFAULT_SNAPS;
  }, [snapPoints]);
  const [internalPoint, setInternalPoint] = useState(
    defaultSnapPoint ?? points[0],
  );
  const requestedPoint = snapPoint ?? internalPoint;
  const point = points.reduce((nearest, candidate) =>
    Math.abs(candidate - requestedPoint) < Math.abs(nearest - requestedPoint)
      ? candidate
      : nearest,
  );
  const maxHeight = points[points.length - 1] * viewport.height;
  const sideWidth = surfaceSize.width || Math.min(416, viewport.width);
  const topHeight = surfaceSize.height || Math.min(416, viewport.height);
  const vertical = placement === "bottom" || placement === "top";
  const offset = (points[points.length - 1] - point) * viewport.height;
  const closedSide = (placement === "left" ? -1 : 1) * (sideWidth + 24);
  const progress = useTransform(vertical ? y : x, (value) =>
    Math.max(
      0,
      1 -
        Math.min(
          1,
          Math.abs(value) /
            (placement === "bottom"
              ? maxHeight || 1
              : placement === "top"
                ? topHeight || 1
                : sideWidth + 24),
        ),
    ),
  );

  useLayoutEffect(() => {
    const update = () =>
      setViewport({
        height: window.visualViewport?.height ?? window.innerHeight,
        width: window.visualViewport?.width ?? window.innerWidth,
      });
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  useLayoutEffect(() => {
    if (placement === "bottom" || (!open && !present)) return;
    const surface = surfaceRef.current;
    if (!surface) return;
    const measure = () =>
      setSurfaceSize({
        height: surface.offsetHeight,
        width: surface.offsetWidth,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(surface);
    return () => observer.disconnect();
  }, [open, present, placement]);

  useLayoutEffect(() => {
    if (!viewport.height || (!open && !present)) return;
    const value = vertical ? y : x;
    const closed =
      placement === "bottom"
        ? maxHeight
        : placement === "top"
          ? -(surfaceRef.current?.offsetHeight || topHeight)
          : (placement === "left" ? -1 : 1) *
            ((surfaceRef.current?.offsetWidth || sideWidth) + 24);
    const target = open ? (placement === "bottom" ? offset : 0) : closed;
    if (open && !wasOpen.current) value.set(closed);
    wasOpen.current = open;
    const controls = animate(
      value,
      target,
      reduceMotion
        ? { duration: 0 }
        : open
          ? spring
          : { duration: 0.24, ease: "easeOut" },
    );
    let cancelled = false;
    if (!open)
      void controls.then(() => {
        if (!cancelled) exitComplete();
      });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [
    open,
    present,
    placement,
    viewport.height,
    offset,
    maxHeight,
    sideWidth,
    topHeight,
    vertical,
    reduceMotion,
    x,
    y,
    exitComplete,
  ]);

  const selectPoint = (next: number) => {
    if (snapPoint === undefined) setInternalPoint(next);
    onSnapPointChange?.(next);
    animate(
      y,
      (points[points.length - 1] - next) * viewport.height,
      reduceMotion ? { duration: 0 } : spring,
    );
  };

  const onHandleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") dragged.current = false;
    if (placement !== "bottom") return;
    const index = points.indexOf(point);
    if (event.key === "ArrowUp" || event.key === "Home") {
      event.preventDefault();
      selectPoint(
        points[
          event.key === "Home"
            ? points.length - 1
            : Math.min(points.length - 1, index + 1)
        ],
      );
    } else if (event.key === "ArrowDown" || event.key === "End") {
      event.preventDefault();
      if (event.key === "End" || index === 0) close();
      else selectPoint(points[index - 1]);
    }
  };

  const onDragEnd: HTMLMotionProps<"div">["onDragEnd"] = (_, info) => {
    if (placement === "bottom") {
      const stops = points.map((snap) => ({
        snap,
        position: (points[points.length - 1] - snap) * viewport.height,
      }));
      const projected = y.get() + info.velocity.y * 0.18;
      const nearest = [...stops, { snap: 0, position: maxHeight }].reduce(
        (a, b) =>
          Math.abs(a.position - projected) < Math.abs(b.position - projected)
            ? a
            : b,
      );
      if (Math.abs(info.velocity.y) > 650) {
        const ordered = [...stops, { snap: 0, position: maxHeight }].sort(
          (a, b) => a.position - b.position,
        );
        const next =
          info.velocity.y > 0
            ? ordered.find((stop) => stop.position > offset + 1)
            : [...ordered].reverse().find((stop) => stop.position < offset - 1);
        if (next) {
          if (next.snap === 0) close();
          else selectPoint(next.snap);
          return;
        }
      }
      if (nearest.snap === 0) close();
      else selectPoint(nearest.snap);
    } else {
      const value = placement === "top" ? y : x;
      const edge = placement === "top" ? -topHeight : closedSide;
      const distance = Math.abs(edge);
      const displacement = value.get() * Math.sign(edge);
      const speed =
        (placement === "top" ? info.velocity.y : info.velocity.x) *
        Math.sign(edge);
      const projected = displacement + speed * 0.18;
      if (
        displacement >= distance * 0.35 ||
        (displacement >= 20 && speed > 650 && projected >= distance * 0.35)
      ) {
        close();
      } else {
        animate(value, 0, spring);
      }
    }
  };

  return (
    <ModalOverlay
      {...overlayProps}
      data-slot="drawer-overlay"
      isDismissable={overlayProps?.isDismissable ?? true}
      isExiting={!open && present}
      className={composeRenderProps(overlayProps?.className, (className) =>
        cn("fixed inset-0 z-50 overflow-hidden", className),
      )}
    >
      <motion.div
        aria-hidden="true"
        data-slot="drawer-backdrop"
        className="pointer-events-none absolute inset-0 bg-black/45 backdrop-blur-[2px] dark:bg-black/55 motion-reduce:backdrop-blur-none"
        style={{ opacity: progress }}
      />
      <Modal
        ref={surfaceRef}
        data-slot="drawer-modal"
        render={(domProps) => (
          <motion.div
            {...(domProps as HTMLMotionProps<"div">)}
            onKeyDownCapture={(event) => {
              if (
                event.key === "Escape" &&
                !overlayProps?.isKeyboardDismissDisabled &&
                event.currentTarget.contains(event.target as Node)
              ) {
                // Some child controls stop propagation without handling Escape.
                // Give them a chance to consume it before closing the drawer.
                queueMicrotask(() => {
                  if (!event.defaultPrevented) close();
                });
              }
            }}
            style={{
              ...domProps.style,
              x,
              y,
              height:
                placement === "bottom"
                  ? maxHeight
                    ? `${maxHeight}px`
                    : `${points[points.length - 1] * 100}dvh`
                  : undefined,
            }}
            drag={reduceMotion ? false : vertical ? "y" : "x"}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
              dragged.current = true;
            }}
            dragConstraints={
              placement === "bottom"
                ? { top: 0, bottom: maxHeight }
                : placement === "top"
                  ? { top: -topHeight, bottom: 0 }
                  : {
                      left: placement === "left" ? -(sideWidth + 24) : 0,
                      right: placement === "right" ? sideWidth + 24 : 0,
                    }
            }
            onDragEnd={onDragEnd}
          />
        )}
        className={composeRenderProps(className, (className) =>
          drawerSurfaceStyles({ placement, className }),
        )}
      >
        <AriaDialog
          {...props}
          data-slot="drawer-content"
          className="flex min-h-0 flex-1 flex-col outline-none data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring"
        >
          <DrawerContentContext.Provider
            value={{
              placement,
              point,
              startDrag: (event) => {
                dragged.current = false;
                if (!reduceMotion) {
                  dragControls.start(event, {
                    distanceThreshold: event.pointerType === "touch" ? 8 : 5,
                  });
                }
              },
              onHandleKeyDown,
              onHandlePress: () => {
                if (dragged.current) return;
                if (placement !== "bottom") close();
                else if (points.length > 1)
                  selectPoint(
                    point === points[points.length - 1]
                      ? points[0]
                      : points[points.indexOf(point) + 1],
                  );
                else close();
              },
            }}
          >
            {children}
            {placement === "bottom" && (
              <output className="sr-only">
                Drawer height {Math.round(point * 100)} percent
              </output>
            )}
          </DrawerContentContext.Provider>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function DrawerHandle({ className, ...props }: ButtonProps) {
  const context = useContext(DrawerContentContext);
  const reduceMotion = useReducedMotion();
  if (!context) throw new Error("DrawerHandle must be inside <DrawerContent>.");
  return (
    <AriaButton
      {...props}
      data-slot="drawer-handle"
      aria-label={
        props["aria-label"] ??
        (context.placement === "bottom"
          ? `Resize drawer, ${Math.round(context.point * 100)} percent visible. Use arrow keys, Home, or End.`
          : `Dismiss ${context.placement} drawer or drag ${context.placement === "top" ? "up" : context.placement} to close`)
      }
      onPointerDown={(event) => {
        props.onPointerDown?.(event);
        if (!event.isDefaultPrevented()) context.startDrag(event);
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (!event.isDefaultPrevented()) context.onHandleKeyDown(event);
      }}
      onPress={(event) => {
        props.onPress?.(event);
        context.onHandlePress();
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "flex shrink-0 cursor-grab items-center justify-center touch-none active:cursor-grabbing data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring",
          context.placement === "left" || context.placement === "right"
            ? `absolute top-1/2 z-10 h-20 w-11 -translate-y-1/2 rounded-full border border-border bg-card shadow-[var(--shadow-float)] ${context.placement === "left" ? "-right-5" : "-left-5"}`
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
              data-slot="drawer-handle-grip"
              className={cn(
                "rounded-full bg-muted-foreground/60",
                context.placement === "left" || context.placement === "right"
                  ? "h-9 w-1"
                  : "h-1 w-9",
              )}
              initial={false}
              animate={
                context.placement === "left" || context.placement === "right"
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

export function DrawerHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="drawer-header"
      className={cn("shrink-0 px-6 pt-4", className)}
    />
  );
}

export function DrawerTitle({ className, ...props }: HeadingProps) {
  return (
    <Heading
      {...props}
      slot="title"
      data-slot="drawer-title"
      className={cn("text-xl font-semibold tracking-[-0.04em]", className)}
    />
  );
}

export function DrawerDescription({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="drawer-description"
      className={cn(
        "mt-2 block text-sm leading-6 text-muted-foreground",
        className,
      )}
    />
  );
}

export function DrawerBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="drawer-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5",
        className,
      )}
    />
  );
}

export function DrawerFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="drawer-footer"
      className={cn(
        "flex shrink-0 justify-end gap-2 border-t border-border px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        className,
      )}
    />
  );
}

export function DrawerClose({
  children,
  onPress,
  variant = "ghost",
  size,
  ...props
}: StyledButtonProps) {
  const { close } = useDrawer();
  return (
    <Button
      {...props}
      data-slot="drawer-close"
      variant={variant}
      size={size ?? (children ? "default" : "icon")}
      onPress={(event) => {
        onPress?.(event);
        close();
      }}
      aria-label={
        props["aria-label"] ?? (children ? undefined : "Close drawer")
      }
    >
      {children ?? <X size={17} aria-hidden="true" />}
    </Button>
  );
}
