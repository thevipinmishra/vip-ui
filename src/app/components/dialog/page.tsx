import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DialogAlertDemo } from "@/components/docs/dialog-alert-demo";
import { DialogControlledDemo } from "@/components/docs/dialog-controlled-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { DialogFormDemo } from "@/components/docs/dialog-form-demo";
import { DialogScrollableDemo } from "@/components/docs/dialog-scrollable-demo";
import { DialogSizesDemo } from "@/components/docs/dialog-sizes-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dialog",
  description: `${componentPageData.dialog.description} Examples cover sizes, alert dialogs, forms, scrolling, and controlled open state.`,
  path: "/components/dialog",
});

export default function DialogPage() {
  const page = componentPageData.dialog;

  return (
    <ComponentPage
      name="Dialog"
      description={page.description}
      preview={<DialogDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <DialogSizesDemo key="sizes" />,
        <DialogAlertDemo key="alert-dialog" />,
        <DialogFormDemo key="form" />,
        <DialogScrollableDemo key="scrollable-content" />,
        <DialogControlledDemo key="controlled-open-state" />,
      ])}
      sourcePath="src/components/ui/dialog.tsx"
    />
  );
}
