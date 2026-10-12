"use client";

import { useEffect, useRef, useState } from "react";
import { HomeReveal } from "@/components/docs/home-page-motion";
import { Switch } from "@/components/ui/switch";
import { AppearanceControls } from "./appearance-controls";
import { ChatCard, DeployCard, UploadCard } from "./assistant-cards";
import { InvoicesCard, RevenueCard } from "./data-cards";
import {
  FeedbackBlock,
  NotificationsBlock,
  TeamBlock,
  TimeOffBlock,
} from "./form-blocks";
import { PlanCard } from "./plan-card";
import {
  ActivityCard,
  ChecklistCard,
  EditorCard,
  FilesCard,
} from "./project-cards";

export function HomeShowcase() {
  const [inspect, setInspect] = useState(false);
  const [count, setCount] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inspect) return;
    const parts = root.current?.querySelectorAll<HTMLElement>("[data-part]");
    setCount(
      new Set(Array.from(parts ?? [], (part) => part.dataset.part)).size,
    );
  }, [inspect]);

  return (
    <div
      ref={root}
      data-inspect={inspect ? "" : undefined}
      className="group/showcase grid min-w-0 gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div className="flex items-center gap-3">
          <Switch isSelected={inspect} onChange={setInspect}>
            Show components
          </Switch>
          <span
            aria-live="polite"
            className="text-xs tabular-nums text-muted-foreground"
          >
            {inspect ? `${count} components` : ""}
          </span>
        </div>
        <AppearanceControls />
      </div>
      <div className="grid min-w-0 items-start gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]">
        <HomeReveal className="grid min-w-0 gap-4">
          <ChatCard />
          <NotificationsBlock />
          <PlanCard />
          <FeedbackBlock />
        </HomeReveal>
        <HomeReveal className="grid min-w-0 gap-4" delay={0.06}>
          <RevenueCard />
          <InvoicesCard />
          <EditorCard />
          <TimeOffBlock />
          <ChecklistCard />
        </HomeReveal>
        <HomeReveal
          className="grid min-w-0 items-start gap-4 md:col-span-2 md:max-lg:grid-cols-2 lg:col-span-1"
          delay={0.12}
        >
          <DeployCard />
          <FilesCard />
          <UploadCard />
          <TeamBlock />
          <ActivityCard />
        </HomeReveal>
      </div>
    </div>
  );
}
