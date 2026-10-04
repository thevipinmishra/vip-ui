import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DialogAlertDemo } from "@/components/docs/dialog-alert-demo";
import { DialogControlledDemo } from "@/components/docs/dialog-controlled-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";
import { DialogScrollableDemo } from "@/components/docs/dialog-scrollable-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Dialog | vip/ui",
  description: "A focused task above the page.",
};

export default function DialogPage() {
  const page = componentPageData.dialog;

  return (
    <ComponentPage
      name="Dialog"
      description={page.description}
      descriptionLinks={[
        {
          label: "Jump to Alert dialog",
          href: "#example-alert-dialog",
        },
      ]}
      preview={<DialogDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <DialogAlertDemo key="alert-dialog" />,
        <DialogScrollableDemo key="scrollable-content" />,
        <DialogControlledDemo key="controlled-open-state" />,
      ])}
      sourcePath="src/components/ui/dialog.tsx"
    />
  );
}
