import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { MessageBasicDemo } from "@/components/docs/message-basic-demo";
import { MessageDemo } from "@/components/docs/message-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Message",
  description: `${componentPageData.message.description} Examples cover both sides of a conversation and the system message that has no sender.`,
  path: "/components/message",
});

export default function MessagePage() {
  const page = componentPageData.message;
  return (
    <ComponentPage
      name="Message"
      description={page.description}
      preview={<MessageBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <MessageDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/message.tsx"
    />
  );
}
