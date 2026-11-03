import { AgentRun } from "./agent-run";

export const metadata = {
  title: "Agent run",
  description: "Live agent run with tool calls, progress, and a stop action.",
};

export default function AgentBlockPage() {
  return <AgentRun />;
}
