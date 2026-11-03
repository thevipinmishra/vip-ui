import { blockMetadata } from "@/lib/block-seo";
import { Dashboard } from "./dashboard";

export const metadata = blockMetadata("dashboard-01");

export default function DashboardPage() {
  return <Dashboard />;
}
