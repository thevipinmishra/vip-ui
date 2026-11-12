import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { type Guide, guideNeighbors, type NavLink } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { pageTitleClass } from "./page-header";
import { SectionHeading } from "./section-heading";

export const textLinkClass =
  "rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:decoration-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:decoration-primary-foreground/40 focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent";

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={textLinkClass}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(textLinkClass, "inline-flex items-center gap-1", className)}
    >
      {children}
      <ArrowUpRightIcon size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-foreground">{children}</code>;
}

export function List({ children }: { children: ReactNode }) {
  return (
    <ul className="grid list-disc gap-1.5 ps-5 marker:text-muted-foreground">
      {children}
    </ul>
  );
}

export function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-8">
      <SectionHeading section={id}>{title}</SectionHeading>
      <div className="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function DocsHeader({
  title,
  description,
  parent,
}: {
  title: string;
  description: ReactNode;
  parent?: NavLink;
}) {
  return (
    <header>
      {parent && (
        <nav aria-label="Breadcrumbs" className="mb-4">
          <Breadcrumbs>
            <Breadcrumb href={parent.href}>{parent.label}</Breadcrumb>
            <Breadcrumb>{title}</Breadcrumb>
          </Breadcrumbs>
        </nav>
      )}
      <h1 className={pageTitleClass}>{title}</h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-pretty text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

const pagerLink =
  "flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-offset-4 outline-transparent transition-[background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2";

export function DocsPager({
  previous,
  next,
}: {
  previous?: NavLink;
  next?: NavLink;
}) {
  return (
    <nav
      aria-label="Previous and next pages"
      className="mt-16 grid gap-3 sm:grid-cols-2"
    >
      {previous && (
        <Link href={previous.href} className={pagerLink}>
          <span className="text-[11px] text-muted-foreground">Previous</span>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftIcon size={16} aria-hidden="true" />
            {previous.label}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={`${pagerLink} items-end text-right sm:col-start-2`}
        >
          <span className="text-[11px] text-muted-foreground">Next</span>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
            {next.label}
            <ArrowRightIcon size={16} aria-hidden="true" />
          </span>
        </Link>
      )}
    </nav>
  );
}

const guideSeoDescriptions: Partial<Record<Guide["href"], string>> = {
  "/components/installation":
    "Add vip/ui components with the shadcn CLI, or copy the files manually. Requires React 19, TypeScript, and Tailwind CSS v4.1 or later.",
  "/components/from-shadcn":
    "Install vip/ui beside shadcn/ui. Keep your theme and your components/ui folder, and map each shadcn component name to its vip/ui name.",
  "/components/ai-and-mcp":
    "Use the shadcn MCP server, llms.txt, the Markdown pages, and the CLI to build with vip/ui components through AI tools.",
  "/components/updating":
    "Compare an installed vip/ui component with the registry, then overwrite it. Find what changed in the changelog.",
  "/components/rtl":
    "vip/ui components use logical CSS classes, so right-to-left layouts work with no transform. What the CLI rtl option changes, and the components that set left or right on purpose.",
};

export function guideMetadata(href: Guide["href"]): Metadata {
  const { guide } = guideNeighbors(href);
  return pageMetadata({
    title: guide.label,
    description: guideSeoDescriptions[href] ?? guide.description,
    path: href,
    og: { label: "Docs" },
  });
}

export function GuidePage({
  href,
  children,
}: {
  href: Guide["href"];
  children: ReactNode;
}) {
  const { guide, previous, next } = guideNeighbors(href);
  return (
    <article className="max-w-[670px]">
      <DocsHeader title={guide.label} description={guide.description} />
      {children}
      <DocsPager previous={previous} next={next} />
    </article>
  );
}
