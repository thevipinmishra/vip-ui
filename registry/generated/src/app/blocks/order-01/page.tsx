import { OrderDetail } from "./order-detail";

export const metadata = {
  title: "Order detail",
  description: "Order with line items, fulfillment history, and a refund.",
};

export default function OrderBlockPage() {
  return <OrderDetail />;
}
