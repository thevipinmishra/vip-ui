import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "reicon-react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getComponent, getNeighbors } from "@/lib/catalog";
import { customComponentApi, groupApiProps } from "@/lib/component-api";
import {
  type ComponentExampleMetadata,
  exampleAnchor,
} from "@/lib/component-examples";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { CodeBlock } from "./code-block";
import { ComponentComposition } from "./component-composition";
import { compositions } from "./component-compositions";
import { InstallTabs } from "./install-tabs";
import { PackageManagerCommand } from "./package-manager-command";
import { PreviewPanel } from "./preview-panel";

export interface ComponentExample extends ComponentExampleMetadata {
  preview: ReactNode;
}

/**
 * Pairs shared example metadata with the previews a page renders. The count
 * check fails the build when a page adds or drops a preview without updating
 * `src/lib/component-examples.ts` to match.
 */
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
  const item = await readRegistryItem(componentSlug);
  const primaryFile = item.files.find((file) => file.path === sourcePath);
  if (!primaryFile)
    throw new Error(`Missing registry source for ${componentSlug}`);
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
  const packages = item.dependencies;
  const cliUrl = registryUrl(componentSlug);
  const customApi = customComponentApi[componentSlug];
  const apiGroups = customApi ? groupApiProps(customApi) : [];
  const reactAriaDocsHref = getComponent(componentSlug)?.reactAriaDocsHref;
  return (
    <article>
      <div className="mb-4">
        <Breadcrumbs>
          <Breadcrumb href="/components">Components</Breadcrumb>
          <Breadcrumb>{name}</Breadcrumb>
        </Breadcrumbs>
      </div>
      <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {name}
      </h1>
      <p className="mt-2 max-w-[670px] text-sm leading-7 text-muted-foreground">
        {description}
      </p>
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
                Requires TypeScript, Tailwind v4, and shadcn CSS-variable
                theming. Complete the{" "}
                <Link
                  href="/components/installation#setup"
                  className="text-primary underline underline-offset-4"
                >
                  one-time setup
                </Link>{" "}
                before running this command.
              </p>
              {cliUrl ? (
                <PackageManagerCommand
                  action="run"
                  args={`shadcn@latest add ${cliUrl}`}
                />
              ) : (
                <p className="text-[13px] leading-6 text-muted-foreground">
                  The CLI command will be available when the registry has a
                  public URL. Use Custom until then.
                </p>
              )}
            </div>
          }
          custom={
            <div className="space-y-5">
              <p className="text-[13px] leading-6 text-muted-foreground">
                Complete the{" "}
                <Link
                  href="/components/installation#setup"
                  className="text-primary underline underline-offset-4"
                >
                  one-time setup
                </Link>{" "}
                first. Install the dependencies below, then copy every file
                under your components directory as shown by the{" "}
                <code className="font-mono text-foreground">@components/</code>{" "}
                placeholder. Check existing files before replacing them and
                adjust imports if your aliases differ.
              </p>
              {packages.length > 0 && (
                <PackageManagerCommand action="add" args={packages.join(" ")} />
              )}
              {item.files.map((file) => (
                <div key={file.target}>
                  <CodeBlock code={file.content} filename={file.target} />
                </div>
              ))}
            </div>
          }
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
              <a
                href={reactAriaDocsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                React Aria props
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
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

      <nav
        aria-label="Component pagination"
        className="mt-16 grid gap-3 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            href={`/components/${previous.slug}`}
            className="group flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">
              Previous component
            </span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft size={16} aria-hidden="true" />
              {previous.name}
            </span>
          </Link>
        ) : (
          <Link
            href="/components"
            className="group flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">Back to</span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft size={16} aria-hidden="true" />
              All components
            </span>
          </Link>
        )}
        {next ? (
          <Link
            href={`/components/${next.slug}`}
            className="group flex min-h-20 flex-col items-end justify-center rounded-xl bg-card px-5 py-3 text-right shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted"
          >
            <span className="text-[11px] text-muted-foreground">
              Next component
            </span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              {next.name}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <Link
            href="/components"
            className="group flex min-h-20 flex-col items-end justify-center rounded-xl bg-accent px-5 py-3 text-right text-accent-foreground shadow-[var(--shadow-card)] hover:bg-accent/70"
          >
            <span className="text-[11px]">Explore more</span>
            <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
              All components
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
        )}
      </nav>
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
