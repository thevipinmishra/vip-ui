import { blockMetadata } from "@/lib/block-seo";
import { OrderDetail } from "./order-detail";

export const metadata = blockMetadata("order-01");

export default function OrderBlockPage() {
  return <OrderDetail />;
}
