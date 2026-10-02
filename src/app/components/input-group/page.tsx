import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { InputGroupDemo } from "@/components/docs/input-group-demo";
import { InputGroupNotesDemo } from "@/components/docs/input-group-notes-demo";
import { InputGroupStatesDemo } from "@/components/docs/input-group-states-demo";

export const metadata: Metadata = {
  title: "Input group | vip/ui",
  description: "Combine a text field with a prefix, suffix, or action.",
};

export default function InputGroupPage() {
  return (
    <ComponentPage
      name="Input group"
      reactAriaDocsHref="https://react-aria.adobe.com/Group"
      description="Place text, icons, or actions beside an input inside one shared border. Keep the field label, validation, and value on TextField or TextArea."
      preview={<InputGroupDemo />}
      previewHint="Type a project name and press Enter or Find. The shared border responds to focus on either control."
      previewSourcePath="src/components/docs/input-group-demo.tsx"
      sourcePath="src/components/ui/input-group.tsx"
      examples={[
        {
          title: "Multiline note",
          description:
            "Use InputGroupTextArea with a bottom row for a counter and an action. The field still owns its label and value.",
          preview: <InputGroupNotesDemo />,
          sourcePath: "src/components/docs/input-group-notes-demo.tsx",
        },
        {
          title: "Invalid and disabled",
          description:
            "The group picks up invalid and disabled states from its React Aria field. Disable independent actions separately.",
          preview: <InputGroupStatesDemo />,
          sourcePath: "src/components/docs/input-group-states-demo.tsx",
        },
      ]}
      previous={{ name: "Text field", href: "/components/text-field" }}
      next={{ name: "Text area", href: "/components/text-area" }}
    />
  );
}
