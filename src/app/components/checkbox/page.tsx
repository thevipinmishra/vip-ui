import type { Metadata } from "next";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { CheckboxDemo } from "@/components/docs/checkbox-demo";
import { CheckboxStatesDemo } from "@/components/docs/checkbox-states-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Checkbox | vip/ui",
  description: "An accessible checkbox for independent choices.",
};

export default function CheckboxPage() {
  return (
    <ComponentPage
      name="Checkbox"
      reactAriaDocsHref="https://react-aria.adobe.com/Checkbox"
      description="Use Checkbox for an independent choice. The label is part of the press target; Space toggles the selection."
      preview={<CheckboxBasicDemo />}
      previewHint="Toggle a single email preference with Space or a pointer."
      previewSourcePath="src/components/docs/checkbox-basic-demo.tsx"
      examples={[
        {
          title: "Notification preferences",
          description:
            "Compose labels and descriptions when choices need more context.",
          preview: <CheckboxDemo />,
          sourcePath: "src/components/docs/checkbox-demo.tsx",
        },
        {
          title: "Indeterminate and disabled",
          description:
            "A mixed state can represent partial selection; disabled choices remain visible but unavailable.",
          preview: <CheckboxStatesDemo />,
          sourcePath: "src/components/docs/checkbox-states-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/checkbox.tsx"
      previous={{ name: "Select", href: "/components/select" }}
      next={{ name: "Switch", href: "/components/switch" }}
    />
  );
}
