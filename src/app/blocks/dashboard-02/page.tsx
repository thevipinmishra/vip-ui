import { blockMetadata } from "@/lib/block-seo";
import { AnalyticsDashboard } from "./dashboard";

export const metadata = blockMetadata("dashboard-02");

export default function Page() {
  return <AnalyticsDashboard />;
}
