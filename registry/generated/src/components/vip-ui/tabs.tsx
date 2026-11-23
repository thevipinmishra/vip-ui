"use client";

import {
  type HTMLMotionProps,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { type Ref, useCallback, useId, useState } from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  Tabs as AriaTabs,
  type TabsProps as AriaTabsProps,
  composeRenderProps,
} from "react-aria-components";
import { springLayout, transitionFor } from "./motion";
import { cn } from "./utils";
import { buttonLabel, touchTarget } from "./button-styles";
import { withItemHighlight } from "./item-highlight";
import { type Size, SizeProvider, useSize } from "./size";

const tabSizeStyles = {
  xs: "min-h-6 gap-1.5 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
  sm: "min-h-7 rounded-md px-2.5",
  md: "",
  lg: "min-h-10 px-4 text-base [&_svg:not([class*='size-'])]:size-5",
  xl: "min-h-12 gap-2.5 rounded-xl px-5 text-base [&_svg:not([class*='size-'])]:size-5",
} satisfies Record<Size, string>;

export interface TabsProps extends AriaTabsProps {}

export function Tabs({ className, ...props }: TabsProps) {
  const groupId = useId();

  return (
    <LayoutGroup id={groupId}>
      <AriaTabs
        {...props}
        data-slot="tabs"
        className={composeRenderProps(className, (className) =>
          cn(
            "w-full min-w-0 orientation-vertical:flex orientation-vertical:flex-wrap orientation-vertical:items-start orientation-vertical:gap-4 orientation-vertical:*:data-[slot=tabs-content]:mt-0 orientation-vertical:*:data-[slot=tabs-content]:grow orientation-vertical:*:data-[slot=tabs-content]:basis-48",
            className,
          ),
        )}
      />
    </LayoutGroup>
  );
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

function useScrollFade(forwardedRef?: Ref<HTMLDivElement>) {
  const [fade, setFade] = useState<"left" | "right" | "both">();
  const ref = useCallback(
    (element: HTMLDivElement | null) => {
      assignRef(forwardedRef, element);
      if (!element) return;
      const update = () => {
        const max = element.scrollWidth - element.clientWidth;
        const offset =
          getComputedStyle(element).direction === "rtl"
            ? max + element.scrollLeft
            : element.scrollLeft;
        const left = offset > 1;
        const right = offset < max - 1;
        setFade(
          left && right ? "both" : left ? "left" : right ? "right" : undefined,
        );
      };
      const resize = new ResizeObserver(update);
      // React 19 runs the cleanup this ref callback returns, so observers and
      // listeners are released when the element unmounts.
      // react-doctor-disable-next-line react-doctor/effect-needs-cleanup
      resize.observe(element);
      for (const child of Array.from(element.children)) resize.observe(child);
      update();
      const mutation = new MutationObserver(() => {
        resize.disconnect();
        resize.observe(element);
        for (const child of Array.from(element.children)) resize.observe(child);
        update();
      });
      mutation.observe(element, { childList: true });
      element.addEventListener("scroll", update, { passive: true });
      return () => {
        assignRef(forwardedRef, null);
        resize.disconnect();
        mutation.disconnect();
        element.removeEventListener("scroll", update);
      };
    },
    [forwardedRef],
  );
  return [fade, ref] as const;
}

export function TabList({
  className,
  ref,
  size: sizeProp,
  ...props
}: React.ComponentProps<typeof AriaTabList> & { size?: Size }) {
  const [fade, listRef] = useScrollFade(ref);
  const size = useSize(sizeProp);

  return (
    <SizeProvider size={size}>
      <AriaTabList
        {...props}
        ref={listRef}
        data-slot="tabs-list"
        data-size={size}
        data-fade={fade}
        render={withItemHighlight(
          props.render ??
            ((domProps) => (
              <motion.div
                {...(domProps as HTMLMotionProps<"div">)}
                layoutScroll
              />
            )),
          { placement: "under", items: "[role=tab]", className: "bg-card/70" },
        )}
        className={composeRenderProps(className, (className) =>
          cn(
            "group/tab-list inline-flex min-w-0 max-w-full scroll-px-1 items-center gap-1 overflow-x-auto overflow-y-hidden rounded-xl bg-muted p-1 shadow-(--shadow-inset) inset-ring inset-ring-border/70 scrollbar-none forced-colors:border data-[fade=both]:mask-x-from-[calc(100%-1.5rem)] data-[fade=left]:mask-l-from-[calc(100%-1.5rem)] data-[fade=right]:mask-r-from-[calc(100%-1.5rem)] orientation-vertical:shrink-0 orientation-vertical:flex-col orientation-vertical:items-stretch orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto data-[size=xl]:rounded-2xl data-[size=xs]:gap-0.5 data-[size=xs]:rounded-lg data-[size=xs]:p-0.5 data-[size=sm]:gap-0.5 data-[size=sm]:rounded-lg data-[size=sm]:p-0.5 [&::-webkit-scrollbar]:hidden",
            className,
          ),
        )}
      />
    </SizeProvider>
  );
}

export function Tab({
  className,
  children,
  size: sizeProp,
  ...props
}: AriaTabProps & { size?: Size }) {
  const reduceMotion = useReducedMotion();
  const size = useSize(sizeProp);

  return (
    <AriaTab
      {...props}
      data-slot="tabs-trigger"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "isolate inline-flex min-h-8 min-w-0 max-w-full shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 text-sm font-medium leading-5 text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-out-quint hover:text-foreground motion-safe:pressed:scale-[0.96] selected:text-foreground focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 group-orientation-vertical/tab-list:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          touchTarget,
          size && tabSizeStyles[size],
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {isSelected && (
            <motion.span
              layoutId="tabs-selection"
              initial={false}
              aria-hidden="true"
              transition={transitionFor(reduceMotion, springLayout)}
              className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-card shadow-(--shadow-card) ring-1 ring-border/70 forced-colors:border forced-colors:border-[Highlight]"
            />
          )}
          {buttonLabel(content)}
        </>
      ))}
    </AriaTab>
  );
}

export function TabPanel({ className, ...props }: AriaTabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      data-slot="tabs-content"
      className={composeRenderProps(className, (className) =>
        cn(
          "mt-3 min-w-0 rounded-xl bg-card p-4 text-sm leading-6 text-foreground shadow-(--shadow-card) ring-1 ring-border/70 outline-none wrap-anywhere focus-visible:shadow-[inset_3px_0_0_var(--ring),var(--shadow-card)] rtl:focus-visible:shadow-[inset_-3px_0_0_var(--ring),var(--shadow-card)] forced-colors:border forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
          className,
        ),
      )}
    />
  );
}
