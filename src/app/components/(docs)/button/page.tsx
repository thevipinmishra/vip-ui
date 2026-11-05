import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonDisabledDemo } from "@/components/docs/button-disabled-demo";
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
import { componentPageData, getComponentUsage } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Button",
  description:
    "Triggers an action with six variants and five sizes. Examples cover icons, loading states, and links.",
  path: "/components/button",
});

export default function ButtonPage() {
  const page = componentPageData.button;

  return (
    <ComponentPage
      name="Button"
      description={page.description}
      preview={<ButtonBasicDemo />}
      previewSourcePath={page.usage}
      usage={getComponentUsage("button")}
      examples={withExamplePreviews(page.examples, [
        <ButtonVariantsDemo key="variants" />,
        <ButtonSizesDemo key="sizes" />,
        <ButtonWithIconDemo key="with-icon" />,
        <ButtonIconDemo key="icon-buttons" />,
        <ButtonDisabledDemo key="disabled" />,
        <ButtonLoadingDemo key="loading" />,
        <ButtonLinkDemo key="link" />,
      ])}
      sourcePath="src/components/ui/button.tsx"
    />
  );
}
