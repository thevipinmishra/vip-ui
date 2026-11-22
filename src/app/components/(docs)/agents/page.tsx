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
import { PackageManagerCommand } from "@/components/docs/package-manager-command";
import { setupPrompt } from "@/lib/agent-docs";
import { registryNamespace, registryNamespaceUrl } from "@/lib/registry-docs";
import { agentSiteUrl } from "@/lib/site-url";

export const metadata = guideMetadata("/components/agents");

const mcpJson = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`;

export default function AgentsPage() {
  const site = agentSiteUrl();
  const registryEntryUrl = registryNamespaceUrl() ?? `${site}/r/{name}.json`;
  const registryJson = JSON.stringify(
    { registries: { [registryNamespace]: registryEntryUrl } },
    null,
    2,
  );
  return (
    <GuidePage href="/components/agents">
      <GuideSection id="prompt" title="Start with a prompt">
        <p>
          Give this prompt to your coding agent. It points at the setup
          Markdown, which covers the project, the theme, and safe installs.
        </p>
        <AgentPrompt prompt={setupPrompt(site)} />
      </GuideSection>

      <GuideSection id="skill" title="Install the vip/ui skill">
        <p>
          The vip/ui agent skill tells an agent which components exist and how
          to set up, install, and use them: names, sizes, motion, and color
          tokens.
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

      <GuideSection id="mcp" title="Use the MCP server">
        <p>
          The shadcn MCP server lets an AI assistant find and install vip/ui
          components. It reads registries from your <Code>components.json</Code>
          . Without an entry, it can still return the add command for a name
          such as <Code>@vip-ui/button</Code>, but it cannot search or view the
          item. Add vip/ui to <Code>registries</Code> to browse and inspect
          items:
        </p>
        <CodeSample
          code={registryJson}
          filename="components.json"
          language="json"
        />
        <p>
          Keep your other values. The CLI writes this entry on the first install
          by name. See{" "}
          <TextLink href="/components/installation#install-by-name">
            Install by name
          </TextLink>
          .
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
    </GuidePage>
  );
}
