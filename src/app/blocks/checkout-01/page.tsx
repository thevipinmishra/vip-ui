import { blockMetadata } from "@/lib/block-seo";
import { CheckoutPage } from "./checkout-page";

export const metadata = blockMetadata("checkout-01");

export default function CheckoutBlockPage() {
  return <CheckoutPage />;
}
