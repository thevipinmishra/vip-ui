// biome-ignore-all lint/a11y/noNoninteractiveTabindex: The slide row takes focus so the arrow keys move one slide.

"use client";

import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
} from "@phosphor-icons/react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  Children,
  type ComponentProps,
  createContext,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "./utils";
import { Button, type ButtonProps } from "./button";

export type CarouselApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
export type CarouselPlugin = NonNullable<
  Parameters<typeof useEmblaCarousel>[1]
>[number];

type CarouselAxis = "x" | "y";

interface CarouselState {
  selectedIndex: number;
  snapCount: number;
  slideCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  axis: CarouselAxis;
}

interface CarouselContextValue extends CarouselState {
  api?: CarouselApi;
  viewportRef: UseEmblaCarouselType[0];
  scrollTo: (index: number, jump?: boolean) => void;
  scrollPrev: (jump?: boolean) => void;
  scrollNext: (jump?: boolean) => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const CarouselSlideIndexContext = createContext<number | null>(null);
const CarouselSlideCountContext = createContext<number | null>(null);

export interface CarouselProps
  extends Omit<ComponentProps<"section">, "aria-label" | "onChange"> {
  "aria-label": string;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  setApi?: (api: CarouselApi) => void;
}

export function Carousel({
  "aria-label": label,
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  opts,
  plugins,
  setApi,
  dir,
  className,
  children,
  ref,
  ...props
}: CarouselProps) {
  const [detectedDirection, setDetectedDirection] = useState<"ltr" | "rtl">(
    "ltr",
  );
  const [state, setState] = useState<CarouselState>(() => ({
    selectedIndex: opts?.startIndex ?? defaultIndex,
    snapCount: 0,
    slideCount: 0,
    canScrollPrev: false,
    canScrollNext: false,
    axis: opts?.axis ?? "x",
  }));
  const sectionRef = useRef<HTMLElement | null>(null);
  const onChangeEvent = useEffectEvent((index: number) => {
    onIndexChange?.(index);
  });
  const onApiEvent = useEffectEvent((next: CarouselApi) => {
    setApi?.(next);
  });

  useLayoutEffect(() => {
    const node = sectionRef.current;
    if (node) {
      setDetectedDirection(
        getComputedStyle(node).direction === "rtl" ? "rtl" : "ltr",
      );
    }
  }, []);

  const direction =
    dir === "rtl"
      ? "rtl"
      : dir === "ltr"
        ? "ltr"
        : (opts?.direction ?? detectedDirection);

  const options = useMemo<CarouselOptions>(
    () => ({
      align: "start",
      direction,
      startIndex: defaultIndex,
      ...opts,
    }),
    [direction, defaultIndex, opts],
  );

  const [viewportRef, api] = useEmblaCarousel(options, plugins);

  const update = useCallback(() => {
    if (!api) return;
    setState({
      selectedIndex: api.selectedScrollSnap(),
      snapCount: api.scrollSnapList().length,
      slideCount: api.slideNodes().length,
      canScrollPrev: api.canScrollPrev(),
      canScrollNext: api.canScrollNext(),
      axis: api.internalEngine().options.axis,
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const select = () => {
      update();
      onChangeEvent(api.selectedScrollSnap());
    };
    // Embla is an external store: the first snapshot is only readable after
    // the viewport mounts, so the effect publishes it once.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    update();
    api.on("select", select);
    api.on("reInit", update);
    api.on("slidesChanged", update);
    return () => {
      api.off("select", select);
      api.off("reInit", update);
      api.off("slidesChanged", update);
    };
  }, [api, update]);

  // `setApi` is the documented Embla handle and only exists after the viewport
  // mounts, so it has to be published from an effect.
  useEffect(() => {
    // react-doctor-disable-next-line react-doctor/no-pass-data-to-parent, react-doctor/no-pass-live-state-to-parent, react-doctor/no-prop-callback-in-effect
    if (api) onApiEvent(api);
  }, [api]);

  useEffect(() => {
    if (!api || indexProp === undefined) return;
    const total = api.scrollSnapList().length;
    if (total === 0) return;
    const target = Math.min(Math.max(indexProp, 0), total - 1);
    if (api.selectedScrollSnap() !== target) api.scrollTo(target);
  }, [api, indexProp]);

  const scrollTo = useCallback(
    (index: number, jump?: boolean) => {
      api?.scrollTo(index, jump);
    },
    [api],
  );

  const scrollPrev = useCallback(
    (jump?: boolean) => {
      api?.scrollPrev(jump);
    },
    [api],
  );

  const scrollNext = useCallback(
    (jump?: boolean) => {
      api?.scrollNext(jump);
    },
    [api],
  );

  const value: CarouselContextValue = useMemo(
    () => ({
      api,
      viewportRef,
      ...state,
      scrollTo,
      scrollPrev,
      scrollNext,
    }),
    [api, viewportRef, state, scrollTo, scrollPrev, scrollNext],
  );

  return (
    <CarouselContext.Provider value={value}>
      <section
        {...props}
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        dir={dir}
        aria-label={label}
        aria-roledescription="carousel"
        data-slot="carousel"
        data-index={state.selectedIndex}
        data-orientation={state.axis === "y" ? "vertical" : "horizontal"}
        className={cn("group/carousel grid min-w-0 gap-3", className)}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export interface CarouselViewportProps extends ComponentProps<"div"> {
  ref?: Ref<HTMLDivElement>;
  trackClassName?: string;
}

function viewportMask(
  vertical: boolean,
  rtl: boolean,
  canScrollPrev: boolean,
  canScrollNext: boolean,
) {
  if (!canScrollPrev && !canScrollNext) return undefined;
  const from = canScrollPrev ? "transparent" : "black";
  const to = canScrollNext ? "transparent" : "black";
  if (vertical)
    return `linear-gradient(to bottom, ${from}, black var(--carousel-fade), black calc(100% - var(--carousel-fade)), ${to})`;
  return `linear-gradient(${rtl ? "to left" : "to right"}, ${from}, black ${canScrollPrev ? "var(--carousel-fade)" : "0px"}, black calc(100% - var(--carousel-fade)), ${to})`;
}

function viewportArrowKeys(vertical: boolean, rtl: boolean) {
  if (vertical) return { next: "ArrowDown", previous: "ArrowUp" };
  return rtl
    ? { next: "ArrowLeft", previous: "ArrowRight" }
    : { next: "ArrowRight", previous: "ArrowLeft" };
}

export function CarouselViewport({
  className,
  children,
  onKeyDown,
  ref,
  style,
  trackClassName,
  "aria-label": ariaLabel = "Slides",
  "aria-live": ariaLive = "polite",
  ...props
}: CarouselViewportProps) {
  const carousel = useContext(CarouselContext);
  const ownRef = useRef<HTMLDivElement | null>(null);
  const [rtl, setRtl] = useState(false);
  const count = Children.count(children);
  const axis = carousel?.axis ?? "x";
  const vertical = axis === "y";
  const canScrollPrev = carousel?.canScrollPrev ?? false;
  const canScrollNext = carousel?.canScrollNext ?? false;

  useLayoutEffect(() => {
    const node = ownRef.current;
    if (node) setRtl(getComputedStyle(node).direction === "rtl");
  }, []);

  const fade = canScrollPrev || canScrollNext;
  const maskImage = fade
    ? viewportMask(vertical, rtl, canScrollPrev, canScrollNext)
    : undefined;

  return (
    // biome-ignore lint/a11y/useSemanticElements: The slide row is a labelled region, not a form control.
    <div
      {...props}
      ref={(node) => {
        ownRef.current = node;
        carousel?.viewportRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      data-slot="carousel-viewport"
      data-orientation={vertical ? "vertical" : "horizontal"}
      data-can-scroll-prev={canScrollPrev || undefined}
      data-can-scroll-next={canScrollNext || undefined}
      aria-live={ariaLive}
      role="group"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!carousel || event.defaultPrevented) return;
        if (event.target !== event.currentTarget) return;
        const isRtl = getComputedStyle(event.currentTarget).direction === "rtl";
        const { next, previous } = viewportArrowKeys(vertical, isRtl);
        if (event.key !== next && event.key !== previous) return;
        event.preventDefault();
        if (event.key === next) carousel.scrollNext();
        else carousel.scrollPrev();
      }}
      style={{ maskImage, ...style }}
      className={cn(
        "overflow-hidden rounded-xl [--carousel-fade:0.75rem] outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
        className,
      )}
    >
      <div
        data-slot="carousel-track"
        className={cn(
          "flex min-w-0 items-start gap-3",
          vertical ? "h-full min-h-0 touch-pan-x flex-col" : "touch-pan-y",
          trackClassName,
        )}
      >
        <CarouselSlideCountContext.Provider value={count}>
          {Children.map(children, (child, position) => (
            <CarouselSlideIndexContext.Provider value={position}>
              {child}
            </CarouselSlideIndexContext.Provider>
          ))}
        </CarouselSlideCountContext.Provider>
      </div>
    </div>
  );
}

export interface CarouselSlideProps extends ComponentProps<"div"> {
  "aria-label"?: string;
}

export function CarouselSlide({
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: CarouselSlideProps) {
  const position = useContext(CarouselSlideIndexContext);
  const total = useContext(CarouselSlideCountContext);
  const carousel = useContext(CarouselContext);
  const vertical = carousel?.axis === "y";

  return (
    // biome-ignore lint/a11y/useSemanticElements: A carousel slide is not a form control.
    <div
      {...props}
      role="group"
      aria-roledescription="slide"
      aria-label={
        ariaLabel ??
        (position !== null && total !== null
          ? `${position + 1} of ${total}`
          : undefined)
      }
      data-slot="carousel-slide"
      data-index={position ?? undefined}
      className={cn(
        "shrink-0 grow-0 basis-full",
        vertical ? "min-h-0 w-full" : "min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CarouselPrevious({ className, ...props }: ButtonProps) {
  const carousel = useContext(CarouselContext);
  const vertical = carousel?.axis === "y";
  return (
    <Button
      {...props}
      variant="outline"
      size="sm"
      iconOnly
      aria-label="Previous slide"
      isDisabled={!carousel?.canScrollPrev}
      onPress={() => carousel?.scrollPrev()}
      data-slot="carousel-previous"
      className={className}
    >
      {vertical ? (
        <CaretUpIcon aria-hidden="true" />
      ) : (
        <CaretLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
      )}
    </Button>
  );
}

export function CarouselNext({ className, ...props }: ButtonProps) {
  const carousel = useContext(CarouselContext);
  const vertical = carousel?.axis === "y";
  return (
    <Button
      {...props}
      variant="outline"
      size="sm"
      iconOnly
      aria-label="Next slide"
      isDisabled={!carousel?.canScrollNext}
      onPress={() => carousel?.scrollNext()}
      data-slot="carousel-next"
      className={className}
    >
      {vertical ? (
        <CaretDownIcon aria-hidden="true" />
      ) : (
        <CaretRightIcon aria-hidden="true" className="rtl:-scale-x-100" />
      )}
    </Button>
  );
}

export function CarouselIndicators({
  className,
  onKeyDown,
  ...props
}: ComponentProps<"div">) {
  const carousel = useContext(CarouselContext);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const count = carousel?.snapCount ?? 0;
  const index = carousel?.selectedIndex ?? 0;
  const vertical = carousel?.axis === "y";

  return (
    // biome-ignore lint/a11y/useSemanticElements: A dot group is not a form control.
    <div
      {...props}
      role="group"
      aria-label="Slides"
      data-slot="carousel-indicators"
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!carousel || event.defaultPrevented) return;
        const isRtl = getComputedStyle(event.currentTarget).direction === "rtl";
        const nextKey = vertical
          ? "ArrowDown"
          : isRtl
            ? "ArrowLeft"
            : "ArrowRight";
        const previousKey = vertical
          ? "ArrowUp"
          : isRtl
            ? "ArrowRight"
            : "ArrowLeft";
        if (event.key !== nextKey && event.key !== previousKey) return;
        const forward = event.key === nextKey;
        if (forward ? !carousel.canScrollNext : !carousel.canScrollPrev) {
          event.preventDefault();
          return;
        }
        const target = Math.min(
          Math.max(index + (forward ? 1 : -1), 0),
          Math.max(0, count - 1),
        );
        event.preventDefault();
        carousel.scrollTo(target);
        buttons.current[target]?.focus();
      }}
      className={cn(
        "flex items-center justify-center gap-1",
        vertical ? "flex-col" : "flex-wrap",
        className,
      )}
    >
      {Array.from({ length: count }, (_, position) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: a dot is its slide index.
          key={position}
          ref={(element) => {
            buttons.current[position] = element;
          }}
          type="button"
          aria-label={`Show slide ${position + 1}`}
          aria-current={position === index ? "true" : undefined}
          data-slot="carousel-indicator"
          onClick={() => carousel?.scrollTo(position)}
          className="group/indicator grid size-6 place-items-center rounded-full outline-offset-4 outline-transparent transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
        >
          <span
            aria-hidden="true"
            className={cn(
              "rounded-full bg-border transition-[width,height,background-color] duration-350 ease-spring motion-reduce:transition-[background-color] group-aria-[current=true]/indicator:bg-foreground forced-colors:border forced-colors:border-[CanvasText] group-aria-[current=true]/indicator:forced-colors:bg-[CanvasText]",
              position === index
                ? vertical
                  ? "h-5 w-1.5"
                  : "h-1.5 w-5"
                : "h-1.5 w-1.5",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function CarouselThumbnails({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="carousel-thumbnails"
      className={cn("flex min-w-0 gap-2", className)}
    >
      {children}
    </div>
  );
}

export interface CarouselThumbnailProps extends ComponentProps<"button"> {
  index: number;
  "aria-label": string;
}

export function CarouselThumbnail({
  index,
  className,
  children,
  onClick,
  ...props
}: CarouselThumbnailProps) {
  const carousel = useContext(CarouselContext);
  const current = carousel?.selectedIndex === index;
  return (
    <button
      {...props}
      type="button"
      aria-current={current ? "true" : undefined}
      data-slot="carousel-thumbnail"
      onClick={(event) => {
        onClick?.(event);
        carousel?.scrollTo(index);
      }}
      className={cn(
        "group/thumb grid min-w-0 flex-1 gap-1.5 rounded-lg bg-muted/50 p-1.5 ring-1 outline-offset-4 outline-transparent transition-[box-shadow,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2",
        current ? "ring-2 ring-primary" : "ring-border/70",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CarouselStatus({ className, ...props }: ComponentProps<"p">) {
  const carousel = useContext(CarouselContext);
  const count = carousel?.snapCount ?? 0;
  const index = carousel?.selectedIndex ?? 0;
  return (
    <p
      {...props}
      data-slot="carousel-status"
      className={cn(
        "shrink-0 text-sm whitespace-nowrap tabular-nums text-muted-foreground",
        className,
      )}
    >
      <span dir="ltr">{count === 0 ? "0 / 0" : `${index + 1} / ${count}`}</span>
    </p>
  );
}

export function useCarousel() {
  const carousel = useContext(CarouselContext);
  if (!carousel) {
    throw new Error("useCarousel must be used inside <Carousel>.");
  }
  return carousel;
}
