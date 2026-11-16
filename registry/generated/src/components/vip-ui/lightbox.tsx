"use client";

import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import {
  Children,
  createContext,
  type ReactNode,
  type Ref,
  type RefObject,
  useContext,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
  Dialog,
  type DialogProps,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";
import {
  Carousel,
  type CarouselApi,
  CarouselViewport,
  useCarousel,
} from "./carousel";

type Phase = "entering" | "idle" | "exiting";

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LightboxContextValue {
  isOpen: boolean;
  index: number;
  setOpen: (open: boolean) => void;
  setIndex: (index: number) => void;
  openAt: (index: number, element: HTMLElement) => void;
  registerTrigger: (index: number, element: HTMLElement | null) => void;
  restoreFocus: (index: number) => void;
  originRef: RefObject<Box | null>;
  openedIndexRef: RefObject<number>;
  triggersRef: RefObject<Map<number, HTMLElement>>;
}

interface LightboxViewContextValue {
  index: number;
  count: number;
  close: () => void;
  swipe: number;
  dragging: boolean;
  settling: boolean;
  onSwipeStart: () => void;
  onSwipeMove: (y: number) => void;
  onSwipeEnd: (y: number, velocity: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);
const LightboxViewContext = createContext<LightboxViewContextValue | null>(
  null,
);

const zoomClasses =
  "motion-safe:group-data-[phase=entering]/lightbox:transform-[translate(var(--lightbox-from-x,0px),var(--lightbox-from-y,0px))_scale(var(--lightbox-from-scale,0.96))] motion-safe:group-data-[phase=exiting]/lightbox:transform-[translate(var(--lightbox-from-x,0px),var(--lightbox-from-y,0px))_scale(var(--lightbox-from-scale,0.96))]";

const motionClasses =
  "transition-[transform,translate] duration-320 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none group-data-[phase=entering]/lightbox:transition-none group-data-[phase=exiting]/lightbox:duration-220";

const exitDuration = 220;

function waitForExit() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, exitDuration);
  });
}

function boxOf(node: Element) {
  const rect = node.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function contentBox(node: Element) {
  const box = boxOf(node);
  if (!(node instanceof HTMLImageElement)) return box;
  const naturalWidth = node.naturalWidth;
  const naturalHeight = node.naturalHeight;
  if (!naturalWidth || !naturalHeight) return box;
  const scale = Math.min(box.width / naturalWidth, box.height / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  return {
    x: box.x + (box.width - width) / 2,
    y: box.y + (box.height - height) / 2,
    width,
    height,
  };
}

function sourceBox(element: HTMLElement | null) {
  if (!element) return null;
  const node = element.querySelector("img, [data-lightbox-source]") ?? element;
  const box = contentBox(node);
  return box.width > 0 && box.height > 0 ? box : null;
}

function layoutBox(node: Element) {
  const style = (node as Element & { style?: CSSStyleDeclaration }).style;
  const transform = style?.transform;
  if (style) style.transform = "none";
  const box = contentBox(node);
  if (style) style.transform = transform ?? "";
  return box;
}

function onScreen(box: Box) {
  return (
    box.width > 0 &&
    box.height > 0 &&
    box.x + box.width > 0 &&
    box.y + box.height > 0 &&
    box.x < window.innerWidth &&
    box.y < window.innerHeight
  );
}

function writeOrigin(
  modal: HTMLElement | null,
  origin: Box | null,
  target: Box | null,
) {
  if (!modal) return;
  modal.style.removeProperty("--lightbox-from-x");
  modal.style.removeProperty("--lightbox-from-y");
  modal.style.removeProperty("--lightbox-from-scale");
  if (!origin || !target || target.width <= 0 || target.height <= 0) return;
  const scale = Math.min(
    origin.width / target.width,
    origin.height / target.height,
  );
  const x = origin.x + origin.width / 2 - (target.x + target.width / 2);
  const y = origin.y + origin.height / 2 - (target.y + target.height / 2);
  modal.style.setProperty("--lightbox-from-x", `${x}px`);
  modal.style.setProperty("--lightbox-from-y", `${y}px`);
  modal.style.setProperty("--lightbox-from-scale", String(scale));
}

function imageAt(carousel: HTMLElement | null, index: number) {
  if (!carousel) return null;
  const slide = carousel.querySelector<HTMLElement>(
    `[data-slot="carousel-slide"][data-index="${index}"]`,
  );
  return (
    slide?.querySelector<HTMLElement>("img, [data-lightbox-source]") ?? null
  );
}

export interface LightboxProps {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  children: ReactNode;
}

export function Lightbox({
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpenChange,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  children,
}: LightboxProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const [indexState, setIndexState] = useState(defaultIndex);
  const isOpen = isOpenProp ?? openState;
  const index = indexProp ?? indexState;
  const originRef = useRef<Box | null>(null);
  const openedIndexRef = useRef(defaultIndex);
  const triggersRef = useRef(new Map<number, HTMLElement>());
  const openerRef = useRef<HTMLElement | null>(null);

  const setOpen = (next: boolean) => {
    if (isOpenProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };

  const setIndex = (next: number) => {
    if (next === index) return;
    if (indexProp === undefined) setIndexState(next);
    onIndexChange?.(next);
  };

  const openAt = (next: number, element: HTMLElement) => {
    openerRef.current = element;
    openedIndexRef.current = next;
    originRef.current = sourceBox(element);
    setIndex(next);
    setOpen(true);
  };

  const registerTrigger = (key: number, element: HTMLElement | null) => {
    if (element) triggersRef.current.set(key, element);
    else triggersRef.current.delete(key);
  };

  const restoreFocus = (key: number) => {
    window.requestAnimationFrame(() => {
      const target = triggersRef.current.get(key) ?? openerRef.current;
      if (target?.isConnected) target.focus();
    });
  };

  return (
    <LightboxContext.Provider
      value={{
        isOpen,
        index,
        setOpen,
        setIndex,
        openAt,
        registerTrigger,
        restoreFocus,
        originRef,
        openedIndexRef,
        triggersRef,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
}

export interface LightboxTriggerProps
  extends Omit<AriaButtonProps, "children" | "className"> {
  index: number;
  "aria-label": string;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  children?: ReactNode;
}

export function LightboxTrigger({
  index,
  className,
  children,
  onPress,
  onPointerDown,
  onPointerMove,
  ref,
  ...props
}: LightboxTriggerProps) {
  const lightbox = useContext(LightboxContext);
  const nodeRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const movedRef = useRef(false);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node || !lightbox) return;
    lightbox.registerTrigger(index, node);
    return () => lightbox.registerTrigger(index, null);
  }, [index, lightbox]);

  return (
    <AriaButton
      {...props}
      ref={mergeRefs(nodeRef, ref)}
      data-slot="lightbox-trigger"
      onPointerDown={(event) => {
        onPointerDown?.(event);
        startRef.current = { x: event.clientX, y: event.clientY };
        movedRef.current = false;
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        const start = startRef.current;
        if (
          start &&
          Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8
        ) {
          movedRef.current = true;
        }
      }}
      onPress={(event) => {
        onPress?.(event);
        if (movedRef.current) {
          movedRef.current = false;
          return;
        }
        const node = nodeRef.current;
        if (node) lightbox?.openAt(index, node);
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/lightbox-trigger relative grid min-w-0 cursor-pointer place-items-center overflow-hidden rounded-lg bg-muted/50 ring-1 ring-border/60 outline-offset-4 outline-transparent transition-[outline-color,outline-offset,box-shadow] duration-150 ease-out-quint hover:ring-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
          className,
        ),
      )}
    >
      {children}
    </AriaButton>
  );
}

export interface LightboxContentProps
  extends Omit<DialogProps, "children" | "className"> {
  className?: string;
  children?: ReactNode;
}

export function LightboxContent({
  "aria-label": label = "Image viewer",
  className,
  children,
  ...props
}: LightboxContentProps) {
  const lightbox = useContext(LightboxContext);
  if (!lightbox) {
    throw new Error("LightboxContent must be inside <Lightbox>.");
  }
  const {
    isOpen,
    index,
    setOpen,
    setIndex,
    originRef,
    openedIndexRef,
    triggersRef,
  } = lightbox;
  const slides = Children.toArray(children);
  const count = slides.length;
  const current = Math.min(Math.max(index, 0), Math.max(0, count - 1));
  const [phase, setPhase] = useState<Phase>("entering");
  const [measured, setMeasured] = useState(0);
  const [swipe, setSwipe] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLElement>(null);
  const carouselApiRef = useRef<CarouselApi | null>(null);
  const swipedRef = useRef(false);
  const pendingRef = useRef<{
    from: number;
    to: number;
    until: number;
  } | null>(null);

  const request = (next: number) => {
    if (next === current) return;
    pendingRef.current = {
      from: current,
      to: next,
      until: window.performance.now() + 700,
    };
    setIndex(next);
  };

  const onCarouselIndexChange = (next: number) => {
    const pending = pendingRef.current;
    if (pending) {
      if (next === pending.to) {
        pendingRef.current = null;
        return;
      }
      if (next === pending.from && window.performance.now() < pending.until) {
        return;
      }
      pendingRef.current = null;
    }
    if (next === current) return;
    setIndex(next);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    // Opening starts a fresh enter transition, so the presentation state
    // resets in the same commit.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    setPhase("entering");
    setSwipe(0);
    setDragging(false);
    setSettling(false);
    setMeasured((value) => value + 1);
  }, [isOpen]);

  const previousRef = useRef(current);

  useLayoutEffect(() => {
    if (previousRef.current === current) return;
    const pending = pendingRef.current;
    if (!pending || pending.to !== current) {
      pendingRef.current = {
        from: previousRef.current,
        to: current,
        until: window.performance.now() + 700,
      };
    }
    previousRef.current = current;
  });

  // Settling the phase needs the measured layout from the open effect above.
  // react-doctor-disable-next-line react-doctor/no-effect-chain
  useLayoutEffect(() => {
    if (!isOpen || measured === 0) return;
    carouselApiRef.current?.scrollTo(current, true);
    const image = imageAt(carouselRef.current, current);
    writeOrigin(
      modalRef.current,
      originRef.current,
      image ? layoutBox(image) : null,
    );
    // The enter phase ends once the measured image is in place.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    setPhase("idle");
  }, [current, isOpen, measured, originRef]);

  const prepareExit = () => {
    const same = openedIndexRef.current === current;
    const trigger = same ? triggersRef.current.get(current) : null;
    const origin = sourceBox(trigger ?? null);
    const image = imageAt(carouselRef.current, current);
    writeOrigin(
      modalRef.current,
      origin && onScreen(origin) ? origin : null,
      image ? layoutBox(image) : null,
    );
    setSettling(false);
    setPhase("exiting");
  };

  const close = () => {
    prepareExit();
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) prepareExit();
    setOpen(open);
  };

  const dragProgress = Math.min(0.9, swipe / 420);

  const onSwipeStart = () => {
    swipedRef.current = true;
    setSettling(false);
    setDragging(true);
    setSwipe(0);
  };

  const onSwipeMove = (y: number) => {
    setSwipe(y);
  };

  const onSwipeEnd = (y: number, velocity: number) => {
    setDragging(false);
    if (y > 120 || velocity > 0.5) {
      close();
      return;
    }
    setSettling(true);
    setSwipe(0);
    window.setTimeout(() => {
      swipedRef.current = false;
    }, 0);
  };

  const onDialogClick = (event: MouseEvent) => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        'img, [data-lightbox-source], button, [data-slot="lightbox-caption"]',
      )
    ) {
      return;
    }
    close();
  };

  const onDialogKeyDown = (event: KeyboardEvent) => {
    if (
      event.defaultPrevented ||
      (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
    ) {
      return;
    }
    const node = event.currentTarget as HTMLElement | null;
    const rtl = node ? getComputedStyle(node).direction === "rtl" : false;
    const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
    const next = forward
      ? Math.min(current + 1, count - 1)
      : Math.max(current - 1, 0);
    if (next === current) return;
    event.preventDefault();
    request(next);
  };

  const onDialogClickEvent = useEffectEvent(onDialogClick);
  const onDialogKeyDownEvent = useEffectEvent(onDialogKeyDown);

  useEffect(() => {
    if (!isOpen) return;
    const node = modalRef.current;
    if (!node) return;
    const onClick = (event: MouseEvent) => onDialogClickEvent(event);
    const onKeyDown = (event: KeyboardEvent) => onDialogKeyDownEvent(event);
    node.addEventListener("click", onClick);
    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("click", onClick);
      node.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const view: LightboxViewContextValue = {
    index: current,
    count,
    close,
    swipe,
    dragging,
    settling,
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
  };

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      onExit={waitForExit}
      isDismissable
      data-slot="lightbox-overlay"
      className="fixed inset-0 z-50 grid h-(--visual-viewport-height,100dvh) w-full place-items-center overflow-clip bg-transparent"
    >
      <div
        data-slot="lightbox-backdrop"
        data-phase={phase}
        data-dragging={dragging || undefined}
        style={dragging ? { opacity: 1 - dragProgress } : undefined}
        className="absolute inset-0 bg-foreground/92 transition-opacity duration-240 ease-out-quint dark:bg-background/95 forced-colors:bg-[Canvas] data-[dragging]:transition-none data-[phase=entering]:opacity-0 data-[phase=exiting]:opacity-0 data-[phase=exiting]:duration-160"
      />
      <Modal
        ref={modalRef}
        data-slot="lightbox-modal"
        data-phase={phase}
        className="group/lightbox relative h-(--visual-viewport-height,100dvh) w-full outline-none"
      >
        <Dialog
          {...props}
          aria-label={label}
          data-slot="lightbox-content"
          className={cn("h-full w-full bg-transparent outline-none", className)}
        >
          <div
            data-slot="lightbox-layout"
            className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)] gap-2 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:ps-6 sm:pe-6"
          >
            <LightboxViewContext.Provider value={view}>
              <div
                data-slot="lightbox-header"
                className="flex min-h-11 items-center justify-between gap-3"
              >
                <LightboxCount />
                <LightboxClose className="ms-auto" />
              </div>
              <Carousel
                ref={carouselRef}
                setApi={(carouselApi) => {
                  carouselApiRef.current = carouselApi;
                }}
                aria-label="Images"
                index={current}
                onIndexChange={onCarouselIndexChange}
                className="relative h-full min-h-0 grid-rows-[minmax(0,1fr)] gap-0"
              >
                <CarouselViewport
                  className="h-full rounded-none"
                  trackClassName="h-full touch-pan-x items-stretch gap-0"
                >
                  {slides}
                </CarouselViewport>
                <LightboxPrevious className="absolute start-0 top-1/2 z-10 -translate-y-1/2 text-background hover:bg-background/10 focus-visible:outline-background dark:text-foreground dark:hover:bg-foreground/10 dark:focus-visible:outline-foreground" />
                <LightboxNext className="absolute end-0 top-1/2 z-10 -translate-y-1/2 text-background hover:bg-background/10 focus-visible:outline-background dark:text-foreground dark:hover:bg-foreground/10 dark:focus-visible:outline-foreground" />
              </Carousel>
              <FocusReturn />
            </LightboxViewContext.Provider>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export interface LightboxImageProps
  extends Omit<React.ComponentProps<"figure">, "children"> {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  children?: ReactNode;
}

function swipeStyle(swipe: number) {
  return { translate: swipe ? `0 ${swipe}px` : undefined };
}

function imageClasses(caption: boolean, dragging: boolean, settling: boolean) {
  return cn(
    "min-h-0 max-w-full select-none object-contain",
    caption ? "max-h-[calc(100%-2rem)]" : "max-h-full",
    motionClasses,
    dragging && "transition-none",
    settling && "duration-350 ease-spring",
    zoomClasses,
  );
}

function placeholderClasses(
  caption: boolean,
  dragging: boolean,
  settling: boolean,
) {
  return cn(
    "grid w-full place-items-center",
    caption ? "h-[calc(100%-2rem)]" : "h-full min-h-0",
    motionClasses,
    dragging && "transition-none",
    settling && "duration-350 ease-spring",
    zoomClasses,
  );
}

export function LightboxImage({
  src,
  alt,
  width,
  height,
  caption,
  className,
  children,
  ...props
}: LightboxImageProps) {
  const view = useContext(LightboxViewContext);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    active: boolean;
    samples: { time: number; y: number }[];
  } | null>(null);
  const swipe = view?.swipe ?? 0;
  const dragging = view?.dragging ?? false;
  const settling = view?.settling ?? false;

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      active: false,
      samples: [{ time: event.timeStamp, y: event.clientY }],
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.active) {
      if (dy < 8 || Math.abs(dy) < Math.abs(dx) * 1.732) return;
      state.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      view?.onSwipeStart();
    }
    state.samples = [
      ...state.samples.filter((sample) => event.timeStamp - sample.time < 100),
      { time: event.timeStamp, y: event.clientY },
    ];
    view?.onSwipeMove(Math.max(0, dy));
  };

  const endDrag = (event: React.PointerEvent<HTMLElement>) => {
    const state = drag.current;
    drag.current = null;
    if (!state?.active) return;
    const recent = [
      ...state.samples.filter((sample) => event.timeStamp - sample.time < 100),
      { time: event.timeStamp, y: event.clientY },
    ];
    const first = recent[0];
    const last = recent[recent.length - 1];
    const velocity =
      last.time > first.time
        ? (last.y - first.y) / (last.time - first.time)
        : 0;
    view?.onSwipeEnd(Math.max(0, event.clientY - state.y), velocity);
  };

  return (
    <figure
      {...props}
      data-slot="lightbox-image"
      aria-label={src ? undefined : alt}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={cn(
        "flex h-full min-h-0 touch-pan-x flex-col items-center justify-center",
        caption && "gap-3",
        className,
      )}
    >
      {src ? (
        // biome-ignore lint/performance/noImgElement: a lightbox shows a consumer-provided image URL.
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable={false}
          style={swipeStyle(swipe)}
          className={imageClasses(Boolean(caption), dragging, settling)}
        />
      ) : (
        <div
          data-lightbox-source=""
          style={swipeStyle(swipe)}
          className={placeholderClasses(Boolean(caption), dragging, settling)}
        >
          {children}
        </div>
      )}
      {caption && (
        <figcaption
          data-slot="lightbox-caption"
          className="max-w-[64ch] shrink-0 text-center text-xs leading-5 text-background/75 forced-colors:text-[CanvasText] dark:text-foreground/75"
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function LightboxCount({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const view = useContext(LightboxViewContext);
  if (!view || view.count < 2) return null;
  return (
    <p
      {...props}
      data-slot="lightbox-count"
      className={cn(
        "text-xs tabular-nums text-background/80 forced-colors:text-[CanvasText] dark:text-foreground/80",
        className,
      )}
    >
      <span dir="ltr">
        {view.index + 1} of {view.count}
      </span>
    </p>
  );
}

export function LightboxClose({
  className,
  children,
  onPress,
  variant = "ghost",
  size = "sm",
  iconOnly = true,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const view = useContext(LightboxViewContext);
  return (
    <Button
      {...props}
      data-slot="lightbox-close"
      variant={variant}
      size={size}
      iconOnly={iconOnly}
      aria-label={ariaLabel ?? "Close"}
      onPress={(event) => {
        onPress?.(event);
        view?.close();
      }}
      className={cn(
        "text-background hover:bg-background/10 pressed:bg-background/10 focus-visible:outline-background forced-colors:text-[CanvasText] dark:text-foreground dark:hover:bg-foreground/10 dark:pressed:bg-foreground/10 dark:focus-visible:outline-foreground",
        className,
      )}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </Button>
  );
}

function LightboxPrevious({ className }: { className?: string }) {
  const carousel = useCarousel();
  return (
    <Button
      variant="ghost"
      size="md"
      iconOnly
      data-slot="lightbox-previous"
      aria-label="Previous image"
      isDisabled={!carousel.canScrollPrev}
      onPress={() => carousel.scrollPrev()}
      className={className}
    >
      <CaretLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
    </Button>
  );
}

function LightboxNext({ className }: { className?: string }) {
  const carousel = useCarousel();
  return (
    <Button
      variant="ghost"
      size="md"
      iconOnly
      data-slot="lightbox-next"
      aria-label="Next image"
      isDisabled={!carousel.canScrollNext}
      onPress={() => carousel.scrollNext()}
      className={className}
    >
      <CaretRightIcon aria-hidden="true" className="rtl:-scale-x-100" />
    </Button>
  );
}

function FocusReturn() {
  const lightbox = useContext(LightboxContext);
  const view = useContext(LightboxViewContext);
  const latest = useRef({ lightbox, index: view?.index ?? 0 });
  useLayoutEffect(() => {
    latest.current = { lightbox, index: view?.index ?? 0 };
  });
  useLayoutEffect(
    () => () => {
      latest.current.lightbox?.restoreFocus(latest.current.index);
    },
    [],
  );
  return null;
}
