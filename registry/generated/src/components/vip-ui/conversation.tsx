"use client";

import { ArrowDownIcon } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { offset } from "./motion";
import { cn } from "./utils";
import { AnimatedNumber } from "./animated-number";
import { Button, type ButtonProps } from "./button";
import { ConversationItemContext } from "./message";
import { Presence } from "./presence";
import { Spinner } from "./spinner";

interface ConversationContextValue {
  contentRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  label: string;
  isPinned: boolean;
  newCount: number;
  scrollToLatest: (behavior?: ScrollBehavior) => void;
  beginPrepend: () => void;
}

const ConversationContext = createContext<ConversationContextValue | null>(
  null,
);

function useConversationContext() {
  const context = useContext(ConversationContext);
  if (!context)
    throw new Error(
      "Conversation parts must render inside a Conversation. Use the parts as the children of Conversation.",
    );
  return context;
}

export interface ConversationHookValue {
  isPinned: boolean;
  newCount: number;
  scrollToLatest: (behavior?: ScrollBehavior) => void;
}

export function useConversation(): ConversationHookValue {
  const { isPinned, newCount, scrollToLatest } = useConversationContext();
  return { isPinned, newCount, scrollToLatest };
}

export interface ConversationProps extends ComponentProps<"div"> {
  initialScroll?: "bottom" | "top";
  threshold?: number;
}

export function Conversation({
  "aria-label": ariaLabel = "Conversation",
  children,
  className,
  initialScroll = "bottom",
  threshold = 24,
  ...props
}: ConversationProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(true);
  const [newCount, setNewCount] = useState(0);
  const pinnedRef = useRef(true);
  const countRef = useRef(0);
  const writtenTopRef = useRef<number | null>(null);
  const smoothRef = useRef(false);
  const smoothTimerRef = useRef<number | null>(null);
  const prependRef = useRef<{ top: number; height: number } | null>(null);
  const lastItemRef = useRef<Element | null>(null);
  const reducedMotion = useReducedMotion();

  const applyPinned = useCallback((next: boolean) => {
    if (pinnedRef.current === next) return;
    pinnedRef.current = next;
    setIsPinned(next);
  }, []);

  const applyCount = useCallback((next: number) => {
    if (countRef.current === next) return;
    countRef.current = next;
    setNewCount(next);
  }, []);

  const writeScroll = useCallback((top: number) => {
    const element = contentRef.current;
    if (!element) return;
    writtenTopRef.current = top;
    requestAnimationFrame(() => {
      if (writtenTopRef.current === top) writtenTopRef.current = null;
    });
    element.scrollTop = top;
  }, []);

  const writeBottom = useCallback(() => {
    const element = contentRef.current;
    if (!element) return;
    writeScroll(element.scrollHeight);
  }, [writeScroll]);

  const scrollToLatest = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const element = contentRef.current;
      if (!element) return;
      applyPinned(true);
      applyCount(0);
      const target = element.scrollHeight - element.clientHeight;
      if (
        behavior === "auto" ||
        reducedMotion ||
        target - element.scrollTop < 1
      ) {
        writeScroll(target);
        return;
      }
      smoothRef.current = true;
      if (smoothTimerRef.current !== null)
        window.clearTimeout(smoothTimerRef.current);
      smoothTimerRef.current = window.setTimeout(() => {
        smoothRef.current = false;
        smoothTimerRef.current = null;
        if (pinnedRef.current) writeBottom();
      }, 1200);
      element.scrollTo({ top: target, behavior: "smooth" });
    },
    [applyCount, applyPinned, reducedMotion, writeBottom, writeScroll],
  );

  const beginPrepend = useCallback(() => {
    const element = contentRef.current;
    if (!element) return;
    prependRef.current = {
      top: element.scrollTop,
      height: element.scrollHeight,
    };
  }, []);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    if (initialScroll === "top") {
      writeScroll(0);
      applyPinned(element.scrollHeight - element.clientHeight <= threshold);
      return;
    }
    writeBottom();
    applyPinned(true);
  }, [applyPinned, initialScroll, threshold, writeBottom, writeScroll]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const handleScroll = () => {
      const gap =
        element.scrollHeight - element.scrollTop - element.clientHeight;
      const written = writtenTopRef.current;
      writtenTopRef.current = null;
      if (written !== null && Math.abs(element.scrollTop - written) < 1) {
        if (gap <= threshold) {
          applyPinned(true);
          applyCount(0);
        }
        return;
      }
      if (smoothRef.current) {
        if (gap <= threshold) smoothRef.current = false;
        return;
      }
      if (gap <= threshold) {
        applyPinned(true);
        applyCount(0);
        return;
      }
      applyPinned(false);
    };
    const handleScrollEnd = () => {
      if (!smoothRef.current) return;
      smoothRef.current = false;
      if (pinnedRef.current) writeBottom();
    };
    element.addEventListener("scroll", handleScroll, { passive: true });
    element.addEventListener("scrollend", handleScrollEnd);
    return () => {
      element.removeEventListener("scroll", handleScroll);
      element.removeEventListener("scrollend", handleScrollEnd);
    };
  }, [applyCount, applyPinned, threshold, writeBottom]);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const handleResize = () => {
      if (!pinnedRef.current || smoothRef.current) return;
      writeBottom();
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(element);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [writeBottom]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let prependFrame = 0;
    const settlePrepend = () => {
      let attempts = 0;
      const step = () => {
        const pending = prependRef.current;
        const element = contentRef.current;
        if (!pending || !element) return;
        if (element.scrollHeight > pending.height + 1) {
          prependRef.current = null;
          writeScroll(pending.top + (element.scrollHeight - pending.height));
          return;
        }
        attempts += 1;
        if (attempts < 6) prependFrame = requestAnimationFrame(step);
        else prependRef.current = null;
      };
      cancelAnimationFrame(prependFrame);
      prependFrame = requestAnimationFrame(step);
    };
    const lastItem = () => {
      const items = list.querySelectorAll("[data-conversation-item]");
      return items.length > 0 ? items[items.length - 1] : null;
    };
    lastItemRef.current = lastItem();
    const observer = new MutationObserver((records) => {
      const hasAddedItems = records.some((record) =>
        Array.from(record.addedNodes).some(
          (node) =>
            node instanceof Element &&
            (node.matches("[data-conversation-item]") ||
              node.querySelector("[data-conversation-item]") != null),
        ),
      );
      if (prependRef.current && hasAddedItems) settlePrepend();
      const previous = lastItemRef.current;
      if (!pinnedRef.current) {
        let added = 0;
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (!(node instanceof Element)) continue;
            const items = node.matches("[data-conversation-item]")
              ? [node]
              : Array.from(node.querySelectorAll("[data-conversation-item]"));
            for (const item of items) {
              if (
                !previous?.isConnected ||
                previous.compareDocumentPosition(item) &
                  Node.DOCUMENT_POSITION_FOLLOWING
              )
                added += 1;
            }
          }
        }
        if (added > 0) applyCount(countRef.current + added);
      }
      lastItemRef.current = lastItem();
    });
    observer.observe(list, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(prependFrame);
      observer.disconnect();
    };
  }, [applyCount, writeScroll]);

  useEffect(
    () => () => {
      if (smoothTimerRef.current !== null)
        window.clearTimeout(smoothTimerRef.current);
    },
    [],
  );

  return (
    <ConversationContext
      value={{
        contentRef,
        listRef,
        label: ariaLabel,
        isPinned,
        newCount,
        scrollToLatest,
        beginPrepend,
      }}
    >
      <div
        {...props}
        data-slot="conversation"
        data-pinned={isPinned ? "true" : undefined}
        className={cn("relative flex min-h-0 flex-col", className)}
      >
        <ConversationItemContext value={true}>
          {children}
        </ConversationItemContext>
      </div>
    </ConversationContext>
  );
}

export type ConversationContentProps = ComponentProps<"div">;

export function ConversationContent({
  children,
  className,
  tabIndex,
  ...props
}: ConversationContentProps) {
  const { contentRef, listRef, label } = useConversationContext();
  return (
    <div
      {...props}
      ref={contentRef}
      data-slot="conversation-content"
      role="log"
      aria-live="off"
      aria-label={label}
      tabIndex={tabIndex ?? 0}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-transparent outline-offset-4 transition-[outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring focus-visible:-outline-offset-2 motion-reduce:outline-offset-2"
    >
      <div
        ref={listRef}
        data-slot="conversation-content-inner"
        className={cn(
          "[&:has([data-conversation-item])_[data-slot=conversation-empty]]:hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export type ConversationEmptyProps = ComponentProps<"div">;

export function ConversationEmpty({
  children,
  className,
  ...props
}: ConversationEmptyProps) {
  return (
    <div
      {...props}
      data-slot="conversation-empty"
      className={cn("grid place-items-center", className)}
    >
      {children}
    </div>
  );
}

export interface ConversationLoadOlderProps {
  onLoad: () => void | Promise<void>;
  hasMore: boolean;
  className?: string;
  children?: ReactNode;
}

export function ConversationLoadOlder({
  onLoad,
  hasMore,
  className,
  children,
}: ConversationLoadOlderProps) {
  const { contentRef, beginPrepend } = useConversationContext();
  const [isPending, setIsPending] = useState(false);
  const pendingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadRef = useRef(onLoad);

  useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  const load = useCallback(async () => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setIsPending(true);
    beginPrepend();
    await Promise.resolve(onLoadRef.current()).finally(() => {
      pendingRef.current = false;
      setIsPending(false);
    });
  }, [beginPrepend]);

  useEffect(() => {
    const root = contentRef.current;
    const target = sentinelRef.current;
    if (!hasMore || !root || !target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void load();
      },
      { root },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [contentRef, hasMore, load]);

  if (!hasMore) return null;

  return (
    <div
      ref={sentinelRef}
      data-slot="conversation-load-older"
      className={cn("flex justify-center", className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        isPending={isPending}
        onPress={() => void load()}
      >
        {isPending && <Spinner size="sm" decorative />}
        {children ??
          (isPending ? "Loading older messages" : "Load older messages")}
      </Button>
    </div>
  );
}

export interface ConversationJumpProps extends ButtonProps {
  children?: ReactNode;
}

export function ConversationJump({
  children,
  className,
  onPress,
  ...props
}: ConversationJumpProps) {
  const { contentRef, isPinned, newCount, scrollToLatest } =
    useConversationContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasPinned = useRef(isPinned);
  const label = typeof children === "string" ? children : "Jump to latest";

  useLayoutEffect(() => {
    if (isPinned && !wasPinned.current) {
      const active = document.activeElement;
      if (active instanceof Node && buttonRef.current?.contains(active))
        contentRef.current?.focus({ preventScroll: true });
    }
    wasPinned.current = isPinned;
  }, [contentRef, isPinned]);

  return (
    <Presence
      show={!isPinned}
      distance={offset.md}
      className="absolute inset-x-0 bottom-3 z-10 mx-auto w-fit"
    >
      <Button
        {...props}
        ref={buttonRef}
        data-slot="conversation-jump"
        variant="outline"
        size="sm"
        className={cn("rounded-full shadow-(--shadow-float)", className)}
        onPress={(event) => {
          onPress?.(event);
          scrollToLatest();
        }}
      >
        <ArrowDownIcon aria-hidden="true" />
        <span aria-hidden="true">{children ?? "Jump to latest"}</span>
        {newCount > 0 && (
          <span
            aria-hidden="true"
            data-slot="conversation-jump-count"
            className="min-w-5 rounded-full bg-accent px-1.5 text-center text-xs tabular-nums text-accent-foreground"
          >
            <AnimatedNumber value={newCount} />
          </span>
        )}
        <span className="sr-only">
          {newCount > 0
            ? `${label}, ${newCount} new ${newCount === 1 ? "message" : "messages"}`
            : label}
        </span>
      </Button>
    </Presence>
  );
}
