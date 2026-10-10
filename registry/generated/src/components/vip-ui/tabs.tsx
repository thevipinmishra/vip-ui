"use client";

import {
  type HTMLMotionProps,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useId } from "react";
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

export interface TabsProps extends AriaTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  className,
  defaultValue,
  value,
  onValueChange,
  ...props
}: TabsProps) {
  const groupId = useId();

  return (
    <LayoutGroup id={groupId}>
      <AriaTabs
        {...props}
        {...(defaultValue !== undefined && {
          defaultSelectedKey: defaultValue,
        })}
        {...(value !== undefined && { selectedKey: value })}
        onSelectionChange={(key) => {
          props.onSelectionChange?.(key);
          onValueChange?.(String(key));
        }}
        data-slot="tabs"
        className={composeRenderProps(className, (className) =>
          cn(
            "w-full min-w-0 data-[orientation=vertical]:flex data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-5 data-[orientation=vertical]:*:data-[slot=tabs-content]:mt-0 data-[orientation=vertical]:*:data-[slot=tabs-content]:flex-1",
            className,
          ),
        )}
      />
    </LayoutGroup>
  );
}

export function TabList({
  className,
  ...props
}: React.ComponentProps<typeof AriaTabList>) {
  return (
    <AriaTabList
      {...props}
      data-slot="tabs-list"
      render={
        props.render ??
        ((domProps) => (
          <motion.div {...(domProps as HTMLMotionProps<"div">)} layoutScroll />
        ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "group/tab-list inline-flex min-w-0 max-w-full items-center gap-1.5 overflow-x-auto overflow-y-hidden rounded-xl bg-muted p-1.5 shadow-[var(--shadow-inset)] ring-1 ring-border/70 forced-colors:border data-[orientation=vertical]:shrink-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:overflow-x-hidden data-[orientation=vertical]:overflow-y-auto",
          className,
        ),
      )}
    />
  );
}

export function Tab({ className, children, ...props }: AriaTabProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AriaTab
      {...props}
      data-slot="tabs-trigger"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative isolate inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium leading-5 text-muted-foreground outline-none transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-card/70 hover:text-foreground motion-safe:pressed:scale-[0.96] selected:text-foreground selected:hover:bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 group-data-[orientation=vertical]/tab-list:justify-start sm:min-h-9 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
              className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 forced-colors:border forced-colors:border-[Highlight]"
            />
          )}
          {content}
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
          "mt-5 min-w-0 rounded-xl bg-card p-5 text-sm leading-6 text-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-none [overflow-wrap:anywhere] focus-visible:shadow-[inset_3px_0_0_var(--ring)] forced-colors:border forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
          className,
        ),
      )}
    />
  );
}

export const TabsList = TabList;
export function TabsTrigger({
  value,
  ...props
}: Omit<AriaTabProps, "id"> & { id?: AriaTabProps["id"]; value?: string }) {
  return <Tab {...props} id={value ?? props.id} />;
}

export function TabsContent({
  value,
  ...props
}: Omit<AriaTabPanelProps, "id"> & {
  id?: AriaTabPanelProps["id"];
  value?: string;
}) {
  return <TabPanel {...props} id={value ?? props.id} />;
}
