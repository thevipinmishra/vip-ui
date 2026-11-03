import { blockMetadata } from "@/lib/block-seo";
import { AppearanceSettings } from "./appearance-settings";

export const metadata = blockMetadata("appearance-01");

export default function AppearancePage() {
  return <AppearanceSettings />;
}
