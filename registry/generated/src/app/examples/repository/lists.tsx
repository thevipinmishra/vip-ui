"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DateValue } from "react-aria-components";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import { DatePicker } from "../../../components/vip-ui/date-picker";
import { SearchField } from "../../../components/vip-ui/search-field";
import { Select } from "../../../components/vip-ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "../../../components/vip-ui/table";
import type { Commit, Contributor, Issue, Pull } from "./data";
import { formatDate, NoResults, Person } from "./ui";

export function WorkList({
  items,
  kind,
  state,
}: {
  items: Issue[] | Pull[];
  kind: "issues" | "pulls";
  state: "open" | "closed";
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const visible = items.filter((item) =>
    `${item.title} ${item.number} ${item.user?.login ?? ""} ${item.labels.map((label) => label.name).join(" ")}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim()),
  );
  return (
    <>
      <div className="mb-5 flex flex-wrap items-end gap-3">
        <SearchField
          label={`Search ${kind} on this page`}
          value={query}
          onChange={setQuery}
          placeholder="Title, number, author or label"
          className="min-w-52 flex-1 sm:max-w-sm"
        />
        <Select
          label="Status"
          options={[
            { id: "open", name: "Open" },
            { id: "closed", name: "Closed" },
          ]}
          value={state}
          onValueChange={(value) =>
            router.push(`/examples/repository/${kind}?state=${value}`)
          }
          className="w-40"
        />
      </div>
      <output className="mb-3 block text-xs text-muted-foreground">
        Showing {visible.length} of {items.length} {kind} on this page
      </output>
      {visible.length ? (
        <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
          <Table
            aria-label={
              kind === "issues"
                ? "Repository issues"
                : "Repository pull requests"
            }
          >
            <TableHeader>
              <Column id="title" isRowHeader>
                Work item
              </Column>
              <Column id="author">Author</Column>
              <Column id="status">Status</Column>
              <Column id="updated">Updated</Column>
            </TableHeader>
            <TableBody items={visible}>
              {(item) => (
                <Row id={item.id}>
                  <Cell className="min-w-64 max-w-[540px]">
                    <a
                      href={item.html_url}
                      className="block font-medium leading-5 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {item.title}
                    </a>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      #{item.number}
                      {item.labels.length
                        ? ` · ${item.labels
                            .slice(0, 2)
                            .map((label) => label.name)
                            .join(", ")}`
                        : ""}
                    </span>
                  </Cell>
                  <Cell>
                    <Person user={item.user} />
                  </Cell>
                  <Cell>
                    {kind === "pulls" && "draft" in item && item.draft ? (
                      <Badge variant="warning">Draft</Badge>
                    ) : kind === "pulls" &&
                      "merged_at" in item &&
                      item.merged_at ? (
                      <Badge variant="success">Merged</Badge>
                    ) : (
                      <Badge
                        variant={item.state === "open" ? "accent" : "neutral"}
                      >
                        {item.state === "open" ? "Open" : "Closed"}
                      </Badge>
                    )}
                  </Cell>
                  <Cell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(item.updated_at)}
                  </Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <NoResults
          title={
            query ? "No matches on this page" : "No work items on this page"
          }
          description={
            query
              ? "Try another search or go to a different page."
              : "Try another page or status."
          }
        />
      )}
    </>
  );
}

export function CommitList({ items }: { items: Commit[] }) {
  const [date, setDate] = useState<DateValue | null>(null);
  const visible = date
    ? items.filter(
        (item) => item.commit.author?.date.slice(0, 10) === date.toString(),
      )
    : items;
  return (
    <>
      <div className="mb-5 flex flex-wrap items-end gap-3">
        <DatePicker
          label="Filter date on this page"
          value={date}
          onChange={setDate}
          className="w-64"
        />
        {date && (
          <Button variant="outline" onPress={() => setDate(null)}>
            Clear date
          </Button>
        )}
      </div>
      <output className="mb-3 block text-xs text-muted-foreground">
        Showing {visible.length} of {items.length} commits on this page
      </output>
      {visible.length ? (
        <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
          <Table aria-label="Recent commits">
            <TableHeader>
              <Column id="message" isRowHeader>
                Commit
              </Column>
              <Column id="author">Author</Column>
              <Column id="date">Committed</Column>
            </TableHeader>
            <TableBody items={visible}>
              {(item) => (
                <Row id={item.sha}>
                  <Cell className="min-w-64 max-w-[580px]">
                    <a
                      href={item.html_url}
                      className="block font-medium leading-5 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {item.commit.message.split("\n")[0]}
                    </a>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      {item.sha.slice(0, 7)}
                    </span>
                  </Cell>
                  <Cell>
                    {item.author ? (
                      <Person user={item.author} />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {item.commit.author?.name ?? "Unknown"}
                      </span>
                    )}
                  </Cell>
                  <Cell className="whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(item.commit.author?.date ?? null)}
                  </Cell>
                </Row>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <NoResults
          title="No commits on this date"
          description="Choose another date or clear the filter. This filter covers the current page only."
        />
      )}
    </>
  );
}

export function ContributorList({ items }: { items: Contributor[] }) {
  if (!items.length) return <NoResults title="No contributors on this page" />;
  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <Table aria-label="Repository contributors">
        <TableHeader>
          <Column id="contributor" isRowHeader>
            Contributor
          </Column>
          <Column id="contributions">Contributions</Column>
          <Column id="profile">Profile</Column>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <Row id={item.id}>
              <Cell>
                <span className="inline-flex items-center gap-3">
                  <Avatar
                    name={item.login}
                    src={item.avatar_url}
                    className="size-9"
                  />
                  <span className="font-medium">{item.login}</span>
                </span>
              </Cell>
              <Cell className="tabular-nums">
                {item.contributions.toLocaleString("en-US")}
              </Cell>
              <Cell>
                <a
                  href={item.html_url}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4"
                >
                  View profile
                </a>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
