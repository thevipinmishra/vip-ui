import {
  Code,
  ExternalLink,
  GuidePage,
  GuideSection,
  guideMetadata,
  TextLink,
} from "@/components/docs/guide";
import { Alert } from "@/components/ui/alert";

export const metadata = guideMetadata("/components/rtl");

export default function RtlPage() {
  return (
    <GuidePage href="/components/rtl">
      <GuideSection id="logical" title="Logical classes">
        <p>
          Components use logical CSS properties, such as <Code>ms-1</Code>,{" "}
          <Code>rounded-s-md</Code>, and <Code>border-e</Code>. Start and end
          follow the text direction of the element, so a right-to-left document
          mirrors each component with no transform. Set{" "}
          <Code>dir=&quot;rtl&quot;</Code> on <Code>&lt;html&gt;</Code> or on a
          container.
        </p>
        <p>
          React Aria gets the keyboard direction from the locale, not from{" "}
          <Code>dir</Code>. For arrow keys in sliders, tabs, and toolbars, set a
          right-to-left locale with <Code>I18nProvider</Code>. See{" "}
          <TextLink href="/components/react-aria#internationalization">
            Internationalization
          </TextLink>
          .
        </p>
      </GuideSection>

      <GuideSection id="cli" title="The CLI rtl option">
        <p>
          With <Code>rtl: true</Code> in <Code>components.json</Code>, or{" "}
          <Code>--rtl</Code> on{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/rtl">
            shadcn init
          </ExternalLink>
          , the CLI changes physical classes to logical ones at install time.
          vip/ui files already use logical classes, so the CLI installs them
          with no change.
        </p>
      </GuideSection>

      <GuideSection id="exceptions" title="Physical classes">
        <p>
          ItemHighlight, Slider, RangeCalendar, BorderBeam, and Highlighter set
          left or right on purpose. They measure pixel offsets to move a layer
          over an item, so the layer anchors to one physical edge.
        </p>
        <Alert variant="neutral" title="Do not migrate the vip/ui files">
          <Code>shadcn migrate rtl</Code> rewrites left and right classes in
          your ui directory, including <Code>components/vip-ui</Code>. In these
          five components, the layers then move away from their items. Run the
          migration on shadcn/ui files only.
        </Alert>
      </GuideSection>
    </GuidePage>
  );
}
