"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export function TabsVerticalDemo() {
  return (
    <Tabs
      defaultSelectedKey="profile"
      orientation="vertical"
      className="w-full max-w-lg"
    >
      <TabList aria-label="Settings">
        <Tab id="profile">Profile</Tab>
        <Tab id="notifications">Notifications</Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanel id="profile">
        Your name and photo appear on shared projects.
      </TabPanel>
      <TabPanel id="notifications">
        Choose which updates reach your inbox.
      </TabPanel>
      <TabPanel id="security">
        Review your password and active sessions.
      </TabPanel>
    </Tabs>
  );
}
