import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { ToastActionDemo } from "@/components/docs/toast-action-demo";
import { ToastDemo } from "@/components/docs/toast-demo";
import { ToastStackDemo } from "@/components/docs/toast-stack-demo";
import { ToastStatusDemo } from "@/components/docs/toast-status-demo";
import { ToastTimeoutDemo } from "@/components/docs/toast-timeout-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Toast",
  description: `${componentPageData.toast.description} Examples cover status variants, actions, stacking, timeouts, and screen reader announcements.`,
  path: "/components/toast",
});

export default function ToastPage() {
  const page = componentPageData.toast;
  return (
    <ComponentPage
      name="Toast"
      description={page.description}
      preview={<ToastDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <ToastStatusDemo key="variants" />,
        <ToastActionDemo key="action" />,
        <ToastStackDemo key="stack" />,
        <ToastTimeoutDemo key="timeout" />,
      ])}
      sourcePath="src/components/ui/toast.tsx"
    />
  );
}
