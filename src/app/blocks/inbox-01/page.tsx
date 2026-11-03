import { blockMetadata } from "@/lib/block-seo";
import { SupportInbox } from "./support-inbox";

export const metadata = blockMetadata("inbox-01");

export default function InboxBlockPage() {
  return <SupportInbox />;
}
