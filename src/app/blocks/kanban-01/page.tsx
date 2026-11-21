import { blockMetadata } from "@/lib/block-seo";
import { ProjectBoard } from "./project-board";

export const metadata = blockMetadata("kanban-01");

export default function KanbanBlockPage() {
  return <ProjectBoard />;
}
