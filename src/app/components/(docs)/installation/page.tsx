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
import { Alert } from "@/components/ui/alert";
import {
  displayPath,
  fileName,
  readSharedFile,
  registryNamespace,
  registryNamespaceUrl,
  registryUrl,
  type SharedFileSlug,
  sharedFiles,
} from "@/lib/registry-docs";

export const metadata = guideMetadata("/components/installation");

const componentsJson = `{
  "tsx": true,
  "tailwind": { "css": "src/index.css", "cssVariables": true }
}`;

function namespaceJson(url: string) {
  return JSON.stringify({ registries: { [registryNamespace]: url } }, null, 2);
}

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
  const namespaceUrl = registryNamespaceUrl();
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
          <li>React 19</li>
          <li>TypeScript</li>
          <li>Tailwind CSS v4.1 or later</li>
          <li>A shadcn/ui theme that uses CSS variables</li>
        </List>
        <Alert variant="warning" title="Not supported">
          Tailwind CSS v3, JavaScript projects, and projects that set{" "}
          <Code>tailwind.cssVariables</Code> to <Code>false</Code>.
        </Alert>
      </GuideSection>

      <GuideSection id="setup" title="Set up your project">
        <p>
          vip/ui uses the shadcn CLI and the shadcn/ui color tokens. If your
          project does not have a <Code>components.json</Code> file, run the
          shadcn <Code>init</Code> command. For the steps for your framework,
          see the{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/installation">
            shadcn/ui installation guide
          </ExternalLink>
          .
        </p>
        <PackageManagerCommand action="run" args="shadcn@latest init" />
        <p>
          Make sure that <Code>components.json</Code> has these values. Set{" "}
          <Code>tailwind.css</Code> to the path of your global CSS file.
        </p>
        <CodeBlock
          code={componentsJson}
          filename="components.json"
          language="json"
        />
        <Alert variant="neutral" title="Not using the CLI?">
          A manual installation does not need <Code>components.json</Code>. Go
          to <TextLink href="#manual">Install manually</TextLink>.
        </Alert>
      </GuideSection>

      <GuideSection id="theme" title="Add a theme">
        <p>
          Components use the shadcn/ui color tokens, such as{" "}
          <Code>--primary</Code> and <Code>--border</Code>. Your current theme
          works with no changes.
        </p>
        <p>To use the vip/ui colors:</p>
        <List>
          <li>
            Open <TextLink href="/themes">Themes</TextLink> and select a theme.
          </li>
          <li>
            Copy its CSS into your global CSS file, after the <Code>:root</Code>{" "}
            and <Code>.dark</Code> rules.
          </li>
        </List>
        <p>
          Each theme sets the color tokens to steps of the{" "}
          <TextLink href="/colors">color scales</TextLink>. To use the scales in
          your own styles, such as <Code>bg-blue-3</Code>, copy their CSS from
          Colors.
        </p>
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
            Adds the component to a <Code>vip-ui/</Code> folder in your{" "}
            <Code>components</Code> alias.
          </li>
          <li>
            Adds the files that the component needs, such as{" "}
            <Code>utils.ts</Code> and <Code>popover.tsx</Code>. Components share
            one copy of each file.
          </li>
          <li>Installs the npm packages that the component uses.</li>
          <li>
            Adds the Tailwind plugin and the theme variables to your global CSS
            file.
          </li>
        </List>
        <Alert variant="success" title="Safe for existing shadcn/ui projects">
          The CLI does not change the files in your <Code>components/ui/</Code>{" "}
          folder or your shadcn <Code>utils.ts</Code> file. It keeps the CSS
          variable values that you already set.
        </Alert>
      </GuideSection>

      {namespaceUrl ? (
        <GuideSection id="namespace" title="Add the namespace">
          <p>
            Add vip/ui to the <Code>registries</Code> in your{" "}
            <Code>components.json</Code>. Keep your other values.
          </p>
          <CodeBlock
            code={namespaceJson(namespaceUrl)}
            filename="components.json"
            language="json"
          />
          <p>
            Then add items by name. Item names start with <Code>vip-</Code>.
          </p>
          <PackageManagerCommand
            action="run"
            args={`shadcn@latest add ${registryNamespace}/vip-button`}
          />
        </GuideSection>
      ) : null}

      <GuideSection id="manual" title="Install manually">
        <p>
          Use these steps if you do not use the CLI. Do steps 1 and 2 one time
          for each project.
        </p>
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
              Add this CSS to your global CSS file, after the{" "}
              <Code>@import "tailwindcss"</Code> line. It loads the plugin and
              adds the status colors, shadows, and easing curves that components
              use. The other colors and the radius come from your theme.
            </p>
            <CodeBlock code={setupCss} filename="index.css" language="css" />
          </InstallStep>
          <InstallStep number={3} title="Add a component">
            <p>
              Open the Manual tab on the component page. Install the packages
              and copy the files that it shows into a <Code>vip-ui/</Code>{" "}
              folder in your components folder.
            </p>
          </InstallStep>
        </ol>
        <Alert variant="warning" title="Keep the files in one folder">
          Files import each other with relative paths, such as{" "}
          <Code>./utils</Code>. Put all vip/ui files in the same folder, and do
          not change these imports.
        </Alert>
      </GuideSection>

      <GuideSection id="usage" title="Import a component">
        <p>
          Import the component from the <Code>vip-ui/</Code> folder.
        </p>
        <CodeBlock code={usage} filename="example.tsx" />
        <Alert variant="neutral" title="Demo imports">
          Demo code imports from <Code>@/components/vip-ui/</Code>. If your
          alias is different, change the import paths. A demo can use other
          vip/ui components. Add those components too.
        </Alert>
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
            className="grid scroll-mt-8 gap-3"
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
