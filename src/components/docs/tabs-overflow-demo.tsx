"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sections = [
  {
    value: "overview",
    label: "Overview",
    text: "Studio North has 12 open tasks.",
  },
  { value: "issues", label: "Issues", text: "Four issues need a review." },
  {
    value: "deployments",
    label: "Deployments",
    text: "The last deploy was 2 hours ago.",
  },
  {
    value: "analytics",
    label: "Analytics",
    text: "Visits went up 8% this week.",
  },
  {
    value: "members",
    label: "Members",
    text: "Six people can edit this project.",
  },
  {
    value: "settings",
    label: "Settings",
    text: "Only owners can change settings.",
  },
];

export function TabsOverflowDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList aria-label="Project">
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value}>
          {section.text}
        </TabsContent>
      ))}
    </Tabs>
  );
}
