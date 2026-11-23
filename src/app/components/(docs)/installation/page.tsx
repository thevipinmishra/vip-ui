import { readFile } from "node:fs/promises";
import path from "node:path";
import { AgentPrompt } from "@/components/docs/agent-prompt";
import { CodeSample } from "@/components/docs/code-sample";
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
import { setupPrompt } from "@/lib/agent-docs";
import {
  displayPath,
  fileName,
  readSharedFile,
  registryNamespace,
  registryUrl,
  type SharedFileSlug,
  sharedFiles,
} from "@/lib/registry-docs";
import { agentSiteUrl } from "@/lib/site-url";

export const metadata = guideMetadata("/components/installation");

const componentsJson = `{
  "tsx": true,
  "tailwind": { "css": "src/index.css", "cssVariables": true }
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
  const themeUrl = registryUrl("theme-blue");
  const scaleUrl = registryUrl("blue");
  const shared = await Promise.all(
    (Object.keys(sharedFiles) as SharedFileSlug[]).map(async (slug) => ({
      slug,
      description: sharedFiles[slug],
      file: await readSharedFile(slug),
    })),
  );

  return (
    <GuidePage href="/components/installation">
      <GuideSection id="agent" title="Set up with an agent">
        <p>
          Give this prompt to your coding agent. To install without an agent,
          use the steps that follow.
        </p>
        <AgentPrompt prompt={setupPrompt(agentSiteUrl())} />
        <p>
          For the vip/ui skill, the MCP server, and Markdown sources, see the{" "}
          <TextLink href="/components/agents">Agents guide</TextLink>.
        </p>
      </GuideSection>

      <GuideSection id="requirements" title="Requirements">
        <List>
          <li>React 19</li>
          <li>TypeScript</li>
          <li>Tailwind CSS v4.1 or later</li>
          <li>A shadcn/ui theme that uses CSS variables</li>
          <li>
            shadcn CLI 4.7.0 or later. An older CLI puts files in the wrong
            folder.
          </li>
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
        <Alert variant="warning" title="Do you have a theme?">
          <Code>init</Code> can replace it. To keep it, follow the{" "}
          <ExternalLink href="/components/installation.md#existing-theme">
            existing theme steps
          </ExternalLink>{" "}
          instead.
        </Alert>
        <p>
          Make sure that <Code>components.json</Code> has these values. Set{" "}
          <Code>tailwind.css</Code> to the path of your global CSS file.
        </p>
        <CodeSample
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
        <p>
          To use the vip/ui colors, open{" "}
          <TextLink href="/themes">Themes</TextLink> and select a theme. Run the
          command that it shows, or copy its CSS into your global CSS file.
        </p>
        {themeUrl ? (
          <PackageManagerCommand
            action="run"
            args={`shadcn@latest add ${themeUrl}`}
          />
        ) : null}
        <p>
          Each theme sets the color tokens to steps of the{" "}
          <TextLink href="/colors">color scales</TextLink>. To use a scale in
          your own styles, such as <Code>bg-blue-3</Code>, add it.
        </p>
        {scaleUrl ? (
          <PackageManagerCommand
            action="run"
            args={`shadcn@latest add ${scaleUrl}`}
          />
        ) : (
          <p>Copy the scale CSS from Colors.</p>
        )}
      </GuideSection>

      <GuideSection id="install-by-name" title="Install by name">
        <p>
          Add a component by name. You do not need to add vip/ui to{" "}
          <Code>components.json</Code> first. The CLI finds it in the public
          registry directory.
        </p>
        <PackageManagerCommand
          action="run"
          args={`shadcn@latest add ${registryNamespace}/button`}
        />
        {buttonUrl ? (
          <>
            <p>
              To install from a specific registry URL, such as a local or
              preview deploy, use the URL instead:
            </p>
            <PackageManagerCommand
              action="run"
              args={`shadcn@latest add ${buttonUrl}`}
            />
          </>
        ) : null}
        <p>
          The first install by name writes the vip/ui registry to{" "}
          <Code>components.json</Code>. The shadcn MCP server reads that file,
          so it can find vip/ui after one install.
        </p>
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
          <li>
            Installs the npm packages that the component uses. Icons come from{" "}
            <Code>@phosphor-icons/react</Code>, also in a project that uses
            Lucide.
          </li>
          <li>
            Adds the Tailwind plugin and the theme variables to your global CSS
            file.
          </li>
        </List>
        <Alert variant="neutral" title="Existing shadcn/ui projects">
          The CLI does not change the files in your <Code>components/ui/</Code>{" "}
          folder or your shadcn <Code>utils.ts</Code> file. It can override CSS
          variable values from imported files or <Code>@theme</Code>. Check the
          changes to your CSS.
        </Alert>
        <Alert variant="warning" title="Did you edit vip/ui files?">
          Commit your work first. If the CLI asks to overwrite a file that you
          edited, answer No. The CLI can still change its imports. Check the
          file after the install.
        </Alert>
      </GuideSection>

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
              action="add"
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
            <CodeSample code={setupCss} filename="index.css" language="css" />
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
        <CodeSample code={usage} filename="example.tsx" />
        <Alert variant="neutral" title="Demo imports">
          Demo code imports from <Code>@/components/vip-ui/</Code>. If your
          alias is different, change the import paths. A demo can use other
          vip/ui components. Add those components too.
        </Alert>
      </GuideSection>

      <GuideSection id="update" title="Update a component">
        <p>Commit your work first. Then see which files change.</p>
        <PackageManagerCommand
          action="run"
          args={`shadcn@latest add ${registryNamespace}/button --dry-run`}
        />
        <p>
          To see the changes in a file, use <Code>--diff &lt;path&gt;</Code> in
          place of <Code>--dry-run</Code>. If you did not edit the files that
          show <Code>overwrite</Code>, use <Code>--overwrite</Code>. The{" "}
          <ExternalLink href="https://github.com/thevipinmishra/vip-ui/blob/main/CHANGELOG.md">
            changelog
          </ExternalLink>{" "}
          lists breaking changes.
        </p>
        <Alert variant="warning" title="Keep your edits">
          <Code>--overwrite</Code> also replaces shared files, such as{" "}
          <Code>utils.ts</Code>. If you edited one of these files, do not use
          it. Copy the changes into your file instead.
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
            <CodeSample code={file.content} filename={displayPath(file)} />
          </div>
        ))}
      </GuideSection>
    </GuidePage>
  );
}
