import { HomeReveal } from "@/components/docs/home-page-motion";
import { ChatCard, UploadCard } from "./assistant-cards";
import {
  AppearanceCard,
  CommandCard,
  CreateProjectCard,
  OrderCard,
  ProjectCard,
  ShareCard,
} from "./component-preview";
import { InvoicesCard, RevenueCard } from "./data-cards";
import { FeedbackBlock, TimeOffBlock } from "./form-blocks";

const columns = [
  {
    key: "one",
    cards: [
      { key: "order", node: <OrderCard /> },
      { key: "uploads", node: <UploadCard /> },
      { key: "invoices", node: <InvoicesCard /> },
    ],
  },
  {
    key: "two",
    cards: [
      { key: "command", node: <CommandCard /> },
      { key: "create-project", node: <CreateProjectCard /> },
      { key: "time-off", node: <TimeOffBlock /> },
    ],
  },
  {
    key: "three",
    cards: [
      { key: "appearance", node: <AppearanceCard /> },
      { key: "revenue", node: <RevenueCard /> },
      { key: "feedback", node: <FeedbackBlock /> },
    ],
  },
  {
    key: "four",
    cards: [
      { key: "project", node: <ProjectCard /> },
      { key: "share", node: <ShareCard /> },
      { key: "chat", node: <ChatCard /> },
    ],
  },
];

export function HomeShowcase() {
  return (
    <div
      data-slot="home-showcase"
      className="columns-1 gap-6 md:columns-2 xl:grid xl:grid-cols-4 xl:items-start"
    >
      {columns.map((column) => (
        <div
          key={column.key}
          data-slot="home-showcase-column"
          className="contents xl:grid xl:min-w-0 xl:content-start xl:gap-6"
        >
          {column.cards.map((card) => (
            <HomeReveal
              key={card.key}
              className="mb-6 break-inside-avoid xl:mb-0"
            >
              {card.node}
            </HomeReveal>
          ))}
        </div>
      ))}
    </div>
  );
}
