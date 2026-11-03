import { blockMetadata } from "@/lib/block-seo";
import { IssueDetail } from "./issue-detail";

export const metadata = blockMetadata("issue-01");

export default function IssueBlockPage() {
  return <IssueDetail />;
}
