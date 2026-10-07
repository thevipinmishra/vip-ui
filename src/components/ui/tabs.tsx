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
import { cn } from "@/lib/utils";

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
          cn("min-w-0 w-full", className),
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
          "inline-flex min-w-0 max-w-full gap-1.5 overflow-x-auto overflow-y-hidden rounded-xl bg-muted p-1.5 shadow-[var(--shadow-inset)] ring-1 ring-border/70",
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
      render={
        props.render ??
        ((domProps, { isPressed, isDisabled }) =>
          props.href ? (
            <motion.a
              {...(domProps as HTMLMotionProps<"a">)}
              initial={false}
              animate={{ scale: isPressed && !isDisabled ? 0.96 : 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 36 }
              }
            />
          ) : (
            <motion.div
              {...(domProps as HTMLMotionProps<"div">)}
              initial={false}
              animate={{ scale: isPressed && !isDisabled ? 0.96 : 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 36 }
              }
            />
          ))
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "relative isolate min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground outline-none hover:bg-card/70 selected:hover:bg-transparent selected:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 sm:min-h-9",
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
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", duration: 0.28, bounce: 0 }
              }
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
          "mt-5 rounded-xl bg-card p-5 text-sm leading-6 text-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-none focus-visible:shadow-[inset_3px_0_0_var(--ring)] forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
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
