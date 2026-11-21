import { blockMetadata } from "@/lib/block-seo";
import { LogExplorer } from "./log-explorer";

export const metadata = blockMetadata("logs-01");

export default function LogsBlockPage() {
  return <LogExplorer />;
}
