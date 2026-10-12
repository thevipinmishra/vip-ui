import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { GuideHeader, GuidePager } from "@/components/docs/guide-header";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { registryUrl } from "@/lib/registry-docs";

export const metadata: Metadata = {
  title: "Installation | vip/ui",
  description:
    "Set up a React project for vip/ui. Then add components with the shadcn CLI or copy the files.",
};

const componentsJson = `{
  "tsx": true,
  "tailwind": { "css": "src/app/globals.css", "cssVariables": true }
}`;

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
    <article className="max-w-[670px]">
      <GuideHeader
        title="Installation"
        description="Set up your project. Then add components with the shadcn CLI, or copy the files."
      />

      <Section id="requirements" title="Requirements">
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>React 19 and TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>shadcn with CSS variables</li>
        </ul>
        <p>
          vip/ui does not support Tailwind CSS v3, JavaScript-only projects, or
          the shadcn <Code>--no-css-variables</Code> mode.
        </p>
        <p>
          Components do not import from <Code>next/</Code>. You can use them in
          any React 19 app, such as a Vite app.{" "}
          <TextLink href="/blocks">Blocks</TextLink> install as Next.js App
          Router routes, so they need Next.js.
        </p>
      </Section>

      <Section id="setup" title="Prepare your project">
        <p>
          If your project already uses shadcn, go to{" "}
          <TextLink href="#add-component">Add a component</TextLink>.
        </p>
        <p>
          If your project does not have a <Code>components.json</Code> file, run
          the shadcn <Code>init</Code> command. For framework steps, see the{" "}
          <TextLink href="https://ui.shadcn.com/docs/installation">
            shadcn installation guide
          </TextLink>
          .
        </p>
        <PackageManagerCommand action="run" args="shadcn@latest init" />
        <p>
          Make sure that <Code>components.json</Code> has these values.{" "}
          <Code>tailwind.css</Code> is the path to your global CSS file.
        </p>
        <CodeBlock
          code={componentsJson}
          filename="components.json"
          language="json"
        />
      </Section>

      <Section id="add-component" title="Add a component">
        <p>
          Copy the command from a component page, such as{" "}
          <TextLink href="/components/button#installation">Button</TextLink>.
          Run it from your project root.
        </p>
        {buttonUrl ? (
          <PackageManagerCommand
            action="run"
            args={`shadcn@latest add ${buttonUrl}`}
          />
        ) : (
          <p>
            The CLI command shows when the registry has a public URL. Until
            then, use the <TextLink href="#manual">manual steps</TextLink>.
          </p>
        )}
        <p>The CLI does these steps:</p>
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            Adds the component files to a <Code>vip-ui/</Code> folder in your
            components alias.
          </li>
          <li>Installs the packages that the component uses.</li>
          <li>
            Adds the Tailwind plugin and theme variables to your global CSS
            file. It keeps the values that you already set.
          </li>
          <li>
            Does not change the files in your shadcn <Code>components/ui/</Code>{" "}
            folder.
          </li>
        </ul>
      </Section>

      <Section id="usage" title="Usage">
        <p>
          Import the component from the <Code>vip-ui/</Code> folder.
        </p>
        <CodeBlock code={usage} filename="example.tsx" />
        <p>
          Demo code imports from <Code>@/components/vip-ui/</Code>. If your
          alias is different, change the import paths. A demo can use other
          vip/ui components. Add those components too.
        </p>
      </Section>

      <Section id="manual" title="Manual installation">
        <p>Use these steps if you do not use the CLI.</p>
        <ol className="mt-2 grid gap-8">
          <Step number={1} title="Install the Tailwind plugin">
            <p>
              The plugin adds Tailwind variants for React Aria states, such as{" "}
              <Code>selected:</Code> and <Code>pressed:</Code>.
            </p>
            <PackageManagerCommand
              action="add-dev"
              args="tailwindcss-react-aria-components"
            />
          </Step>
          <Step number={2} title="Add the theme styles">
            <p>
              Add this CSS to your global CSS file one time. It adds status
              colors and shadows. All other colors and the radius come from your
              shadcn theme.
            </p>
            <CodeBlock code={setupCss} filename="globals.css" language="css" />
          </Step>
          <Step number={3} title="Install the packages">
            <p>
              Open the Manual tab on the component page. Install the packages
              that it shows.
            </p>
          </Step>
          <Step number={4} title="Copy the files">
            <p>
              Copy each file into a <Code>vip-ui/</Code> folder in your
              components folder. Do not change relative imports, such as{" "}
              <Code>./utils</Code>. Examine existing files before you replace
              them.
            </p>
          </Step>
        </ol>
      </Section>

      <Section id="styles" title="Customize styles">
        <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
          <li>
            To change colors and the radius, edit shadcn tokens, such as{" "}
            <Code>--primary</Code>, in <Code>:root</Code> and <Code>.dark</Code>
            . See the{" "}
            <TextLink href="https://ui.shadcn.com/docs/theming">
              shadcn theming guide
            </TextLink>
            .
          </li>
          <li>
            To use a ready-made palette, copy its CSS from{" "}
            <TextLink href="/themes">Themes</TextLink>.
          </li>
          <li>
            To change a component, edit its file. Some components, such as
            Button and Badge, keep their variants in a Tailwind Variants recipe.
          </li>
        </ul>
      </Section>

      <Section id="portals" title="Portals and dark mode">
        <p>
          Menus, popovers, selects, dialogs, sheets, tooltips, and toasts render
          in a portal on <Code>document.body</Code>. They get theme tokens from
          the document root, not from the trigger.
        </p>
        <p>
          Put the tokens on <Code>:root</Code> and <Code>.dark</Code>. Put the{" "}
          <Code>dark</Code> class on the <Code>html</Code> element.
        </p>
        <p>
          If you set tokens on a different element, use{" "}
          <Code>UNSAFE_PortalProvider</Code> from <Code>react-aria</Code>. Set
          its <Code>getContainer</Code> to return that element. Overlays then
          render inside it.
        </p>
      </Section>

      <GuidePager
        next={{ href: "/components/react-aria", label: "React Aria" }}
      />
    </article>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-28">
      <h2 className="text-[23px] font-semibold tracking-[-0.045em]">{title}</h2>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
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
    <li className="grid gap-3">
      <h3 className="flex items-center gap-3 text-[15px] font-semibold text-foreground">
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full bg-muted font-mono text-xs"
        >
          {number}
        </span>
        {title}
      </h3>
      {children}
    </li>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-foreground">{children}</code>;
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-primary underline underline-offset-4">
      {children}
    </Link>
  );
}
