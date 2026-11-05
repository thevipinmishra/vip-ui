import Link from "next/link";
import type { ReactNode } from "react";
import { componentInstallHref } from "@/lib/catalog";
import {
  displayPath,
  fileName,
  manualInstallPlan,
  type RequiredFile,
  readRegistryItem,
} from "@/lib/registry-docs";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { TextLink } from "./guide";
import { InstallStep } from "./install-step";
import { PackageManagerCommand } from "./package-manager-command";

const linkClass =
  "rounded-md text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:decoration-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:decoration-primary-foreground/40 focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent";

export async function ManualInstall({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const plan = manualInstallPlan(await readRegistryItem(slug), slug);
  const groups = [
    {
      label: "Components",
      files: plan.requires.filter((file) => file.kind === "component"),
    },
    {
      label: "Shared files",
      files: plan.requires.filter((file) => file.kind === "shared"),
    },
  ].filter((group) => group.files.length > 0);
  const steps: { title: string; content: ReactNode }[] = [];
  if (plan.packages.length > 0) {
    steps.push({
      title: "Install the packages",
      content: (
        <PackageManagerCommand action="add" args={plan.packages.join(" ")} />
      ),
    });
  }
  if (groups.length > 0) {
    steps.push({
      title: "Add the required files",
      content: (
        <>
          <p className="text-[13px] leading-6 text-muted-foreground">
            {name} uses these files. Add the files that you do not have.
          </p>
          {groups.map((group) => (
            <div key={group.label} className="grid gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                {group.label}
              </p>
              <ul className="min-w-0 divide-y divide-border/70 rounded-xl border border-border/70 bg-card/50">
                {group.files.map((file) => (
                  <RequiredFileRow key={file.slug} file={file} />
                ))}
              </ul>
            </div>
          ))}
        </>
      ),
    });
  }
  steps.push({
    title: `Add ${name}`,
    content: (
      <CodeBlock
        code={plan.component.content}
        filename={displayPath(plan.component)}
      />
    ),
  });

  return (
    <div className="space-y-5">
      <p className="text-[13px] leading-6 text-muted-foreground">
        Complete the{" "}
        <TextLink href="/components/installation#manual">
          one-time setup
        </TextLink>{" "}
        first.
      </p>
      <ol className="grid gap-8">
        {steps.map((step, index) => (
          <InstallStep key={step.title} number={index + 1} title={step.title}>
            {step.content}
          </InstallStep>
        ))}
      </ol>
    </div>
  );
}

function RequiredFileRow({ file }: { file: RequiredFile }) {
  const name = fileName(file.file);
  return (
    <li className="flex min-w-0 items-center gap-3 py-2.5 ps-4 pe-2">
      <div className="min-w-0 flex-1">
        {file.kind === "component" ? (
          <>
            <Link href={componentInstallHref(file.slug)} className={linkClass}>
              {file.name}
            </Link>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {displayPath(file.file)}
            </p>
          </>
        ) : (
          <>
            <Link
              href={`/components/installation#file-${file.slug}`}
              className={cn(linkClass, "font-mono")}
            >
              {name}
            </Link>
            <p className="truncate text-xs text-muted-foreground">
              {file.description}
            </p>
          </>
        )}
      </div>
      <CopyButton
        code={file.file.content}
        iconOnly
        variant="ghost"
        label={`Copy ${name}`}
      />
    </li>
  );
}
