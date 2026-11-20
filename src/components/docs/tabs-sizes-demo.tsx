"use client";

import type { Size } from "@/components/ui/size";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

const panelClass =
  "mt-2 bg-transparent p-0 text-xs text-muted-foreground shadow-none ring-0";

function ReportTabs({ size }: { size?: Size }) {
  return (
    <Tabs defaultSelectedKey="overview">
      <TabList size={size} aria-label="Report">
        <Tab id="overview">Overview</Tab>
        <Tab id="usage">Usage</Tab>
        <Tab id="billing">Billing</Tab>
      </TabList>
      <TabPanel id="overview" className={panelClass}>
        Project overview.
      </TabPanel>
      <TabPanel id="usage" className={panelClass}>
        Usage details.
      </TabPanel>
      <TabPanel id="billing" className={panelClass}>
        Billing details.
      </TabPanel>
    </Tabs>
  );
}

export function TabsSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ReportTabs size="xs" />
      <ReportTabs size="sm" />
      <ReportTabs />
      <ReportTabs size="lg" />
    </div>
  );
}
