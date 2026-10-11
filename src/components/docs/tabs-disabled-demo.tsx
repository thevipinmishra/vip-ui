"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDisabledDemo() {
  return (
    <Tabs defaultValue="plan" className="w-full max-w-sm">
      <TabsList aria-label="Billing">
        <TabsTrigger value="plan">Plan</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="tax" isDisabled>
          Tax
        </TabsTrigger>
      </TabsList>
      <TabsContent value="plan">You are on the Team plan.</TabsContent>
      <TabsContent value="invoices">
        Your last invoice was paid on October 1.
      </TabsContent>
      <TabsContent value="tax">Tax settings are not available yet.</TabsContent>
    </Tabs>
  );
}
