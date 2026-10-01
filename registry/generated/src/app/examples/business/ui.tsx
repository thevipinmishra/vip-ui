import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import { ButtonLink } from "../../../components/vip-ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/vip-ui/card";
import { Form } from "../../../components/vip-ui/form";
import { SearchField } from "../../../components/vip-ui/search-field";
import { Select } from "../../../components/vip-ui/select";
import { date, money } from "./data";

export const base = "/examples/business";
export const linkClass =
  "font-medium text-foreground hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring";

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
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

export function Status({ value }: { value: string }) {
  const variant = ["active", "paid", "succeeded"].includes(value)
    ? "success"
    : ["past_due", "overdue", "failed"].includes(value)
      ? "warning"
      : "neutral";
  return (
    <Badge variant={variant} dot>
      {value.replaceAll("_", " ")}
    </Badge>
  );
}

export function Money({ value }: { value: number }) {
  return <span className="tabular-nums">{money(value)}</span>;
}
export function DateText({ value }: { value: string }) {
  return <time dateTime={value}>{date(value)}</time>;
}
export function CustomerLink({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <Link className={linkClass} href={`${base}/customers/${id}`}>
      {children}
    </Link>
  );
}

export function Panel({
  title,
  description,
  children,
  href,
  linkLabel,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle as="h2">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {href && (
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
          >
            {linkLabel ?? "View all"} →
          </Link>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-border text-start text-xs text-muted-foreground">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="whitespace-nowrap px-3 pb-3 text-start font-medium first:ps-0 last:pe-0"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">{children}</tbody>
      </table>
    </div>
  );
}
export const cell = "whitespace-nowrap px-3 py-3.5 first:ps-0 last:pe-0";

export function Filters({
  action,
  q,
  status,
  options,
  placeholder,
}: {
  action: string;
  q: string;
  status: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <Form
      action={action}
      method="get"
      className="mb-5 flex flex-wrap items-end gap-3"
    >
      <SearchField
        name="q"
        label="Search"
        defaultValue={q}
        placeholder={placeholder}
        className="min-w-[200px] flex-1"
      />
      <Select
        name="status"
        label="Status"
        defaultValue={options.includes(status) ? status : "all"}
        options={[
          { id: "all", name: "All statuses" },
          ...options.map((option) => ({
            id: option,
            name: option
              .replaceAll("_", " ")
              .replace(/^./, (first) => first.toUpperCase()),
          })),
        ]}
        className="w-40"
      />
      <Button type="submit" size="sm">
        Apply filters
      </Button>
    </Form>
  );
}

export function Results({
  count,
  page,
  pages,
  q,
  selected,
  href,
}: {
  count: number;
  page: number;
  pages: number;
  q: string;
  selected: string;
  href: string;
}) {
  const url = (number: number) =>
    `${href}?${new URLSearchParams({ q, status: selected, page: String(number) })}`;
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
      <p>
        {count} {count === 1 ? "result" : "results"} · Page {page} of {pages}
      </p>
      <div className="flex gap-2">
        {page > 1 && (
          <ButtonLink
            as={Link}
            variant="outline"
            size="sm"
            href={url(page - 1)}
          >
            Previous
          </ButtonLink>
        )}
        {page < pages && (
          <ButtonLink
            as={Link}
            variant="outline"
            size="sm"
            href={url(page + 1)}
          >
            Next
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
