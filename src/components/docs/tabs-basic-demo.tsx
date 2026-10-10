"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsBasicDemo() {
  return (
    <Tabs defaultValue="details" className="w-full max-w-sm">
      <TabsList aria-label="Project">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Studio North is due October 18.</TabsContent>
      <TabsContent value="activity">
        Recent changes and updates appear here.
      </TabsContent>
    </Tabs>
  );
}
