import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { ContextMenuDemo } from "@/components/docs/context-menu-demo";
import { ContextMenuGroupedDemo } from "@/components/docs/context-menu-grouped-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Context menu",
  description: `${componentPageData["context-menu"].description} Examples cover grouped actions, with installation and the full API reference.`,
  path: "/components/context-menu",
});

export default function ContextMenuPage() {
  const page = componentPageData["context-menu"];
  return (
    <ComponentPage
      name="Context menu"
      description={page.description}
      preview={<ContextMenuDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <ContextMenuGroupedDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/context-menu.tsx"
    />
  );
}
