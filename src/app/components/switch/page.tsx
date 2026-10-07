import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { SwitchDemo } from "@/components/docs/switch-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Switch | vip/ui",
  description: "An accessible switch for settings that apply immediately.",
};

export default function SwitchPage() {
  const page = componentPageData.switch;
  return (
    <ComponentPage
      name="Switch"
      description={page.description}
      preview={<SwitchBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SwitchDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/switch.tsx"
    />
  );
}
