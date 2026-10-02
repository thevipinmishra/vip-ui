import type { Metadata } from "next";
import { AlertBasicDemo } from "@/components/docs/alert-basic-demo";
import { AlertDemo } from "@/components/docs/alert-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Alert | vip/ui",
  description: "Inline messages for useful information and status.",
};

export default function AlertPage() {
  return (
    <ComponentPage
      name="Alert"
      description="An inline message with a clear title and an icon that matches its intent. Use it for information the reader needs near the current task."
      preview={<AlertBasicDemo />}
      previewHint="Keep the message next to the task it explains."
      previewSourcePath="src/components/docs/alert-basic-demo.tsx"
      examples={[
        {
          title: "Status messages",
          description:
            "Choose a message variant that matches the outcome, and include the next step when attention is needed.",
          preview: <AlertDemo />,
          sourcePath: "src/components/docs/alert-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/alert.tsx"
      previous={{ name: "Badge", href: "/components/badge" }}
      next={{ name: "Radio group", href: "/components/radio-group" }}
    />
  );
}
