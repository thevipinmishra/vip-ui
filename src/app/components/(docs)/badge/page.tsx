import { BadgeBasicDemo } from "@/components/docs/badge-basic-demo";
import { BadgeDemo } from "@/components/docs/badge-demo";
import { BadgeVariantsDemo } from "@/components/docs/badge-variants-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData, getComponentUsage } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Badge",
  description: `${componentPageData.badge.description} Examples show every variant and the dot indicator, with installation and the API reference.`,
  path: "/components/badge",
});

export default function BadgePage() {
  const page = componentPageData.badge;
  return (
    <ComponentPage
      name="Badge"
      description={page.description}
      preview={<BadgeBasicDemo />}
      previewSourcePath={page.usage}
      usage={getComponentUsage("badge")}
      examples={withExamplePreviews(page.examples, [
        <BadgeVariantsDemo key="variants" />,
        <BadgeDemo key="dot" />,
      ])}
      sourcePath="src/components/ui/badge.tsx"
    />
  );
}
