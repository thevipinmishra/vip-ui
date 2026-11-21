import { blockMetadata } from "@/lib/block-seo";
import { HelpCenter } from "./help-center";

export const metadata = blockMetadata("help-01");

export default function HelpBlockPage() {
  return <HelpCenter />;
}
