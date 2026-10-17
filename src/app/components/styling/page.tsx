import { CodeBlock } from "@/components/docs/code-block";
import {
  Code,
  ExternalLink,
  GuidePage,
  GuideSection,
  guideMetadata,
  List,
  TextLink,
} from "@/components/docs/guide";

export const metadata = guideMetadata("/components/styling");

const recipe = `export const buttonStyles = tv({
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      success: "bg-success text-background hover:bg-success/90",
    },
  },
});`;

const usage = `<Button variant="success">Approve</Button>
<Button className="w-full">Save changes</Button>`;

export default function StylingPage() {
  return (
    <GuidePage href="/components/styling">
      <GuideSection id="theme" title="Theme">
        <p>
          Colors and the radius come from your shadcn tokens, such as{" "}
          <Code>--primary</Code> and <Code>--radius</Code>. To change them, edit
          the tokens in <Code>:root</Code> and <Code>.dark</Code>. See the{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/theming">
            shadcn theming guide
          </ExternalLink>
          .
        </p>
        <p>
          To use a ready-made palette, copy its CSS from{" "}
          <TextLink href="/themes">Themes</TextLink>.
        </p>
        <p>vip/ui adds these tokens to your global CSS file:</p>
        <List>
          <li>
            <Code>--success</Code> and <Code>--warning</Code>, each with a{" "}
            <Code>-subtle</Code> and a <Code>-foreground</Code> token, for
            status colors.
          </li>
          <li>
            <Code>--shadow-card</Code>, <Code>--shadow-float</Code>, and{" "}
            <Code>--shadow-inset</Code> for shadows.
          </li>
          <li>
            <Code>--ease-out-quint</Code> and <Code>--ease-spring</Code> for
            transitions.
          </li>
        </List>
        <p>
          The CLI adds only the tokens that a component uses. For a manual
          installation, the{" "}
          <TextLink href="/components/installation#manual">
            theme styles
          </TextLink>{" "}
          add all of them.
        </p>
      </GuideSection>

      <GuideSection id="dark-mode" title="Dark mode">
        <p>
          Put the <Code>dark</Code> class on the <Code>html</Code> element.
          Components then use the tokens in <Code>.dark</Code>.
        </p>
        <p>
          Menus, popovers, selects, dialogs, sheets, tooltips, and toasts render
          in a portal on <Code>document.body</Code>. They get tokens from the
          document root, not from the trigger.
        </p>
        <p>
          If you set the tokens on a different element, use{" "}
          <Code>UNSAFE_PortalProvider</Code> from <Code>react-aria</Code>. Set
          its <Code>getContainer</Code> to return that element. Overlays then
          render inside it.
        </p>
      </GuideSection>

      <GuideSection id="components" title="Change a component">
        <p>
          Each component is a file in your project. To change a component
          everywhere, edit its file.
        </p>
        <p>
          Some components keep their variants in a Tailwind Variants recipe,
          such as <Code>buttonStyles</Code> in <Code>button-styles.tsx</Code>.
          To add a variant, add a key to the recipe.
        </p>
        <CodeBlock code={recipe} filename="button-styles.tsx" />
        <p>
          To change one instance, pass <Code>className</Code>. vip/ui merges it
          after the component classes. A conflicting utility, such as{" "}
          <Code>px-6</Code>, replaces the default.
        </p>
        <CodeBlock code={usage} filename="example.tsx" />
      </GuideSection>

      <GuideSection id="states" title="Style states">
        <p>
          React Aria sets a data attribute for each interactive state, such as{" "}
          <Code>data-pressed</Code> and <Code>data-selected</Code>. The Tailwind
          plugin adds a variant for each attribute, such as{" "}
          <Code>pressed:</Code> and <Code>selected:</Code>. Use these variants
          in your own classes.
        </p>
        <p>
          <ExternalLink href="https://react-aria.adobe.com/styling">
            React Aria styling guide
          </ExternalLink>
        </p>
      </GuideSection>
    </GuidePage>
  );
}
