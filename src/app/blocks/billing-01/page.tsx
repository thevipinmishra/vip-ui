import { blockMetadata } from "@/lib/block-seo";
import { BillingPage } from "./billing-page";

export const metadata = blockMetadata("billing-01");

export default function Page() {
  return <BillingPage />;
}
