import { readFile } from "node:fs/promises";
import path from "node:path";
import { Fragment, type ReactNode } from "react";
import {
  componentHref,
  componentName,
  getComponent,
  getNeighbors,
} from "@/lib/catalog";
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

interface ComponentUsage {
  code: string;
  filename?: string;
  note?: ReactNode;
}

export interface ComponentDocMember {
  slug: string;
  name: string;
  description?: string;
  preview: ReactNode;
  previewSourcePath: string;
  examples?: ComponentExample[];
  usage?: ComponentUsage;
  accessibility?: ReactNode;
}

interface ComponentDocSectionProps extends ComponentDocMember {
  heading?: "none" | "h2";
  sectionHeadingLevel?: 2 | 3;
  idPrefix?: string;
  skipInnerToc?: boolean;
}

interface ComponentPageProps
  extends Omit<
    ComponentDocSectionProps,
    "slug" | "heading" | "sectionHeadingLevel" | "idPrefix" | "skipInnerToc"
  > {
  sourcePath: string;
}

export async function ComponentDocSection({
  slug,
  name,
  description,
  preview,
  previewSourcePath,
  examples = [],
  usage,
  accessibility,
  heading = "none",
  sectionHeadingLevel = 2,
  idPrefix,
  skipInnerToc = false,
}: ComponentDocSectionProps) {
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
  const cliUrl = registryUrl(slug);
  const apiParts = componentApi[slug] ?? [];
  const reactAria = getComponent(slug)?.reactAria;
  const sectionId = (id: string) => (idPrefix ? `${idPrefix}-${id}` : id);
  const tocSkip = skipInnerToc ? "" : undefined;

  return (
    <>
      {heading === "h2" && (
        <>
          <h2 className={cn("scroll-mt-24", sectionTitleClass)}>{name}</h2>
          {description && (
            <p className="mt-3 max-w-[670px] text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </>
      )}

      <section
        id={sectionId("preview")}
        data-toc-label={skipInnerToc ? undefined : "Preview"}
        data-toc-skip={tocSkip}
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

      <section
        id={sectionId("installation")}
        data-toc-skip={tocSkip}
        className="mt-14 scroll-mt-24"
      >
        <SectionHeading title="Installation" level={sectionHeadingLevel} />
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
          custom={<ManualInstall slug={slug} name={name} />}
        />
      </section>

      {usage && (
        <section
          id={sectionId("usage")}
          data-toc-skip={tocSkip}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title="Usage" level={sectionHeadingLevel} />
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

      {compositions[slug] && (
        <section
          id={sectionId("composition")}
          data-toc-skip={tocSkip}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title="Composition" level={sectionHeadingLevel} />
          <ComponentComposition {...compositions[slug]} />
        </section>
      )}

      {examples.map((example, index) => (
        <section
          key={example.sourcePath}
          id={sectionId(exampleAnchor(example.title))}
          data-toc-skip={tocSkip}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title={example.title} level={sectionHeadingLevel} />
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
        <section
          id={sectionId("accessibility")}
          data-toc-skip={tocSkip}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title="Accessibility" level={sectionHeadingLevel} />
          <div className="grid max-w-[670px] gap-4 text-sm leading-7 text-muted-foreground">
            {accessibility}
          </div>
        </section>
      )}

      {(apiParts.length > 0 || reactAria) && (
        <section
          id={sectionId("api")}
          data-toc-skip={tocSkip}
          className="mt-14 scroll-mt-24"
        >
          <SectionHeading title="API reference" level={sectionHeadingLevel} />
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
            <ApiReference
              parts={apiParts}
              slug={slug}
              headingLevel={sectionHeadingLevel === 3 ? 4 : 3}
            />
          )}
        </section>
      )}
    </>
  );
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
  return (
    <article>
      <DocsHeader
        title={name}
        description={description}
        parent={{ href: "/components", label: "Components" }}
      />
      <ComponentDocSection
        slug={componentSlug}
        name={name}
        preview={preview}
        previewSourcePath={previewSourcePath}
        examples={examples}
        usage={usage}
        accessibility={accessibility}
      />
      <DocsPager
        previous={
          previous
            ? { href: `/components/${previous.slug}`, label: previous.docName }
            : allComponents
        }
        next={
          next
            ? { href: `/components/${next.slug}`, label: next.docName }
            : allComponents
        }
      />
    </article>
  );
}

export async function GroupedComponentPage({
  name,
  description,
  members,
}: {
  name: string;
  description: string;
  members: readonly ComponentDocMember[];
}) {
  const { previous, next } = getNeighbors(members[0]?.slug ?? "");
  return (
    <article>
      <DocsHeader
        title={name}
        description={description}
        parent={{ href: "/components", label: "Components" }}
      />
      {members.map((member, index) => {
        const hideFirstHeading = index === 0;
        return (
          <section
            key={member.slug}
            id={member.slug}
            data-toc-label={member.name}
            className={cn(
              "scroll-mt-24",
              index === 0 ? "mt-10" : "mt-20 border-t border-border/60 pt-12",
            )}
          >
            <ComponentDocSection
              {...member}
              description={hideFirstHeading ? undefined : member.description}
              heading={hideFirstHeading ? "none" : "h2"}
              sectionHeadingLevel={hideFirstHeading ? 2 : 3}
              idPrefix={member.slug}
              skipInnerToc
            />
          </section>
        );
      })}
      <DocsPager
        previous={
          previous
            ? { href: `/components/${previous.slug}`, label: previous.docName }
            : allComponents
        }
        next={
          next
            ? { href: `/components/${next.slug}`, label: next.docName }
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
              <TextLink href={componentHref(slug)}>{component.name}</TextLink>
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

function SectionHeading({
  title,
  level = 2,
}: {
  title: string;
  level?: 2 | 3;
}) {
  const Tag = level === 3 ? "h3" : "h2";
  return (
    <Tag
      className={cn(
        "mb-5",
        level === 3
          ? "text-lg font-semibold leading-7 tracking-[-0.03em] text-balance"
          : sectionTitleClass,
      )}
    >
      {title}
    </Tag>
  );
}
