import { blockMetadata } from "@/lib/block-seo";
import { MoneyOverview } from "./money-overview";

export const metadata = blockMetadata("finance-01");

export default function Page() {
  return <MoneyOverview />;
}
