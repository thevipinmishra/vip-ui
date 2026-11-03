import { blockMetadata } from "@/lib/block-seo";
import { ApiKeysSettings } from "./api-keys-settings";

export const metadata = blockMetadata("api-keys-01");

export default function ApiKeysPage() {
  return <ApiKeysSettings />;
}
