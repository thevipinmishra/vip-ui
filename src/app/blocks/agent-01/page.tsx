import { blockMetadata } from "@/lib/block-seo";
import { AgentRun } from "./agent-run";

export const metadata = blockMetadata("agent-01");

export default function AgentBlockPage() {
  return <AgentRun />;
}
