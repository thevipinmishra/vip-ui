import { blockMetadata } from "@/lib/block-seo";
import { StatsPage } from "./stats-page";

export const metadata = blockMetadata("stats-01");

export default function Page() {
  return <StatsPage />;
}
