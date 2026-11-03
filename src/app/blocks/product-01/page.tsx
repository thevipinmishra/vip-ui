import { blockMetadata } from "@/lib/block-seo";
import { ProductPage } from "./product-page";

export const metadata = blockMetadata("product-01");

export default function ProductBlockPage() {
  return <ProductPage />;
}
