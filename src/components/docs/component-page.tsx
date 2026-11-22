import { readFile } from "node:fs/promises";
import path from "node:path";
import { Fragment, type ReactNode } from "react";
import { componentDocUrl, componentPrompt } from "@/lib/agent-docs";
import { getComponent, getNeighbors } from "@/lib/catalog";
import { componentApi } from "@/lib/component-api";
import { componentChecks } from "@/lib/component-checks";
import {
  type ComponentExampleMetadata,
  type ComponentUsage,
  exampleAnchor,
} from "@/lib/component-examples";
import {
  type ExampleDependencies,
  exampleDependencies,
  withoutRepeats,
} from "@/lib/example-dependencies";
import { allComponents } from "@/lib/navigation";
import { registryNamespace, registryUrl } from "@/lib/registry-docs";
import { agentSiteUrl } from "@/lib/site-url";
import { ApiReference } from "./api-reference";
import { CodeSample } from "./code-sample";
import { ComponentComposition } from "./component-composition";
import { compositions } from "./component-compositions";
import { ComponentHeader } from "./component-header";
import { Code, DocsPager, ExternalLink, TextLink } from "./guide";
import { InstallTabs } from "./install-tabs";
import { ManualInstall } from "./manual-install";
import { PackageManagerCommand } from "./package-manager-command";
import { PreviewPanel } from "./preview-panel";
import { SectionHeading } from "./section-heading";

export interface ComponentExample extends ComponentExampleMetadata {
  preview: ReactNode;
}

interface ComponentPageProps {
  name: string;
  description: string;
  preview: ReactNode;
  previewSourcePath: string;
  exampleFile?: string;
  examples?: ComponentExample[];
  sourcePath: string;
  usage?: ComponentUsage;
  accessibility?: ReactNode;
}

export async function ComponentPage({
  name,
  description,
  preview,
  previewSourcePath,
  exampleFile,
  examples = [],
  sourcePath,
  usage,
  accessibility,
}: ComponentPageProps) {
  const componentSlug = path.basename(sourcePath, ".tsx");
  const { previous, next } = getNeighbors(componentSlug);
  const previewSource = (
    await readFile(
      path.join(
        process.cwd(),
        "src/components/docs",
        path.basename(previewSourcePath),
      ),
      "utf8",
    )
  ).replaceAll("@/components/ui/", "@/components/vip-ui/");
  const exampleSources = await Promise.all(
    examples.map(async (example) =>
      (
        await readFile(
          path.join(
            process.cwd(),
            "src/components/docs",
            path.basename(example.sourcePath),
          ),
          "utf8",
        )
      ).replaceAll("@/components/ui/", "@/components/vip-ui/"),
    ),
  );
  const [previewUses, usageUses, ...exampleUses] = withoutRepeats(
    await Promise.all(
      [previewSource, usage?.code ?? "", ...exampleSources].map((code) =>
        exampleDependencies(componentSlug, code),
      ),
    ),
  );
  const site = agentSiteUrl();
  const prompt = componentPrompt(site, componentSlug, name);
  const cliUrl = registryUrl(componentSlug);
  const apiParts = componentApi[componentSlug] ?? [];
  const component = getComponent(componentSlug);
  const reactAria = component?.reactAria;
  const checks = componentChecks(componentSlug);
  return (
    <article>
      <ComponentHeader
        slug={componentSlug}
        name={name}
        description={description}
        primitives={component?.primitives ?? []}
        markdownUrl={componentDocUrl(site, componentSlug)}
        prompt={prompt}
        axe={checks.axe}
        doctor={checks.doctor}
      />
      <section
        id="preview"
        data-toc-label="Preview"
        aria-label={`${name} preview`}
        className="mt-6 scroll-mt-8"
      >
        <PreviewPanel
          code={previewSource}
          filename={path.basename(previewSourcePath)}
        >
          {preview}
        </PreviewPanel>
      </section>

      <section id="installation" className="mt-14 scroll-mt-8">
        <SectionHeading section="installation" className="mb-5">
          Installation
        </SectionHeading>
        <PreviewDependencies uses={previewUses} />
        <InstallTabs
          prompt={prompt}
          cliAvailable={Boolean(cliUrl)}
          cli={
            <div className="space-y-4">
              <p className="text-[13px] leading-6 text-muted-foreground">
                The CLI adds the files, packages, theme variables, and Tailwind
                plugin that this component uses. Before you run it,{" "}
                <TextLink href="/components/installation#setup">
                  set up your project
                </TextLink>
                .
              </p>
              {cliUrl ? (
                <PackageManagerCommand
                  action="run"
                  args={`shadcn@latest add ${cliUrl}`}
                />
              ) : (
                <p className="text-[13px] leading-6 text-muted-foreground">
                  The CLI command shows when the registry has a public URL.
                  Until then, use the Manual tab.
                </p>
              )}
            </div>
          }
          custom={<ManualInstall slug={componentSlug} name={name} />}
        />
      </section>

      <UsageSection usage={usage} uses={usageUses} />

      {compositions[componentSlug] && (
        <section id="composition" className="mt-14 scroll-mt-8">
          <SectionHeading section="composition" className="mb-5">
            Composition
          </SectionHeading>
          <ComponentComposition {...compositions[componentSlug]} />
        </section>
      )}

      <ExampleFileSection filename={exampleFile} />

      {examples.map((example, index) => (
        <section
          key={example.sourcePath}
          id={exampleAnchor(example.title)}
          className="mt-14 scroll-mt-8"
        >
          <SectionHeading
            section={exampleAnchor(example.title)}
            className="mb-5"
          >
            {example.title}
          </SectionHeading>
          {(example.description || hasDependencies(exampleUses[index])) && (
            <p className="-mt-2 mb-5 max-w-167.5 text-sm leading-6 text-muted-foreground">
              {example.description && (
                <ExampleDescription>{example.description}</ExampleDescription>
              )}
              {hasDependencies(exampleUses[index]) && (
                <>
                  {example.description && " "}
                  Also install <DependencyList uses={exampleUses[index]} />.
                </>
              )}
            </p>
          )}
          <PreviewPanel
            code={exampleSources[index]}
            filename={path.basename(example.sourcePath)}
          >
            {example.preview}
          </PreviewPanel>
        </section>
      ))}

      {accessibility && (
        <section id="accessibility" className="mt-14 scroll-mt-8">
          <SectionHeading section="accessibility" className="mb-5">
            Accessibility
          </SectionHeading>
          <div className="grid max-w-167.5 gap-4 text-sm leading-7 text-muted-foreground">
            {accessibility}
          </div>
        </section>
      )}

      {(apiParts.length > 0 || reactAria) && (
        <section id="api" className="mt-14 scroll-mt-8">
          <SectionHeading section="api" className="mb-5">
            API reference
          </SectionHeading>
          {reactAria && (
            <p className="mb-5 max-w-167.5 text-sm leading-7 text-muted-foreground">
              {apiParts.length > 0
                ? "vip/ui adds or changes the props below. For all other props, see "
                : `${name} takes the props of `}
              <ExternalLink href={reactAria.href}>
                React Aria {reactAria.name}
              </ExternalLink>
              .
            </p>
          )}
          {apiParts.length > 0 && (
            <ApiReference parts={apiParts} slug={componentSlug} />
          )}
        </section>
      )}

      <DocsPager
        previous={
          previous
            ? { href: `/components/${previous.slug}`, label: previous.name }
            : allComponents
        }
        next={
          next
            ? { href: `/components/${next.slug}`, label: next.name }
            : allComponents
        }
      />
    </article>
  );
}

function UsageSection({
  usage,
  uses,
}: {
  usage?: ComponentUsage;
  uses: ExampleDependencies;
}) {
  if (!usage) return null;
  return (
    <section id="usage" className="mt-14 scroll-mt-8">
      <SectionHeading section="usage" className="mb-5">
        Usage
      </SectionHeading>
      <div className="grid max-w-167.5 gap-5">
        {usage.note && (
          <p className="text-sm leading-6 text-muted-foreground">
            <ExampleDescription>{usage.note}</ExampleDescription>
          </p>
        )}
        {hasDependencies(uses) && (
          <p className="text-sm leading-6 text-muted-foreground">
            Also install <DependencyList uses={uses} />.
          </p>
        )}
        <CodeSample code={usage.code} filename={usage.filename} />
      </div>
    </section>
  );
}

async function ExampleFileSection({ filename }: { filename?: string }) {
  if (!filename) return null;
  const code = await readFile(
    path.join(process.cwd(), "src/components/docs", filename),
    "utf8",
  );
  return (
    <section id="example-file" className="mt-14 scroll-mt-8">
      <SectionHeading section="example-file" className="mb-5">
        Example file
      </SectionHeading>
      <p className="-mt-2 mb-5 max-w-167.5 text-sm leading-6 text-muted-foreground">
        Save <Code>{filename}</Code> in the same folder as the copied preview
        and example files.
      </p>
      <CodeSample code={code} filename={filename} />
    </section>
  );
}

function PreviewDependencies({ uses }: { uses: ExampleDependencies }) {
  if (!hasDependencies(uses)) return null;

  return (
    <p className="mb-4 text-sm leading-6 text-muted-foreground">
      To run the preview, install <DependencyList uses={uses} />.
    </p>
  );
}

function hasDependencies({ components, packages }: ExampleDependencies) {
  return components.length > 0 || packages.length > 0;
}

function ExampleDescription({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  const regex = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match = regex.exec(children);
  while (match) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    const [, code, label, href] = match;
    parts.push(
      href ? (
        <TextLink key={match.index} href={href}>
          {label}
        </TextLink>
      ) : (
        <Code key={match.index}>{code}</Code>
      ),
    );
    lastIndex = regex.lastIndex;
    match = regex.exec(children);
  }
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }
  return parts;
}

function DependencyList({ uses }: { uses: ExampleDependencies }) {
  const names = [...uses.components, ...uses.packages];
  return names.map((name, index) => (
    <Fragment key={name}>
      {index > 0 && (index === names.length - 1 ? " and " : ", ")}
      {index < uses.components.length ? (
        <ComponentDependency slug={name} />
      ) : (
        <>
          the <Code>{name}</Code> package
        </>
      )}
    </Fragment>
  ));
}

function ComponentDependency({ slug }: { slug: string }) {
  const component = getComponent(slug);
  return component ? (
    <TextLink href={`/components/${slug}`}>{component.name}</TextLink>
  ) : (
    <>
      the <Code>{`${registryNamespace}/${slug}`}</Code>{" "}
      <TextLink href="/components/installation#install-by-name">
        registry item
      </TextLink>
    </>
  );
}
