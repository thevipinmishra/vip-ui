import { blockMetadata } from "@/lib/block-seo";
import { IntegrationsSettings } from "./integrations-settings";

export const metadata = blockMetadata("integrations-01");

export default function IntegrationsPage() {
  return <IntegrationsSettings />;
}
