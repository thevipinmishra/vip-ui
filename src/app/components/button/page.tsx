import type { Metadata } from "next";
import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonDemo } from "@/components/docs/button-demo";
import { ButtonSizesDemo } from "@/components/docs/button-sizes-demo";
import { ButtonVariantsDemo } from "@/components/docs/button-variants-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Button | vip/ui",
  description:
    "Accessible buttons with clear hierarchy and tactile press feedback.",
};

export default function ButtonPage() {
  const page = componentPageData.button;

  return (
    <ComponentPage
      name="Button"
      description={page.description}
      descriptionLinks={[
        {
          label: "Jump to Project actions",
          href: "#example-project-actions",
        },
        {
          label: "Project status recipe",
          href: "/examples#recipe-project-status",
        },
      ]}
      preview={<ButtonBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <ButtonVariantsDemo key="variants" />,
        <ButtonSizesDemo key="sizes" />,
        <ButtonDemo key="project-actions" />,
      ])}
      sourcePath="src/components/ui/button.tsx"
    />
  );
}
