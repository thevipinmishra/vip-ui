import { HomeReveal } from "@/components/docs/home-page-motion";
import { AccountBlock, FeedbackBlock, TimeOffBlock } from "./form-blocks";
import { HomeWindow } from "./home-window";

export function HomeShowcase() {
  return (
    <HomeReveal className="min-w-0">
      <HomeWindow />
    </HomeReveal>
  );
}

export function HomeBlocks() {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <HomeReveal className="grid min-w-0">
        <AccountBlock />
      </HomeReveal>
      <HomeReveal className="grid min-w-0" delay={0.06}>
        <TimeOffBlock />
      </HomeReveal>
      <HomeReveal
        className="grid min-w-0 md:col-span-2 xl:col-span-1"
        delay={0.12}
      >
        <FeedbackBlock />
      </HomeReveal>
    </div>
  );
}
