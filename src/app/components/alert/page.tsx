import type { Metadata } from "next";
import { AlertActionDemo } from "@/components/docs/alert-action-demo";
import { AlertBasicDemo } from "@/components/docs/alert-basic-demo";
import { AlertDemo } from "@/components/docs/alert-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Alert | vip/ui",
  description: "Inline messages for useful information and status.",
};

export default function AlertPage() {
  const page = componentPageData.alert;
  return (
    <ComponentPage
      name="Alert"
      description={page.description}
      preview={<AlertBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <AlertActionDemo key="example-1" />,
        <AlertDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/alert.tsx"
    />
  );
}
