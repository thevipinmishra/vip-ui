import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { GuideHeader } from "@/components/docs/guide-header";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { registryUrl } from "@/lib/registry-docs";

export const metadata: Metadata = {
  title: "Installation | vip/ui",
  description:
    "Install vip/ui in a TypeScript project with Tailwind CSS v4 and shadcn theme tokens. Add the theme styles once, then install components by URL.",
};

const usage = `import { Button } from "@/components/vip-ui/button";

export function Example() {
  return <Button>Save changes</Button>;
}`;

export default async function InstallationPage() {
  const setupCss = await readFile(
    path.join(process.cwd(), "public/r/setup.css"),
    "utf8",
  );
  const buttonUrl = registryUrl("button");

  return (
    <article>
      <GuideHeader title="Installation" />
      <div className="mt-8 max-w-[670px] text-sm leading-7 text-muted-foreground">
        <p>
          Start with a TypeScript app using Tailwind CSS v4 and shadcn
          CSS-variable theming. Keep your existing shadcn components and colors.
          vip/ui adds its own files alongside them.
        </p>
      </div>

      <section id="setup" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Prepare your project
        </h2>
        <div className="mt-4 grid max-w-[670px] gap-4 text-sm leading-7 text-muted-foreground">
          <p>
            Follow the{" "}
            <Link
              href="https://ui.shadcn.com/docs/installation"
              className="text-primary underline underline-offset-4"
            >
              shadcn installation guide
            </Link>{" "}
            for your framework. vip/ui works in React apps and is not tied to
            Next.js. Use the CLI to initialize shadcn in an existing app if it
            does not already have a{" "}
            <code className="font-mono text-foreground">components.json</code>:
          </p>
          <PackageManagerCommand action="run" args="shadcn@latest init" />
          <p>
            Keep the generated configuration. Check that{" "}
            <code className="font-mono text-foreground">tsx</code> and{" "}
            <code className="font-mono text-foreground">
              tailwind.cssVariables
            </code>{" "}
            are <code className="font-mono text-foreground">true</code>, and
            that <code className="font-mono text-foreground">tailwind.css</code>{" "}
            points to your global stylesheet. Your components alias determines
            where the CLI places the new{" "}
            <code className="font-mono text-foreground">vip-ui/</code> folder.
          </p>
        </div>
      </section>

      <section id="theme" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Add the theme styles
        </h2>
        <p className="mb-5 mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          Append this CSS once to the stylesheet named by{" "}
          <code className="font-mono text-foreground">tailwind.css</code> in{" "}
          <code className="font-mono text-foreground">components.json</code>. It
          adds status colors, shadows, and shared overlay styles without
          replacing your shadcn colors or radius. If you install manually, add
          it to your global Tailwind stylesheet instead.
        </p>
        <CodeBlock code={setupCss} filename="global.css" language="css" />
      </section>

      <section id="install-component" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Add a component
        </h2>
        <div className="mt-4 grid max-w-[670px] gap-4 text-sm leading-7 text-muted-foreground">
          <p>
            Open the{" "}
            <Link
              href="/components/button#installation"
              className="text-primary underline underline-offset-4"
            >
              Button installation steps
            </Link>{" "}
            or choose another component from the sidebar. Run its CLI command
            from your app root. The CLI installs the dependencies and files
            under{" "}
            <code className="font-mono text-foreground">
              aliases.components/vip-ui/
            </code>
            ; it does not overwrite your shadcn{" "}
            <code className="font-mono text-foreground">components/ui/</code>.
          </p>
          {buttonUrl && (
            <PackageManagerCommand
              action="run"
              args={`shadcn@latest add ${buttonUrl}`}
            />
          )}
          {!buttonUrl && (
            <p>
              The CLI command appears on the component page when the registry
              has a public URL. Until then, use its Custom tab to install the
              files manually.
            </p>
          )}
          <p>
            Import from the installed folder. If you use a custom components
            alias, adjust the path to match your project.
          </p>
        </div>
        <div className="mt-5">
          <CodeBlock code={usage} filename="example.tsx" />
        </div>
      </section>

      <section id="manual" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Install manually
        </h2>
        <div className="mt-4 grid max-w-[670px] gap-4 text-sm leading-7 text-muted-foreground">
          <p>
            You can skip the CLI. On each component page, the Custom tab lists
            its packages and every file to copy, including a local{" "}
            <code className="font-mono text-foreground">utils.ts</code> where
            needed. Put the files in{" "}
            <code className="font-mono text-foreground">vip-ui/</code> under
            your components directory. Keep relative imports such as{" "}
            <code className="font-mono text-foreground">./utils</code> and
            review existing files before replacing anything.
          </p>
          <p>
            Manual installs still require TypeScript, Tailwind v4, shadcn CSS
            variables, and the theme styles above. Tailwind v3, JavaScript-only
            installs, and shadcn&apos;s{" "}
            <code className="font-mono text-foreground">
              --no-css-variables
            </code>{" "}
            mode are not supported.
          </p>
        </div>
      </section>

      <section id="styles" className="mt-14 scroll-mt-28">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Customize styles
        </h2>
        <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
          Change shadcn tokens such as{" "}
          <code className="font-mono text-foreground">--primary</code> and{" "}
          <code className="font-mono text-foreground">--accent</code> in both{" "}
          <code className="font-mono text-foreground">:root</code> and{" "}
          <code className="font-mono text-foreground">.dark</code>. Edit an
          installed component&apos;s Tailwind Variants recipe to change its
          reusable sizes or states. See the{" "}
          <Link
            href="https://ui.shadcn.com/docs/theming"
            className="text-primary underline underline-offset-4"
          >
            shadcn theming guide
          </Link>{" "}
          for standard color roles.
        </p>
      </section>
    </article>
  );
}
