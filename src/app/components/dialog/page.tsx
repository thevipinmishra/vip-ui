import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { DialogAlertDemo } from "@/components/docs/dialog-alert-demo";
import { DialogControlledDemo } from "@/components/docs/dialog-controlled-demo";
import { DialogDemo } from "@/components/docs/dialog-demo";

export const metadata: Metadata = {
  title: "Dialog | vip/ui",
  description: "A focused task above the page.",
};

export default function DialogPage() {
  return (
    <ComponentPage
      name="Dialog"
      reactAriaDocsHref="https://react-aria.adobe.com/Modal"
      description="A focused layer for a short task or a small amount of detail. Focus moves inside when it opens and returns to the trigger when it closes."
      preview={<DialogDemo />}
      previewHint="Open the dialog, then click outside, press Escape, or use Close to dismiss it."
      previewSourcePath="src/components/docs/dialog-demo.tsx"
      examples={[
        {
          title: "Alert dialog",
          description:
            "Ask for confirmation before archiving. Outside clicks do not dismiss the alert; Cancel leaves the project unchanged.",
          preview: <DialogAlertDemo />,
          sourcePath: "src/components/docs/dialog-alert-demo.tsx",
        },
        {
          title: "Controlled open state",
          description:
            "Open with the trigger or application state. Close by clicking outside, pressing Escape, or using the button; each updates the controlled value.",
          preview: <DialogControlledDemo />,
          sourcePath: "src/components/docs/dialog-controlled-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/dialog.tsx"
      previous={{ name: "Accordion", href: "/components/accordion" }}
      next={{ name: "Search field", href: "/components/search-field" }}
    />
  );
}
