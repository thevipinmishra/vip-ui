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
import { Alert } from "@/components/ui/alert";

export const metadata = guideMetadata("/components/updating");

export default function UpdatingPage() {
  return (
    <GuidePage href="/components/updating">
      <GuideSection id="compare" title="See what changed first">
        <p>
          An installed component is a file in your project. The registry always
          serves the newest code, so compare before you update:
        </p>
        <List>
          <li>
            <Code>shadcn add @vip-ui/button --diff</Code> shows the difference
            between your installed file and the registry version.
          </li>
          <li>
            <Code>shadcn add @vip-ui/button --dry-run</Code> previews the files
            without writing them.
          </li>
          <li>
            <Code>shadcn view @vip-ui/button</Code> prints the source of the
            registry version.
          </li>
        </List>
        <Alert variant="neutral" title="Check the changelog">
          The changelog lists what changed and marks breaking changes. Read it
          before you update:{" "}
          <ExternalLink href="https://github.com/thevipinmishra/vip-ui/blob/main/CHANGELOG.md">
            CHANGELOG.md
          </ExternalLink>
          .
        </Alert>
      </GuideSection>

      <GuideSection id="update" title="Update a component">
        <p>Re-add the component and overwrite your file:</p>
        <PackageManagerCommand
          action="run"
          args="shadcn@latest add @vip-ui/button --overwrite"
        />
        <p>
          The CLI also installs the packages that the new version needs. Blocks
          update the same way, for example{" "}
          <Code>shadcn add @vip-ui/dashboard-01 --overwrite</Code>.
        </p>
        <p>
          Update one component at a time. Run the diff again after each update,
          then run your type check.
        </p>
      </GuideSection>

      <GuideSection id="local-edits" title="Local edits">
        <p>
          <Code>--overwrite</Code> replaces your installed file. Keep your local
          changes safe before you update:
        </p>
        <List>
          <li>Commit your work, or copy the file aside.</li>
          <li>
            Re-apply your changes to the new file. The diff from{" "}
            <TextLink href="#compare">See what changed first</TextLink> shows
            both sides.
          </li>
        </List>
        <p>
          Shared files, such as <Code>utils.ts</Code>, <Code>motion.ts</Code>,
          and <Code>size.tsx</Code>, stay untouched on a normal add. An add with{" "}
          <Code>--overwrite</Code> replaces them too. If you changed a shared
          file, copy your changes back after the update.
        </p>
      </GuideSection>
    </GuidePage>
  );
}
