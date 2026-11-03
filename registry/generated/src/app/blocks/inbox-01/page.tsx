import { SupportInbox } from "./support-inbox";

export const metadata = {
  title: "Support inbox",
  description: "Support inbox with queues, snooze, and replies.",
};

export default function InboxBlockPage() {
  return <SupportInbox />;
}
