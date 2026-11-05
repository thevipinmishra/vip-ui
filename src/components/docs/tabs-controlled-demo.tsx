"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsControlledDemo() {
  const [value, setValue] = useState("details");

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full max-w-sm">
      <TabsList aria-label="Project">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Studio North is due October 18.</TabsContent>
      <TabsContent value="activity">
        Maya Chen updated the homepage draft.
      </TabsContent>
    </Tabs>
  );
}
