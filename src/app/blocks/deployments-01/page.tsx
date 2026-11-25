import { blockMetadata } from "@/lib/block-seo";
import { DeploymentsPage } from "./deployments-page";

export const metadata = blockMetadata("deployments-01");

export default function Page() {
  return <DeploymentsPage />;
}
