"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsBasicDemo() {
  return (
    <Tabs defaultValue="details" className="w-full max-w-sm">
      <TabsList aria-label="Panel content">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Details panel</TabsContent>
      <TabsContent value="activity">Activity panel</TabsContent>
    </Tabs>
  );
}
