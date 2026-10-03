"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsBasicDemo() {
  return (
    <Tabs defaultValue="details" className="w-full max-w-sm">
      <TabsList aria-label="Project information">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Studio North · In progress</TabsContent>
      <TabsContent value="activity">Last updated today by Maya.</TabsContent>
    </Tabs>
  );
}
