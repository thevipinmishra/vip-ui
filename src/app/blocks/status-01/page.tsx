import { blockMetadata } from "@/lib/block-seo";
import { StatusPage } from "./status-page";

export const metadata = blockMetadata("status-01");

export default function Page() {
  return <StatusPage />;
}
