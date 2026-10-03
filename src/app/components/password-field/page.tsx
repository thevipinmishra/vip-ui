import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { PasswordFieldBasicDemo } from "@/components/docs/password-field-basic-demo";
import { PasswordFieldDemo } from "@/components/docs/password-field-demo";

export const metadata: Metadata = {
  title: "Password field | vip/ui",
  description:
    "A validated password field with an accessible visibility control.",
};

export default function PasswordFieldPage() {
  return (
    <ComponentPage
      name="Password field"
      description="Accepts a password with an optional reveal action beside the input."
      reactAriaDocsHref="https://react-aria.adobe.com/TextField"
      preview={<PasswordFieldBasicDemo />}
      previewHint="Reveal and hide the password without changing its value. The control remains a separate keyboard stop."
      previewSourcePath="src/components/docs/password-field-basic-demo.tsx"
      examples={[
        {
          title: "Choose a new password",
          description:
            "Use new-password autocomplete and native minimum-length validation. The example checks the value but never saves or displays it.",
          preview: <PasswordFieldDemo />,
          sourcePath: "src/components/docs/password-field-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/password-field.tsx"
      previous={{ name: "Message", href: "/components/message" }}
      next={{ name: "Copy button", href: "/components/copy-button" }}
    />
  );
}
