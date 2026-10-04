import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { ToastDemo } from "@/components/docs/toast-demo";
import { ToastStatusDemo } from "@/components/docs/toast-status-demo";
import { ToastViewport } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Toast | vip/ui",
  description: "Brief feedback after an action.",
};

export default function ToastPage() {
  return (
    <>
      <ComponentPage
        name="Toast"
        reactAriaDocsHref="https://react-aria.adobe.com/Toast"
        description="Displays a brief notification."
        preview={<ToastDemo />}
        previewHint="Save several times to see the newest three notifications stack in one corner. Each closes after five seconds."
        previewSourcePath="src/components/docs/toast-demo.tsx"
        examples={[
          {
            title: "Upload notifications",
            description:
              "Start, complete, or pause an upload to compare notification states. Mount ToastViewport once for the page.",
            preview: <ToastStatusDemo />,
            sourcePath: "src/components/docs/toast-status-demo.tsx",
          },
        ]}
        sourcePath="src/components/ui/toast.tsx"
        previous={{ name: "Tooltip", href: "/components/tooltip" }}
        next={{ name: "Separator", href: "/components/separator" }}
      />
      <ToastViewport />
    </>
  );
}
