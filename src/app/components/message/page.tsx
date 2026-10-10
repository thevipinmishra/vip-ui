import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { MessageBasicDemo } from "@/components/docs/message-basic-demo";
import { MessageDemo } from "@/components/docs/message-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Message | vip/ui",
  description: componentPageData.message.description,
};

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
