import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { ToastDemo } from "@/components/docs/toast-demo";
import { ToastStatusDemo } from "@/components/docs/toast-status-demo";
import { ToastViewport } from "@/components/ui/toast";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Toast | vip/ui",
  description: "Brief feedback after an action.",
};

export default function ToastPage() {
  const page = componentPageData.toast;
  return (
    <>
      <ComponentPage
        name="Toast"
        description={page.description}
        preview={<ToastDemo />}
        previewSourcePath={page.usage}
        examples={withExamplePreviews(page.examples, [
          <ToastStatusDemo key="example-1" />,
        ])}
        sourcePath="src/components/ui/toast.tsx"
      />
      <ToastViewport />
    </>
  );
}
