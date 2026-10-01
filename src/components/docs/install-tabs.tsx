"use client";

import type { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-aria-components";

export function InstallTabs({
  cli,
  custom,
  cliAvailable,
}: {
  cli: ReactNode;
  custom: ReactNode;
  cliAvailable: boolean;
}) {
  return (
    <Tabs
      defaultSelectedKey={cliAvailable ? "cli" : "custom"}
      className="min-w-0"
    >
      <TabList
        aria-label="Installation method"
        className="mb-5 inline-flex gap-1 rounded-lg bg-muted/70 p-1 ring-1 ring-border/60"
      >
        <Tab
          id="cli"
          className="inline-flex min-h-10 cursor-pointer items-center rounded-md px-4 text-sm font-medium text-muted-foreground outline-none hover:bg-card/70 selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          CLI
        </Tab>
        <Tab
          id="custom"
          className="inline-flex min-h-10 cursor-pointer items-center rounded-md px-4 text-sm font-medium text-muted-foreground outline-none hover:bg-card/70 selected:bg-card selected:text-foreground selected:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          Custom
        </Tab>
      </TabList>
      <TabPanel id="cli" className="docs-tab-panel min-w-0 outline-none">
        {cli}
      </TabPanel>
      <TabPanel id="custom" className="docs-tab-panel min-w-0 outline-none">
        {custom}
      </TabPanel>
    </Tabs>
  );
}
