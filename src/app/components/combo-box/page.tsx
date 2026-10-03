import type { Metadata } from "next";
import { ComboBoxBasicDemo } from "@/components/docs/combo-box-basic-demo";
import { ComboBoxDemo } from "@/components/docs/combo-box-demo";
import { ComboBoxDisabledDemo } from "@/components/docs/combo-box-disabled-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Combo box | vip/ui",
  description: "Search and select an option from a longer list.",
};

export default function ComboBoxPage() {
  return (
    <ComponentPage
      name="Combo box"
      reactAriaDocsHref="https://react-aria.adobe.com/ComboBox"
      description="A searchable list for choosing an option."
      preview={<ComboBoxBasicDemo />}
      previewHint="Type a framework name, use the arrow keys, and press Enter to select."
      previewSourcePath="src/components/docs/combo-box-basic-demo.tsx"
      examples={[
        {
          title: "Descriptive results",
          description:
            "Filter options with supporting details and show the current selection.",
          preview: <ComboBoxDemo />,
          sourcePath: "src/components/docs/combo-box-demo.tsx",
        },
        {
          title: "Disabled",
          description:
            "Keep the selected value visible when the field cannot be edited.",
          preview: <ComboBoxDisabledDemo />,
          sourcePath: "src/components/docs/combo-box-disabled-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/combo-box.tsx"
      previous={{ name: "Menu", href: "/components/menu" }}
      next={{ name: "Tooltip", href: "/components/tooltip" }}
    />
  );
}
