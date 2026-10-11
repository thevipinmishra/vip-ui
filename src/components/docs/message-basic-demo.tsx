import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/components/ui/message";

export function MessageBasicDemo() {
  return (
    <div className="grid w-full max-w-lg gap-4">
      <Message
        sender="Maya"
        avatar={<Avatar name="Maya" initials="M" />}
        timestamp="10:24 AM"
        dateTime="2026-10-03T10:24:00"
      >
        Could you share the latest project brief?
      </Message>
      <Message sender="You" side="outgoing" timestamp="10:26 AM" status="Sent">
        I have it here. I will send it with the updated notes.
      </Message>
    </div>
  );
}
