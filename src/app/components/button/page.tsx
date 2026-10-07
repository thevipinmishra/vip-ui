import type { Metadata } from "next";
import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonProjectActionsDemo } from "@/components/docs/button-project-actions-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Button | vip/ui",
  description: componentPageData.button.description,
};

export default function ButtonPage() {
  const page = componentPageData.button;

  return (
    <ComponentPage
      name="Button"
      description={page.description}
      preview={<ButtonBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <ButtonProjectActionsDemo key="project-actions" />,
      ])}
      sourcePath="src/components/ui/button.tsx"
    />
  );
}
