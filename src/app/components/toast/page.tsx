import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { ToastDemo } from "@/components/docs/toast-demo";

export const metadata: Metadata = {
  title: "Toast | vip/ui",
  description: "Brief feedback after an action.",
};

export default function ToastPage() {
  return (
    <ComponentPage
      name="Toast"
      reactAriaDocsHref="https://react-aria.adobe.com/Toast"
      description="Confirm an action without interrupting the current task. Toasts stack in one region and offer a clear dismiss button."
      preview={<ToastDemo />}
      previewHint="Show a saved message that closes after five seconds, or a warning that stays until dismissed."
      previewSourcePath="src/components/docs/toast-demo.tsx"
      sourcePath="src/components/ui/toast.tsx"
      previous={{ name: "Tooltip", href: "/components/tooltip" }}
      next={{ name: "Separator", href: "/components/separator" }}
    />
  );
}
