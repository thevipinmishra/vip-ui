import { readFile } from "node:fs/promises";
import path from "node:path";
import { registryUrl } from "@/lib/registry-docs";
import { CodeBlock } from "./code-block";
import { CodeFrame } from "./code-frame";
import { CodeSnippet } from "./code-snippet";
import { InstallTabs } from "./install-tabs";
import { PackageManagerCommand } from "./package-manager-command";

const importCss = `@import "tailwindcss";
@import "./typography.css";`;

const note = "text-[13px] leading-6 text-muted-foreground";

export async function TypographyInstall() {
  const stylesheet = (
    await readFile(path.join(process.cwd(), "src/app/typography.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  const cliUrl = registryUrl("typography");
  return (
    <InstallTabs
      cliAvailable={Boolean(cliUrl)}
      cli={
        <div className="space-y-4">
          <p className={note}>
            The CLI adds the styles and the theme variables they use to your CSS
            file.
          </p>
          {cliUrl ? (
            <PackageManagerCommand
              action="run"
              args={`shadcn@latest add ${cliUrl}`}
            />
          ) : (
            <p className={note}>
              The CLI command shows when the registry has a public URL. Until
              then, use the Manual tab.
            </p>
          )}
        </div>
      }
      custom={
        <div className="space-y-4">
          <p className={note}>
            Copy the file next to your CSS file. Then import it after Tailwind.
          </p>
          <CodeFrame code={stylesheet} filename="typography.css" previewCode>
            <CodeSnippet code={stylesheet} language="css" />
          </CodeFrame>
          <CodeBlock code={importCss} filename="globals.css" language="css" />
        </div>
      }
    />
  );
}
