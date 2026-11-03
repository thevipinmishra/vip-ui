import { blockMetadata } from "@/lib/block-seo";
import { GettingStarted } from "./getting-started";

export const metadata = blockMetadata("checklist-01");

export default function ChecklistPage() {
  return <GettingStarted />;
}
