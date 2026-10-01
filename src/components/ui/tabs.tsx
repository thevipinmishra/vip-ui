"use client";

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
  return (
    <AriaTabs
      {...props}
      {...(defaultValue !== undefined && { defaultSelectedKey: defaultValue })}
      {...(value !== undefined && { selectedKey: value })}
      onSelectionChange={(key) => {
        props.onSelectionChange?.(key);
        onValueChange?.(String(key));
      }}
      data-slot="tabs"
      className={composeRenderProps(className, (className) =>
        cn("w-full", className),
      )}
    />
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
      className={composeRenderProps(className, (className) =>
        cn(
          "inline-flex max-w-full gap-1.5 overflow-x-auto rounded-xl bg-muted p-1.5 shadow-[var(--shadow-inset)] ring-1 ring-border/70",
          className,
        ),
      )}
    />
  );
}

export function Tab({ className, ...props }: AriaTabProps) {
  return (
    <AriaTab
      {...props}
      data-slot="tabs-trigger"
      className={composeRenderProps(className, (className) =>
        cn(
          "min-h-11 cursor-pointer whitespace-nowrap sm:min-h-9 rounded-lg px-4 py-2 text-[13px] font-medium text-muted-foreground outline-none hover:bg-card/70 selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] selected:ring-1 selected:ring-border/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-safe:transition-[background-color,color,box-shadow,scale] motion-safe:duration-150 motion-safe:active:scale-[0.96]",
          className,
        ),
      )}
    />
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
