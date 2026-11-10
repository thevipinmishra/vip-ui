import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { inlineCode, Step, textLink } from "@/app/themes/theme-install";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { CopyButton } from "@/components/docs/copy-button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { buttonLinkStyles } from "@/components/ui/button-styles";
import { findPalette, paletteCss, paletteTailwindCss } from "@/lib/palettes";
import { pageMetadata } from "@/lib/seo";
import { ColorScales } from "./color-scales";

const blue = findPalette("blue").light;
const ramp = [2, 4, 6, 8, 9, 10].map((index) => blue[index]);

export const metadata = pageMetadata({
  title: "Colors",
  description:
    "Accessible OKLCH color scales with 12 steps each, designed for light and dark themes and Tailwind CSS.",
  path: "/colors",
  image: "file",
});

export default function ColorsPage() {
  const css = paletteCss();
  const tailwind = paletteTailwindCss();

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-14">
      <PageHeader className="site-container relative isolate items-center pt-12 text-center sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-96 max-w-5xl rounded-full opacity-70 blur-3xl"
          style={{
            background: `radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, ${blue[8]} 18%, transparent) 0%, transparent 70%)`,
          }}
        />
        <span aria-hidden="true" className="flex h-7 items-center opacity-90">
          <span className="flex h-4 overflow-clip rounded-full ring-1 ring-foreground/10">
            {ramp.map((color) => (
              <span
                key={color}
                className="w-2.5"
                style={{ background: color }}
              />
            ))}
          </span>
        </span>
        <PageHeaderHeading size="lg">
          Color, with every detail considered.
        </PageHeaderHeading>
        <PageHeaderDescription>
          A refined collection of accessible color scales for modern interfaces.
          Explore balanced palettes with 12 carefully defined steps, designed
          for light and dark themes and built for Tailwind CSS v4.
        </PageHeaderDescription>
        <PageActions className="mt-2 justify-center">
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
        className="site-container scroll-mt-8"
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
                <CodeSnippet code={css} language="css" />
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
                <CodeSnippet code={tailwind} language="css" />
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
