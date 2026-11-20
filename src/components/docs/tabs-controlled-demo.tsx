"use client";

import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export function TabsControlledDemo() {
  const [value, setValue] = useState("details");

  return (
    <Tabs
      selectedKey={value}
      onSelectionChange={(key) => setValue(String(key))}
      className="w-full max-w-sm"
    >
      <TabList aria-label="Project">
        <Tab id="details">Details</Tab>
        <Tab id="activity">Activity</Tab>
      </TabList>
      <TabPanel id="details">Studio North is due October 18.</TabPanel>
      <TabPanel id="activity">Maya Chen updated the homepage draft.</TabPanel>
    </Tabs>
  );
}
