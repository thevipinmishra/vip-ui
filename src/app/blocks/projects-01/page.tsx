import { blockMetadata } from "@/lib/block-seo";
import { ProjectsPage } from "./projects-page";

export const metadata = blockMetadata("projects-01");

export default function ProjectsBlockPage() {
  return <ProjectsPage />;
}
