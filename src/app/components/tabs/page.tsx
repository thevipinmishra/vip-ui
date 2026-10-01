import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { TabsDisabledDemo } from "@/components/docs/tabs-disabled-demo";

export const metadata: Metadata = {
  title: "Tabs | vip/ui",
  description: "Switch between related panels.",
};

export default function TabsPage() {
  return (
    <ComponentPage
      name="Tabs"
      reactAriaDocsHref="https://react-aria.adobe.com/Tabs"
      description="Switch between a small set of related panels without leaving the page. The selected tab has a clear background and matching panel."
      preview={<TabsDemo />}
      previewHint="Switch between the project summary, activity, and team using a pointer or arrow keys."
      previewSourcePath="src/components/docs/tabs-demo.tsx"
      examples={[
        {
          title: "Unavailable tab",
          description:
            "Keep a destination visible without allowing selection until it becomes available.",
          preview: <TabsDisabledDemo />,
          sourcePath: "src/components/docs/tabs-disabled-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/tabs.tsx"
      previous={{ name: "Slider", href: "/components/slider" }}
      next={{ name: "Accordion", href: "/components/accordion" }}
    />
  );
}
