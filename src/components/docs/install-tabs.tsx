"use client";

import type { ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

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
    <Tabs defaultValue={cliAvailable ? "cli" : "manual"}>
      <TabList aria-label="Installation method">
        <Tab id="cli">CLI</Tab>
        <Tab id="manual">Manual</Tab>
      </TabList>
      <TabPanel
        id="cli"
        className="docs-tab-panel mt-5 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0"
      >
        {cli}
      </TabPanel>
      <TabPanel
        id="manual"
        className="docs-tab-panel mt-5 min-w-0 rounded-none bg-transparent p-0 shadow-none ring-0"
      >
        {custom}
      </TabPanel>
    </Tabs>
  );
}
