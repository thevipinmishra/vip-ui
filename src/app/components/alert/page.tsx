import { AlertActionDemo } from "@/components/docs/alert-action-demo";
import { AlertBasicDemo } from "@/components/docs/alert-basic-demo";
import { AlertDemo } from "@/components/docs/alert-demo";
import { AlertDismissDemo } from "@/components/docs/alert-dismiss-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alert",
  description: `${componentPageData.alert.description} Examples cover variants, an action, and dismissal, with focus handled as the alert leaves.`,
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
      examples={withExamplePreviews(page.examples, [
        <AlertDemo key="variants" />,
        <AlertActionDemo key="action" />,
        <AlertDismissDemo key="dismiss" />,
      ])}
      sourcePath="src/components/ui/alert.tsx"
    />
  );
}
