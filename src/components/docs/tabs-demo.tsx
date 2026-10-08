"use client";

import { Activity, Layers, Users } from "reicon-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList aria-label="Project workspace">
        <TabsTrigger value="overview">
          <Layers size={15} aria-hidden="true" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity">
          <Activity size={15} aria-hidden="true" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="team">
          <Users size={15} aria-hidden="true" />
          Team
        </TabsTrigger>
        <TabsTrigger value="billing" isDisabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel</TabsContent>
      <TabsContent value="activity">Activity panel</TabsContent>
      <TabsContent value="team">Team panel</TabsContent>
      <TabsContent value="billing">Billing is not available yet.</TabsContent>
    </Tabs>
  );
}
