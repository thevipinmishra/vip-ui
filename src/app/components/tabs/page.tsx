import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TabsBasicDemo } from "@/components/docs/tabs-basic-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { TabsDisabledDemo } from "@/components/docs/tabs-disabled-demo";
import { TabsOverflowDemo } from "@/components/docs/tabs-overflow-demo";
import { TabsSizesDemo } from "@/components/docs/tabs-sizes-demo";
import { TabsVerticalDemo } from "@/components/docs/tabs-vertical-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tabs",
  description: `${componentPageData.tabs.description} Examples cover icons, disabled tabs, vertical and overflowing lists, and sizes.`,
  path: "/components/tabs",
});

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
        <TabsOverflowDemo key="many-tabs" />,
        <TabsSizesDemo key="sizes" />,
      ])}
      sourcePath="src/components/ui/tabs.tsx"
    />
  );
}
