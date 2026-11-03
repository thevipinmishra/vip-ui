import { AssistantChat } from "./chat";

export const metadata = {
  title: "Assistant chat",
  description: "Assistant chat that reads metrics and cites its sources.",
};

export default function ChatBlockPage() {
  return <AssistantChat />;
}
