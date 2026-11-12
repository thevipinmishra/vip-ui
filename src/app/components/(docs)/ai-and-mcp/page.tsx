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
          The shadcn MCP server lets an AI assistant browse registries and
          install items in your project. Run the setup command for your client,
          then restart it. The{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/mcp">
            shadcn MCP guide
          </ExternalLink>{" "}
          covers Claude Code, Cursor, VS Code, Codex, and OpenCode.
        </p>
        <PackageManagerCommand
          action="run"
          args="shadcn@latest mcp init --client claude"
        />
        <p>
          The MCP server reads its registries from your{" "}
          <Code>components.json</Code>.{" "}
          <TextLink href="/components/installation#namespace">
            Add the namespace
          </TextLink>{" "}
          first.
        </p>
        <p>Then ask for items by name, for example:</p>
        <List>
          <li>Add @vip-ui/button and @vip-ui/dialog to my project.</li>
          <li>Show me the files in @vip-ui/toast before you install it.</li>
          <li>Build a settings page with vip/ui components.</li>
        </List>
        <p>
          To configure the server by hand instead, add it to your MCP client
          config:
        </p>
        <CodeBlock code={mcpJson} filename=".mcp.json" language="json" />
      </GuideSection>

      <GuideSection id="sources" title="Machine-readable sources">
        <List>
          <li>
            <Code>{`${site}/llms.txt`}</Code> lists the guides and every
            component with its description.
          </li>
          <li>
            Each component page has a Markdown copy. Append <Code>.md</Code> to
            the URL, for example <Code>{`${site}/components/button.md`}</Code>.
            The copy has the same description, installation files, usage source,
            examples, and API tables as the page.
          </li>
          <li>
            <Code>{`${site}/r/registry.json`}</Code> is the registry index for
            tools. Each item lives at <Code>{`${site}/r/<name>.json`}</Code>.
          </li>
        </List>
        <p>
          Guides such as this one are HTML pages. They have no <Code>.md</Code>{" "}
          copy.
        </p>
      </GuideSection>

      <GuideSection id="cli" title="CLI commands for agents">
        <p>
          An agent uses the same{" "}
          <ExternalLink href="https://ui.shadcn.com/docs/cli">
            shadcn CLI
          </ExternalLink>{" "}
          commands as you. <Code>shadcn view @vip-ui/button</Code> prints an
          item, with its dependencies, files, and source, and does not change
          your project.
        </p>
        <p>
          To compare an installed file with the registry before an overwrite,
          see <TextLink href="/components/updating">Updating</TextLink>.
        </p>
      </GuideSection>

      <GuideSection id="skill" title="Install the vip/ui skill">
        <p>
          vip/ui publishes an agent skill for building UI with the components.
          It carries the shadcn name map, the size scale, the motion rules, and
          the color and token rules. An agent that loads it generates UI that
          follows the system.
        </p>
        <List>
          <li>
            Get the folder <Code>skills/vip-ui/</Code> from the{" "}
            <ExternalLink href="https://github.com/thevipinmishra/vip-ui">
              vip/ui repository
            </ExternalLink>
            .
          </li>
          <li>
            Copy it into the skills folder of your agent, such as{" "}
            <Code>.claude/skills/vip-ui/</Code> in your project.
          </li>
        </List>
        <p>
          The skill does not install components. It tells the agent which
          components exist and how to use them.
        </p>
      </GuideSection>
    </GuidePage>
  );
}
