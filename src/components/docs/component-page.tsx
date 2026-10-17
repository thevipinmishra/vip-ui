import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { getComponent, getNeighbors } from "@/lib/catalog";
import { customComponentApi, groupApiProps } from "@/lib/component-api";
import {
  type ComponentExampleMetadata,
  exampleAnchor,
} from "@/lib/component-examples";
import { allComponents } from "@/lib/navigation";
import { registryUrl } from "@/lib/registry-docs";
import { ComponentComposition } from "./component-composition";
import { compositions } from "./component-compositions";
import { DocsHeader, DocsPager, ExternalLink, TextLink } from "./guide";
import { InstallTabs } from "./install-tabs";
import { ManualInstall } from "./manual-install";
import { PackageManagerCommand } from "./package-manager-command";
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
}

export async function ComponentPage({
  name,
  description,
  preview,
  previewSourcePath,
  examples = [],
  sourcePath,
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
  const customApi = customComponentApi[componentSlug];
  const apiGroups = customApi ? groupApiProps(customApi) : [];
  const reactAriaDocsHref = getComponent(componentSlug)?.reactAriaDocsHref;
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
          {example.description && (
            <p className="mb-5 max-w-[670px] text-sm leading-7 text-muted-foreground">
              {example.description}
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

      {(apiGroups.length > 0 || reactAriaDocsHref) && (
        <section id="api" className="mt-14 scroll-mt-24">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <h2 className="text-[23px] font-semibold tracking-[-0.045em]">
              API reference
            </h2>
            {reactAriaDocsHref && (
              <ExternalLink href={reactAriaDocsHref} className="text-sm">
                React Aria props
              </ExternalLink>
            )}
          </div>
          {apiGroups.length > 0 && (
            <div className="space-y-8">
              {apiGroups.map(({ component, props }) => (
                <div key={component}>
                  {(apiGroups.length > 1 ||
                    component.toLowerCase() !==
                      componentSlug.replaceAll("-", "")) && (
                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                      {component}
                    </h3>
                  )}
                  <dl className="divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50 px-4 sm:px-5">
                    {props.map((item) => (
                      <div
                        key={item.prop}
                        className="grid gap-x-6 gap-y-1.5 py-4 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
                      >
                        <dt className="min-w-0 font-mono text-[13px] font-medium text-foreground [overflow-wrap:anywhere]">
                          {item.prop}
                        </dt>
                        <dd className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <code className="font-mono [overflow-wrap:anywhere]">
                              {item.type}
                            </code>
                            {item.defaultValue !== "—" && (
                              <span>
                                {item.defaultValue === "required" ? (
                                  "Required"
                                ) : (
                                  <>
                                    Default{" "}
                                    <code className="font-mono text-foreground [overflow-wrap:anywhere]">
                                      {item.defaultValue}
                                    </code>
                                  </>
                                )}
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                            {item.description}
                          </p>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
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

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-5 text-[23px] font-semibold tracking-[-0.045em]">
      {title}
    </h2>
  );
}
