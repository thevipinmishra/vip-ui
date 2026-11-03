import { blockMetadata } from "@/lib/block-seo";
import { SecuritySettings } from "./security-settings";

export const metadata = blockMetadata("security-01");

export default function SecurityPage() {
  return <SecuritySettings />;
}
