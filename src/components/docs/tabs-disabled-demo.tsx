"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDisabledDemo() {
  return (
    <Tabs defaultValue="overview" className="max-w-md">
      <TabsList aria-label="Report views">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history" isDisabled>
          History
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Your report at a glance.</TabsContent>
      <TabsContent value="details">
        A breakdown of the latest results.
      </TabsContent>
      <TabsContent value="history">
        Historical data is not available.
      </TabsContent>
    </Tabs>
  );
}
