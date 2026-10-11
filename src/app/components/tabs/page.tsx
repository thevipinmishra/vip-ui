import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TabsBasicDemo } from "@/components/docs/tabs-basic-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { TabsDisabledDemo } from "@/components/docs/tabs-disabled-demo";
import { TabsVerticalDemo } from "@/components/docs/tabs-vertical-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Tabs | vip/ui",
  description: componentPageData.tabs.description,
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
        <TabsDemo key="with-icons" />,
        <TabsDisabledDemo key="disabled-tab" />,
        <TabsVerticalDemo key="vertical" />,
      ])}
      sourcePath="src/components/ui/tabs.tsx"
    />
  );
}
