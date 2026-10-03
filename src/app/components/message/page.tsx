import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { MessageBasicDemo } from "@/components/docs/message-basic-demo";
import { MessageDemo } from "@/components/docs/message-demo";

export const metadata: Metadata = {
  title: "Message | vip/ui",
  description:
    "Readable incoming, outgoing, and system messages for conversations.",
};

export default function MessagePage() {
  return (
    <ComponentPage
      name="Message"
      description="Displays a conversation entry with an author, content, and optional actions."
      preview={<MessageBasicDemo />}
      previewHint="Incoming and outgoing messages keep author and delivery details readable without relying on color."
      previewSourcePath="src/components/docs/message-basic-demo.tsx"
      examples={[
        {
          title: "Support conversation",
          description:
            "Add a local note and copy a message. New entries animate in without moving the entire thread; a long URL wraps at phone width. Enter makes a new line, and Send note submits.",
          preview: <MessageDemo />,
          sourcePath: "src/components/docs/message-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/message.tsx"
      previous={{ name: "Native select", href: "/components/native-select" }}
      next={{ name: "Password field", href: "/components/password-field" }}
    />
  );
}
