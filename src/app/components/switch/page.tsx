import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { SwitchBasicDemo } from "@/components/docs/switch-basic-demo";
import { SwitchDemo } from "@/components/docs/switch-demo";
import { SwitchStatesDemo } from "@/components/docs/switch-states-demo";

export const metadata: Metadata = {
  title: "Switch | vip/ui",
  description: "An accessible switch for settings that apply immediately.",
};

export default function SwitchPage() {
  return (
    <ComponentPage
      name="Switch"
      reactAriaDocsHref="https://react-aria.adobe.com/Switch"
      description="A control for turning a setting on or off."
      preview={<SwitchBasicDemo />}
      previewHint="Turn the setting on or off with Space or a pointer."
      previewSourcePath="src/components/docs/switch-basic-demo.tsx"
      examples={[
        {
          title: "Privacy settings",
          description:
            "Compose a group of switches with supporting descriptions and live feedback.",
          preview: <SwitchDemo />,
          sourcePath: "src/components/docs/switch-demo.tsx",
        },
        {
          title: "Descriptions and disabled state",
          description:
            "Add context to a setting or show when it is managed elsewhere.",
          preview: <SwitchStatesDemo />,
          sourcePath: "src/components/docs/switch-states-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/switch.tsx"
      previous={{ name: "Checkbox", href: "/components/checkbox" }}
      next={{ name: "Badge", href: "/components/badge" }}
    />
  );
}
