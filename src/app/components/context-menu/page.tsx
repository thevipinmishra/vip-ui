import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { ContextMenuDemo } from "@/components/docs/context-menu-demo";
import { ContextMenuGroupedDemo } from "@/components/docs/context-menu-grouped-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Context menu | vip/ui",
  description: "Open actions beside a file with pointer, touch, or keyboard.",
};

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
