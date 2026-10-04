import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  DocumentCode2,
} from "reicon-react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button-link";
import { getComponent, getNeighbors } from "@/lib/catalog";
import { customComponentApi, customGuidance } from "@/lib/component-api";
import {
  type ComponentExampleMetadata,
  exampleAnchor,
} from "@/lib/component-examples";
import { buildComponentMarkdown } from "@/lib/component-markdown";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { siteUrl } from "@/lib/site-url";
import { CodeBlock } from "./code-block";
import { ComponentComposition } from "./component-composition";
import { compositions } from "./component-compositions";
import { CopyButton } from "./copy-button";
import { InstallTabs } from "./install-tabs";
import { PackageManagerCommand } from "./package-manager-command";
import { PreviewPanel } from "./preview-panel";

export interface ComponentExample extends ComponentExampleMetadata {
  preview: ReactNode;
}

export interface ComponentPageLink {
  label: string;
  href: string;
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
  /** Short links rendered under the description, before the preview. */
  descriptionLinks?: ComponentPageLink[];
  preview: ReactNode;
  previewSourcePath: string;
  examples?: ComponentExample[];
  sourcePath: string;
}

export async function ComponentPage({
  name,
  description,
  descriptionLinks,
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
  const reactAriaDocsHref = getComponent(componentSlug)?.reactAriaDocsHref;
  const markdown = buildComponentMarkdown({
    slug: componentSlug,
    name,
    description,
    site: siteUrl(),
    registryItem: item,
    cliUrl,
    usage: {
      code: previewSource,
      filename: path.basename(previewSourcePath),
    },
    guidance: customGuidance[componentSlug],
    api: customApi,
    examples: examples.map((example, index) => ({
      title: example.title,
      description: example.description,
      code: exampleSources[index],
      filename: path.basename(example.sourcePath),
      prerequisite: example.prerequisite,
    })),
    reactAriaDocsHref,
  });
  return (
    <article>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Breadcrumbs>
          <Breadcrumb href="/components">Components</Breadcrumb>
          <Breadcrumb>{name}</Breadcrumb>
        </Breadcrumbs>
        <div className="flex items-center gap-2">
          <CopyButton
            code={markdown}
            label="Copy page as Markdown"
            text="Copy page"
          />
          <ButtonLink
            href={`/components/${componentSlug}.md`}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            size="sm"
          >
            <DocumentCode2 size={15} aria-hidden="true" />
            Markdown
            <span className="sr-only"> (opens in a new tab)</span>
          </ButtonLink>
        </div>
      </div>
      <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {name}
      </h1>
      <section
        id="preview"
        data-toc-label="Preview"
        aria-label={`${name} preview`}
        className="mt-6 scroll-mt-24"
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="max-w-[670px] space-y-2">
            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
            {descriptionLinks && descriptionLinks.length > 0 && (
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {descriptionLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {link.label}
                      {link.href.startsWith("#") ? (
                        <ArrowDown size={14} aria-hidden="true" />
                      ) : (
                        <ArrowRight size={14} aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ButtonLink
            href="#installation"
            variant="outline"
            size="sm"
            className="shrink-0"
          >
            Install {name}
          </ButtonLink>
        </div>
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
                <>
                  <PackageManagerCommand
                    action="run"
                    args={`shadcn@latest add ${cliUrl}`}
                  />
                  <div>
                    <p className="text-[13px] font-medium">Adds these files</p>
                    <ul className="mt-1.5 grid gap-1">
                      {item.files.map((file) => (
                        <li
                          key={file.target}
                          className="font-mono text-xs text-muted-foreground"
                        >
                          {file.target}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                      Demo-inclusive: the item also includes the vip/ui files
                      this page&apos;s examples import. Unused example files can
                      be deleted after install.
                    </p>
                    {packages.length > 0 && (
                      <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                        Installs {packages.join(", ")}.
                      </p>
                    )}
                    <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                      Restart your dev server, then render the component to
                      confirm it picks up your theme styles.
                    </p>
                  </div>
                </>
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

      <section id="usage" className="mt-14 scroll-mt-24">
        <SectionHeading title="Usage" />
        {customGuidance[componentSlug] && (
          <p className="mb-5 max-w-[670px] text-sm leading-7 text-muted-foreground">
            {customGuidance[componentSlug]}
          </p>
        )}
        <CodeBlock
          code={previewSource}
          filename={path.basename(previewSourcePath)}
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
          <p className="mb-5 max-w-[670px] text-sm leading-7 text-muted-foreground">
            {example.description}
          </p>
          <PreviewPanel
            code={exampleSources[index]}
            filename={path.basename(example.sourcePath)}
          >
            {example.preview}
          </PreviewPanel>
        </section>
      ))}

      <section id="api" className="mt-14 scroll-mt-24">
        <SectionHeading title="API reference" />
        {customApi && (
          <>
            <p className="mb-3 text-xs text-muted-foreground sm:hidden">
              Scroll the table to see all columns.
            </p>
            <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
              <table className="w-full min-w-[650px] border-collapse text-left text-[12px]">
                <thead className="bg-muted/60 text-muted-foreground">
                  <tr>
                    {(
                      [
                        "Component",
                        "Prop",
                        "Type",
                        "Default",
                        "Description",
                      ] as const
                    ).map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="px-4 py-3 font-semibold"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {customApi.map((item) => (
                    <tr
                      key={`${item.component}-${item.prop}`}
                      className="border-t border-border/70 align-top"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-mono font-medium text-foreground"
                      >
                        {item.component}
                      </th>
                      <td className="px-4 py-3 font-mono text-foreground">
                        {item.prop}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {item.type}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {item.defaultValue}
                      </td>
                      <td className="px-4 py-3 leading-5 text-muted-foreground">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {reactAriaDocsHref && (
          <p className="mt-4 max-w-[670px] text-sm leading-7 text-muted-foreground">
            See the{" "}
            <a
              href={reactAriaDocsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              React Aria API
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>{" "}
            for inherited props and behavior. The Custom tab above contains
            vip/ui's source and local props.
          </p>
        )}
        {!customApi && !reactAriaDocsHref && (
          <p className="max-w-[670px] text-sm leading-7 text-muted-foreground">
            This component exports its parts with no additional props. See the
            Custom tab for the full source.
          </p>
        )}
      </section>

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
