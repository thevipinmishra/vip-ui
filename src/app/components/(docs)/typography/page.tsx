import { CodeBlock } from "@/components/docs/code-block";
import {
  Code,
  GuidePage,
  GuideSection,
  guideMetadata,
  List,
  TextLink,
} from "@/components/docs/guide";
import { TypographyInstall } from "@/components/docs/typography-install";

export const metadata = guideMetadata("/components/typography");

const usage = `export function Article({ html }: { html: string }) {
  return (
    <article
      className="typography"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}`;

const presets = `.typography-chat {
  --typography-size: 14px;
  --typography-leading: 1.6;
  --typography-flow: 1em;
}

.typography-reading {
  --typography-font-body: var(--font-newsreader);
  --typography-size: 19px;
  --typography-leading: 1.7;
  --typography-flow: 1.3em;
  max-width: 64ch;
}`;

const presetUsage = `<div className="typography typography-chat">{answer}</div>`;

const oneOff = `<article className="typography [--typography-flow:1.75em]">
  {content}
</article>`;

const scroll = `<div className="typography-scroll">
  <table>...</table>
</div>`;

const overrides = `<article className="typography [&_h2]:text-primary">
  <h2 className="tracking-normal">Release notes</h2>
</article>`;

const optOut = `<article className="typography">
  <p>Text with the typography styles.</p>
  <div className="not-typography">
    <Button>Download</Button>
  </div>
</article>`;

const dark = `.dark .typography-reading {
  --typography-leading: 1.8;
}`;

export default function TypographyGuidePage() {
  return (
    <GuidePage href="/components/typography">
      <GuideSection id="install" title="Install">
        <TypographyInstall />
      </GuideSection>

      <GuideSection id="usage" title="Usage">
        <p>
          Add the <Code>typography</Code> class to the element that holds HTML
          or rendered markdown. The elements inside it get the styles.
        </p>
        <CodeBlock code={usage} filename="article.tsx" />
        <p>Sanitize HTML from users or a CMS before you render it.</p>
      </GuideSection>

      <GuideSection id="presets" title="Presets">
        <p>
          A preset is a class that sets the typography variables. Make one in
          the <TextLink href="/typography">typography builder</TextLink>, or
          write it yourself. Use one preset for each place that shows text.
        </p>
        <CodeBlock code={presets} filename="globals.css" language="css" />
        <CodeBlock code={presetUsage} filename="answer.tsx" />
        <p>To change one value for one element, set the variable in a class.</p>
        <CodeBlock code={oneOff} filename="post.tsx" />
      </GuideSection>

      <GuideSection id="variables" title="Variables">
        <List>
          <li>
            <Code>--typography-size</Code> sets the size of the text. The
            default is <Code>1em</Code>, so the text follows its container. On
            small screens, the size is a little larger.
          </li>
          <li>
            <Code>--typography-leading</Code> sets the line height. The default
            is <Code>1.75</Code>.
          </li>
          <li>
            <Code>--typography-flow</Code> sets the space between blocks. The
            default is <Code>1.25em</Code>. Headings, lists, and rules use
            multiples of it.
          </li>
          <li>
            <Code>--typography-font-body</Code>,{" "}
            <Code>--typography-font-heading</Code>, and{" "}
            <Code>--typography-font-mono</Code> set the fonts. Headings use the
            body font, and code uses <Code>--font-mono</Code>.
          </li>
        </List>
        <p>
          Colors and the radius come from your theme tokens, such as{" "}
          <Code>--foreground</Code>, <Code>--muted</Code>, and{" "}
          <Code>--radius</Code>. Dark mode uses the same tokens. To change a
          value in dark mode, set it under <Code>.dark</Code>.
        </p>
        <CodeBlock code={dark} filename="globals.css" language="css" />
      </GuideSection>

      <GuideSection id="line-length" title="Line length">
        <p>
          The styles do not set a maximum width. Add one to the preset, or put a
          class such as <Code>max-w-[70ch]</Code> on the element.
        </p>
      </GuideSection>

      <GuideSection id="wide-tables" title="Wide tables">
        <p>
          A table wraps its cells to fit. To scroll a wide table instead, put it
          in an element with the <Code>typography-scroll</Code> class.
        </p>
        <CodeBlock code={scroll} filename="content.html" />
      </GuideSection>

      <GuideSection id="markdown" title="Markdown extras">
        <p>
          The styles support the markup that GitHub-flavored markdown plugins
          make:
        </p>
        <List>
          <li>
            Alerts: <Code>markdown-alert</Code> and a type class, such as{" "}
            <Code>markdown-alert-warning</Code>.
          </li>
          <li>
            Task lists: <Code>task-list-item</Code> on a list item that starts
            with a checkbox.
          </li>
          <li>
            Footnotes: <Code>data-footnote-ref</Code> on references and{" "}
            <Code>data-footnotes</Code> on the list.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="overrides" title="Overrides">
        <p>
          The styles have zero specificity and are in the{" "}
          <Code>components</Code> layer. A utility class on an element always
          wins, and you do not need <Code>!important</Code>.
        </p>
        <CodeBlock code={overrides} filename="notes.tsx" />
      </GuideSection>

      <GuideSection id="opt-out" title="Opt out">
        <p>
          Add <Code>not-typography</Code> or <Code>data-not-typography</Code> to
          an element to remove the styles from it and from all elements in it.
          Use it for components in the content, such as buttons and cards.
        </p>
        <CodeBlock code={optOut} filename="post.tsx" />
      </GuideSection>

      <GuideSection id="streaming" title="Streaming">
        <p>
          Each block sets only the space above it, and table lines go on the new
          row. When text streams in, the blocks that are already on the screen
          do not move.
        </p>
      </GuideSection>
    </GuidePage>
  );
}
