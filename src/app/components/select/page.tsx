import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { SelectDemo } from "@/components/docs/select-demo";
import { SelectDescriptionsDemo } from "@/components/docs/select-descriptions-demo";
import { SelectDisabledDemo } from "@/components/docs/select-disabled-demo";
import { SelectInvalidDemo } from "@/components/docs/select-invalid-demo";

export const metadata: Metadata = {
  title: "Select | vip/ui",
  description:
    "An accessible select field with descriptive options and Motion feedback.",
};

export default function SelectPage() {
  return (
    <ComponentPage
      name="Select"
      reactAriaDocsHref="https://react-aria.adobe.com/Select"
      description="Displays a list of options for choosing one item."
      preview={<SelectDemo />}
      previewHint="Open the menu, move with the arrow keys, and press Enter to choose."
      previewSourcePath="src/components/docs/select-demo.tsx"
      examples={[
        {
          title: "Described options",
          description:
            "Keep supporting details in the menu while the trigger shows only the selected name.",
          preview: <SelectDescriptionsDemo />,
          sourcePath: "src/components/docs/select-descriptions-demo.tsx",
        },
        {
          title: "Disabled",
          description:
            "Show the existing value when a field can no longer be changed.",
          preview: <SelectDisabledDemo />,
          sourcePath: "src/components/docs/select-disabled-demo.tsx",
        },
        {
          title: "Invalid selection",
          description:
            "Mark a required choice invalid until an option is selected. The error clears when the user chooses a workspace.",
          preview: <SelectInvalidDemo />,
          sourcePath: "src/components/docs/select-invalid-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/select.tsx"
      previous={{ name: "Text field", href: "/components/text-field" }}
      next={{ name: "Checkbox", href: "/components/checkbox" }}
    />
  );
}
