import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { PasswordFieldBasicDemo } from "@/components/docs/password-field-basic-demo";
import { PasswordFieldDemo } from "@/components/docs/password-field-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Password field | vip/ui",
  description:
    "A validated password field with an accessible visibility control.",
};

export default function PasswordFieldPage() {
  const page = componentPageData["password-field"];
  return (
    <ComponentPage
      name="Password field"
      description={page.description}
      preview={<PasswordFieldBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <PasswordFieldDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/password-field.tsx"
    />
  );
}
