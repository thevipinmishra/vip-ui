"use client";

import { PulseIcon, StackIcon, UsersIcon } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList aria-label="Project workspace">
        <TabsTrigger value="overview">
          <StackIcon aria-hidden="true" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity">
          <PulseIcon aria-hidden="true" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="team">
          <UsersIcon aria-hidden="true" />
          Team
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Three of five tasks are complete.
      </TabsContent>
      <TabsContent value="activity">
        Maya Chen updated the homepage draft.
      </TabsContent>
      <TabsContent value="team">Four people can edit this project.</TabsContent>
    </Tabs>
  );
}
