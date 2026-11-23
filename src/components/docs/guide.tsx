import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  type Guide,
  guideGroups,
  guideNeighbors,
  type NavLink,
} from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { DocsEyebrow } from "./docs-eyebrow";
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
  return (
    <code className="rounded-[5px] bg-foreground/[0.045] px-1 py-px font-mono text-[0.9em] text-foreground ring-1 ring-docs-line">
      {children}
    </code>
  );
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
  eyebrow,
}: {
  title: string;
  description: ReactNode;
  parent?: NavLink;
  eyebrow?: string[];
}) {
  return (
    <header>
      {eyebrow && !parent && <DocsEyebrow trail={eyebrow} />}
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
  "group/pager relative flex min-h-20 flex-col justify-center overflow-hidden rounded-xl bg-card/60 px-5 py-3 ring-1 ring-docs-line outline-offset-4 outline-transparent backdrop-blur-sm transition-[background-color,box-shadow,outline-color,outline-offset] duration-200 ease-out-quint hover:bg-card hover:ring-docs-accent/40 hover:shadow-[0_0_0_1px_var(--docs-glow),0_8px_30px_-12px_var(--docs-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2";

const pagerArrow =
  "transition-transform duration-200 ease-out-quint rtl:-scale-x-100";

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
      className="mt-20 grid gap-3 border-t border-docs-line pt-8 sm:grid-cols-2"
    >
      {previous && (
        <Link href={previous.href} className={pagerLink}>
          <span className="mono-label text-[10px] text-muted-foreground">
            Previous
          </span>
          <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftIcon
              size={16}
              aria-hidden="true"
              className={`${pagerArrow} motion-safe:group-hover/pager:-translate-x-0.5`}
            />
            {previous.label}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={`${pagerLink} items-end text-end sm:col-start-2`}
        >
          <span className="mono-label text-[10px] text-muted-foreground">
            Next
          </span>
          <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold">
            {next.label}
            <ArrowRightIcon
              size={16}
              aria-hidden="true"
              className={`${pagerArrow} motion-safe:group-hover/pager:translate-x-0.5`}
            />
          </span>
        </Link>
      )}
    </nav>
  );
}

const guideSeoDescriptions: Partial<Record<Guide["href"], string>> = {
  "/components/installation":
    "Add vip/ui components with the shadcn CLI, or copy the files manually, and update them later. Requires React 19, TypeScript, and Tailwind CSS v4.1 or later.",
  "/components/agents":
    "Give your agent a setup prompt, install the vip/ui skill, use the shadcn MCP server and the CLI, and read llms.txt and the Markdown pages.",
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
  const group = guideGroups.find((item) =>
    item.guides.some((entry) => entry.href === href),
  );
  return (
    <article className="max-w-167.5">
      <DocsHeader
        title={guide.label}
        description={guide.description}
        eyebrow={["Docs", group?.title ?? "Guides"]}
      />
      {children}
      <DocsPager previous={previous} next={next} />
    </article>
  );
}
