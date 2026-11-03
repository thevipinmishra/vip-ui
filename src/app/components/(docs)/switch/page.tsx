import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { SwitchControlFirstDemo } from "@/components/docs/switch-control-first-demo";
import { SwitchDemo } from "@/components/docs/switch-demo";
import { SwitchDescriptionDemo } from "@/components/docs/switch-description-demo";
import { SwitchDisabledDemo } from "@/components/docs/switch-disabled-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Switch",
  description: `${componentPageData.switch.description} Examples cover descriptions, disabled and control-first layouts, and a custom layout.`,
  path: "/components/switch",
});

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
        <SwitchControlFirstDemo key="control-first" />,
        <SwitchDemo key="custom-layout" />,
      ])}
      sourcePath="src/components/ui/switch.tsx"
    />
  );
}
