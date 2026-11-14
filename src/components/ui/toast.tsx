"use client";

import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import {
  type CSSProperties,
  createContext,
  type PointerEvent,
  type ReactElement,
  type TransitionEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  Button as AriaButton,
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as AriaToastContent,
  UNSTABLE_ToastRegion as AriaToastRegion,
  composeRenderProps,
  type QueuedToast,
  Text,
  type ToastOptions,
  UNSTABLE_ToastQueue as ToastQueue,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { buttonStyles, touchTarget } from "./button-styles";

const stackPeek = 10;
const stackGap = 8;
const exitFallback = 400;

export interface ToastMessage {
  title: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  action?: { label: string; onAction: () => void };
}

interface ToastLayout {
  index: number;
  offset: number;
  height: number;
  closing: boolean;
}

interface StackLayout {
  front: number;
  collapsed: number;
  expanded: number;
}

const restingLayout: ToastLayout = {
  index: 0,
  offset: 0,
  height: 0,
  closing: false,
};

function reuse<T extends object>(previous: T | undefined, next: T): T {
  if (!previous) return next;
  for (const field in next) {
    if (previous[field] !== next[field]) return next;
  }
  return previous;
}

class AnimatedToastQueue extends ToastQueue<ToastMessage> {
  private closing = new Map<string, ToastLayout>();
  private heights = new Map<string, number>();
  private listeners = new Set<() => void>();
  private layouts = new Map<string, ToastLayout>();
  private stackLayout: StackLayout = { front: 0, collapsed: 0, expanded: 0 };

  constructor(options?: ConstructorParameters<typeof ToastQueue>[0]) {
    super(options);
    this.subscribe(() => this.emit());
  }

  subscribeToLayout = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getStack = () => this.stackLayout;

  getLayout = (key: string) => this.layouts.get(key) ?? restingLayout;

  private emit() {
    const layouts = new Map<string, ToastLayout>();
    let offset = 0;
    let index = 0;
    for (const toast of this.visibleToasts) {
      if (this.closing.has(toast.key)) continue;
      const height = this.heights.get(toast.key) ?? 0;
      layouts.set(
        toast.key,
        reuse(this.layouts.get(toast.key), {
          index,
          offset,
          height,
          closing: false,
        }),
      );
      offset += height + stackGap;
      index++;
    }
    for (const [key, frozen] of this.closing) {
      layouts.set(key, reuse(this.layouts.get(key), frozen));
    }
    this.layouts = layouts;
    if (index > 0) {
      const front =
        [...layouts.values()].find(
          (layout) => layout.index === 0 && !layout.closing,
        )?.height ?? 0;
      this.stackLayout = reuse(this.stackLayout, {
        front,
        collapsed: front + (index - 1) * stackPeek,
        expanded: offset - stackGap,
      });
    }
    for (const listener of this.listeners) listener();
  }

  isClosing(key: string) {
    return this.closing.has(key);
  }

  setHeight(key: string, height: number) {
    if (this.heights.get(key) === height || this.closing.has(key)) return;
    this.heights.set(key, height);
    this.emit();
  }

  close(key: string) {
    if (this.closing.has(key)) return;
    if (!this.visibleToasts.some((toast) => toast.key === key)) {
      super.close(key);
      return;
    }
    this.closing.set(key, { ...this.getLayout(key), closing: true });
    this.emit();
    window.setTimeout(() => this.finishClose(key), exitFallback);
  }

  finishClose(key: string) {
    if (!this.closing.delete(key)) return;
    this.heights.delete(key);
    super.close(key);
  }

  finishAll() {
    for (const key of [...this.closing.keys()]) this.finishClose(key);
  }
}

export const toastQueue = new AnimatedToastQueue({ maxVisibleToasts: 3 });

export function showToast(message: ToastMessage, options?: ToastOptions) {
  const timeout = options?.timeout ?? (message.action ? 0 : 5000);
  return toastQueue.add(message, {
    ...options,
    timeout:
      timeout > 0 && Number.isFinite(timeout)
        ? Math.max(timeout, 5000)
        : undefined,
  });
}

function useToastStack() {
  return useSyncExternalStore(
    toastQueue.subscribeToLayout,
    toastQueue.getStack,
    toastQueue.getStack,
  );
}

function useToastLayout(key: string) {
  const getLayout = () => toastQueue.getLayout(key);
  return useSyncExternalStore(
    toastQueue.subscribeToLayout,
    getLayout,
    getLayout,
  );
}

const ToastKeyContext = createContext<string | null>(null);

type ToastRenderer = (props: {
  toast: QueuedToast<ToastMessage>;
}) => ReactElement;

export function ToastViewport({
  className,
  children = renderToast,
}: {
  className?: React.ComponentProps<typeof AriaToastRegion>["className"];
  children?: ToastRenderer;
}) {
  const stack = useToastStack();

  useEffect(() => () => toastQueue.finishAll(), []);

  return (
    <AriaToastRegion
      queue={toastQueue}
      data-slot="toast-viewport"
      aria-label="Notifications"
      style={
        {
          "--toast-front-height": `${stack.front}px`,
          height: `calc(${stack.collapsed}px * (1 - var(--toast-expanded)) + ${stack.expanded}px * var(--toast-expanded))`,
        } as CSSProperties
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-60 outline-none [--toast-expanded:0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-ring has-focus-visible:[--toast-expanded:1] data-hovered:[--toast-expanded:1] sm:inset-x-auto sm:inset-e-4 sm:w-96",
          className,
        ),
      )}
    >
      {children}
    </AriaToastRegion>
  );
}

function renderToast({ toast }: { toast: QueuedToast<ToastMessage> }) {
  const { title, description, variant, action } = toast.content;
  return (
    <Toast toast={toast}>
      <ToastIcon variant={variant} />
      <ToastContent>
        <ToastTitle>{title}</ToastTitle>
        {description && <ToastDescription>{description}</ToastDescription>}
      </ToastContent>
      {action && (
        <ToastAction onPress={action.onAction}>{action.label}</ToastAction>
      )}
      <ToastClose />
    </Toast>
  );
}

type ToastProps = Omit<
  React.ComponentProps<typeof AriaToast<ToastMessage>>,
  "style"
>;

interface Swipe {
  id: number;
  x: number;
  y: number;
  dx: number;
  velocity: number;
  time: number;
  active: boolean;
}

export function Toast({
  className,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onTransitionEnd,
  ...props
}: ToastProps) {
  const key = props.toast.key;
  const { index, offset, height, closing: isClosing } = useToastLayout(key);
  const shellRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<Swipe | null>(null);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const measure = () => toastQueue.setHeight(key, body.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    return () => observer.disconnect();
  }, [key]);

  const resetSwipe = (shell: HTMLElement) => {
    delete shell.dataset.swiping;
    shell.style.removeProperty("--toast-swipe");
    shell.style.removeProperty("--toast-swipe-fade");
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(event);
    if (event.button !== 0 || isClosing) return;
    if ((event.target as Element).closest("button, a, input, textarea")) return;
    swipe.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dx: 0,
      velocity: 0,
      time: event.timeStamp,
      active: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    const state = swipe.current;
    const shell = shellRef.current;
    if (!state || !shell || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.active) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        swipe.current = null;
        return;
      }
      state.active = true;
      shell.setPointerCapture(event.pointerId);
      shell.dataset.swiping = "";
      window.getSelection()?.removeAllRanges();
    }
    const elapsed = Math.max(event.timeStamp - state.time, 1);
    state.velocity = (dx - state.dx) / elapsed;
    state.dx = dx;
    state.time = event.timeStamp;
    const fade = Math.max(0, 1 - Math.abs(dx) / shell.offsetWidth);
    shell.style.setProperty("--toast-swipe", `${dx}px`);
    shell.style.setProperty("--toast-swipe-fade", String(fade));
  };

  const endSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const state = swipe.current;
    const shell = shellRef.current;
    swipe.current = null;
    if (!state?.active || !shell) return;
    const distance = Math.abs(state.dx);
    const flick =
      Math.abs(state.velocity) > 0.45 &&
      Math.sign(state.velocity) === Math.sign(state.dx);
    const dismiss =
      event.type === "pointerup" &&
      (distance > Math.min(96, shell.offsetWidth / 3) ||
        (flick && distance > 16));
    if (!dismiss) {
      resetSwipe(shell);
      return;
    }
    delete shell.dataset.swiping;
    shell.style.setProperty(
      "--toast-swipe",
      state.dx > 0 ? "calc(100% + 2rem)" : "calc(-100% - 2rem)",
    );
    toastQueue.close(key);
  };

  const shellStyle = {
    zIndex: isClosing ? 20 : 10 - index,
    "--toast-height": `${height}px`,
    "--toast-y": `calc(-1 * (${index * stackPeek}px * (1 - var(--toast-expanded)) + ${offset}px * var(--toast-expanded)))`,
    "--toast-scale": `calc(1 - ${index * 0.05} * (1 - var(--toast-expanded)))`,
    "--toast-ink": index === 0 ? 1 : "var(--toast-expanded)",
    height: height
      ? "calc(var(--toast-front-height) * (1 - var(--toast-expanded)) + var(--toast-height) * var(--toast-expanded))"
      : undefined,
  } as CSSProperties;

  return (
    <ToastKeyContext value={key}>
      <AriaToast
        {...props}
        ref={shellRef}
        data-slot="toast"
        data-closing={isClosing || undefined}
        style={shellStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          endSwipe(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          endSwipe(event);
        }}
        onTransitionEnd={(event: TransitionEvent<HTMLDivElement>) => {
          onTransitionEnd?.(event);
          if (
            event.target === event.currentTarget &&
            event.propertyName === "opacity" &&
            toastQueue.isClosing(key)
          ) {
            toastQueue.finishClose(key);
          }
        }}
        className={composeRenderProps(className, (className) =>
          cn(
            "group/toast absolute inset-x-0 bottom-0 origin-top touch-pan-y overflow-clip rounded-xl bg-popover text-popover-foreground opacity-(--toast-swipe-fade,1) shadow-(--shadow-float) ring-1 ring-border/70 outline-none transition-[translate,scale,height,opacity] duration-350 ease-spring scale-(--toast-scale) [translate:var(--toast-swipe,0px)_var(--toast-y)] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring starting:opacity-0 starting:[translate:0_100%] data-swiping:transition-none data-closing:pointer-events-none data-closing:opacity-0 data-closing:duration-200 data-closing:ease-out-quint data-closing:scale-[calc(var(--toast-scale)*0.96)] motion-reduce:transition-opacity motion-reduce:duration-200 motion-reduce:ease-out-quint forced-colors:border",
            className,
          ),
        )}
      >
        {(renderProps) => (
          <div
            ref={bodyRef}
            data-slot="toast-body"
            className="flex items-start gap-2.5 py-3 ps-3.5 pe-2.5 opacity-(--toast-ink) transition-opacity duration-200 ease-out-quint group-data-swiping/toast:transition-none"
          >
            {typeof children === "function" ? children(renderProps) : children}
          </div>
        )}
      </AriaToast>
    </ToastKeyContext>
  );
}

const toastIconStyles = tv({
  base: "grid size-5 shrink-0 place-items-center",
  variants: {
    variant: {
      info: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
    },
  },
  defaultVariants: { variant: "info" },
});

const toastIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: XCircleIcon,
};

export function ToastIcon({
  variant = "info",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & { variant?: ToastMessage["variant"] }) {
  const Icon = toastIcons[variant];
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="toast-icon"
      className={toastIconStyles({ variant, className })}
    >
      {children ?? <Icon size={20} weight="fill" />}
    </span>
  );
}

export function ToastContent({
  className,
  ...props
}: React.ComponentProps<typeof AriaToastContent>) {
  return (
    <AriaToastContent
      {...props}
      data-slot="toast-content"
      className={cn("min-w-0 flex-1", className)}
    />
  );
}

export function ToastTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="title"
      data-slot="toast-title"
      className={cn(
        "block text-sm leading-5 font-medium tracking-[-0.01em] wrap-anywhere",
        className,
      )}
    />
  );
}

export function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="toast-description"
      className={cn(
        "mt-0.5 block text-sm leading-5 text-muted-foreground wrap-anywhere",
        className,
      )}
    />
  );
}

export function ToastAction({
  className,
  onPress,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  const key = useContext(ToastKeyContext);
  return (
    <AriaButton
      {...props}
      data-slot="toast-action"
      onPress={(event) => {
        onPress?.(event);
        if (key) toastQueue.close(key);
      }}
      className={composeRenderProps(className, (className) =>
        buttonStyles({
          variant: "secondary",
          size: "xs",
          className: cn("-my-1 self-center", className),
        }),
      )}
    />
  );
}

export function ToastClose({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      {...props}
      slot="close"
      data-slot="toast-close"
      aria-label={props["aria-label"] ?? "Dismiss notification"}
      className={composeRenderProps(className, (className) =>
        cn(
          "-my-1.5 grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-out-quint hover:bg-muted hover:text-foreground pressed:bg-muted pressed:text-foreground motion-safe:pressed:scale-[0.96] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 [&_svg]:pointer-events-none",
          touchTarget,
          className,
        ),
      )}
    >
      {children ?? <XIcon size={16} aria-hidden="true" />}
    </AriaButton>
  );
}
