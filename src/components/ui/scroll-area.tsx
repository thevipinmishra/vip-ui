"use client";

import {
  mergeProps,
  normalizeProps,
  type PropTypes,
  useMachine,
} from "@zag-js/react";
import * as scrollArea from "@zag-js/scroll-area";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type Ref,
  type UIEventHandler,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

export type ScrollAreaDirection = "ltr" | "rtl";

export interface ScrollAreaApi extends scrollArea.Api<PropTypes> {
  /** The axes that scroll. The other axes clip their content. */
  readonly orientation: ScrollAreaOrientation;
  /** Whether the viewport scrolls on the horizontal axis. */
  readonly scrollsX: boolean;
  /** Whether the viewport scrolls on the vertical axis. */
  readonly scrollsY: boolean;
}

function preferredBehavior(behavior: ScrollBehavior | undefined) {
  if (behavior) return behavior;
  if (prefersReducedMotion()) return "auto" as const;
  return undefined;
}

const ScrollAreaPartsContext = createContext<ScrollAreaApi | null>(null);

export function useScrollArea(): ScrollAreaApi {
  const context = useContext(ScrollAreaPartsContext);
  if (!context)
    throw new Error(
      "useScrollArea must be used inside <ScrollAreaRoot> or <ScrollArea>.",
    );
  return context;
}

export interface ScrollAreaContextProps {
  children: (api: ScrollAreaApi) => ReactNode;
}

export function ScrollAreaContext({ children }: ScrollAreaContextProps) {
  const api = useScrollArea();
  return <>{children(api)}</>;
}

export interface ScrollAreaRootProps
  extends Omit<ComponentProps<"div">, "dir" | "id" | "role"> {
  /** The axes that scroll. Other axes clip their content. */
  orientation?: ScrollAreaOrientation;
  /** The text direction. By default, follows the document. */
  dir?: ScrollAreaDirection;
  id?: string;
  /** The ids of the scroll area elements. */
  ids?: scrollArea.ElementIds;
  /** A root node to resolve the document in custom environments. */
  getRootNode?: () => Node;
  ref?: Ref<HTMLDivElement>;
}

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export function ScrollAreaRoot({
  orientation = "vertical",
  dir,
  id,
  ids,
  getRootNode,
  className,
  style,
  children,
  ref,
  ...props
}: ScrollAreaRootProps) {
  const generatedId = useId();
  const rootId = id ?? `scroll-area-${stableId(generatedId)}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [detectedDir, setDetectedDir] = useState<ScrollAreaDirection>("ltr");

  useLayoutEffect(() => {
    if (dir) return;
    const node = rootRef.current;
    if (node) {
      setDetectedDir(
        getComputedStyle(node).direction === "rtl" ? "rtl" : "ltr",
      );
    }
  }, [dir]);

  const resolvedDir = dir ?? detectedDir;
  const vertical = orientation !== "horizontal";
  const horizontal = orientation !== "vertical";

  const service = useMachine(scrollArea.machine, {
    id: rootId,
    ids: {
      root: rootId,
      viewport: `${rootId}-viewport`,
      content: `${rootId}-content`,
      ...ids,
    },
    dir: resolvedDir,
    getRootNode,
  });
  const machineApi = scrollArea.connect(service, normalizeProps);

  const api: ScrollAreaApi = {
    ...machineApi,
    orientation,
    scrollsX: horizontal,
    scrollsY: vertical,
    getScrollProgress: () =>
      typeof document === "undefined"
        ? { x: 0, y: 0 }
        : machineApi.getScrollProgress(),
    getScrollbarState: (details) => machineApi.getScrollbarState(details),
    scrollTo: (details) =>
      machineApi.scrollTo({
        ...details,
        behavior: preferredBehavior(details.behavior),
      }),
    scrollToEdge: (details) =>
      machineApi.scrollToEdge({
        ...details,
        behavior: preferredBehavior(details.behavior),
      }),
  };

  const merged = mergeProps(machineApi.getRootProps(), props, {
    style,
    className: cn("relative min-h-0 min-w-0 overflow-hidden", className),
  });

  return (
    <ScrollAreaPartsContext value={api}>
      <div
        {...merged}
        ref={mergeRefs(rootRef, ref)}
        data-slot="scroll-area"
        data-orientation={orientation}
      >
        {children}
      </div>
    </ScrollAreaPartsContext>
  );
}

export interface ScrollAreaViewportProps
  extends Omit<ComponentProps<"section">, "role"> {
  ref?: Ref<HTMLElement>;
}

export function ScrollAreaViewport({
  className,
  style,
  tabIndex,
  ref,
  children,
  ...props
}: ScrollAreaViewportProps) {
  const api = useScrollArea();
  const { scrollsX, scrollsY } = api;
  const viewportProps = api.getViewportProps();
  const {
    role: viewportRole,
    tabIndex: machineTabIndex,
    ...viewportRest
  } = viewportProps;
  void viewportRole;

  const merged = mergeProps(viewportRest, props, {
    style: {
      ...viewportProps.style,
      overflowX: scrollsX ? "auto" : "hidden",
      overflowY: scrollsY ? "auto" : "hidden",
      ...style,
    },
    className: cn(
      "h-full w-full rounded-[inherit] outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring forced-colors:focus-visible:outline-[Highlight]",
      className,
    ),
  });

  return (
    <section
      {...merged}
      ref={ref}
      tabIndex={tabIndex ?? machineTabIndex}
      data-slot="scroll-area-viewport"
    >
      {children}
    </section>
  );
}

export function ScrollAreaContent({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
  const api = useScrollArea();
  const contentProps = api.getContentProps();
  const merged = mergeProps(contentProps, props, {
    style,
    className: cn("w-full", className),
  });

  return <div {...merged} data-slot="scroll-area-content" />;
}

export interface ScrollAreaScrollbarProps
  extends Omit<ComponentProps<"div">, "children"> {
  /** The orientation of the scrollbar. */
  orientation?: "vertical" | "horizontal";
  /** Optional content. Defaults to a thumb. */
  children?: ReactNode;
}

export function ScrollAreaScrollbar({
  orientation = "vertical",
  className,
  style,
  children,
  ...props
}: ScrollAreaScrollbarProps) {
  const api = useScrollArea();
  const isVertical = orientation === "vertical";
  const scrollbarProps = api.getScrollbarProps({ orientation });
  const merged = mergeProps(scrollbarProps, props, {
    style,
    className: cn(
      "pointer-events-none absolute z-10 flex touch-none rounded-full opacity-0 transition-opacity duration-150 ease-out-quint select-none motion-reduce:transition-none",
      isVertical
        ? "w-2.5 justify-center p-0.5 data-[overflow-y]:pointer-events-auto data-[overflow-y]:opacity-100"
        : "h-2.5 items-center p-0.5 data-[overflow-x]:pointer-events-auto data-[overflow-x]:opacity-100",
      className,
    ),
  });

  return (
    <div {...merged} data-slot="scroll-area-scrollbar">
      {children ?? <ScrollAreaThumb orientation={orientation} />}
    </div>
  );
}

export interface ScrollAreaThumbProps extends ComponentProps<"div"> {
  /** The orientation of the thumb. */
  orientation?: "vertical" | "horizontal";
}

export function ScrollAreaThumb({
  orientation = "vertical",
  className,
  style,
  ...props
}: ScrollAreaThumbProps) {
  const api = useScrollArea();
  const isVertical = orientation === "vertical";
  const thumbProps = api.getThumbProps({ orientation });
  const merged = mergeProps(thumbProps, props, {
    style,
    className: cn(
      "rounded-full bg-muted-foreground/40 transition-[background-color] duration-150 ease-out-quint hover:bg-muted-foreground/60 data-[dragging]:bg-muted-foreground/70 motion-reduce:transition-none forced-colors:bg-[CanvasText]",
      isVertical ? "w-full" : "h-full",
      className,
    ),
  });

  return <div {...merged} data-slot="scroll-area-thumb" />;
}

export function ScrollAreaCorner({
  className,
  style,
  ...props
}: ComponentProps<"div">) {
  const api = useScrollArea();
  const merged = mergeProps(api.getCornerProps(), props, {
    style,
    className,
  });

  return <div {...merged} data-slot="scroll-area-corner" />;
}

interface ScrollAreaBodyProps {
  children?: ReactNode;
  onScroll?: UIEventHandler<HTMLElement>;
  tabIndex?: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

function ScrollAreaBody({
  children,
  onScroll,
  tabIndex,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: ScrollAreaBodyProps) {
  const api = useScrollArea();
  const vertical = api.orientation !== "horizontal";
  const horizontal = api.orientation !== "vertical";
  const hasOverflow =
    (vertical && api.hasOverflowY) || (horizontal && api.hasOverflowX);

  return (
    <>
      <ScrollAreaViewport
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={tabIndex ?? (hasOverflow ? 0 : undefined)}
        onScroll={onScroll}
      >
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      {vertical && <ScrollAreaScrollbar orientation="vertical" />}
      {horizontal && <ScrollAreaScrollbar orientation="horizontal" />}
      {api.orientation === "both" && <ScrollAreaCorner />}
    </>
  );
}

export interface ScrollAreaProps
  extends Omit<ComponentProps<"div">, "dir" | "id" | "role" | "onScroll"> {
  /** The axes that scroll. Other axes clip their content. */
  orientation?: ScrollAreaOrientation;
  /** The text direction. By default, follows the document. */
  dir?: ScrollAreaDirection;
  id?: string;
  /** The ids of the scroll area elements. */
  ids?: scrollArea.ElementIds;
  /** A root node to resolve the document in custom environments. */
  getRootNode?: () => Node;
  onScroll?: UIEventHandler<HTMLElement>;
  ref?: Ref<HTMLDivElement>;
}

export function ScrollArea({
  orientation = "vertical",
  dir,
  id,
  ids,
  getRootNode,
  className,
  style,
  children,
  onScroll,
  tabIndex,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaRoot
      orientation={orientation}
      dir={dir}
      id={id}
      ids={ids}
      getRootNode={getRootNode}
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      <ScrollAreaBody
        onScroll={onScroll}
        tabIndex={tabIndex}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        ariaDescribedBy={ariaDescribedBy}
      >
        {children}
      </ScrollAreaBody>
    </ScrollAreaRoot>
  );
}
