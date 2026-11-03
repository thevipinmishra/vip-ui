import { blockMetadata } from "@/lib/block-seo";
import { ChangelogPage } from "./changelog-page";

export const metadata = blockMetadata("changelog-01");

export default function TrellisChangelogPage() {
  return <ChangelogPage />;
}
