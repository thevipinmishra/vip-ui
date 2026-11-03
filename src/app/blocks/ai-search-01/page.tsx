import { blockMetadata } from "@/lib/block-seo";
import { AiSearch } from "./ai-search";

export const metadata = blockMetadata("ai-search-01");

export default function AiSearchBlockPage() {
  return <AiSearch />;
}
