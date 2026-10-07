import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TabsBasicDemo } from "@/components/docs/tabs-basic-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Tabs | vip/ui",
  description: "Switch between related panels.",
};

export default function TabsPage() {
  const page = componentPageData.tabs;
  return (
    <ComponentPage
      name="Tabs"
      description={page.description}
      preview={<TabsBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <TabsDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/tabs.tsx"
    />
  );
}
