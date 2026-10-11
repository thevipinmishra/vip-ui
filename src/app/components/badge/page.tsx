import type { Metadata } from "next";
import { BadgeBasicDemo } from "@/components/docs/badge-basic-demo";
import { BadgeDemo } from "@/components/docs/badge-demo";
import { BadgeVariantsDemo } from "@/components/docs/badge-variants-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Badge | vip/ui",
  description: componentPageData.badge.description,
};

export default function BadgePage() {
  const page = componentPageData.badge;
  return (
    <ComponentPage
      name="Badge"
      description={page.description}
      preview={<BadgeBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <BadgeVariantsDemo key="variants" />,
        <BadgeDemo key="dot" />,
      ])}
      sourcePath="src/components/ui/badge.tsx"
    />
  );
}
