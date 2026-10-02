import type { Metadata } from "next";
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
      preview={<AlertDemo />}
      previewHint="Compare success, warning, error, info, and neutral messages."
      previewSourcePath="src/components/docs/alert-demo.tsx"
      sourcePath="src/components/ui/alert.tsx"
      previous={{ name: "Badge", href: "/components/badge" }}
      next={{ name: "Radio group", href: "/components/radio-group" }}
    />
  );
}
