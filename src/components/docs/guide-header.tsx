import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { NavLink } from "@/lib/navigation";

export function GuideHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header>
      <nav aria-label="Breadcrumbs" className="mbe-4">
        <Breadcrumbs>
          <Breadcrumb href="/components">Components</Breadcrumb>
          <Breadcrumb>{title}</Breadcrumb>
        </Breadcrumbs>
      </nav>
      <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] [text-wrap:balance]">
        {title}
      </h1>
      <p className="mbs-2 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </header>
  );
}

const pagerLink =
  "flex min-h-20 flex-col justify-center rounded-xl bg-card px-5 py-3 shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted active:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function GuidePager({
  previous,
  next,
}: {
  previous?: NavLink;
  next?: NavLink;
}) {
  return (
    <nav
      aria-label="Guide pagination"
      className="mbs-16 grid gap-3 sm:grid-cols-2"
    >
      {previous && (
        <Link href={previous.href} className={pagerLink}>
          <span className="text-[11px] text-muted-foreground">Previous</span>
          <span className="mbs-1 inline-flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftIcon size={16} aria-hidden="true" />
            {previous.label}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={`${pagerLink} items-end text-end sm:col-start-2`}
        >
          <span className="text-[11px] text-muted-foreground">Next</span>
          <span className="mbs-1 inline-flex items-center gap-2 text-sm font-semibold">
            {next.label}
            <ArrowRightIcon size={16} aria-hidden="true" />
          </span>
        </Link>
      )}
    </nav>
  );
}
