"use client";

import * as marquee from "@zag-js/marquee";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
  Children,
  type ComponentProps,
  type CSSProperties,
  createContext,
  type ReactNode,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { reducedMotionQuery } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { useMediaQuery } from "./hooks";

export type MarqueeSide = marquee.Side;
export type MarqueeDirection = "ltr" | "rtl";
export type MarqueeApi = marquee.Api;

export interface MarqueeRootProps
  extends Omit<ComponentProps<"div">, "dir" | "id"> {
  /** The id of the machine root. */
  id?: string;
  /** The side the content scrolls towards. */
  side?: MarqueeSide;
  /** Movement in pixels per second. */
  speed?: number;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Number of loops. `0` loops forever. */
  loopCount?: number;
  /**
   * Space between items, in any CSS length. The machine writes it to
   * `--marquee-spacing`; `MarqueeItem` reads that variable for its margins.
   * `Marquee` defaults it to `var(--marquee-gap, 1.5rem)`.
   */
  spacing?: string;
  /** Duplicate the content to fill the viewport. */
  autoFill?: boolean;
  /** Pause while the pointer is over the frame or focus is inside it. */
  pauseOnInteraction?: boolean;
  /** Move the content toward the opposite side. */
  reverse?: boolean;
  /** Pause state, controlled. */
  paused?: boolean;
  /** Pause at first render, uncontrolled. */
  defaultPaused?: boolean;
  onPauseChange?: (details: marquee.PauseStatusDetails) => void;
  onLoopComplete?: () => void;
  onComplete?: () => void;
  translations?: marquee.IntlTranslations;
  dir?: MarqueeDirection;
  ids?: marquee.ElementIds;
  getRootNode?: marquee.Props["getRootNode"];
  /** Content rendered after the frame, inside the marquee context. */
  footer?: ReactNode;
}

export interface MarqueeProps
  extends Omit<
    MarqueeRootProps,
    "autoFill" | "footer" | "pauseOnInteraction" | "spacing"
  > {
  /**
   * Space between items. Writes `--marquee-gap` on the root. The convenience
   * tree gives the machine `var(--marquee-gap, 1.5rem)` and uses item margins,
   * so a CSS gap never adds a second layer. Composed trees can set `spacing` on
   * `MarqueeRoot` and read `--marquee-spacing` directly.
   */
  spacing?: string;
  autoFill?: boolean;
  pauseOnInteraction?: boolean;
}

export interface MarqueeRuntime {
  api: marquee.Api;
  /** Whether the content scrolls with CSS right now. */
  animated: boolean;
  reduceMotion: boolean;
  reverse: boolean;
  hovered: boolean;
  focused: boolean;
}

export interface MarqueeContentProps extends ComponentProps<"div"> {
  /** The index of the content copy. `0` is the original. */
  index: number;
}

export interface MarqueeEdgeProps extends Omit<ComponentProps<"div">, "side"> {
  side: MarqueeSide;
}

export interface MarqueePauseTriggerProps
  extends Omit<ButtonProps, "children"> {
  children?: ReactNode;
}

const MarqueePartsContext = createContext<MarqueeRuntime | null>(null);

export function useMarquee(): MarqueeRuntime {
  const context = useContext(MarqueePartsContext);
  if (!context)
    throw new Error(
      "useMarquee must be used inside a <MarqueeRoot> or <Marquee>.",
    );
  return context;
}

export interface MarqueeContextProps {
  children: (api: marquee.Api) => ReactNode;
}

export function MarqueeContext({ children }: MarqueeContextProps) {
  const { api } = useMarquee();
  return <>{children(api)}</>;
}

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

function composedMask(animated: boolean, vertical: boolean) {
  if (!animated) return undefined;
  return vertical
    ? "mask-[linear-gradient(to_bottom,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:mask-none"
    : "mask-[linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:mask-none";
}

export function MarqueeRoot({
  id,
  side,
  speed,
  delay,
  loopCount,
  spacing,
  autoFill,
  pauseOnInteraction,
  reverse,
  paused,
  defaultPaused,
  onPauseChange,
  onLoopComplete,
  onComplete,
  translations,
  dir,
  ids,
  getRootNode,
  footer,
  className,
  style,
  children,
  ref,
  "aria-label": ariaLabel,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  ...props
}: MarqueeRootProps) {
  const generatedId = useId();
  const rootId = id ?? `marquee-${stableId(generatedId)}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const pausedBeforeInteraction = useRef(false);
  const [detectedDir, setDetectedDir] = useState<MarqueeDirection>("ltr");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useMediaQuery(reducedMotionQuery);

  useLayoutEffect(() => {
    if (dir) return;
    const node = rootRef.current;
    if (!node) return;
    setDetectedDir(getComputedStyle(node).direction === "rtl" ? "rtl" : "ltr");
  }, [dir]);

  const direction = dir ?? detectedDir;

  const service = useMachine(marquee.machine, {
    id: rootId,
    ids,
    side,
    speed,
    delay,
    loopCount,
    spacing,
    autoFill,
    pauseOnInteraction,
    reverse,
    paused,
    defaultPaused,
    onPauseChange,
    onLoopComplete,
    onComplete,
    translations: {
      ...translations,
      root: ariaLabel ?? translations?.root ?? "Marquee content",
    },
    dir: direction,
    getRootNode,
  });
  const api = marquee.connect(service, normalizeProps);

  const rootProps = api.getRootProps();
  const {
    onMouseEnter: machineMouseEnter,
    onMouseLeave: machineMouseLeave,
    onFocusCapture: machineFocusCapture,
    onBlurCapture: machineBlurCapture,
    style: rootStyle,
    className: rootClassName,
    ...restRootProps
  } = rootProps;

  const reverseValue = reverse ?? false;
  const animated = (speed ?? 50) > 0 && !reduceMotion;
  const context: MarqueeRuntime = {
    api,
    animated,
    reduceMotion,
    reverse: reverseValue,
    hovered,
    focused,
  };

  function beginInteraction() {
    if (!hoveredRef.current && !focusedRef.current) {
      pausedBeforeInteraction.current = api.paused;
    }
  }

  function finishInteraction() {
    if (hoveredRef.current || focusedRef.current) {
      if (pauseOnInteraction) api.pause();
      return;
    }
    const wasPaused = pausedBeforeInteraction.current;
    pausedBeforeInteraction.current = false;
    if (pauseOnInteraction && wasPaused) api.pause();
  }

  function reveal(target: Element) {
    const root = rootRef.current;
    if (!root) return;
    const viewport = root.querySelector<HTMLElement>(
      '[data-slot="marquee-viewport"]',
    );
    const content = root.querySelector<HTMLElement>(
      '[data-slot="marquee-content"]',
    );
    if (!viewport || !content) return;
    const vertical = api.orientation === "vertical";
    const animation = content
      .getAnimations()
      .find(
        (entry) =>
          "animationName" in entry &&
          (entry.animationName === "marquee-scroll" ||
            entry.animationName === "marquee-scroll-y"),
      ) as CSSAnimation | undefined;
    if (!animation) return;
    const duration = Number(animation.effect?.getTiming().duration ?? 0);
    if (!Number.isFinite(duration) || duration <= 0) return;
    const size = vertical ? content.offsetHeight : content.offsetWidth;
    if (!size) return;
    const translate = getComputedStyle(root)
      .getPropertyValue("--marquee-translate")
      .trim();
    const distance = (translate.startsWith("-") ? -1 : 1) * size;
    const fade =
      2 *
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
    const view = viewport.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const shift = vertical
      ? box.top < view.top + fade
        ? view.top + fade - box.top
        : box.bottom > view.bottom - fade
          ? view.bottom - fade - box.bottom
          : 0
      : box.left < view.left + fade
        ? view.left + fade - box.left
        : box.right > view.right - fade
          ? view.right - fade - box.right
          : 0;
    if (!shift) return;
    const delta = ((reverseValue ? -1 : 1) * shift * duration) / distance;
    const current = Number(animation.currentTime ?? 0);
    animation.currentTime =
      (((current + delta) % duration) + duration) % duration;
  }

  return (
    <MarqueePartsContext.Provider value={context}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: The machine sets role="region" on the frame. */}
      <div
        {...props}
        {...restRootProps}
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-slot="marquee-frame"
        style={{ ...rootStyle, ...style }}
        className={cn("min-w-0", rootClassName, className)}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          beginInteraction();
          hoveredRef.current = true;
          setHovered(true);
          machineMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          hoveredRef.current = false;
          setHovered(false);
          machineMouseLeave?.(event);
          finishInteraction();
        }}
        onFocusCapture={(event) => {
          onFocusCapture?.(event);
          beginInteraction();
          focusedRef.current = true;
          setFocused(true);
          machineFocusCapture?.(event);
          reveal(event.target);
        }}
        onBlurCapture={(event) => {
          onBlurCapture?.(event);
          if (event.currentTarget.contains(event.relatedTarget)) return;
          focusedRef.current = false;
          setFocused(false);
          machineBlurCapture?.(event);
          finishInteraction();
        }}
      >
        {children}
      </div>
      {footer}
    </MarqueePartsContext.Provider>
  );
}

export interface MarqueeViewportProps extends ComponentProps<"div"> {}

export function MarqueeViewport({
  className,
  style,
  ...props
}: MarqueeViewportProps) {
  const { api } = useMarquee();
  const viewportProps = api.getViewportProps();
  return (
    <div
      {...props}
      {...viewportProps}
      data-slot="marquee-viewport"
      style={{ ...viewportProps.style, ...style }}
      className={cn("min-w-0", className)}
    />
  );
}

export function MarqueeContent({
  index,
  className,
  style,
  children,
  ...props
}: MarqueeContentProps) {
  const { api, animated, reverse } = useMarquee();
  const contentProps = api.getContentProps({ index });
  const clone = index > 0;
  const animationName = animated
    ? api.orientation === "vertical"
      ? "marquee-scroll-y"
      : "marquee-scroll"
    : "none";

  return (
    <div
      {...props}
      {...contentProps}
      aria-hidden={clone ? true : undefined}
      inert={clone ? true : undefined}
      data-slot="marquee-content"
      style={{
        ...contentProps.style,
        ...style,
        animationName,
        animationDuration: "var(--marquee-duration)",
        animationDelay: "var(--marquee-delay)",
        animationIterationCount: "var(--marquee-loop-count)",
        animationTimingFunction: "linear",
        animationDirection: reverse ? "reverse" : "normal",
        animationPlayState: animated && !api.paused ? "running" : "paused",
      }}
      className={cn(
        "flex shrink-0 items-center",
        !animated && "w-full flex-wrap",
        clone && "motion-reduce:hidden",
        clone && !animated && "hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface MarqueeItemProps extends ComponentProps<"div"> {}

export function MarqueeItem({ className, style, ...props }: MarqueeItemProps) {
  const { api } = useMarquee();
  const itemProps = api.getItemProps();
  return (
    <div
      {...props}
      {...itemProps}
      data-slot="marquee-item"
      style={{ ...itemProps.style, ...style }}
      className={cn("shrink-0", className)}
    />
  );
}

export function MarqueeEdge({
  side,
  className,
  style,
  ...props
}: MarqueeEdgeProps) {
  const { api } = useMarquee();
  const edgeProps = api.getEdgeProps({ side });
  return (
    <div
      {...props}
      {...edgeProps}
      aria-hidden="true"
      data-slot="marquee-edge"
      style={{ ...edgeProps.style, ...style }}
      className={cn(
        "z-10 w-10 bg-linear-to-r from-background to-transparent data-[side=end]:bg-linear-to-l data-[side=top]:h-10 data-[side=top]:w-full data-[side=top]:bg-linear-to-b data-[side=bottom]:h-10 data-[side=bottom]:w-full data-[side=bottom]:bg-linear-to-t",
        className,
      )}
    />
  );
}

export function MarqueePauseTrigger({
  className,
  children,
  onPress,
  ...props
}: MarqueePauseTriggerProps) {
  const { api, hovered, focused } = useMarquee();
  const paused = api.paused && !hovered && !focused;

  return (
    <Button
      size="xs"
      variant="minimal"
      {...props}
      data-slot="marquee-pause-trigger"
      className={className}
      onPress={(event) => {
        onPress?.(event);
        api.togglePause();
      }}
    >
      {children ?? (paused ? "Play motion" : "Pause motion")}
    </Button>
  );
}

function MarqueeItems({ children }: { children?: ReactNode }) {
  const { api, animated } = useMarquee();
  const count = animated ? api.contentCount : 1;
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <MarqueeContent
          // biome-ignore lint/suspicious/noArrayIndexKey: copies are identical and only change in count.
          key={index}
          index={index}
        >
          {Children.map(children, (child) => (
            <MarqueeItem>{child}</MarqueeItem>
          ))}
        </MarqueeContent>
      ))}
    </>
  );
}

export function Marquee({
  speed = 50,
  reverse = false,
  side,
  spacing,
  pauseOnInteraction = true,
  autoFill,
  className,
  style,
  children,
  dir,
  ref,
  ...props
}: MarqueeProps) {
  const isStatic = speed <= 0;
  const reduceMotion = useMediaQuery(reducedMotionQuery);
  const vertical = side === "top" || side === "bottom";
  const gapStyle = spacing
    ? ({ "--marquee-gap": spacing } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      dir={dir}
      data-slot="marquee"
      data-static={isStatic || undefined}
      style={{ ...gapStyle, ...style }}
      className={cn("grid min-w-0 gap-2 [--marquee-gap:1.5rem]", className)}
    >
      <MarqueeRoot
        {...props}
        dir={dir}
        side={side}
        speed={speed}
        reverse={reverse}
        spacing="var(--marquee-gap, 1.5rem)"
        autoFill={autoFill ?? (!isStatic && !reduceMotion)}
        pauseOnInteraction={pauseOnInteraction}
        className={cn(
          "-my-2 min-w-0 py-2",
          composedMask(!isStatic && !reduceMotion, vertical),
        )}
        footer={
          isStatic ? undefined : (
            <div className="flex justify-start motion-reduce:hidden">
              <MarqueePauseTrigger />
            </div>
          )
        }
      >
        <MarqueeViewport>
          <MarqueeItems>{children}</MarqueeItems>
        </MarqueeViewport>
      </MarqueeRoot>
    </div>
  );
}
