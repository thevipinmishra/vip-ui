import { blockMetadata } from "@/lib/block-seo";
import { PricingPage } from "./pricing-page";

export const metadata = blockMetadata("pricing-01");

export default function Page() {
  return <PricingPage />;
}
