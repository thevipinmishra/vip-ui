import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import {
  inlineCode,
  Step,
  snippet,
  textLink,
} from "@/app/themes/theme-install";
import { CodeFrame } from "@/components/docs/code-frame";
import { CopyButton } from "@/components/docs/copy-button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { buttonLinkStyles } from "@/components/ui/button-styles";
import { paletteCss, paletteTailwindCss } from "@/lib/palettes";
import { ColorScales } from "./color-scales";

export const metadata: Metadata = {
  title: "Colors | vip/ui",
  description:
    "Ten OKLCH color scales with 12 steps each, for light and dark mode. Every scale passes the same contrast checks.",
};

export default async function ColorsPage() {
  const css = paletteCss();
  const tailwind = paletteTailwindCss();
  const [cssSnippet, tailwindSnippet] = await Promise.all([
    snippet(css, "css"),
    snippet(tailwind, "css"),
  ]);

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-14">
      <PageHeader className="site-container">
        <PageHeaderHeading>Colors</PageHeaderHeading>
        <PageHeaderDescription>
          Ten color scales with 12 steps each, for light and dark mode. Each
          step has one purpose, and every scale passes the same contrast checks.
        </PageHeaderDescription>
        <PageActions>
          <a href="#install" className={buttonLinkStyles()}>
            Install
            <ArrowDownIcon size={16} aria-hidden="true" />
          </a>
          <CopyButton
            code={css}
            label="Copy CSS for all scales"
            text="Copy CSS"
            className="h-11 px-4"
          />
        </PageActions>
      </PageHeader>

      <div className="site-container min-w-0">
        <ColorScales />
      </div>

      <section
        id="install"
        aria-labelledby="install-title"
        className="site-container scroll-mt-24"
      >
        <div className="grid gap-10 border-t border-border/70 pt-12">
          <div className="grid max-w-2xl gap-3">
            <h2
              id="install-title"
              className="text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl"
            >
              Use the colors
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Works with vip/ui and any project on Tailwind CSS v4.
            </p>
          </div>
          <ol className="grid gap-12">
            <Step number={1} title="Add the variables">
              <p>
                Paste the CSS in your global CSS file. Each scale sets 12
                variables in <code className={inlineCode}>:root</code> and{" "}
                <code className={inlineCode}>.dark</code>, from{" "}
                <code className={inlineCode}>--blue-1</code> to{" "}
                <code className={inlineCode}>--blue-12</code>. To copy one
                scale, select it above.
              </p>
              <CodeFrame
                code={css}
                filename="globals.css"
                copyText="Copy CSS"
                previewCode
              >
                {cssSnippet}
              </CodeFrame>
            </Step>
            <Step number={2} title="Add Tailwind colors">
              <p>
                Optional. This block adds utilities such as{" "}
                <code className={inlineCode}>bg-blue-3</code>,{" "}
                <code className={inlineCode}>border-blue-7</code>, and{" "}
                <code className={inlineCode}>text-blue-11</code>. The Tailwind
                default colors use 50 to 950, so the names do not conflict.
              </p>
              <CodeFrame
                code={tailwind}
                filename="globals.css"
                copyText="Copy CSS"
                previewCode
              >
                {tailwindSnippet}
              </CodeFrame>
            </Step>
            <Step number={3} title="Use a theme">
              <p>
                A theme sets the shadcn/ui color tokens to steps of these
                scales. Copy one from{" "}
                <Link href="/themes" className={textLink}>
                  Themes
                </Link>
                , or map the tokens yourself. See{" "}
                <Link
                  href="/components/styling#color-scales"
                  className={textLink}
                >
                  Styling
                </Link>
                .
              </p>
            </Step>
          </ol>
        </div>
      </section>
    </div>
  );
}
