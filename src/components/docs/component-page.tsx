import { readFile } from "node:fs/promises";
import path from "node:path";
import { Fragment, type ReactNode } from "react";
import { componentName, getComponent, getNeighbors } from "@/lib/catalog";
import { componentApi } from "@/lib/component-api";
import {
  type ComponentExampleMetadata,
  exampleAnchor,
} from "@/lib/component-examples";
import { allComponents } from "@/lib/navigation";
import { registryUrl } from "@/lib/registry-docs";
import { cn } from "@/lib/utils";
import { ApiReference } from "./api-reference";
import { CodeBlock } from "./code-block";
import { ComponentComposition } from "./component-composition";
import { compositions } from "./component-compositions";
import { Code, DocsHeader, DocsPager, ExternalLink, TextLink } from "./guide";
import { InstallTabs } from "./install-tabs";
import { ManualInstall } from "./manual-install";
import { PackageManagerCommand } from "./package-manager-command";
import { sectionTitleClass } from "./page-header";
import { PreviewPanel } from "./preview-panel";

export interface ComponentExample extends ComponentExampleMetadata {
  preview: ReactNode;
}

export function withExamplePreviews(
  metadata: readonly ComponentExampleMetadata[],
  previews: readonly ReactNode[],
): ComponentExample[] {
  if (metadata.length !== previews.length) {
    throw new Error(
      `Example metadata has ${metadata.length} entries but ${previews.length} previews were provided.`,
    );
  }
  return metadata.map((example, index) => {
    const preview = previews[index];
    if (preview === undefined) {
      throw new Error(`Missing preview for example "${example.title}".`);
    }
    return { ...example, preview };
  });
}

interface ComponentPageProps {
  name: string;
  description: string;
  preview: ReactNode;
  previewSourcePath: string;
  examples?: ComponentExample[];
  sourcePath: string;
  usage?: {
    code: string;
    filename?: string;
    note?: ReactNode;
  };
  accessibility?: ReactNode;
}

export async function ComponentPage({
  name,
  description,
  preview,
  previewSourcePath,
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
  const cliUrl = registryUrl(componentSlug);
  const apiParts = componentApi[componentSlug] ?? [];
  const reactAria = getComponent(componentSlug)?.reactAria;
  return (
    <article>
      <DocsHeader
        title={name}
        description={description}
        parent={{ href: "/components", label: "Components" }}
      />
      <section
        id="preview"
        data-toc-label="Preview"
        aria-label={`${name} preview`}
        className="mt-6 scroll-mt-24"
      >
        <PreviewPanel
          code={previewSource}
          filename={path.basename(previewSourcePath)}
        >
          {preview}
        </PreviewPanel>
      </section>

      <section id="installation" className="mt-14 scroll-mt-24">
        <SectionHeading title="Installation" />
        <InstallTabs
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

      {usage && (
        <section id="usage" className="mt-14 scroll-mt-24">
          <SectionHeading title="Usage" />
          <div className="grid max-w-[670px] gap-5">
            {usage.note && (
              <p className="text-sm leading-6 text-muted-foreground">
                {usage.note}
              </p>
            )}
            <CodeBlock code={usage.code} filename={usage.filename} />
          </div>
        </section>
      )}

      {compositions[componentSlug] && (
        <section id="composition" className="mt-14 scroll-mt-24">
          <SectionHeading title="Composition" />
          <ComponentComposition {...compositions[componentSlug]} />
        </section>
      )}

      {examples.map((example, index) => (
        <section
          key={example.sourcePath}
          id={exampleAnchor(example.title)}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title={example.title} />
          {(example.description || example.uses) && (
            <p className="-mt-2 mb-5 max-w-[670px] text-sm leading-6 text-muted-foreground">
              {example.description && (
                <ExampleDescription>{example.description}</ExampleDescription>
              )}
              {example.description && example.uses && " "}
              {example.uses && <ExampleUses slugs={example.uses} />}
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
        <section id="accessibility" className="mt-14 scroll-mt-24">
          <SectionHeading title="Accessibility" />
          <div className="grid max-w-[670px] gap-4 text-sm leading-7 text-muted-foreground">
            {accessibility}
          </div>
        </section>
      )}

      {(apiParts.length > 0 || reactAria) && (
        <section id="api" className="mt-14 scroll-mt-24">
          <SectionHeading title="API reference" />
          {reactAria && (
            <p className="mb-5 max-w-[670px] text-sm leading-7 text-muted-foreground">
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

function ExampleDescription({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  const regex = /`([^`]+)`/g;
  let lastIndex = 0;
  let match = regex.exec(children);
  while (match) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }
    parts.push(<Code key={match.index}>{match[1]}</Code>);
    lastIndex = regex.lastIndex;
    match = regex.exec(children);
  }
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }
  return parts;
}

function ExampleUses({ slugs }: { slugs: readonly string[] }) {
  return (
    <>
      Also install{" "}
      {slugs.map((slug, index) => {
        const component = getComponent(slug);
        return (
          <Fragment key={slug}>
            {index > 0 && (index === slugs.length - 1 ? " and " : ", ")}
            {component ? (
              <TextLink href={`/components/${slug}`}>{component.name}</TextLink>
            ) : (
              componentName(slug)
            )}
          </Fragment>
        );
      })}
      {"."}
    </>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className={cn("mb-5", sectionTitleClass)}>{title}</h2>;
}
