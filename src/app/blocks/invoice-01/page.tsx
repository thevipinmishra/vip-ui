import { blockMetadata } from "@/lib/block-seo";
import { InvoiceEditor } from "./invoice-editor";

export const metadata = blockMetadata("invoice-01");

export default function InvoiceBlockPage() {
  return <InvoiceEditor />;
}
