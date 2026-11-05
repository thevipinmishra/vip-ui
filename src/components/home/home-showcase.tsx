import { HomeReveal } from "@/components/docs/home-page-motion";
import { ChatCard, UploadCard } from "./assistant-cards";
import {
  CreateProjectCard,
  OrderCard,
  ProjectCard,
  SearchCard,
  ShortcutsCard,
  VisibilityCard,
} from "./component-preview";
import { InvoicesCard, RevenueCard } from "./data-cards";
import {
  FeedbackBlock,
  NotificationsBlock,
  TeamBlock,
  TimeOffBlock,
} from "./form-blocks";
import { ChecklistCard } from "./project-cards";

const columns = [
  {
    key: "one",
    cards: [
      { key: "visibility", node: <VisibilityCard /> },
      { key: "project", node: <ProjectCard /> },
      { key: "team", node: <TeamBlock /> },
      { key: "invoices", node: <InvoicesCard /> },
    ],
  },
  {
    key: "two",
    cards: [
      { key: "checklist", node: <ChecklistCard /> },
      { key: "search", node: <SearchCard /> },
      { key: "create-project", node: <CreateProjectCard /> },
      { key: "uploads", node: <UploadCard /> },
    ],
  },
  {
    key: "three",
    cards: [
      { key: "shortcuts", node: <ShortcutsCard /> },
      { key: "notifications", node: <NotificationsBlock /> },
      { key: "feedback", node: <FeedbackBlock /> },
      { key: "revenue", node: <RevenueCard /> },
    ],
  },
  {
    key: "four",
    cards: [
      { key: "order", node: <OrderCard /> },
      { key: "time-off", node: <TimeOffBlock /> },
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
