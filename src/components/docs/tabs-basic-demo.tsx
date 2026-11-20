"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export function TabsBasicDemo() {
  return (
    <Tabs defaultSelectedKey="details" className="w-full max-w-sm">
      <TabList aria-label="Project">
        <Tab id="details">Details</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="details">Studio North is due October 18.</TabPanel>
      <TabPanel id="activity">Recent changes and updates appear here.</TabPanel>
    </Tabs>
  );
}
