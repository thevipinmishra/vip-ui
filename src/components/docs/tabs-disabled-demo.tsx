"use client";

import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";

export function TabsDisabledDemo() {
  return (
    <Tabs defaultSelectedKey="plan" className="w-full max-w-sm">
      <TabList aria-label="Billing">
        <Tab id="plan">Plan</Tab>
        <Tab id="invoices">Invoices</Tab>
        <Tab id="tax" isDisabled>
          Tax
        </Tab>
      </TabList>
      <TabPanel id="plan">You are on the Team plan.</TabPanel>
      <TabPanel id="invoices">
        Your last invoice was paid on October 1.
      </TabPanel>
      <TabPanel id="tax">Tax settings are not available yet.</TabPanel>
    </Tabs>
  );
}
