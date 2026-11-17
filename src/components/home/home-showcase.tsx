import Link from "next/link";
import type { ReactNode } from "react";
import { ChatCard, UploadCard } from "@/components/home/assistant-cards";
import {
  AppearanceCard,
  CommandCard,
  CreateProjectCard,
  OrderCard,
  ProjectCard,
  ShareCard,
} from "@/components/home/component-preview";
import { InvoicesCard, RevenueCard } from "@/components/home/data-cards";
import { FeedbackBlock, TimeOffBlock } from "@/components/home/form-blocks";
import { ShowcaseAppearanceProvider } from "@/components/home/showcase-appearance";
import { ButtonLink } from "@/components/ui/button-link";
import { catalogComponents } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ShowcaseCard = {
  key: string;
  node: ReactNode;
  phone?: boolean;
};

const pairs: ShowcaseCard[][][] = [
  [
    [
      { key: "order", node: <OrderCard />, phone: true },
      { key: "uploads", node: <UploadCard /> },
      { key: "invoices", node: <InvoicesCard /> },
    ],
    [
      { key: "command", node: <CommandCard />, phone: true },
      { key: "create-project", node: <CreateProjectCard /> },
      { key: "time-off", node: <TimeOffBlock /> },
    ],
  ],
  [
    [
      { key: "appearance", node: <AppearanceCard />, phone: true },
      { key: "revenue", node: <RevenueCard />, phone: true },
      { key: "feedback", node: <FeedbackBlock /> },
    ],
    [
      { key: "project", node: <ProjectCard /> },
      { key: "share", node: <ShareCard />, phone: true },
      { key: "chat", node: <ChatCard />, phone: true },
    ],
  ],
];

export function HomeShowcase() {
  return (
    <ShowcaseAppearanceProvider className="data-reduce-motion:**:transition-none">
      <div data-slot="home-showcase" className="grid gap-5 md:grid-cols-2">
        {pairs.map((pair) => (
          <div
            key={pair[0][0].key}
            className="flex min-w-0 flex-col gap-5 xl:grid xl:grid-cols-2"
          >
            {pair.map((column) => (
              <div
                key={column[0].key}
                data-slot="home-showcase-column"
                className="flex min-w-0 flex-col gap-5 last:flex-1"
              >
                {column.map((card) => (
                  <div
                    key={card.key}
                    className={cn(
                      "grid min-w-0 last:flex-1",
                      !card.phone && "max-md:hidden",
                    )}
                  >
                    {card.node}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <ButtonLink as={Link} href="/components" variant="outline" size="md">
          Browse all {catalogComponents.length} components
        </ButtonLink>
      </div>
    </ShowcaseAppearanceProvider>
  );
}
