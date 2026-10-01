import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { GuideHeader } from "@/components/docs/guide-header";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";

export const metadata: Metadata = {
  title: "Installation | vip/ui",
  description:
    "Install vip/ui in a React project with shadcn, TypeScript, and Tailwind CSS v4. Keep your existing theme and choose CLI or manual installation.",
};

export default async function InstallationPage() {
  const setupCss = await readFile(
    path.join(process.cwd(), "public/r/setup.css"),
    "utf8",
  );

  return (
    <article>
      <GuideHeader title="Installation" />
      <section id="setup" className="mt-14 scroll-mt-24 space-y-4">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Set up your project
        </h2>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          vip/ui components work in React projects with TypeScript, Tailwind CSS
          v4, and shadcn theme tokens. They are not tied to Next.js. The
          complete app examples are separate Next.js App Router blocks.
        </p>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Follow the{" "}
          <Link
            href="https://ui.shadcn.com/docs/installation"
            className="text-primary underline underline-offset-4"
          >
            shadcn installation guide
          </Link>{" "}
          for your framework, whether you are starting a new app or adding
          shadcn to an existing one. For CLI installs, you need a{" "}
          <code className="font-mono text-foreground">components.json</code> in
          the project root. If you do not have one yet, run:
        </p>
        <PackageManagerCommand action="run" args="shadcn@latest init" />
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Keep the configuration created for your app. In{" "}
          <code className="font-mono text-foreground">components.json</code>,
          check that <code className="font-mono text-foreground">tsx</code> and{" "}
          <code className="font-mono text-foreground">
            tailwind.cssVariables
          </code>{" "}
          are <code className="font-mono text-foreground">true</code>. For
          Tailwind v4,{" "}
          <code className="font-mono text-foreground">tailwind.config</code> is
          empty, and{" "}
          <code className="font-mono text-foreground">tailwind.css</code> points
          to the global stylesheet that imports Tailwind. Do not change your
          initialized style or base color. The CLI uses{" "}
          <code className="font-mono text-foreground">aliases.components</code>{" "}
          to place files in its{" "}
          <code className="font-mono text-foreground">vip-ui/</code>{" "}
          subdirectory; it does not replace your existing{" "}
          <code className="font-mono text-foreground">aliases.ui</code>{" "}
          components. Make sure your import aliases resolve in TypeScript and
          your bundler. See the{" "}
          <Link
            href="https://ui.shadcn.com/docs/components-json"
            className="text-primary underline underline-offset-4"
          >
            components.json reference
          </Link>{" "}
          if you use custom paths.
        </p>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Copying files manually does not require the CLI or{" "}
          <code className="font-mono text-foreground">components.json</code>.
          You still need TypeScript, Tailwind v4, the shadcn CSS variables and
          their <code className="font-mono text-foreground">@theme inline</code>{" "}
          mappings. Install the packages listed on the component page, including{" "}
          <code className="font-mono text-foreground">tailwind-variants</code>{" "}
          when required. Copy the local{" "}
          <code className="font-mono text-foreground">utils.ts</code> along with
          the component files; you do not need to change your shadcn{" "}
          <code className="font-mono text-foreground">lib/utils.ts</code>.
          Tailwind v3, JavaScript-only installs ({" "}
          <code className="font-mono text-foreground">tsx: false</code>), and{" "}
          shadcn&apos;s{" "}
          <code className="font-mono text-foreground">--no-css-variables</code>{" "}
          mode are not supported by these TSX components and semantic styles.
        </p>
      </section>

      <section id="theme" className="mt-12 scroll-mt-24 space-y-4">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Extend your theme
        </h2>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Append this CSS once to the file named by{" "}
          <code className="font-mono text-foreground">tailwind.css</code> in
          your{" "}
          <code className="font-mono text-foreground">components.json</code> (or
          your global Tailwind stylesheet if copying manually). The extra{" "}
          <code className="font-mono text-foreground">:root</code>,{" "}
          <code className="font-mono text-foreground">.dark</code>, and{" "}
          <code className="font-mono text-foreground">@theme inline</code>{" "}
          blocks extend the existing shadcn ones. They add success and warning
          roles, shadows, and shared overlay and skeleton styles. They do not
          replace shadcn colors or radius tokens.
        </p>
        <CodeBlock code={setupCss} filename="global.css" language="css" />
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          To change the look of installed components, edit your shadcn tokens
          such as <code className="font-mono text-foreground">--primary</code>,{" "}
          <code className="font-mono text-foreground">--accent</code>, and{" "}
          <code className="font-mono text-foreground">--radius</code> in both{" "}
          <code className="font-mono text-foreground">:root</code> and{" "}
          <code className="font-mono text-foreground">.dark</code>. Set the{" "}
          <code className="font-mono text-foreground">.dark</code> class using
          your framework&apos;s dark-mode setup. You can adjust the extra
          success and warning colors there too. Read the{" "}
          <Link
            href="https://ui.shadcn.com/docs/theming"
            className="text-primary underline underline-offset-4"
          >
            shadcn theming guide
          </Link>{" "}
          for the standard token pairs and dark mode conventions.
        </p>
      </section>

      <section id="styles" className="mt-12 scroll-mt-24 space-y-4">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Customize styles
        </h2>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Component variants use Tailwind Variants recipes. Change reusable
          colors and sizes in the installed component recipe; pass{" "}
          <code className="font-mono text-foreground">className</code> for
          one-off layout changes. The local{" "}
          <code className="font-mono text-foreground">cn</code> helper wraps
          Tailwind Variants&apos; merging helper. Read the{" "}
          <Link
            href="https://www.tailwind-variants.org/docs/class-resolution"
            className="text-primary underline underline-offset-4"
          >
            class resolution guide
          </Link>{" "}
          for conflict rules and the{" "}
          <Link
            href="https://www.tailwind-variants.org/docs/variants"
            className="text-primary underline underline-offset-4"
          >
            variants guide
          </Link>{" "}
          for recipe syntax.
        </p>
      </section>

      <section id="install-component" className="mt-12 scroll-mt-24 space-y-4">
        <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
          Install a component
        </h2>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          Open a{" "}
          <Link
            href="/components/button#installation"
            className="text-primary underline underline-offset-4"
          >
            component page
          </Link>
          . Its CLI tab gives the URL of the installable registry item when the
          site has a configured registry origin. Run that command from your app
          root. The CLI installs required packages and files under{" "}
          <code className="font-mono text-foreground">
            aliases.components/vip-ui/
          </code>
          , including a local{" "}
          <code className="font-mono text-foreground">utils.ts</code> when
          needed. It leaves your shadcn{" "}
          <code className="font-mono text-foreground">components/ui/</code> and{" "}
          <code className="font-mono text-foreground">lib/utils.ts</code> alone.
        </p>
        <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
          The Custom tab lists packages and every required file, including the
          local <code className="font-mono text-foreground">utils.ts</code> when
          used. Copy them to{" "}
          <code className="font-mono text-foreground">vip-ui/</code> inside your
          components directory. Keep relative imports such as{" "}
          <code className="font-mono text-foreground">./utils</code>. Check
          existing files before replacing them. Neither method installs the
          site&apos;s palette picker or changes your shadcn theme.
        </p>
      </section>
    </article>
  );
}
