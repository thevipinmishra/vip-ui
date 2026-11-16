// biome-ignore-all lint/a11y/useSemanticElements: A window splitter needs focus and a value, which hr cannot take.

"use client";

import { DotsSixIcon, DotsSixVerticalIcon } from "@phosphor-icons/react";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import * as splitter from "@zag-js/splitter";
import {
  type ComponentProps,
  createContext,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "./utils";

export type ResizableOrientation = "horizontal" | "vertical";

export type ResizablePanelSize = splitter.PanelSize;

export type ResizablePanelResizeBehavior = splitter.PanelResizeBehavior;

export interface ResizableGroupProps
  extends Omit<ComponentProps<"div">, "dir" | "onChange" | "onResize"> {
  /** The orientation of the splitter. */
  orientation?: ResizableOrientation;
  /** The panel sizes in percent, controlled. */
  layout?: splitter.PanelSize[];
  /** The panel sizes in percent at first, uncontrolled. */
  defaultLayout?: splitter.PanelSize[];
  /** Called with the panel sizes while the panels resize. */
  onLayoutChange?: (layout: number[]) => void;
  /** Called with the panel sizes when a resize ends. */
  onLayoutEnd?: (layout: number[]) => void;
  /** Called when a resize gesture starts. */
  onResizeStart?: () => void;
  /** The number of pixels to resize by with the keyboard. */
  keyboardResizeBy?: number | null;
  /** The nonce for the injected cursor stylesheet. */
  nonce?: string;
  /** Called when a panel collapses. */
  onCollapse?: (details: splitter.ExpandCollapseDetails) => void;
  /** Called when a panel expands. */
  onExpand?: (details: splitter.ExpandCollapseDetails) => void;
  /** A shared registry for intersection dragging. */
  registry?: splitter.SplitterRegistry;
  /** The text direction. */
  dir?: "ltr" | "rtl";
  /** The ids of the splitter elements. */
  ids?: splitter.ElementIds;
  /** A root node to resolve the document in custom environments. */
  getRootNode?: () => Node;
}

export interface ResizablePanelProps extends Omit<ComponentProps<"div">, "id"> {
  /** The panel id. Also used as the panel order key. */
  id?: string;
  /** The order of the panel when panels render conditionally. */
  order?: number;
  /** The initial size of the panel. */
  defaultSize?: splitter.PanelSize;
  /** The minimum size of the panel. */
  minSize?: splitter.PanelSize;
  /** The maximum size of the panel. */
  maxSize?: splitter.PanelSize;
  /** Whether the panel can collapse. */
  collapsible?: boolean;
  /** The size of the panel when collapsed. */
  collapsedSize?: splitter.PanelSize;
  /** How the panel behaves when the group resizes. */
  resizeBehavior?: splitter.PanelResizeBehavior;
  ref?: Ref<HTMLDivElement>;
}

export interface ResizableHandleProps
  extends Omit<ComponentProps<"div">, "role" | "children"> {
  /** Render the grip icon in the center of the handle. */
  withGrip?: boolean;
  /** Stops resizing with this handle. */
  isDisabled?: boolean;
  /** Optional content rendered inside the handle. */
  children?: ReactNode;
  "aria-label"?: string;
  ref?: Ref<HTMLDivElement>;
}

export interface ResizableHandleIndicatorProps extends ComponentProps<"div"> {
  /** The trigger id. Defaults to the id from the enclosing handle. */
  triggerId?: splitter.ResizeTriggerId;
}

interface PanelConfig {
  key: string;
  order?: number;
  defaultSize?: splitter.PanelSize;
  minSize: splitter.PanelSize;
  maxSize: splitter.PanelSize;
  collapsible: boolean;
  collapsedSize: splitter.PanelSize;
  resizeBehavior?: splitter.PanelResizeBehavior;
}

interface ResizableContextValue {
  api: splitter.Api;
  orientation: ResizableOrientation;
  panels: PanelConfig[];
  handles: string[];
  registerPanel: (key: string, config: PanelConfig) => void;
  unregisterPanel: (key: string) => void;
  registerHandle: (key: string) => void;
  unregisterHandle: (key: string) => void;
}

interface ResizableHandleContextValue {
  id: splitter.ResizeTriggerId;
  disabled: boolean;
}

const ResizablePartsContext = createContext<ResizableContextValue | null>(null);

const ResizableHandleContext =
  createContext<ResizableHandleContextValue | null>(null);

export function useResizable(): ResizableContextValue {
  const context = useContext(ResizablePartsContext);
  if (!context)
    throw new Error("useResizable must be used inside a <ResizableGroup>.");
  return context;
}

export interface ResizableContextProps {
  children: (api: splitter.Api) => ReactNode;
}

export function ResizableContext({ children }: ResizableContextProps) {
  const { api } = useResizable();
  return <>{children(api)}</>;
}

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

function numericPanelSize(value: splitter.PanelSize | undefined) {
  if (value == null) return undefined;
  const numeric = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function comparePanels(a: PanelConfig, b: PanelConfig) {
  if (a.order == null && b.order == null) return 0;
  if (a.order == null) return -1;
  if (b.order == null) return 1;
  return a.order - b.order;
}

export function ResizableGroup({
  orientation = "horizontal",
  layout,
  defaultLayout,
  onLayoutChange,
  onLayoutEnd,
  onResizeStart,
  keyboardResizeBy,
  nonce,
  onCollapse,
  onExpand,
  registry,
  dir,
  ids,
  getRootNode,
  className,
  style,
  children,
  ...props
}: ResizableGroupProps) {
  const id = `resizable-${stableId(useId())}`;
  const [registeredPanels, setRegisteredPanels] = useState<
    { key: string; config: PanelConfig }[]
  >([]);
  const [handles, setHandles] = useState<string[]>([]);

  const panels = useMemo(
    () => registeredPanels.map((panel) => panel.config).sort(comparePanels),
    [registeredPanels],
  );

  const panelData = useMemo<splitter.PanelData[]>(
    () =>
      panels.map((panel) => ({
        id: panel.key,
        order: panel.order,
        minSize: panel.minSize,
        maxSize: panel.maxSize,
        collapsible: panel.collapsible,
        collapsedSize: panel.collapsedSize,
        resizeBehavior: panel.resizeBehavior,
      })),
    [panels],
  );

  const initialSize = useMemo<splitter.PanelSize[] | undefined>(() => {
    if (defaultLayout && defaultLayout.length === panels.length)
      return defaultLayout;
    if (!panels.some((panel) => panel.defaultSize != null)) return undefined;
    return panels.map((panel) => panel.defaultSize) as splitter.PanelSize[];
  }, [defaultLayout, panels]);

  const controlledSize =
    layout && layout.length === panels.length ? layout : undefined;

  const machineIds = useMemo<splitter.ElementIds>(
    () => ({
      panel: (panelId) => String(panelId),
      ...ids,
    }),
    [ids],
  );

  const service = useMachine(splitter.machine, {
    id,
    ids: machineIds,
    orientation,
    panels: panelData,
    size: controlledSize,
    defaultSize: initialSize,
    onResize: (details) => onLayoutChange?.(details.size),
    onResizeStart,
    onResizeEnd: (details) => onLayoutEnd?.(details.size),
    keyboardResizeBy,
    nonce,
    onCollapse,
    onExpand,
    registry,
    dir,
    getRootNode,
  });
  const api = splitter.connect(service, normalizeProps);

  const registerPanel = useCallback((key: string, config: PanelConfig) => {
    setRegisteredPanels((current) => {
      const index = current.findIndex((panel) => panel.key === key);
      if (index === -1) return [...current, { key, config }];
      if (current[index].config === config) return current;
      const next = current.slice();
      next[index] = { key, config };
      return next;
    });
  }, []);
  const unregisterPanel = useCallback((key: string) => {
    setRegisteredPanels((current) =>
      current.filter((panel) => panel.key !== key),
    );
  }, []);
  const registerHandle = useCallback((key: string) => {
    setHandles((current) =>
      current.includes(key) ? current : [...current, key],
    );
  }, []);
  const unregisterHandle = useCallback((key: string) => {
    setHandles((current) => current.filter((handle) => handle !== key));
  }, []);

  const value: ResizableContextValue = {
    api,
    orientation,
    panels,
    handles,
    registerPanel,
    unregisterPanel,
    registerHandle,
    unregisterHandle,
  };

  const rootProps = api.getRootProps();
  // Zag sets `height: 100%` on the root. Inline styles beat height classes, so a
  // `h-80` on the group would collapse to its content. Keep the width default
  // and let the group take its height from the caller.
  const rootStyle = { ...(rootProps.style ?? {}) };
  delete rootStyle.height;

  const merged = mergeProps(rootProps, props, {
    style: { ...rootStyle, ...style, height: style?.height },
    className: cn("group/resizable min-h-0 min-w-0 w-full", className),
  });

  return (
    <ResizablePartsContext value={value}>
      <div {...merged} data-slot="resizable" data-orientation={orientation}>
        {children}
      </div>
    </ResizablePartsContext>
  );
}

export function ResizablePanel({
  id,
  order,
  defaultSize,
  minSize = 10,
  maxSize = 100,
  collapsible = false,
  collapsedSize = 0,
  resizeBehavior,
  className,
  style,
  children,
  ref,
  ...props
}: ResizablePanelProps) {
  const generated = useId();
  const key = stableId(id ?? generated) || stableId(generated);
  const group = useContext(ResizablePartsContext);

  const config = useMemo<PanelConfig>(
    () => ({
      key,
      order,
      defaultSize,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      resizeBehavior,
    }),
    [
      key,
      order,
      defaultSize,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      resizeBehavior,
    ],
  );
  const configRef = useRef(config);
  const registerPanel = group?.registerPanel;
  const unregisterPanel = group?.unregisterPanel;

  useLayoutEffect(() => {
    configRef.current = config;
  }, [config]);

  useLayoutEffect(() => {
    if (!registerPanel || !unregisterPanel) return;
    registerPanel(key, configRef.current);
    return () => unregisterPanel(key);
  }, [key, registerPanel, unregisterPanel]);

  useEffect(() => {
    registerPanel?.(key, config);
  }, [key, config, registerPanel]);

  if (!group) return null;

  const index = group.panels.findIndex((panel) => panel.key === key);
  const size = index >= 0 ? group.api.getSizes()[index] : undefined;
  const collapsedTarget = numericPanelSize(collapsedSize);
  const collapsed = Boolean(
    collapsible &&
      size != null &&
      collapsedTarget != null &&
      Math.abs(size - collapsedTarget) < 0.01,
  );

  const panelProps = group.api.getPanelProps({ id: key });
  const merged = mergeProps(panelProps, props, {
    style,
    className: cn(
      "min-w-0",
      group.orientation === "vertical" && "min-h-0",
      className,
    ),
  });

  return (
    <div
      {...merged}
      ref={ref}
      data-slot="resizable-panel"
      data-collapsed={collapsed || undefined}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({
  withGrip = false,
  isDisabled: disabled = false,
  className,
  style,
  onDoubleClick,
  children,
  ref,
  ...props
}: ResizableHandleProps) {
  const key = useId();
  const group = useContext(ResizablePartsContext);
  const registerHandle = group?.registerHandle;
  const unregisterHandle = group?.unregisterHandle;

  useLayoutEffect(() => {
    if (!registerHandle || !unregisterHandle) return;
    registerHandle(key);
    return () => unregisterHandle(key);
  }, [key, registerHandle, unregisterHandle]);

  const index = group?.handles.indexOf(key) ?? -1;
  const before = group && index >= 0 ? group.panels[index] : undefined;
  const after = group && index >= 0 ? group.panels[index + 1] : undefined;

  if (!group || !before || !after) return null;

  const horizontal = group.api.orientation === "horizontal";
  const triggerId = `${before.key}:${after.key}` as splitter.ResizeTriggerId;
  const triggerProps = group.api.getResizeTriggerProps({
    id: triggerId,
    disabled,
  });
  const collapsedMin = before.collapsible
    ? numericPanelSize(before.collapsedSize)
    : undefined;

  const handleDoubleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    onDoubleClick?.(event);
    if (!event.defaultPrevented && !disabled) group.api.resetSizes();
  };

  const merged = mergeProps(triggerProps, props, {
    role: "separator",
    "aria-label": props["aria-label"] ?? "Resize panels",
    "aria-valuemin":
      collapsedMin != null ? Math.round(collapsedMin) : undefined,
    style,
    onDoubleClick: handleDoubleClick,
    className: cn(
      "group/handle relative z-10 flex shrink-0 touch-none items-center justify-center bg-border outline-transparent outline-offset-4 transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 forced-colors:bg-[ButtonBorder]",
      "after:pointer-events-none after:absolute after:rounded-full after:bg-ring/60 after:opacity-0 after:transition-[opacity] after:duration-150 after:delay-0 after:ease-out-quint hover:after:opacity-100 hover:after:delay-150 focus-visible:after:opacity-100 data-[dragging]:after:opacity-100 data-[dragging]:after:delay-0 forced-colors:after:bg-[Highlight]",
      horizontal
        ? "w-px cursor-col-resize before:absolute before:inset-y-0 before:-inset-x-[3.5px] after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2"
        : "h-px cursor-row-resize before:absolute before:inset-x-0 before:-inset-y-[3.5px] after:inset-x-0 after:top-1/2 after:h-0.5 after:-translate-y-1/2",
      className,
    ),
  });

  return (
    <ResizableHandleContext value={{ id: triggerId, disabled }}>
      <div {...merged} ref={ref} data-slot="resizable-handle">
        {withGrip && (
          <span
            aria-hidden="true"
            data-slot="resizable-grip"
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-border text-muted-foreground forced-colors:bg-[ButtonFace]",
              horizontal ? "h-6 w-3" : "h-3 w-6",
            )}
          >
            {horizontal ? (
              <DotsSixVerticalIcon size={10} aria-hidden="true" />
            ) : (
              <DotsSixIcon size={10} aria-hidden="true" />
            )}
          </span>
        )}
        {children}
      </div>
    </ResizableHandleContext>
  );
}

export function ResizableHandleIndicator({
  triggerId,
  className,
  ...props
}: ResizableHandleIndicatorProps) {
  const handle = useContext(ResizableHandleContext);
  const group = useContext(ResizablePartsContext);
  const id = triggerId ?? handle?.id;

  if (!group || !id)
    throw new Error(
      "ResizableHandleIndicator must be used inside <ResizableHandle> or receive a triggerId.",
    );

  const indicatorProps = group.api.getResizeTriggerIndicator({
    id,
    disabled: handle?.disabled,
  });
  const horizontal = group.api.orientation === "horizontal";
  const merged = mergeProps(indicatorProps, props, {
    "aria-hidden": true,
    className: cn(
      "pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/40 opacity-0 transition-opacity duration-150 ease-out-quint group-hover/handle:opacity-100 data-[dragging]:opacity-100 data-[focus]:opacity-100 motion-reduce:transition-none forced-colors:bg-[CanvasText]",
      horizontal ? "h-6 w-1" : "h-1 w-6",
      className,
    ),
  });

  return <div {...merged} data-slot="resizable-handle-indicator" />;
}
