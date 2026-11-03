import { blockMetadata } from "@/lib/block-seo";
import { AssistantChat } from "./chat";

export const metadata = blockMetadata("chat-01");

export default function ChatBlockPage() {
  return <AssistantChat />;
}
