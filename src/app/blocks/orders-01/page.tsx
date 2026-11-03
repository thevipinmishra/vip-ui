import { blockMetadata } from "@/lib/block-seo";
import { OrdersPage } from "./orders-page";

export const metadata = blockMetadata("orders-01");

export default function OrdersBlockPage() {
  return <OrdersPage />;
}
