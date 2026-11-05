import { AlertActionDemo } from "@/components/docs/alert-action-demo";
import { AlertBasicDemo } from "@/components/docs/alert-basic-demo";
import { AlertDemo } from "@/components/docs/alert-demo";
import { AlertDismissDemo } from "@/components/docs/alert-dismiss-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData, getComponentUsage } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alert",
  description: `${componentPageData.alert.description} Examples show every variant, an action, and dismissal that restores focus to the trigger.`,
  path: "/components/alert",
});

export default function AlertPage() {
  const page = componentPageData.alert;
  return (
    <ComponentPage
      name="Alert"
      description={page.description}
      preview={<AlertBasicDemo />}
      previewSourcePath={page.usage}
      usage={getComponentUsage("alert")}
      examples={withExamplePreviews(page.examples, [
        <AlertDemo key="variants" />,
        <AlertActionDemo key="action" />,
        <AlertDismissDemo key="dismiss" />,
      ])}
      sourcePath="src/components/ui/alert.tsx"
    />
  );
}
