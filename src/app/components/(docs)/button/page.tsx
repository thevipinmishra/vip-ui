import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonDisabledDemo } from "@/components/docs/button-disabled-demo";
import { ButtonGroupBasicDemo } from "@/components/docs/button-group-basic-demo";
import { ButtonGroupDemo } from "@/components/docs/button-group-demo";
import { ButtonGroupOrientationsDemo } from "@/components/docs/button-group-orientations-demo";
import { ButtonGroupSizesDemo } from "@/components/docs/button-group-sizes-demo";
import { ButtonIconDemo } from "@/components/docs/button-icon-demo";
import { ButtonLinkDemo } from "@/components/docs/button-link-demo";
import { ButtonLoadingDemo } from "@/components/docs/button-loading-demo";
import { ButtonSizesDemo } from "@/components/docs/button-sizes-demo";
import { ButtonVariantsDemo } from "@/components/docs/button-variants-demo";
import { ButtonWithIconDemo } from "@/components/docs/button-with-icon-demo";
import {
  GroupedComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentDescription, getDocGroup } from "@/lib/catalog";
import { componentPageData, getComponentUsage } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

const page = componentPageData.button;
const buttonGroupPage = componentPageData["button-group"];
const group = getDocGroup("button");

export const metadata = pageMetadata({
  title: "Button",
  description:
    "Triggers an action with six variants and five sizes. Examples cover icons, loading states, links, and button groups.",
  path: "/components/button",
});

export default function ButtonPage() {
  return (
    <GroupedComponentPage
      name={group?.name ?? "Button"}
      description={group?.description ?? page.description}
      members={[
        {
          slug: "button",
          name: "Button",
          description: page.description,
          preview: <ButtonBasicDemo />,
          previewSourcePath: page.usage,
          usage: getComponentUsage("button"),
          examples: withExamplePreviews(page.examples, [
            <ButtonVariantsDemo key="variants" />,
            <ButtonSizesDemo key="sizes" />,
            <ButtonWithIconDemo key="with-icon" />,
            <ButtonIconDemo key="icon-buttons" />,
            <ButtonDisabledDemo key="disabled" />,
            <ButtonLoadingDemo key="loading" />,
            <ButtonLinkDemo key="link" />,
          ]),
        },
        {
          slug: "button-group",
          name: "Button group",
          description: componentDescription("button-group"),
          preview: <ButtonGroupBasicDemo />,
          previewSourcePath: buttonGroupPage.usage,
          usage: getComponentUsage("button-group"),
          examples: withExamplePreviews(buttonGroupPage.examples, [
            <ButtonGroupOrientationsDemo key="orientations" />,
            <ButtonGroupDemo key="split-button" />,
            <ButtonGroupSizesDemo key="sizes" />,
          ]),
        },
      ]}
    />
  );
}
