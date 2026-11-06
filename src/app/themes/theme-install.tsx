import Link from "next/link";
import type { ReactNode } from "react";
import { CodeFrame } from "@/components/docs/code-frame";
import { CodeSnippet } from "@/components/docs/code-snippet";
import { type Theme, themeCss } from "./themes";

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid min-w-0 gap-4 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
      <div className="flex items-center gap-3 md:items-start md:pt-1">
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground"
        >
          {number}
        </span>
        <h3 className="text-base font-semibold tracking-[-0.02em]">{title}</h3>
      </div>
      <div className="grid min-w-0 gap-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </li>
  );
}

export const inlineCode =
  "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] whitespace-nowrap text-foreground";

export const textLink =
  "font-medium text-foreground underline underline-offset-4";

export function ThemeInstall({ theme }: { theme: Theme }) {
  const css = themeCss(theme);

  return (
    <ol className="grid gap-12">
      <Step number={1} title="Add the theme">
        <p>
          Paste the CSS after the <code className={inlineCode}>:root</code> and{" "}
          <code className={inlineCode}>.dark</code> rules in your global CSS
          file. It sets every shadcn/ui color, including the sidebar and chart
          colors, and the success and warning colors that vip/ui uses. For a new
          project, start with the{" "}
          <Link href="/components/installation" className={textLink}>
            installation guide
          </Link>
          .
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
      <Step number={2} title="Check the details">
        <ul className="grid list-disc gap-2 pl-5 marker:text-border">
          <li>
            Each value is a step of a{" "}
            <Link href="/colors" className={textLink}>
              color scale
            </Link>
            . The Tokens tab shows the step for each token.
          </li>
          <li>
            The theme sets colors only. Your fonts, radius, and shadows do not
            change.
          </li>
          <li>
            Dark mode uses the <code className={inlineCode}>.dark</code> class,
            the same as shadcn/ui.
          </li>
        </ul>
      </Step>
    </ol>
  );
}
