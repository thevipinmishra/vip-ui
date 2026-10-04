import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SelectDemo } from "@/components/docs/select-demo";
import { SelectDescriptionsDemo } from "@/components/docs/select-descriptions-demo";
import { SelectDisabledDemo } from "@/components/docs/select-disabled-demo";
import { SelectInvalidDemo } from "@/components/docs/select-invalid-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Select | vip/ui",
  description:
    "An accessible select field with descriptive options and Motion feedback.",
};

export default function SelectPage() {
  const page = componentPageData.select;

  return (
    <ComponentPage
      name="Select"
      description={page.description}
      descriptionLinks={[
        {
          label: "Jump to Invalid selection",
          href: "#example-invalid-selection",
        },
        {
          label: "Project status recipe",
          href: "/examples#recipe-project-status",
        },
      ]}
      preview={<SelectDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SelectDescriptionsDemo key="described-options" />,
        <SelectDisabledDemo key="disabled" />,
        <SelectInvalidDemo key="invalid-selection" />,
      ])}
      sourcePath="src/components/ui/select.tsx"
    />
  );
}
