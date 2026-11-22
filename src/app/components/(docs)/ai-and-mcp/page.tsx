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
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { siteUrl } from "@/lib/site-url";

export const metadata = guideMetadata("/components/ai-and-mcp");

const mcpJson = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`;

export default function AiAndMcpPage() {
  const site = siteUrl();
  return (
    <GuidePage href="/components/ai-and-mcp">
      <GuideSection id="mcp" title="Use the MCP server">
        <p>
          The shadcn MCP server lets an AI assistant find and install vip/ui
          components. It reads registries from your <Code>components.json</Code>
          , so{" "}
          <TextLink href="/components/installation#namespace">
            add the namespace
          </TextLink>{" "}
          first.
        </p>
        <p>
          Run the setup command for your client, then restart the client. See
          the{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/mcp">
            shadcn MCP guide
          </ExternalLink>{" "}
          for other clients.
        </p>
        <PackageManagerCommand
          action="run"
          args="shadcn@latest mcp init --client claude"
        />
        <p>Or add the server to your MCP config by hand:</p>
        <CodeSample code={mcpJson} filename=".mcp.json" language="json" />
        <p>Then ask for items by name:</p>
        <List>
          <li>Add @vip-ui/button and @vip-ui/dialog to my project.</li>
          <li>Show me the files in @vip-ui/toast before you install it.</li>
          <li>Build a settings page with vip/ui components.</li>
        </List>
      </GuideSection>

      <GuideSection id="sources" title="Machine-readable sources">
        <List>
          <li>
            <Code>{`${site}/llms.txt`}</Code> lists the guides and all
            components.
          </li>
          <li>
            Add <Code>.md</Code> to a component URL to get short installation
            steps, examples, and the API, for example{" "}
            <Code>{`${site}/components/button.md`}</Code>.
          </li>
          <li>
            <Code>{`${site}/components/installation.md`}</Code> gives the setup
            steps for agents. Other guides have no Markdown copy.
          </li>
          <li>
            <Code>{`${site}/r/registry.json`}</Code> is the registry index. Each
            item is at <Code>{`${site}/r/<name>.json`}</Code>.
          </li>
        </List>
      </GuideSection>

      <GuideSection id="cli" title="Use the CLI">
        <p>
          Agents can use the{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/cli">
            shadcn CLI
          </ExternalLink>
          . <Code>shadcn view @vip-ui/button</Code> shows an item&apos;s
          dependencies, files, and source without changing your project. To
          compare a local file with the registry, see{" "}
          <TextLink href="/components/installation#update">
            Update a component
          </TextLink>
          .
        </p>
      </GuideSection>

      <GuideSection id="skill" title="Install the vip/ui skill">
        <p>
          The vip/ui agent skill tells an agent which components exist and how
          to use them: names, sizes, motion, and color tokens. It does not
          install components.
        </p>
        <PackageManagerCommand
          action="run"
          args="skills add thevipinmishra/vip-ui --skill vip-ui"
        />
        <p>
          The command asks which agents to install the skill for. The skill
          source is in{" "}
          <ExternalLink href="https://github.com/thevipinmishra/vip-ui/tree/main/skills/vip-ui">
            skills/vip-ui
          </ExternalLink>
          .
        </p>
      </GuideSection>
    </GuidePage>
  );
}
