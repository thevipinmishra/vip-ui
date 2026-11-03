import { blockMetadata } from "@/lib/block-seo";
import { AvailabilityPage } from "./availability-page";

export const metadata = blockMetadata("availability-01");

export default function Page() {
  return <AvailabilityPage />;
}
