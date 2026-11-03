import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { PasswordFieldBasicDemo } from "@/components/docs/password-field-basic-demo";
import { PasswordFieldDemo } from "@/components/docs/password-field-demo";
import { PasswordFieldDisabledDemo } from "@/components/docs/password-field-disabled-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Password field",
  description: `${componentPageData["password-field"].description} Examples cover disabled fields and a new password, with installation and the API reference.`,
  path: "/components/password-field",
});

export default function PasswordFieldPage() {
  const page = componentPageData["password-field"];

  return (
    <ComponentPage
      name="Password field"
      description={page.description}
      preview={<PasswordFieldBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <PasswordFieldDisabledDemo key="disabled" />,
        <PasswordFieldDemo key="new-password" />,
      ])}
      sourcePath="src/components/ui/password-field.tsx"
    />
  );
}
