"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsVerticalDemo() {
  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="w-full max-w-lg"
    >
      <TabsList aria-label="Settings">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        Your name and photo appear on shared projects.
      </TabsContent>
      <TabsContent value="notifications">
        Choose which updates reach your inbox.
      </TabsContent>
      <TabsContent value="security">
        Review your password and active sessions.
      </TabsContent>
    </Tabs>
  );
}
