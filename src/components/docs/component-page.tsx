import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { getComponent, getNeighbors } from "@/lib/catalog";
import { componentApi } from "@/lib/component-api";
import {
  type ComponentExampleMetadata,
  exampleAnchor,
} from "@/lib/component-examples";
import { allComponents } from "@/lib/navigation";
import { registryUrl } from "@/lib/registry-docs";
import { ApiReference } from "./api-reference";
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

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-5 text-[23px] font-semibold tracking-[-0.045em]">
      {title}
    </h2>
  );
}
