import { ProductPage } from "./product-page";

export const metadata = {
  title: "Product detail",
  description: "Product page with variants, reviews, and a cart.",
};

export default function ProductBlockPage() {
  return <ProductPage />;
}
