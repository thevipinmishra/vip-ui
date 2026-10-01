import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Code, InfoCircle } from "reicon-react";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";
import { repository } from "./config";
import type { User } from "./data";

export function formatDate(value: string | null) {
  if (!value) return "Not published";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function Heading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-2xl">
        <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.06em]">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-[15px]">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}

export function Source({ asOf }: { asOf: string | null }) {
  const received = asOf
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      }).format(new Date(asOf))
    : null;
  return (
    <p className="mt-5 text-xs leading-5 text-muted-foreground">
      Source:{" "}
      <a
        className="underline underline-offset-4 hover:text-foreground"
        href={repository.url}
      >
        GitHub
      </a>
      {received ? ` · API response ${received}` : ""}
      {" · Updates every 5 minutes"}
    </p>
  );
}

export function Failure() {
  return (
    <Alert
      variant="warning"
      title="GitHub data is unavailable"
      className="max-w-2xl"
    >
      GitHub may be unavailable or the API rate limit may have been reached. Try
      again shortly, or{" "}
      <a className="underline underline-offset-4" href={repository.url}>
        open the repository on GitHub
      </a>
      .
    </Alert>
  );
}

export function NoResults({
  title = "Nothing on this page",
  description = "Try another page or change the filter.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <EmptyState>
      <EmptyStateIcon>
        <InfoCircle size={20} />
      </EmptyStateIcon>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateDescription>{description}</EmptyStateDescription>
      <EmptyStateActions>
        <a
          className="text-sm font-medium text-primary underline underline-offset-4"
          href={repository.url}
        >
          Browse on GitHub
        </a>
      </EmptyStateActions>
    </EmptyState>
  );
}

export function PageNavigation({
  base,
  page,
  hasNext,
  state,
}: {
  base: string;
  page: number;
  hasNext: boolean;
  state?: string;
}) {
  if (page === 1 && !hasNext) return null;
  const href = (number: number) =>
    `${base}?${state ? `state=${state}&` : ""}page=${number}`;
  return (
    <Pagination className="mt-6">
      <PaginationList>
        {page > 1 && (
          <PaginationItem>
            <PaginationLink href={href(page - 1)}>Previous</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            href={href(page)}
            isCurrent
            aria-label={`Page ${page}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {hasNext && (
          <PaginationItem>
            <PaginationLink href={href(page + 1)}>Next</PaginationLink>
          </PaginationItem>
        )}
      </PaginationList>
    </Pagination>
  );
}

export function Person({
  user,
  fallback = "Unknown",
}: {
  user: User | null;
  fallback?: string;
}) {
  if (!user)
    return <span className="text-sm text-muted-foreground">{fallback}</span>;
  return (
    <a
      href={user.html_url}
      className="inline-flex min-h-10 items-center gap-2.5 rounded-sm text-sm font-medium text-foreground hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
    >
      <Avatar name={user.login} src={user.avatar_url} className="size-7" />
      <span className="max-w-32 truncate">{user.login}</span>
    </a>
  );
}

export function SectionCard({
  title,
  description,
  href,
  children,
}: {
  title: string;
  description: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-10 items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          View all <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function Status({
  label,
  variant = "neutral",
}: {
  label: string;
  variant?: "neutral" | "accent" | "success" | "warning";
}) {
  return <Badge variant={variant}>{label}</Badge>;
}

export function GithubLink() {
  return (
    <ButtonLink href={repository.url}>
      <Code size={17} aria-hidden="true" /> Open on GitHub
    </ButtonLink>
  );
}
