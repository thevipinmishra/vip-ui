"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const panelClass =
  "mt-2 bg-transparent p-0 text-xs text-muted-foreground shadow-none ring-0";

function ReportTabs({ size }: { size: "xs" | "sm" | "md" }) {
  return (
    <Tabs defaultValue="overview">
      <TabsList size={size} aria-label="Report">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className={panelClass}>
        Project overview.
      </TabsContent>
      <TabsContent value="usage" className={panelClass}>
        Usage details.
      </TabsContent>
      <TabsContent value="billing" className={panelClass}>
        Billing details.
      </TabsContent>
    </Tabs>
  );
}

export function TabsSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <ReportTabs size="xs" />
      <ReportTabs size="sm" />
      <ReportTabs size="md" />
    </div>
  );
}
