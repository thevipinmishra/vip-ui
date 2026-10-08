"use client";

import { Activity, Layers, Users } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const updates = [
  {
    action: "Homepage review requested",
    author: "Maya Chen",
    time: "2 hours ago",
  },
  {
    action: "Mobile navigation approved",
    author: "Sam Rivera",
    time: "Yesterday",
  },
  { action: "Brand assets uploaded", author: "Jo Park", time: "Monday" },
];

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-lg">
      <TabsList aria-label="Studio North project">
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
      <TabsContent value="overview">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-semibold">Studio North</h4>
          <Badge variant="accent" dot>
            In progress
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Website refresh · Due October 18
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
          <div>
            <dt className="text-xs text-muted-foreground">Open tasks</dt>
            <dd className="mt-1 text-lg font-semibold">12</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Completed</dt>
            <dd className="mt-1 text-lg font-semibold">28</dd>
          </div>
        </dl>
      </TabsContent>
      <TabsContent value="activity">
        <h4 className="font-semibold">Recent activity</h4>
        <ul className="mt-3 divide-y divide-border">
          {updates.map((update) => (
            <li
              key={update.action}
              className="flex flex-wrap justify-between gap-x-4 py-2.5"
            >
              <div>
                <p className="font-medium">{update.action}</p>
                <p className="text-xs text-muted-foreground">{update.author}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {update.time}
              </span>
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="team">
        <h4 className="font-semibold">Project team</h4>
        <ul className="mt-3 divide-y divide-border">
          {[
            { name: "Maya Chen", role: "Project lead" },
            { name: "Sam Rivera", role: "Designer" },
            { name: "Jo Park", role: "Developer" },
          ].map((member) => (
            <li key={member.name} className="flex justify-between gap-4 py-2.5">
              <span className="font-medium">{member.name}</span>
              <span className="text-muted-foreground">{member.role}</span>
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="billing">
        Invoices are not available until the project is approved.
      </TabsContent>
    </Tabs>
  );
}
