import { blockMetadata } from "@/lib/block-seo";
import { ObservabilityDashboard } from "./observability";

export const metadata = blockMetadata("dashboard-03");

export default function Page() {
  return <ObservabilityDashboard />;
}
