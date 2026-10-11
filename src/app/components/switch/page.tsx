import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { SwitchDemo } from "@/components/docs/switch-demo";
import { SwitchDescriptionDemo } from "@/components/docs/switch-description-demo";
import { SwitchDisabledDemo } from "@/components/docs/switch-disabled-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Switch | vip/ui",
  description: componentPageData.switch.description,
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
        <SwitchDescriptionDemo key="description" />,
        <SwitchDisabledDemo key="disabled" />,
        <SwitchDemo key="custom-layout" />,
      ])}
      sourcePath="src/components/ui/switch.tsx"
    />
  );
}
