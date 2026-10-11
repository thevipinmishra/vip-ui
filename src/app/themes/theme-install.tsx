import Link from "next/link";
import type { ReactNode } from "react";
import { CodeFrame } from "@/components/docs/code-frame";
import { type CodeLanguage, CodeSnippet } from "@/components/docs/code-snippet";
import { InstallTabs } from "@/components/docs/install-tabs";
import {
  type PackageManager,
  PackageManagerTabs,
} from "@/components/docs/package-manager-tabs";
import { registryUrl } from "@/lib/registry-docs";
import {
  defaultSpacing,
  fontVariable,
  googleFontsUrl,
  nextFontLayout,
  type OfficialTheme,
  themeCss,
  themeFamilies,
} from "./official-themes";

const highlighted = new Map<string, Promise<ReactNode>>();

function snippet(code: string, language: CodeLanguage) {
  const key = `${language}\0${code}`;
  let result = highlighted.get(key);
  if (!result) {
    result = CodeSnippet({ code, language });
    highlighted.set(key, result);
  }
  return result;
}

const runCommand: Record<PackageManager, string> = {
  npm: "npx",
  yarn: "yarn dlx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

async function CliCommand({ url }: { url: string }) {
  const managers = Object.keys(runCommand) as PackageManager[];
  const commands = Object.fromEntries(
    managers.map((manager) => [
      manager,
      `${runCommand[manager]} shadcn@latest add ${url}`,
    ]),
  ) as Record<PackageManager, string>;
  const snippets = await Promise.all(
    managers.map((manager) => snippet(commands[manager], "bash")),
  );
  return (
    <PackageManagerTabs commands={commands}>{snippets}</PackageManagerTabs>
  );
}

function Step({
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

const code =
  "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground";

export async function ThemeInstall({ theme }: { theme: OfficialTheme }) {
  const css = themeCss(theme);
  const layout = nextFontLayout(theme);
  const fontsUrl = googleFontsUrl(theme);
  const url = registryUrl(`theme-${theme.slug}`);
  const [cssSnippet, layoutSnippet, linkSnippet] = await Promise.all([
    snippet(css, "css"),
    snippet(layout, "tsx"),
    snippet(`<link rel="stylesheet" href="${fontsUrl}" />`, "tsx"),
  ]);
  const manual = (
    <div className="grid gap-4">
      <p>
        Paste after the <code className={code}>:root</code> and{" "}
        <code className={code}>.dark</code> rules in your global stylesheet.
      </p>
      <CodeFrame
        code={css}
        filename="globals.css"
        copyText="Copy CSS"
        previewCode
      >
        {cssSnippet}
      </CodeFrame>
    </div>
  );

  return (
    <ol className="grid gap-12">
      <Step number={1} title="Add the theme">
        <p>
          It sets every shadcn/ui variable, including sidebar and charts, plus
          the success, warning, and shadow tokens vip/ui components use. Start
          with{" "}
          <Link
            href="/components/installation"
            className="font-medium text-foreground underline underline-offset-4"
          >
            vip/ui setup
          </Link>{" "}
          if this is a new project.
        </p>
        {url ? (
          <InstallTabs
            cliAvailable
            cli={
              <div className="grid gap-4">
                <p>The shadcn CLI writes the variables into your CSS.</p>
                <CliCommand url={url} />
              </div>
            }
            custom={manual}
          />
        ) : (
          manual
        )}
      </Step>
      <Step number={2} title="Load the fonts">
        <p>
          {theme.name} uses {themeFamilies(theme).join(", ")}. Load them with
          next/font and put their variables on{" "}
          <code className={code}>{"<html>"}</code>, where the theme reads{" "}
          {themeFamilies(theme).map((family, index, all) => (
            <span key={family}>
              <code className={code}>{fontVariable(family)}</code>
              {index < all.length - 2
                ? ", "
                : index === all.length - 2
                  ? " and "
                  : ""}
            </span>
          ))}
          .
        </p>
        <CodeFrame code={layout} filename="app/layout.tsx" previewCode>
          {layoutSnippet}
        </CodeFrame>
        <p>
          Not on Next.js? Add the Google Fonts stylesheet instead. The theme
          falls back to the family names it registers.
        </p>
        <CodeFrame
          code={`<link rel="stylesheet" href="${fontsUrl}" />`}
          filename="index.html"
        >
          {linkSnippet}
        </CodeFrame>
      </Step>
      <Step number={3} title="Check the details">
        <ul className="grid list-disc gap-2 pl-5 marker:text-border">
          <li>
            Components follow <code className={code}>--radius</code> (
            {theme.radius}) through the shadcn scale: sm is 0.6×, md 0.8×, xl
            1.4×.
          </li>
          {theme.spacing !== defaultSpacing && (
            <li>
              <code className={code}>--spacing: {theme.spacing}</code> makes the
              theme {theme.traits.density.toLowerCase()}: every Tailwind
              padding, gap, and size scales with it. Delete the line to keep the
              default {defaultSpacing}.
            </li>
          )}
          <li>
            Dark mode follows the <code className={code}>.dark</code> class, the
            same as shadcn/ui.
          </li>
        </ul>
      </Step>
    </ol>
  );
}
