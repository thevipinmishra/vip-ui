import { blockMetadata } from "@/lib/block-seo";
import { SettingsPage } from "./settings-page";

export const metadata = blockMetadata("settings-01");

export default function Page() {
  return <SettingsPage />;
}
