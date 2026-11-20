"use client";

import { PulseIcon, StackIcon, UsersIcon } from "@phosphor-icons/react";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultSelectedKey="overview" className="w-full max-w-lg">
      <TabList aria-label="Project workspace">
        <Tab id="overview">
          <StackIcon aria-hidden="true" />
          Overview
        </Tab>
        <Tab id="activity">
          <PulseIcon aria-hidden="true" />
          Activity
        </Tab>
        <Tab id="team">
          <UsersIcon aria-hidden="true" />
          Team
        </Tab>
      </TabList>
      <TabPanel id="overview">Three of five tasks are complete.</TabPanel>
      <TabPanel id="activity">Maya Chen updated the homepage draft.</TabPanel>
      <TabPanel id="team">Four people can edit this project.</TabPanel>
    </Tabs>
  );
}
