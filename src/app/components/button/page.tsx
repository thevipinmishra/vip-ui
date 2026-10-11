import type { Metadata } from "next";
import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonIconDemo } from "@/components/docs/button-icon-demo";
import { ButtonLinkDemo } from "@/components/docs/button-link-demo";
import { ButtonLoadingDemo } from "@/components/docs/button-loading-demo";
import { ButtonSizesDemo } from "@/components/docs/button-sizes-demo";
import { ButtonVariantsDemo } from "@/components/docs/button-variants-demo";
import { ButtonWithIconDemo } from "@/components/docs/button-with-icon-demo";
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
        <ButtonVariantsDemo key="variants" />,
        <ButtonSizesDemo key="sizes" />,
        <ButtonWithIconDemo key="with-icon" />,
        <ButtonIconDemo key="icon-buttons" />,
        <ButtonLoadingDemo key="loading" />,
        <ButtonLinkDemo key="link" />,
      ])}
      sourcePath="src/components/ui/button.tsx"
    />
  );
}
