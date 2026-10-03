import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { InputGroupBasicDemo } from "@/components/docs/input-group-basic-demo";
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
      description="Groups an input with related text, icons, or actions."
      preview={<InputGroupBasicDemo />}
      previewHint="The prefix and input share one border. Type the domain without the protocol."
      previewSourcePath="src/components/docs/input-group-basic-demo.tsx"
      sourcePath="src/components/ui/input-group.tsx"
      examples={[
        {
          title: "Search action",
          description:
            "Put a submit action beside the input. Both controls share a focus border, and the result appears below the field.",
          preview: <InputGroupDemo />,
          sourcePath: "src/components/docs/input-group-demo.tsx",
        },
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
