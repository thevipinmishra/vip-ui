import { HomeReveal } from "@/components/docs/home-page-motion";
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
  return (
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
  );
}
