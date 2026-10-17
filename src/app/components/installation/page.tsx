import { readFile } from "node:fs/promises";
import path from "node:path";
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
import { InstallStep } from "@/components/docs/install-step";
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import {
  displayPath,
  fileName,
  readSharedFile,
  registryUrl,
  type SharedFileSlug,
  sharedFiles,
} from "@/lib/registry-docs";

export const metadata = guideMetadata("/components/installation");

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
  const shared = await Promise.all(
    (Object.keys(sharedFiles) as SharedFileSlug[]).map(async (slug) => ({
      slug,
      description: sharedFiles[slug],
      file: await readSharedFile(slug),
    })),
  );

  return (
    <GuidePage href="/components/installation">
      <GuideSection id="requirements" title="Requirements">
        <List>
          <li>React 19 and TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>A shadcn theme with CSS variables</li>
        </List>
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
      </GuideSection>

      <GuideSection id="setup" title="Set up your project">
        <p>
          If your project does not have a <Code>components.json</Code> file, run
          the shadcn <Code>init</Code> command. For framework steps, see the{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/installation">
            shadcn installation guide
          </ExternalLink>
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
      </GuideSection>

      <GuideSection id="add-component" title="Add a component">
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
        <List>
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
        </List>
      </GuideSection>

      <GuideSection id="manual" title="Install manually">
        <p>Use these steps if you do not use the CLI.</p>
        <ol className="mt-2 grid gap-8">
          <InstallStep number={1} title="Install the Tailwind plugin">
            <p>
              The plugin adds Tailwind variants for React Aria states, such as{" "}
              <Code>selected:</Code> and <Code>pressed:</Code>.
            </p>
            <PackageManagerCommand
              action="add-dev"
              args="tailwindcss-react-aria-components"
            />
          </InstallStep>
          <InstallStep number={2} title="Add the theme styles">
            <p>
              Add this CSS to your global CSS file one time. It loads the plugin
              and adds status colors, shadows, and easing curves. All other
              colors and the radius come from your shadcn theme.
            </p>
            <CodeBlock code={setupCss} filename="globals.css" language="css" />
          </InstallStep>
          <InstallStep number={3} title="Install the packages">
            <p>
              Open the Manual tab on the component page. Install the packages
              that it shows.
            </p>
          </InstallStep>
          <InstallStep number={4} title="Copy the files">
            <p>
              Copy the component file into a <Code>vip-ui/</Code> folder in your
              components folder. Then add the required files that the Manual tab
              shows. Do not change relative imports, such as{" "}
              <Code>./utils</Code>. Examine existing files before you replace
              them.
            </p>
          </InstallStep>
        </ol>
      </GuideSection>

      <GuideSection id="usage" title="Import a component">
        <p>
          Import the component from the <Code>vip-ui/</Code> folder.
        </p>
        <CodeBlock code={usage} filename="example.tsx" />
        <p>
          Demo code imports from <Code>@/components/vip-ui/</Code>. If your
          alias is different, change the import paths. A demo can use other
          vip/ui components. Add those components too.
        </p>
      </GuideSection>

      <GuideSection id="shared-files" title="Shared files">
        <p>
          Many components use these files. The CLI adds them for you. For a
          manual installation, add each file one time.
        </p>
        {shared.map(({ slug, description, file }) => (
          <div
            key={slug}
            id={`file-${slug}`}
            className="grid scroll-mt-28 gap-3"
          >
            <h3 className="font-mono text-[15px] font-semibold text-foreground">
              {fileName(file)}
            </h3>
            <p>{description}</p>
            <CodeBlock code={file.content} filename={displayPath(file)} />
          </div>
        ))}
      </GuideSection>
    </GuidePage>
  );
}
