import { OrdersPage } from "./orders-page";

export const metadata = {
  title: "Store orders",
  description: "Order list with filters, bulk actions, and details.",
};

export default function OrdersBlockPage() {
  return <OrdersPage />;
}
